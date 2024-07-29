const express = require('express');
const {
    getAllTrabajos,
    getBestTrabajos
} = require('../controllers/trabajos.controller');
const router = express.Router();

// Definir la ruta para obtener todos los trabajos
router.get('/', getAllTrabajos);

// Definir la ruta para obtener 10 trabajos con la mejor puntuación para el slider
router.get('/mejores', getBestTrabajos);

module.exports = router;