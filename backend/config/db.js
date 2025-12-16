const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/diarydb';
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // keep process alive for nodemon to show the error and allow fix/restart
    process.exit(1);
  }
}

module.exports = connectDB;
