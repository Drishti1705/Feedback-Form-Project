// models/feedback.model.js
const mongoose = require('mongoose');

const fillPacUnitDetailSchema = new mongoose.Schema({
  id: String,
  installationDate: String,
  spouts: String,
  documents: [String],
}, { _id: false });

const bucketElevatorUnitDetailSchema = new mongoose.Schema({
  id: String,
  installationDate: String,
  functionFeedback: String,
  beltSlippage: String,
  maintenanceFeedback: String,
  suggestions: String,
  elevatorType: String,
  documents: [String],
}, { _id: false });

const elevatorFeedbackSchema = new mongoose.Schema({
  implementationunderstanding: String,
  failureIdentification: String,
  training: String,
  dashboardUsability: String,
  maintenanceImpact: String,
  downtimeReduction: String,
  supportExperience: String,
  suggestions: String,
  elevatorType: String
}, { _id: false });

const feedbackSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  designation: String,
  country: String,
  company: String,
  othercementcompany: String,
  plantlocation: String,
  selectedProducts: [String],

  fillPac: {
    totalUnits: Number,
    monitoredUnits: Number,
    unitDetails: [fillPacUnitDetailSchema],

    // ---- Section D (OEE dashboard) ----
    oeeAccuracy: String,
    dataUpdate: String,
    bottleneckHelp: String,
    usefulMetric: String,
    missingFeatures: String,
    missingFeatureDetails: String,
    additionalVisualizations: String,
    alerts: String,
    satisfaction: Number,          // <- you had this in TS, add it here
    additionalComments: String,
    faultIdleTimeHelpful: String,
    bagInfoHelpful: String,
  },

  bucketElevator: {
    totalUnits: Number,
    monitoredUnits: Number,
    unitDetails: [bucketElevatorUnitDetailSchema],
    feedback: elevatorFeedbackSchema
  }
}, { timestamps: true, minimize: false });

module.exports = mongoose.model('Feedback', feedbackSchema);
