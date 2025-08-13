import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-background">
        <div className="floating-hearts">
          <div className="heart-float">❤️</div>
          <div className="heart-float">💕</div>
          <div className="heart-float">💖</div>
          <div className="heart-float">💗</div>
          <div className="heart-float">💝</div>
          <div className="heart-float">🌹</div>
          <div className="heart-float">💕</div>
          <div className="heart-float">💖</div>
        </div>
        <div className="rose-petals">
          <div className="petal">🌹</div>
          <div className="petal">🌹</div>
          <div className="petal">🌹</div>
          <div className="petal">🌹</div>
          <div className="petal">🌹</div>
          <div className="petal">🌹</div>
        </div>
        <div className="sparkles">
          <div className="sparkle">✨</div>
          <div className="sparkle">✨</div>
          <div className="sparkle">✨</div>
          <div className="sparkle">✨</div>
          <div className="sparkle">✨</div>
          <div className="sparkle">✨</div>
        </div>
      </div>
      <div className="header-content">
        <h1 className="main-title">
          <span className="title-word">Forever</span>
          <span className="title-word">In</span>
          <span className="title-word">Love</span>
        </h1>
        <p className="subtitle">Every moment with you is pure magic, every memory a treasure of our love story</p>
        <div className="love-quote">
          "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">∞</span>
            <span className="stat-label">Moments of Love</span>
          </div>
          <div className="stat">
            <span className="stat-number">∞</span>
            <span className="stat-label">Love Forever</span>
          </div>
          <div className="stat">
            <span className="stat-number">💑</span>
            <span className="stat-label">Soulmates</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
