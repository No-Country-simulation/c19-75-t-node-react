const express = require('express');
const router = express.Router();
const { isEmailRegistered } = require('../controllers/login.controller');

router.post('/check-email', isEmailRegistered);

module.exports = router;