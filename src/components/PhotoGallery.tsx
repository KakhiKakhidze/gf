import React, { useState, useEffect, useRef } from 'react';

interface PhotoGalleryProps {
  images: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const imageRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});

  useEffect(() => {
    console.log('PhotoGallery received images:', images.length);
    if (images.length > 0) {
      console.log('First image URL:', images[0]);
    }
  }, [images]);

  // Preload images for faster modal opening
  useEffect(() => {
    const preloadImages = async () => {
      const preloadPromises = images.slice(0, 20).map((imageUrl) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setPreloadedImages(prev => new Set(Array.from(prev).concat(imageUrl)));
            resolve();
          };
          img.onerror = () => resolve();
          img.src = imageUrl;
        });
      });
      
      await Promise.all(preloadPromises);
    };
    
    preloadImages();
  }, [images]);

  // Function to trigger music start
  const triggerMusicStart = () => {
    // Dispatch custom event to trigger music
    const musicEvent = new CustomEvent('startLoveMusic', {
      detail: { source: 'gallery-click' }
    });
    document.dispatchEvent(musicEvent);
    console.log('🎵 Triggered music start from gallery click!');
  };

  // Auto-advance through images
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoAdvance && isModalOpen) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % images.length;
          setSelectedImage(images[nextIndex]);
          return nextIndex;
        });
      }, 1000); // 1 second per image
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoAdvance, isModalOpen, images]);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
    setAutoAdvance(true); // Start auto-advance
    document.body.style.overflow = 'hidden';
    
    // Trigger music when photo is clicked
    triggerMusicStart();
    
    // Show romantic message occasionally
    if (Math.random() < 0.3) {
      setShowLoveMessage(true);
      setTimeout(() => setShowLoveMessage(false), 3000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setAutoAdvance(false); // Stop auto-advance
    document.body.style.overflow = 'unset';
    setShowLoveMessage(false);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const toggleAutoAdvance = () => {
    setAutoAdvance(!autoAdvance);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen) return;
    
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case ' ': // Spacebar
        e.preventDefault();
        toggleAutoAdvance();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, currentIndex, autoAdvance]);

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages(prev => new Set(Array.from(prev).concat(imageUrl)));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', e.currentTarget.src);
    e.currentTarget.style.display = 'none';
  };

  const loveMessages = [
    "Every moment with you is pure magic ✨",
    "You make my heart smile 💕",
    "Forever yours, always and forever 💑",
    "Our love story is my favorite story 📖",
    "You're my today and all of my tomorrows 🌅",
    "In your eyes, I found my home 🏠",
    "Every day I fall in love with you more 💖",
    "You're not just my love, you're my best friend 👫",
    "Together with you is my favorite place to be 💕",
    "You're the missing piece to my puzzle 🧩",
    "Your love makes every day feel like Valentine's Day 💝",
    "I'm so lucky to have you in my life 🍀",
    "You're my dream come true 💭",
    "With you, every day is a new adventure 🌟",
    "You're my sunshine on cloudy days ☀️",
    "My heart beats only for you 💓",
    "You're the love of my life 💘",
    "Every photo with you is a treasure 💎",
    "You make my world complete 🌍",
    "I love you more than words can express 💌"
  ];

  const getRandomLoveMessage = () => {
    return loveMessages[Math.floor(Math.random() * loveMessages.length)];
  };

  const romanticQuotes = [
    "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    "I have loved you for a thousand years, and I'll love you for a thousand more.",
    "You are my today and all of my tomorrows.",
    "Every love story is beautiful, but ours is my favorite.",
    "I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.",
    "You don't marry someone you can live with, you marry the person who you cannot live without.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "The best thing to hold onto in life is each other.",
    "Love is composed of a single soul inhabiting two bodies."
  ];

  const getRandomQuote = () => {
    return romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
  };

  if (images.length === 0) {
    return (
      <div className="photo-gallery">
        <div className="no-images">
          <h2>No Images Found</h2>
          <p>Please check that the images are in the correct location.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-gallery">
      <div className="gallery-container">
        <div className="gallery-intro">
          <div className="love-banner">
            <span className="love-icon">💕</span>
            <span className="love-text">Our Love Story in Pictures</span>
            <span className="love-icon">💕</span>
          </div>
          <div className="romantic-quote">
            <p>"{getRandomQuote()}"</p>
          </div>
        </div>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => openModal(image, index)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="image-wrapper">
                <img 
                  ref={(el) => { imageRefs.current[image] = el; }}
                  src={image} 
                  alt={`Love Memory ${index + 1}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(image)}
                  onError={handleImageError}
                  className={preloadedImages.has(image) ? 'preloaded' : ''}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <span className="image-number">#{index + 1}</span>
                    <div className="love-icon-overlay">💕</div>
                    <div className="view-icon">👁️</div>
                    <div className="romantic-date">
                      <span>💕 Forever Love 💕</span>
                    </div>
                  </div>
                </div>
                <div className="love-badge">
                  <span>💖</span>
                </div>
                {loadedImages.has(image) && (
                  <div className="loaded-indicator">
                    <span>✨</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <span>×</span>
            </button>
            
            <div className="modal-image-container">
              <img src={selectedImage} alt={`Love Memory ${currentIndex + 1}`} />
              {showLoveMessage && (
                <div className="love-message">
                  <span>{getRandomLoveMessage()}</span>
                </div>
              )}
              <div className="modal-romantic-overlay">
                <div className="floating-hearts">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="floating-heart" style={{ animationDelay: `${i * 0.5}s` }}>
                      {['💕', '💖', '💗', '💓', '💘'][i]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
