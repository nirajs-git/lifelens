const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
}, {
  timestamps: true // Add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
