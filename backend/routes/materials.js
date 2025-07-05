const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
// const verifyToken = require('../middleware/verifyToken');
// const verifyAdmin = require('../middleware/verifyAdmin');

// Public routes
router.get('/', materialController.getAllMaterials);
router.get('/:id', materialController.getMaterialById);

// Admin protected routes
router.post('/',
    //  verifyToken, verifyAdmin,
      materialController.createMaterial);
router.put('/:id', 
    // verifyToken, verifyAdmin,
     materialController.updateMaterial);
router.delete('/:id', 
    // verifyToken, verifyAdmin, 
    materialController.deleteMaterial);

module.exports = router;
