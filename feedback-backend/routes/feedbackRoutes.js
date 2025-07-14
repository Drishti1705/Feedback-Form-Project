// feedback-backend/routes/feedback.js

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { sendOtpEmail } = require('../utils/emailService');
const otpStore = {}; // 🔐 Keeps track of OTPs by email
const Designation = require('../models/Designation.js');

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

// POST /api/designations
router.post('/', async (req, res) => {
 try {
    const { designation } = req.body;
    console.log("🛠️ Received:", designation);

    if (!designation || typeof designation !== 'string') {
      return res.status(400).json({ error: 'Invalid designation' });
    }

    const newDesignation = new Designation({ designation });
    await newDesignation.save();
    
    res.status(200).json({ message: 'Saved' });
  } catch (err) {
    console.error('🔥 Error saving designation:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/designations
router.get('/', async (req, res) => {
  try {
    const designations = await Designation.find().sort({ designation: 1 }); // optional sort
    res.json(designations.map(d => d.designation));
  } catch (err) {
    console.error('Error fetching designations:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;