const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  visitDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Visitor', visitorSchema);
