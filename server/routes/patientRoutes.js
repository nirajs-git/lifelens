const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authenticateToken = require('../middleware/auth');

// Define routes for patient endpoints
router.get('/get-all', authenticateToken, patientController.getAllPatients);
router.post('/add', authenticateToken, patientController.addPatient);
router.put('/update', authenticateToken, patientController.updatePatient);
router.delete('/delete', authenticateToken, patientController.deletePatientByEmail);
router.post('/upload', authenticateToken, patientController.uploadPatients);

// Export the router
module.exports = router;
