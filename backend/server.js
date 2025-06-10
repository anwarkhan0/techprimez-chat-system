// backend/server.js
require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/Message'); // Import the Message model

const app = express();

app.use(cors());

const server = http.createServer(app);
const socket = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if database connection fails
  });

// Serve static files if needed
app.use(express.static('public'));

// Listen for new client connections
socket.on('connection', (clientSocket) => {
  console.log('A user connected:', clientSocket.id);

  // Listen for chat messages from this client
  clientSocket.on('chat message', (msg) => {
    const newMessage = new Message({
      username: msg.username,
      message: msg.message
    });

    // Log the message to check the structure before saving
    console.log('New message:', newMessage);

    // Save the message to MongoDB
    newMessage.save()
      .then(() => {
        console.log('Message saved successfully');
        socket.emit('chat message', msg);  // Broadcast the message to all clients
      })
      .catch(err => {
        console.log('Error saving message:', err.message);
      });
  });

  // Optionally handle disconnects
  clientSocket.on('disconnect', () => {
    console.log('User disconnected:', clientSocket.id);
  });
});


// Set up server to listen on port 3001
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
