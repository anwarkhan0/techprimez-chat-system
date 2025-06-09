// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path')
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'testFile.html'));
})

// Serve static files (if necessary)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Emit the message to all connected clients
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Set up the server to listen on port 3001
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
