// In your routes file
const cartController = require('../controllers/cartController');
const express = require('express');
const router = express.Router();
router.post("/cart/:userId/add", cartController.addToCart);
router.get("/cart/:userId", cartController.getCart);
router.put('/cart/:userId/update/:itemId/:itemType', cartController.updateCartItem);
router.delete('/cart/:userId/remove/:itemId/:itemType', cartController.removeFromCart);
router.delete('/cart/:userId/clear', cartController.clearCart);
router.get('/cart/:userId/count', cartController.getCartItemCount);
module.exports = router;