const mongoose = require('mongoose');

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
      fillPacFeedback: {
        type: Object,
        default: {}
      },
      fillpacinstallation: String,
      fillPacSpeed:String,
      fillPacClampingIssues: String,
      fillPacSuggestions: String},

    bucketElevator: {  
    bucketElevatorFeedback:{
      type: Object,
      default: {}
    },
    bucketinstallation: String,
    bucketSpillage: String,
    bucketLiftRating: String,
    bucketSuggestions: String,
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

  
    
   
 

   
  