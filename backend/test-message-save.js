// test-save.js
const mongoose = require('mongoose');
const Message = require('./models/Message');  // Ensure this path is correct

const mongoURI = '';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    const newMessage = new Message({
      username: 'TestUser',
      message: 'This is a test message'
    });

    newMessage.save()
      .then(() => {
        console.log('Message saved');
        mongoose.disconnect();
      })
      .catch((err) => {
        console.log('Error saving message:', err.message);
        mongoose.disconnect();
      });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });
