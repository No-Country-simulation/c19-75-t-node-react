const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/create-user.controller');

router.post('/', createUser); // TODO: PROBAR

module.exports = router;
