// models/Cart.js
// const mongoose = require('mongoose');

// const CartItemSchema = new mongoose.Schema({
//     type: {
//         type: String,
//         enum: ['Product', 'Material'], // Allowed values
//         required: true
//     },
//     item: {
//         type: mongoose.Schema.Types.ObjectId,
//         refPath: 'cartItems.type', // Dynamic reference
//         required: true
//     },
//     quantity: {
//         type: Number,
//         default: 1
//     },
//     price: {
//         type: Number,
//         required: true
//     }
// });

// const CartSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     cartItems: [CartItemSchema]
// });

// const Cart = mongoose.model('Cart', CartSchema);
// module.exports = Cart;
const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 }
});

const Cart= mongoose.model("Cart", cartSchema);
module.exports =Cart
