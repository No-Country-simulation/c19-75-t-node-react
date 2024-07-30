const express = require('express');
const {
    getAvailableJobs,
    getAvailableJobsByCategory,
    getJobById,
    createTrabajo
} = require('../controllers/trabajos.controller');
const router = express.Router();

// Definir la ruta para obtener todos los trabajos con estado [en busqueda]
router.get('/jobsMarketPlace', getAvailableJobs)

// Definir la ruta para obtener todos los trabajos con estado [en busqueda] POR CATEGORIA
router.get('/jobsMarketPlace/category/:categoriaId', getAvailableJobsByCategory);

// Definir la ruta para obtener todos los trabajos con estado [en busqueda] POR CATEGORIA
router.get('/:trabajoId', getJobById);

//Definir la ruta para crear el trabajo
router.post('/', createTrabajo);



module.exports = router;
