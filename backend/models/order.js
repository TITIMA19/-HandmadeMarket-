const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'items.itemType'
  },
  itemType: {
    type: String,
    enum: ['product', 'material'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
