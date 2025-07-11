// feedback-backend/routes/feedback.js

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { sendOtpEmail } = require('../utils/emailService');
const otpStore = {}; // 🔐 Keeps track of OTPs by email
const Designation = require('../models/Designation');

function generateOtp(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString().substring(0, length);
}

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Failed to save feedback' });
  }
});

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = generateOtp(); // ✅ Now this function is defined
  otpStore[email] = otp;

  // Send the OTP using your email logic (e.g., nodemailer)
  try {
    await sendOtpEmail(email, otp); // Assuming you have a function for sending email
    res.status(200).json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email]; // prevent re-use
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.post('/designations', async (req, res) => {
  const { designation } = req.body;
  if (!designation) return res.status(400).send('Designation required');

  try {
    // Save only if not already present
    const existing = await Designation.findOne({ name: designation });
    if (!existing) {
      await Designation.create({ name: designation });
    }
    res.status(201).send('Designation saved');
  } catch (err) {
    console.error('Error saving designation:', err);
    res.status(500).send('Error saving designation');
  }
});

// Add new designation
router.post('/', async (req, res) => {
  const { designation } = req.body;
  if (!designation) return res.status(400).send('Missing designation');

  try {
    const existing = await Designation.findOne({ name: designation });
    if (!existing) {
      await Designation.create({ name: designation });
    }
    res.status(200).send('Designation saved');
  } catch (error) {
    res.status(500).send('Error saving designation');
  }
});

// Fetch all designations
router.get('/', async (req, res) => {
  const designations = await Designation.find({});
  res.json(designations.map(d => d.name));
});

module.exports = router;
