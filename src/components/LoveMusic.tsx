import React, { useState, useEffect, useRef } from 'react';

const LoveMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to start music
  const startMusic = async () => {
    try {
      if (audioRef.current && !audioError && !isPlaying) {
        audioRef.current.volume = volume;
        await audioRef.current.play();
        setIsPlaying(true);
        setAudioError(false);
        setUserInteracted(true);
        console.log('🎵 Music started successfully!');
      }
    } catch (error) {
      console.log('Cannot start music:', error);
    }
  };

  useEffect(() => {
    // Multiple attempts to auto-play music
    const playMusic = async () => {
      try {
        if (audioRef.current && !audioError) {
          audioRef.current.volume = volume;
          await audioRef.current.play();
          setIsPlaying(true);
          setAudioError(false);
          console.log('🎵 Music started automatically!');
        }
      } catch (error) {
        console.log('Auto-play prevented by browser. Waiting for user interaction...');
        setIsPlaying(false);
      }
    };

    // Try to play immediately
    playMusic();

    // Try again after 1 second
    const timer1 = setTimeout(playMusic, 1000);
    
    // Try again after 3 seconds
    const timer2 = setTimeout(playMusic, 3000);
    
    // Try again after 5 seconds
    const timer3 = setTimeout(playMusic, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [audioError]);

  // Listen for gallery click event to start music
  useEffect(() => {
    const handleGalleryMusicTrigger = (event: CustomEvent) => {
      console.log('🎵 Received gallery music trigger:', event.detail);
      startMusic();
    };

    document.addEventListener('startLoveMusic', handleGalleryMusicTrigger as EventListener);

    return () => {
      document.removeEventListener('startLoveMusic', handleGalleryMusicTrigger as EventListener);
    };
  }, [audioError, isPlaying]);

  // Listen for any user interaction to trigger music
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!userInteracted && audioRef.current && !audioError && !isPlaying) {
        setUserInteracted(true);
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          console.log('🎵 Music started after user interaction!');
        } catch (error) {
          console.log('Still cannot play music:', error);
        }
      }
    };

    // Listen for various user interactions
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [userInteracted, audioError, isPlaying]);

  const handleAudioError = () => {
    setAudioError(true);
    setIsPlaying(false);
    console.log('Audio file not found: love.mp3');
  };

  const togglePlay = () => {
    if (audioRef.current && !audioError) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          setAudioError(true);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    // Loop the music
    if (audioRef.current && !audioError) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        setAudioError(true);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/love.mp3"
        onEnded={handleEnded}
        onError={handleAudioError}
        loop
        preload="auto"
        autoPlay
      />

      {/* Music Controls */}
      {showControls && (
        <div className="love-music-controls">
          <div className="music-info">
            <span className="music-icon">🎵</span>
            <span className="music-title">
              {audioError ? "Add Love Song" : "Love Song"}
            </span>
          </div>
          
          <div className="music-controls">
            <button 
              className={`play-button ${audioError ? 'disabled' : ''}`}
              onClick={togglePlay}
              title={audioError ? "Add love.mp3 to public folder" : (isPlaying ? "Pause Music" : "Play Music")}
              disabled={audioError}
            >
              {audioError ? "⚠️" : (isPlaying ? "⏸️" : "▶️")}
            </button>
            
            <div className="volume-control">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                title="Volume"
                disabled={audioError}
              />
            </div>
          </div>

          <button 
            className="hide-controls"
            onClick={() => setShowControls(false)}
            title="Hide Music Controls"
          >
            ✕
          </button>
        </div>
      )}

      {/* Show Music Button when controls are hidden */}
      {!showControls && (
        <div className="music-toggle-button" onClick={() => setShowControls(true)}>
          <span className="music-toggle-icon">
            {audioError ? "⚠️" : "🎵"}
          </span>
          {isPlaying && !audioError && <div className="music-pulse"></div>}
        </div>
      )}

      {/* Error Message */}
      {audioError && showControls && (
        <div className="audio-error-message">
          <p>💕 To add romantic music:</p>
          <ol>
            <li>Add your <strong>love.mp3</strong> file to the <strong>public/</strong> folder</li>
            <li>Refresh the page</li>
            <li>Music will play automatically! 🎵</li>
          </ol>
        </div>
      )}

      {/* Auto-play Instructions */}
      {!audioError && !isPlaying && showControls && (
        <div className="autoplay-instructions">
          <p>🎵 Click on any photo to start romantic music!</p>
        </div>
      )}
    </>
  );
};

export default LoveMusic;
