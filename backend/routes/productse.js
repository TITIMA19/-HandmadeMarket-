const express = require('express');

const productsController = require('../controllers/productsController'); // Adjust the path as needed

const router = express.Router();



// User routes
router.post('/', productsController.createProduct);
router.get("/", productsController.getAllProducts);
router.get("/:productId", productsController.getProductsById);
router.put("/:productId", productsController.updateProduct);
router.delete("/:productId", productsController.deleteProduct);

module.exports = router;