const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: { 
    type: String, 
    enum: ['Accessories', 'Home Decor', 'Fashion'], 
    required: true 
  },
  description: String,
  price: Number,
  imageBase64: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
