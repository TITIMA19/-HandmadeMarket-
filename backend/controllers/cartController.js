const Cart = require('../models/cart');
const { getProductById } = require('./ProductController');
const { getMaterialById } = require('./MaterialController');

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
    const { userId } = req.params;
    const { itemId, itemType, quantity = 1 } = req.body;

    if (!itemId || !itemType) {
      return res.status(400).json({
        success: false,
        message: 'Item ID and itemType are required'
      });
    }

    // 🔍 Validate item existence
    let itemExists = null;
    if (itemType === 'product') {
      itemExists = await getProductById(itemId);
    } else if (itemType === 'material') {
      itemExists = await getMaterialById(itemId);
    }

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: `${itemType} not found`
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingIndex = cart.products.findIndex(
      item => item.itemId.toString() === itemId && item.itemType === itemType
    );

    if (existingIndex > -1) {
      cart.products[existingIndex].quantity += quantity;
    } else {
      cart.products.push({ itemId, itemType, quantity });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: `${itemType} added to cart`,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart',
      error: error.message
    });
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
