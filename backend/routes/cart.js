const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

router.get('/', authMiddleware,  cartController.getCart);
router.post('/add', authMiddleware,  cartController.addToCart);
router.post('/remove', authMiddleware,  cartController.removeFromCart);

module.exports = router;
