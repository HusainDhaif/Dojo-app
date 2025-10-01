const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  // Optional profile fields
  fullName: {
    type: String,
  },
  bio: {
    type: String,
  },
  belt: {
    type: String,
    enum: ['white', 'orange', 'orange 2', 'blue', 'blue 2', 'yellow', 'yellow 2', 'green', 'green 2', 'brown', 'brown 2', 'black'],
  },
  age: {
    type: Number,
    min: 0,
  },
  weightKg: {
    type: Number,
    min: 0,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
