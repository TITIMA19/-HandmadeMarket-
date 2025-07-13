// models/AdminProfile.js
const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  vision: String,
  photoBase64: String,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdminProfile', adminProfileSchema);
