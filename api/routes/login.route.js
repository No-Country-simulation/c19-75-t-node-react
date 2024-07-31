const express = require('express');
const router = express.Router();
const { isEmailRegistered } = require('../controllers/login.controller');
const { login } = require('../controllers/login.controller');


router.post('/check-email', isEmailRegistered);
router.post('/login', login);


module.exports = router;