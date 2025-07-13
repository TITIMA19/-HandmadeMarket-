// routes/adminProfileRoutes.js
const express = require('express');
const router = express.Router();
const AdminProfile = require('../models/AdminProfile');
const verifyAdmin = require('../middleware/verifyAdmin');

// Admin creates/updates profile
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const existing = await AdminProfile.findOne();
    if (existing) {
      await AdminProfile.updateOne({}, req.body);
      return res.json({ message: 'Profile updated' });
    }
    const newProfile = new AdminProfile(req.body);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ error: 'Error saving profile' });
  }
});

// Public route to fetch profile
router.get('/', async (req, res) => {
  try {
    const profile = await AdminProfile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

module.exports = router;
