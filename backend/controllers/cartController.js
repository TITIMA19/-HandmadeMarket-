const Cart = require('../models/cart').default;
// exports.addIemtocart=  async (req,res) => {
//      const { userId, itemId, itemType } = req.body; // Destructure required fields

//     // Check if all required fields are present
//     if (!userId || !itemId || !itemType) {
//         return res.status(400).json({ error: "userId, itemId, and itemType are required." });
//     }

//     const item = new Cart({ userId, itemId, itemType }); // Create a new Cart instance

//     try {
//         const savedItem = await item.save(); // Save the item
//         res.status(200).json(savedItem); // Respond with the saved item
//     } catch (err) {
//         console.error("Error saving item to cart:", err);
//         res.status(500).json({ error: err.message }); // Handle errors
//     }
// };

// Get user's cart
const getCart = async (req, res) => {
    // // Retrieve the token from the request headers instead of localStorage
    // const token = req.headers['authorization']?.split(' ')[1]; // Assumes Bearer token
    // const userId = req.user.id; // Assuming you set req.user in middleware
    // // Check if userId is present
    // if (!userId) {
    //     return res.status(400).json({ error: "User ID is required." });
    // }
    // try {
    //     // Fetch the user's cart from the database
    //     const cart = await Cart.findOne({ user: userId });
        
    //     // If no cart is found, return a 404 status
    //     if (!cart) {
    //         return res.status(404).json({ message: "Cart not found." });
    //     }
        
    //     // Return the cart with a 200 status
    //     res.status(200).json(cart);
    // } catch (err) {
    //     // Log the error for debugging purposes
    //     console.error("Error fetching cart:", err);
    //     // Return a generic error message to the client
    //     res.status(500).json({ error: "An error occurred while fetching the cart." });
    // }
    const cartItems = await Cart.find({ user: req.params.userId }).populate("product");
  res.json(cartItems);
};
// Add item (product or material) to cart
// routes/cart.js
const getadd = async (req, res) => {
    // const { userId, cartItems } = req.body; // Get values from the request body
    // if (!userId || !cartItems || !Array.isArray(cartItems)) {
    //     return res.status(400).json({ error: "userId and cartItems are required." });
    // }
    // try {
    //     // Find the cart for the user
    //     let cart = await Cart.findOne({ user: userId });

    //     if (!cart) {
    //         // Create a new cart if it doesn't exist
    //         cart = new Cart({ user: userId, cartItems: [] });
    //     }

    //     // Add or update items in the cart
    //     cartItems.forEach(item => {
    //         // Ensure each item has the required fields
    //         if (!item.type || !item.item) {
    //             return res.status(400).json({ error: "Each cart item must include type and item." });
    //         }

    //         // Find existing item in the cart
    //         const existingItemIndex = cart.cartItems.findIndex(cartItem => cartItem.item.toString() === item.item);
    //         if (existingItemIndex > -1) {
    //             // Update existing item quantity
    //             cart.cartItems[existingItemIndex].quantity += item.quantity;
    //         } else {
    //             // Add new item to the cart
    //             cart.cartItems.push(item);
    //         }
    //     });

    //     // Save the cart
    //     await cart.save();

    //     res.status(200).json(cart);
    // } catch (err) {
    //     console.error("Error adding items to cart:", err);
    //     res.status(500).json({ error: err.message });
    // }
    const { userId, productId, quantity } = req.body;

  const existing = await Cart.findOne({ user: userId, product: productId });

  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.json({ message: "Updated quantity" });
  }

  const newCartItem = new Cart({
    user: userId,
    product: productId,
    quantity
  });

  await newCartItem.save();
  res.json({ message: "Product added to cart" });
};
// Update item quantity
const updateCart = async (req, res) => {
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
const getCartCount = async (req, res) => {
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
 getadd,
  updateCart,
  removeFromCart,
  clearCart,
  getCartCount
};
