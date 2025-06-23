const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// User routes
router.post("/", productsController.createProducts);
router.get("/", productsController.getAllProducts);
router.get("/:productId", productsController.getProductsById);
router.put("/:productId", productsController.updateProduct);
router.delete("/:productId", productsController.deleteProduct);

module.exports = router;