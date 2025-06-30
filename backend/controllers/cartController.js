const Cart = require('../models/cart');
// const { getProductById } = require('./productsController');
// const { getMaterialById } = require('./MaterialController');
const Product = require('../models/products'); // Adjust model name if needed
const Material = require('../models/materials'); // Adjust model name if needed

// Return material by ID
const getMaterialById = async (id) => {
  return await Material.findById(id);
};

module.exports = {
  getMaterialById
};

// Return product by ID
const getProductById = async (id) => {
  return await Product.findById(id);
};

module.exports = {
  getProductById
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
      await cart.save();
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

// Add item (product or material) to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: 'Missing required data' });
    }

    // Find user's cart or create a new one
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Check if product already in cart
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
      // If product exists, update quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // Else add new product to cart
      cart.products.push({ productId, quantity });
    }

    // Save cart to MongoDB
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update item quantity
const updateCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId, itemType, quantity } = req.body;

    if (!itemId || !itemType || quantity == null || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid item ID, type and quantity are required'
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.products.findIndex(
      item => item.itemId.toString() === itemId && item.itemType === itemType
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity === 0) {
      cart.products.splice(itemIndex, 1);
    } else {
      cart.products[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({ success: true, message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId, itemType } = req.body;

    if (!itemId || !itemType) {
      return res.status(400).json({
        success: false,
        message: 'Item ID and type are required'
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.products = cart.products.filter(
      item => !(item.itemId.toString() === itemId && item.itemType === itemType)
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: `${itemType} removed from cart`,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart',
      error: error.message
    });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
};

// Count total quantity of items in cart
const getCartItemCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ success: true, count: 0 });
    }

    const totalItems = cart.products.reduce((total, item) => total + item.quantity, 0);

    res.status(200).json({ success: true, count: totalItems });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting cart item count',
      error: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartItemCount
};
