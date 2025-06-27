// In your routes file
const cartController = require('./controllers/cartController');

router.get('/cart/:userId', cartController.getCart);
router.post('/cart/:userId/add', cartController.addToCart);
router.put('/cart/:userId/update/:productId', cartController.updateCartItem);
router.delete('/cart/:userId/remove/:productId', cartController.removeFromCart);
router.delete('/cart/:userId/clear', cartController.clearCart);
router.get('/cart/:userId/count', cartController.getCartItemCount);