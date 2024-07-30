const express = require('express');
const {
    getAvailableJobs,
    createTrabajo
} = require('../controllers/trabajos.controller');
const router = express.Router();

// Definir la ruta para obtener todos los trabajos con estado [en busqueda]
router.get('/jobsMarketPlace', getAvailableJobs)

//DEfinir la ruta para crear el trabajo
router.post('/', createTrabajo);

module.exports = router;
