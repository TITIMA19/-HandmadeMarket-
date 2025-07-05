const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error getting courses' });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error getting course' });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, imageBase64 } = req.body;
    const course = new Course({ title, description, price, imageBase64 });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: 'Error creating course', error: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, price, imageBase64 } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, price, imageBase64 },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: 'Error updating course', error: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting course' });
  }
};
