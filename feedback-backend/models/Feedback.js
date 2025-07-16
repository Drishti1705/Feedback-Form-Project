const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  designation: String,
  country: String,
  company: String,
  othercementcompany: String, // optional — only if needed

  // Feedback fields
  installationQuality: String,
  parameterAccuracy: String,
  dataReliability: String,
  dashboardUsability: String,
  maintenanceImpact: String,
  downtimeReduction: String,
  supportExperience: String,
  suggestions: String,
  rating: Number,
  feedback: String,

  // Product-specific fields
  selectedProducts: [String],

  // Fill Pac
  fillPacFeedback: String,
  fillpacinstallation: String,
  fillPacSpeed: String,
  fillPacClampingIssues: String,
  fillPacSuggestions: String,

  // Bucket Elevator
  bucketElevatorFeedback: String,
  bucketinstallation: String,
  bucketSpillage: String,
  bucketLiftRating: String,
  bucketSuggestions: String,
});


module.exports = mongoose.model('Feedback', feedbackSchema);
