const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  designation: String,
  country: String,
  company: String,
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

  // ✅ ADD THESE
  selectedProducts: [String],
  fillPacFeedback: String,
  fillpacinstallation: String,
  bucketElevatorFeedback: String,
  bucketinstallation: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);
