// backend/models/Message.js
const mongoose = require('mongoose');

// Define a schema for the chat message
const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
