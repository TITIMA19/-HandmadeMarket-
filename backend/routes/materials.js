const express = require('express');

const materialsController = require('../controllers/materialsController'); // Adjust the path as needed

const router = express.Router();

// User routes

router.get("/", materialsController.getAllmaterials);
router.get("/:materialId", materialsController.getmaterialsById);
router.put("/:materialId", materialsController.updateMaterial);
router.delete("/:materialId", materialsController.deleteMaterial);

module.exports = router;