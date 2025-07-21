const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: String,
   category: { 
    type: String, 
    enum: ['Clay','Leather','Wood',"workshop"], 
    required: true 
  },
  description: String,
  price: Number,
  imageBase64: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Material', materialSchema);
