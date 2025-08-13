import React, { useState, useEffect } from 'react';

const LoveChat: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const loveMessages = [
    "Every moment with you is pure magic ✨",
    "You make my heart smile every single day 💕",
    "Forever yours, always and forever 💑",
    "Our love story is my favorite story 📖",
    "You're my today and all of my tomorrows 🌅",
    "In your eyes, I found my home 🏠",
    "Every day I fall in love with you more 💖",
    "You're not just my love, you're my best friend 👫",
    "Together with you is my favorite place to be 💕",
    "You're the missing piece to my puzzle 🧩",
    "My heart beats only for you 💓",
    "You're the reason I believe in love 💝",
    "Every sunrise reminds me of your smile 🌅",
    "You're my dream come true 💫",
    "With you, every day feels like Valentine's Day 💕",
    "You're the most beautiful person I've ever known 🌹",
    "My love for you grows stronger every day 💪",
    "You're my everything, my world, my life 🌍",
    "Every kiss from you feels like the first one 💋",
    "You're the melody to my heart's song 🎵",
    "I'm so lucky to have you in my life 🍀",
    "You make every day feel like a celebration 🎉",
    "Your love is the greatest gift I've ever received 🎁",
    "I can't imagine my life without you 💭",
    "You're my soulmate, my perfect match 💑",
    "Every moment with you is a treasure 💎",
    "You're the answer to all my prayers 🙏",
    "My heart belongs to you completely 💖",
    "You're the most precious person in my life 👑",
    "Every day with you is a new adventure 🚀",
    "You're my sunshine on cloudy days ☀️",
    "Your love makes me feel invincible ⚡",
    "I'm forever grateful for your love 🙏",
    "You're my happy place, my safe haven 🏰",
    "Every touch from you sends shivers down my spine 💫",
    "You're the most amazing person I've ever met 🌟",
    "My love for you is infinite and eternal ♾️",
    "You're the reason I wake up with a smile 😊",
    "Every day I discover new reasons to love you 💕",
    "You're my perfect match, my other half 💝",
    "Your love makes me feel complete 🎯",
    "I'm so blessed to have you in my life 🙌",
    "You're the most beautiful soul I've ever known ✨",
    "Every moment with you is pure bliss 😌",
    "You're my dream girl, my everything 💫",
    "My heart beats in rhythm with yours 💓",
    "You're the love of my life, my forever 💕",
    "Every day I fall deeper in love with you 💖",
    "You're my inspiration, my motivation 💪",
    "Your love gives me strength and courage 🦁",
    "I'm so lucky to call you mine 💍",
    "You're the most precious gift life has given me 🎁",
    "Every day with you is a blessing 🙏",
    "You're my perfect partner, my soulmate 💑",
    "My love for you knows no bounds ♾️",
    "You're the most amazing woman I've ever known 👸",
    "Every moment with you is magical ✨",
    "You're my everything, my world 🌍",
    "Your love makes me feel alive 💓",
    "I'm so grateful for your love every day 🙏",
    "You're my happy ending, my forever 💕",
    "Every day I love you more than yesterday 💖",
    "You're the most beautiful person inside and out 🌹",
    "My heart belongs to you completely 💝",
    "You're my dream come true, my reality 💫",
    "Every day with you is a new beginning 🌅",
    "You're my perfect match, my destiny 💑",
    "Your love makes me feel whole 🎯",
    "I'm so blessed to have you in my life 🙌",
    "You're the most incredible person I've ever met 🌟",
    "Every moment with you is precious 💎",
    "You're my love, my life, my everything 💕",
    "Your love gives me wings to fly 🦋",
    "I'm so lucky to have found you 🍀",
    "You're my perfect partner in life 💑",
    "Every day I discover new ways to love you 💖",
    "You're my inspiration, my muse 🎨",
    "Your love makes me feel invincible ⚡",
    "I'm so grateful for every moment with you 🙏",
    "You're my happy place, my sanctuary 🏰",
    "Every day I fall more in love with you 💕",
    "You're my soulmate, my perfect match 💝",
    "Your love makes me feel complete 🎯",
    "I'm so blessed to have you in my life 🙌",
    "You're the most beautiful person I've ever known ✨",
    "Every moment with you is pure joy 😊",
    "You're my dream come true, my reality 💫",
    "Your love makes me feel alive 💓",
    "I'm so lucky to call you mine 💍",
    "You're my perfect partner, my everything 💑",
    "Every day with you is a blessing 🙏",
    "You're my love story, my happy ending 💕",
    "Your love gives me strength and courage 💪",
    "I'm so grateful for your love every day 🙏",
    "You're my inspiration, my motivation 🌟",
    "Every moment with you is magical ✨",
    "You're my perfect match, my destiny 💝",
    "Your love makes me feel whole 🎯",
    "I'm so blessed to have found you 🍀",
    "You're my everything, my world, my life 🌍",
    "Every day I love you more than ever 💖",
    "You're the most amazing person I've ever met 👑",
    "Your love makes me feel invincible ⚡",
    "I'm so lucky to have you in my life 💕",
    "You're my perfect partner, my soulmate 💑",
    "Every moment with you is precious 💎",
    "You're my dream come true, my reality 💫",
    "Your love gives me wings to fly 🦋",
    "I'm so grateful for every day with you 🙏",
    "You're my happy place, my safe haven 🏰",
    "Every day I fall deeper in love with you 💖",
    "You're my perfect match, my everything 💝",
    "Your love makes me feel complete 🎯",
    "I'm so blessed to have you in my life 🙌",
    "You're the most beautiful soul I've ever known ✨",
    "Every moment with you is pure bliss 😌",
    "You're my love, my life, my forever 💕"
  ];

  useEffect(() => {
    // Set initial message
    setCurrentMessage(loveMessages[0]);
    setMessageHistory([loveMessages[0]]);
    setMessageCount(1);

    // Send a new message every minute
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loveMessages.length);
      const newMessage = loveMessages[randomIndex];
      setCurrentMessage(newMessage);
      setMessageHistory(prev => [...prev, newMessage]); // Keep all messages
      setMessageCount(prev => prev + 1);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Heart Button */}
      <div className="floating-heart-button" onClick={toggleChat}>
        <div className="heart-icon">💕</div>
        {messageCount > 0 && (
          <div className="message-badge">{messageCount}</div>
        )}
        <div className="heart-tooltip">Click to see love messages 💕</div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="love-chat">
          <div className="chat-header">
            <span className="chat-title">💕 Love Messages ({messageCount}) 💕</span>
            <button 
              className="chat-close" 
              onClick={toggleChat}
            >
              ×
            </button>
          </div>
          
          <div className="chat-messages">
            {messageHistory.length === 0 ? (
              <div className="no-messages">
                <div className="no-messages-icon">💕</div>
                <p>Waiting for love messages...</p>
                <p>New message every minute!</p>
              </div>
            ) : (
              messageHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`chat-message ${index === messageHistory.length - 1 ? 'current' : ''}`}
                >
                  <div className="message-bubble">
                    <span className="message-text">{message}</span>
                    <div className="message-hearts">
                      <span>💕</span>
                      <span>💖</span>
                      <span>💝</span>
                    </div>
                    <div className="message-time">
                      Message #{index + 1}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="chat-footer">
            <div className="love-indicator">
              <span className="pulse-heart">💓</span>
              <span className="indicator-text">
                {messageCount > 0 
                  ? `Sending love every minute... (${messageCount} messages sent)`
                  : "Sending love every minute..."
                }
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoveChat;
