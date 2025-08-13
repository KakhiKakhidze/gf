import React, { useState } from 'react';

const ChatPreview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(3);

  const sampleMessages = [
    "Every moment with you is pure magic ✨",
    "You make my heart smile every single day 💕",
    "Forever yours, always and forever 💑"
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
      background: 'rgba(0,0,0,0.8)',
      padding: '20px',
      borderRadius: '15px',
      color: 'white',
      textAlign: 'center',
      maxWidth: '90vw'
    }}>
      <h2>💕 Love Chat Preview 💕</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>1. Floating Heart Button (Bottom Right)</h3>
        <div style={{
          width: '70px',
          height: '70px',
          background: 'linear-gradient(45deg, #ff6b9d, #e84393)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          boxShadow: '0 10px 30px rgba(255, 107, 157, 0.4)',
          position: 'relative',
          margin: '10px auto'
        }}>
          💕
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#fff',
            color: '#ff6b9d',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            {messageCount}
          </div>
        </div>
        <p>• Always visible in bottom-right corner</p>
        <p>• Shows message count badge</p>
        <p>• Hover shows tooltip: "Click to see love messages 💕"</p>
        <p>• Click to open chat window</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>2. Chat Window (When Opened)</h3>
        <div style={{
          width: '350px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          margin: '10px auto',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(45deg, #ff6b9d, #e84393)',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white'
          }}>
            <span>💕 Love Messages ({messageCount}) 💕</span>
            <button style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            height: '280px',
            overflowY: 'auto'
          }}>
            {sampleMessages.map((message, index) => (
              <div key={index} style={{
                background: 'linear-gradient(45deg, rgba(255, 107, 157, 0.9), rgba(232, 67, 147, 0.9))',
                padding: '15px 20px',
                borderRadius: '20px',
                borderBottomRightRadius: '5px',
                color: 'white',
                marginBottom: '15px',
                boxShadow: '0 5px 15px rgba(255, 107, 157, 0.3)'
              }}>
                <div style={{ marginBottom: '8px' }}>{message}</div>
                <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end', marginBottom: '5px' }}>
                  <span>💕</span>
                  <span>💖</span>
                  <span>💝</span>
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, textAlign: 'right', fontStyle: 'italic' }}>
                  Message #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '15px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem' }}>💓</span>
              <span style={{ opacity: 0.8, fontStyle: 'italic' }}>
                Sending love every minute... ({messageCount} messages sent)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>3. Features</h3>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li>✅ <strong>100 Love Messages</strong> - Rotates randomly every minute</li>
          <li>✅ <strong>Message History</strong> - All messages saved and visible</li>
          <li>✅ <strong>Message Counter</strong> - Shows total messages received</li>
          <li>✅ <strong>Beautiful Animations</strong> - Smooth slide-in, heart beats, glowing effects</li>
          <li>✅ <strong>Responsive Design</strong> - Works on mobile and desktop</li>
          <li>✅ <strong>Glassmorphism</strong> - Modern frosted glass design</li>
          <li>✅ <strong>Auto-send</strong> - New message every 60 seconds</li>
        </ul>
      </div>

      <div>
        <h3>4. How She Uses It</h3>
        <ol style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li>Sees floating heart button in bottom-right corner</li>
          <li>Notices message count badge (shows how many messages)</li>
          <li>Clicks the heart to open chat window</li>
          <li>Scrolls through all her love messages</li>
          <li>Reads romantic messages with heart decorations</li>
          <li>Closes chat to return to floating heart</li>
          <li>New messages arrive every minute automatically</li>
        </ol>
      </div>

      <button 
        onClick={() => window.close()}
        style={{
          background: 'linear-gradient(45deg, #ff6b9d, #e84393)',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '10px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Close Preview
      </button>
    </div>
  );
};

export default ChatPreview;
