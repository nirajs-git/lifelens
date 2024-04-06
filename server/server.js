const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const app = express();
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const mailRoutes = require('./routes/mailRoutes');
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

const PORT = process.env.PORT || 8080; // Access environment variable
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Route for user-related endpoints
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patient', patientRoutes);
app.use('/api/v1/mail', mailRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});