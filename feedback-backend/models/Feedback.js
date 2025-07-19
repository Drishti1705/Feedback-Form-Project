const mongoose = require('mongoose');

const unitDetailSchema = new mongoose.Schema({
  id: String,
  installationDate: String,
  functionFeedback: String,
  speedFeedback: String, // for Fill Pac
  clampingIssues: String, // for Fill Pac
  beltSlippage: String, // for Bucket Elevator
  maintenanceFeedback: String, // for Bucket Elevator
  suggestions: String,
  spouts: String,
  elevatorType: String,
  documents: [String] 
});

const feedbackSchema = new mongoose.Schema({
  name:String,
    number: String,
    email: String,
    designation: String,
    country: String,
    company: String,
    othercementcompany: String,
    plantlocation:String,

    selectedProducts: [String],
   
    fillPac: {
    totalUnits: Number,
    monitoredUnits: Number,
    unitDetails: [unitDetailSchema],
  },

  // Section C: Bucket Elevator
  bucketElevator: {
    totalUnits: Number,
    monitoredUnits: Number,
    unitDetails: [unitDetailSchema],
  },

    implementationunderstanding: String,
    failureIdentification:String,
    training: String,
    dashboardUsability: String,
    maintenanceImpact: String,
    downtimeReduction: String,
    supportExperience: String,
    suggestions: String

    });
  

module.exports = mongoose.model('Feedback', feedbackSchema);

  
    
   
 

   
  