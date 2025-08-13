import React, { useState, useEffect } from 'react';

interface PhotoGalleryProps {
  images: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoveMessage, setShowLoveMessage] = useState(false);

  useEffect(() => {
    console.log('PhotoGallery received images:', images.length);
    if (images.length > 0) {
      console.log('First image URL:', images[0]);
    }
  }, [images]);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Show romantic message occasionally
    if (Math.random() < 0.3) {
      setShowLoveMessage(true);
      setTimeout(() => setShowLoveMessage(false), 3000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
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
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, currentIndex]);

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
    "You're the missing piece to my puzzle 🧩"
  ];

  const getRandomLoveMessage = () => {
    return loveMessages[Math.floor(Math.random() * loveMessages.length)];
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
        </div>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => openModal(image, index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="image-wrapper">
                <img 
                  src={image} 
                  alt={`Love Memory ${index + 1}`}
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <span className="image-number">#{index + 1}</span>
                    <div className="love-icon-overlay">💕</div>
                    <div className="view-icon">👁️</div>
                  </div>
                </div>
                <div className="love-badge">
                  <span>💖</span>
                </div>
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
            
            <button className="modal-nav modal-prev" onClick={prevImage}>
              <span>‹</span>
            </button>
            
            <div className="modal-image-container">
              <img src={selectedImage} alt={`Love Memory ${currentIndex + 1}`} />
              {showLoveMessage && (
                <div className="love-message">
                  <span>{getRandomLoveMessage()}</span>
                </div>
              )}
            </div>
            
            <button className="modal-nav modal-next" onClick={nextImage}>
              <span>›</span>
            </button>
            
            <div className="modal-info">
              <span className="modal-counter">
                💕 {currentIndex + 1} / {images.length} 💕
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
