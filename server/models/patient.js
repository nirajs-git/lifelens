const mongoose = require('mongoose');

// Define Patient Schema
const patientSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    required: true
  },
  allergies: {
    type: String,
    required: true
  },
  bmi: {
    type: Number,
    required: true
  },
  bloodPressure_systolic: {
    type: Number,
    required: true
  },
  bloodPressure_diastolic: {
    type: Number,
    required: true
  },
  cholesterolLevel: {
    type: Number,
    required: true
  },
  smokingStatus: {
    type: String,
    required: true
  },
  diabetesStatus: {
    type: String,
    required: true
  },
  heartDiseaseStatus: {
    type: String,
    required: true
  },
  exerciseFrequency: {
    type: Number,
    required: true
  },
  alcoholConsumption: {
    type: Number,
    required: true
  },
  familyHistoryOfHeartDisease: {
    type: String,
    required: true
  },
  familyHistoryOfDiabetes: {
    type: String,
    required: true
  },
  familyHistoryOfHypertension: {
    type: String,
    required: true
  },
  dietaryHabits: {
    type: String,
    required: true
  },
  stressLevel: {
    type: Number,
    required: true
  },
  sleepDuration: {
    type: Number,
    required: true
  },
  medicationUsage: {
    type: String,
    required: true
  },
  smokingStatus: {
    type: String,
    required: true
  },
  diabetesStatus: {
    type: String,
    required: true
  },
  heartDiseaseStatus: {
    type: String,
    required: true
  },
  familyHistoryOfHeartDisease: {
    type: String,
    required: true
  },
  familyHistoryOfDiabetes: {
    type: String,
    required: true
  },
  familyHistoryOfHypertension: {
    type: String,
    required: true
  },
  medicationUsage: {
    type: String,
    required: true
  },
  // Blood Test Data
  hemoglobinLevel: {
    type: Number,
    required: true
  },
  whiteBloodCellCount: {
    type: Number,
    required: true
  },
  redBloodCellCount: {
    type: Number,
    required: true
  },
  plateletCount: {
    type: Number,
    required: true
  },
  meanCorpuscularVolume: {
    type: Number,
    required: true
  },
  meanCorpuscularHemoglobin: {
    type: Number,
    required: true
  },
  meanCorpuscularHemoglobinConcentration: {
    type: Number,
    required: true
  },
  neutrophilCount: {
    type: Number,
    required: true
  },
  lymphocyteCount: {
    type: Number,
    required: true
  },
  monocyteCount: {
    type: Number,
    required: true
  },
  eosinophilCount: {
    type: Number,
    required: true
  },
  basophilCount: {
    type: Number,
    required: true
  }
});

// Create Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;