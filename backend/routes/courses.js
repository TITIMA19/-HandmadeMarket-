const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
// const verifyToken = require('../middleware/verifyToken');
// const verifyAdmin = require('../middleware/verifyAdmin');

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Admin protected routes
router.post('/',
    //  verifyToken, verifyAdmin,
     courseController.createCourse);
router.put('/:id',
    //  verifyToken, verifyAdmin,
    
     courseController.updateCourse);
router.delete('/:id',
    //  verifyToken, verifyAdmin,
     courseController.deleteCourse);

module.exports = router;
