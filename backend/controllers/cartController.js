const Cart = require('../models/cart');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne(
    { userId: req.user.id }
);
  res.json(cart || { items: [] });
};

exports.addToCart = async (req, res) => {
  const { productId, itemType, quantity, price } = req.body;

  let cart = await Cart.findOne(
    { userId: req.user.id });
  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [] });
  }

  // Check if item exists
  const existingItem = cart.items.find(i => i.productId.toString() === productId && i.itemType === itemType);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, itemType, quantity, price });
  }

  await cart.save();
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { productId, itemType } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(i => !(i.productId.toString() === productId && i.itemType === itemType));
  await cart.save();
  res.json(cart);
};
