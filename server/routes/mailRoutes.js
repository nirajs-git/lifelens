const express = require('express');
const router = express.Router();
const { sendMail } = require('../controllers/mailController');
const authenticateToken = require('../middleware/auth');

router.post('/send', sendMail);

module.exports = router;
