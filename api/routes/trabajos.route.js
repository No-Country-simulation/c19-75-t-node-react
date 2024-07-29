const express = require('express');
const {
    getAllTrabajos,
    createTrabajo
} = require('../controllers/trabajos.controller');
const router = express.Router();

// Definir la ruta para obtener todos los trabajos
router.get('/', getAllTrabajos);

//DEfinir la ruta para crear el trabajo
router.post('/', createTrabajo);

module.exports = router;
