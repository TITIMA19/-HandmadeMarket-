const Order = require('../models/order'); // Adjust path as needed

// Get user's order
const getorder = async (req, res) => {
  try {
    const { userId } = req.params;
    
    let order = await order.findOne({ userId });
    
    if (!order) {
      order = new order({ userId, products: [] });
      await order.save();
    }
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Add product to order
const addToorder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }
    
    let order = await order.findOne({ userId });
    
    if (!order) {
      order = new order({ userId, products: [] });
    }
    
    // Check if product already exists in order
    const existingProductIndex = order.products.findIndex(
      item => item.productId === productId
    );
    
    if (existingProductIndex > -1) {
      // Update quantity if product exists
      order.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to order
      order.products.push({ productId, quantity });
    }
    
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'Product added to order',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product to order',
      error: error.message
    });
  }
};

// Update product quantity in order
const updateorderItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }
    
    const order = await order.findOne({ userId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'order not found'
      });
    }
    
    const productIndex = order.products.findIndex(
      item => item.productId === productId
    );
    
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in order'
      });
    }
    
    if (quantity === 0) {
      // Remove product if quantity is 0
      order.products.splice(productIndex, 1);
    } else {
      // Update quantity
      order.products[productIndex].quantity = quantity;
    }
    
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'order updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
};

// Remove product from order
const removeFromorder = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    
    const order = await order.findOne({ userId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'order not found'
      });
    }
    
    order.products = order.products.filter(
      item => item.productId !== productId
    );
    
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'Product removed from order',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing product from order',
      error: error.message
    });
  }
};

// Clear entire order
const clearorder = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const order = await order.findOne({ userId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'order not found'
      });
    }
    
    order.products = [];
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'order cleared successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing order',
      error: error.message
    });
  }
};

// Get order item count
const getorderItemCount = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const order = await order.findOne({ userId });
    
    if (!order) {
      return res.status(200).json({
        success: true,
        count: 0
      });
    }
    
    const totalItems = order.products.reduce((total, item) => total + item.quantity, 0);
    
    res.status(200).json({
      success: true,
      count: totalItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting order count',
      error: error.message
    });
  }
};

module.exports = {
  getorder,
  addToorder,
  updateorderItem,
  removeFromorder,
  clearorder,
  getorderItemCount
};