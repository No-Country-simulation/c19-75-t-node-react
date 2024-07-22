const express = require('express');
const { getUserById } = require('../controllers/user.controller');
const router = express.Router();

// Definir la ruta para obtener un usuario por ID
router.get('/:id', getUserById);

module.exports = router;