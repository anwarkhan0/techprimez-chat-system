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
    <div className="chat-container">
      <div className="chat-header">
        <h2>Techprimez Chat</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
