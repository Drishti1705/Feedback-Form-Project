const express = require('express');
const router = express.Router();
const Designation = require('../models/Designation');

// POST /api/designations
router.post('/', async (req, res) => {
  try {
    const { designation } = req.body;

    if (!designation) {
      return res.status(400).json({ error: 'Designation is required' });
    }

    const newDesignation = new Designation({ designation });
    await newDesignation.save();

    res.status(201).json({ message: 'Designation saved' });
  } catch (err) {
    console.error('❌ Error saving designation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/designations
router.get('/', async (req, res) => {
  try {
    const designations = await Designation.find();
    res.status(200).json(designations);
  } catch (err) {
    console.error('❌ Error fetching designations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
