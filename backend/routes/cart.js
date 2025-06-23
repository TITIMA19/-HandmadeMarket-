const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// User routes
router.post("/", cartController.createCart);
router.get("/", cartController.getAllCart);
router.get("/:cartId", cartController.getCartById);
router.put("/:cartId", cartController.updateCart);
router.delete("/:cartId", cartController.deleteCart);

module.exports = router;