const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
// const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/visitors', 
    // authMiddleware, adminMiddleware, 
    statsController.getVisitorCount);

module.exports = router;
