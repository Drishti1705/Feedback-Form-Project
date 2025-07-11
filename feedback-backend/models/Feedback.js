// backend/models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  designation: String,
  country: String,
  company: String,
  installation: String,
  products: [String],
  details: [String],
  users: [String],
  installationQuality: String,
  parameterAccuracy: String,
  dataReliability: String,
  dashboardUsability: String,
  maintenanceImpact: String,
  downtimeReduction: String,
  supportExperience: String,
  suggestions: String,
  rating: String,
  feedback: String,
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
