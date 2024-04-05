const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; // Access another environment variable

async function signup(req, res) {
    try {
        // Extract user data from request body
        const { fullName, hospitalName, degree, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ emailExistsError: true });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName,
            hospitalName,
            degree,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Return success response
        res.status(201).json({ successful: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function signin(req, res) {
    try {
        // Extract user data from request body
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if passwords match
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Return token in response
        res.status(200).json({ token });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUserDetails(req, res) {
    try {
        // Get user email from decoded token
        const userEmail = req.user.email;

        // Find user by email
        const user = await User.findOne({ email: userEmail });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details
        const userDetails = {
            fullName: user.fullName,
            hospitalName: user.hospitalName,
            degree: user.degree,
            email: user.email
        };

        // Return user details in response
        res.status(200).json(userDetails);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    signup,
    signin,
    getUserDetails
};