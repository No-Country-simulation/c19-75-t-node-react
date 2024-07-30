const express = require('express');
const {
    getAvailableJobs,
    getAvailableJobsByCategory,
    createTrabajo
} = require('../controllers/trabajos.controller');
const router = express.Router();

// Definir la ruta para obtener todos los trabajos con estado [en busqueda]
router.get('/jobsMarketPlace', getAvailableJobs)

// Definir la ruta para obtener todos los trabajos con estado [en busqueda] POR CATEGORIA
router.get('/jobsMarketPlace/category/:categoriaId', getAvailableJobsByCategory);

//DEfinir la ruta para crear el trabajo
router.post('/', createTrabajo);



module.exports = router;
