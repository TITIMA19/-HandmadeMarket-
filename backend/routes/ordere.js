// In your routes file
const orderController = require('./controllers/orderController');

router.get('/order/:userId', orderController.getorder);
router.post('/order/:userId/add', orderController.addToorder);
router.put('/order/:userId/update/:itemId/:itemType', orderController.updateorderItem);
router.delete('/order/:userId/remove/:itemId/:itemType', orderController.removeFromorder);
router.delete('/order/:userId/clear', orderController.clearorder);
router.get('/order/:userId/count', orderController.getorderItemCount);