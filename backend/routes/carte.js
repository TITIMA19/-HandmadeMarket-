// In your routes file
const cartController = require('../controllers/cartController.js');
const express = require('express');
const {requireSignin,userMiddleware}=require('../commen-middleware/commen-middleware.js')

const router = express.Router();


// router.post("/user/cart/addtocart",requireSignin,userMiddleware,cartController.addIemtocart)
router.post("/cart/addtocart",requireSignin,userMiddleware,cartController. getadd)
router.get("/cart",requireSignin,userMiddleware, cartController.getCart);
router.put('/cart/:userId/update/:itemId/:itemType', cartController.updateCart);
router.delete('/cart/:userId/remove/:itemId/:itemType', cartController.removeFromCart);
router.delete('/cart/:userId/clear', cartController.clearCart);
router.get('/cart/:userId/count', cartController.getCartCount);
module.exports = router;