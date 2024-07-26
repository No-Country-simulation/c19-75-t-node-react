const express = require('express');
const {
    getAllTrabajos
} = require('../controllers/trabajos.controller');
const router = express.Router();

// Definir la ruta para obtener todos los trabajos
router.get('/', getAllTrabajos);

module.exports = router;