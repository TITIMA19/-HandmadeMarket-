// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'products.itemType'
  },
  itemType: {
    type: String,
    required: true,
    enum: ['product', 'material']
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
