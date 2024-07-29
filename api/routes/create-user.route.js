const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/create-user.controller');


router.post('/', createUser);

module.exports = router;