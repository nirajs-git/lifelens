const express = require('express');
const router = express.Router();
const { signup, signin, getUserDetails } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/get-user', authenticateToken, getUserDetails);

module.exports = router;
