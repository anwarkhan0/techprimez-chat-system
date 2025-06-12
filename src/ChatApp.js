// frontend/src/ChatApp.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the backend server
const socket = io('http://localhost:3001');

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

useEffect(() => {
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);  // Debug log for incoming messages
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  socket.on('previous messages', (msgHistory) => {
    console.log('Previous messages:', msgHistory);  // Debug log for previous messages
    setMessages(msgHistory);
  });

  return () => {
    socket.off('chat message');
    socket.off('previous messages');
  };
}, []);

const handleSendMessage = () => {
  if (message.trim()) {
    const msgObj = {
      username: username || 'Anonymous',
      message: message
    };
    console.log('Sending message:', msgObj);  // Debug log for the sent message
    socket.emit('chat message', msgObj); // Emit message to the server
    setMessage('');
  }
};


  return (
    <div className="chat-container" style={{ maxWidth: 500, margin: '40px auto', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 2px 8px #eee', background: '#f0f0f0', display: 'flex', flexDirection: 'column', height: '80vh' }}>
      <div className="chat-header" style={{ background: '#075e54', color: '#fff', padding: '16px', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <h2 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>Techprimez Chat</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginTop: 10, padding: 8, borderRadius: 4, border: 'none', width: '100%' }}
        />
      </div>
      <div className="message-container" style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#ece5dd', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message"
            style={{
              alignSelf: msg.username === username ? 'flex-end' : 'flex-start',
              background: msg.username === username ? '#dcf8c6' : '#fff',
              color: '#222',
              borderRadius: 8,
              marginBottom: 10,
              padding: '8px 14px',
              maxWidth: '75%',
              boxShadow: '0 1px 2px #ccc',
              fontSize: 16,
              position: 'relative',
              minWidth: 60
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 13, color: '#075e54', marginRight: 6 }}>{msg.username}</span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="input-container" style={{ display: 'flex', padding: 16, background: '#f7f7f7', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 20, border: '1px solid #ccc', outline: 'none', fontSize: 16 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{ marginLeft: 10, background: '#25d366', color: '#fff', border: 'none', borderRadius: 20, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 2px #ccc' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
