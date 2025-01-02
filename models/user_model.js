const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'Username cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  token: {
    type: String,
    required: false,
    trim: true,
  },
  refreshToken: {
    type: String,
    required: false,
    trim: true,
  }
}, {
  timestamps: true
});

const user = mongoose.model('users', userSchema);

module.exports = user;
