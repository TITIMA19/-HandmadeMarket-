const express = require('express');
const router = express.Router();
const { createOrder , getUserOrders, createCheckoutSession } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware'); // si tu protèges la route

router.post('/', auth, createOrder);
router.get('/user', auth, getUserOrders);
router.post('/create-checkout-session', createCheckoutSession);
module.exports = router;
     