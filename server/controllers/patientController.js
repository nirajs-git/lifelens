const Patient = require('../models/patient');

async function addPatient(req, res) {
    try {
        // Extract patient data from request body
        const {
            fname,
            lname,
            age,
            gender,
            dob,
            phone,
            email,
            address,
            bloodType,
            allergies,
            bmi,
            bloodPressure_systolic,
            bloodPressure_diastolic,
            cholesterolLevel,
            smokingStatus,
            diabetesStatus,
            heartDiseaseStatus,
            exerciseFrequency,
            alcoholConsumption,
            familyHistoryOfHeartDisease,
            familyHistoryOfDiabetes,
            familyHistoryOfHypertension,
            dietaryHabits,
            stressLevel,
            sleepDuration,
            medicationUsage,
            // Blood Test Data
            hemoglobinLevel,
            whiteBloodCellCount,
            redBloodCellCount,
            plateletCount,
            meanCorpuscularVolume,
            meanCorpuscularHemoglobin,
            meanCorpuscularHemoglobinConcentration,
            neutrophilCount,
            lymphocyteCount,
            monocyteCount,
            eosinophilCount,
            basophilCount
        } = req.body;

        const existingPatient = await Patient.findOne({ email });

        if (existingPatient) {
            return res.status(400).json({ emailExistsError: true });
        }

        // Create new patient
        const newPatient = new Patient({
            fname,
            lname,
            age,
            gender,
            dob,
            phone,
            email,
            address,
            bloodType,
            allergies,
            bmi,
            bloodPressure_systolic,
            bloodPressure_diastolic,
            cholesterolLevel,
            smokingStatus,
            diabetesStatus,
            heartDiseaseStatus,
            exerciseFrequency,
            alcoholConsumption,
            familyHistoryOfHeartDisease,
            familyHistoryOfDiabetes,
            familyHistoryOfHypertension,
            dietaryHabits,
            stressLevel,
            sleepDuration,
            medicationUsage,
            // Blood Test Data
            hemoglobinLevel,
            whiteBloodCellCount,
            redBloodCellCount,
            plateletCount,
            meanCorpuscularVolume,
            meanCorpuscularHemoglobin,
            meanCorpuscularHemoglobinConcentration,
            neutrophilCount,
            lymphocyteCount,
            monocyteCount,
            eosinophilCount,
            basophilCount
        });

        // Save the patient record
        await newPatient.save();

        // Return success response
        res.status(201).json({ successful: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAllPatients(req, res) {
    try {
        // Fetch all patients from the database
        const patients = await Patient.find();

        // Return the list of patients in the response
        res.status(200).json(patients);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updatePatient(req, res) {
    try {
        // Extract patient data from request body
        const {
            id, // Assuming you have a unique identifier for each patient, like _id
            fname,
            lname,
            age,
            gender,
            dob,
            phone,
            email,
            address,
            bloodType,
            allergies,
            bmi,
            bloodPressure_systolic,
            bloodPressure_diastolic,
            cholesterolLevel,
            smokingStatus,
            diabetesStatus,
            heartDiseaseStatus,
            exerciseFrequency,
            alcoholConsumption,
            familyHistoryOfHeartDisease,
            familyHistoryOfDiabetes,
            familyHistoryOfHypertension,
            dietaryHabits,
            stressLevel,
            sleepDuration,
            medicationUsage,
            // Blood Test Data
            hemoglobinLevel,
            whiteBloodCellCount,
            redBloodCellCount,
            plateletCount,
            meanCorpuscularVolume,
            meanCorpuscularHemoglobin,
            meanCorpuscularHemoglobinConcentration,
            neutrophilCount,
            lymphocyteCount,
            monocyteCount,
            eosinophilCount,
            basophilCount
        } = req.body;

        const existingPatient = await Patient.findOne({ email });

        if (!existingPatient) {
            return res.status(400).json({ emailNotExistsError: true });
        }

        // Update patient data
        existingPatient.fname = fname;
        existingPatient.lname = lname;
        existingPatient.age = age;
        existingPatient.gender = gender;
        existingPatient.dob = dob;
        existingPatient.phone = phone;
        existingPatient.email = email;
        existingPatient.address = address;
        existingPatient.bloodType = bloodType;
        existingPatient.allergies = allergies;
        existingPatient.bmi = bmi;
        existingPatient.bloodPressure_systolic = bloodPressure_systolic;
        existingPatient.bloodPressure_diastolic = bloodPressure_diastolic;
        existingPatient.cholesterolLevel = cholesterolLevel;
        existingPatient.smokingStatus = smokingStatus;
        existingPatient.diabetesStatus = diabetesStatus;
        existingPatient.heartDiseaseStatus = heartDiseaseStatus;
        existingPatient.exerciseFrequency = exerciseFrequency;
        existingPatient.alcoholConsumption = alcoholConsumption;
        existingPatient.familyHistoryOfHeartDisease = familyHistoryOfHeartDisease;
        existingPatient.familyHistoryOfDiabetes = familyHistoryOfDiabetes;
        existingPatient.familyHistoryOfHypertension = familyHistoryOfHypertension;
        existingPatient.dietaryHabits = dietaryHabits;
        existingPatient.stressLevel = stressLevel;
        existingPatient.sleepDuration = sleepDuration;
        existingPatient.medicationUsage = medicationUsage;
        // Blood Test Data
        existingPatient.hemoglobinLevel = hemoglobinLevel;
        existingPatient.whiteBloodCellCount = whiteBloodCellCount;
        existingPatient.redBloodCellCount = redBloodCellCount;
        existingPatient.plateletCount = plateletCount;
        existingPatient.meanCorpuscularVolume = meanCorpuscularVolume;
        existingPatient.meanCorpuscularHemoglobin = meanCorpuscularHemoglobin;
        existingPatient.meanCorpuscularHemoglobinConcentration = meanCorpuscularHemoglobinConcentration;
        existingPatient.neutrophilCount = neutrophilCount;
        existingPatient.lymphocyteCount = lymphocyteCount;
        existingPatient.monocyteCount = monocyteCount;
        existingPatient.eosinophilCount = eosinophilCount;
        existingPatient.basophilCount = basophilCount;

        // Save the updated patient record
        await existingPatient.save();

        // Return success response
        res.status(200).json({ successful: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deletePatientByEmail(req, res) {
    try {
        // Extract email from request parameters
        const { email } = req.body;

        // Find the patient by email
        const existingPatient = await Patient.findOne({ email });

        if (!existingPatient) {
            return res.status(404).json({ emailNotExistsError: true });
        }

        // Delete the patient
        await existingPatient.deleteOne();

        // Return success response
        res.status(200).json({ successful: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addPatient,
    getAllPatients,
    updatePatient,
    deletePatientByEmail
};
