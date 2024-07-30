const express = require('express');
const {
  getAvailableJobs,
  getAvailableJobsByCategory,
  getJobById,
  createTrabajo,
} = require('../controllers/trabajos.controller');
const router = express.Router();

// Definir la ruta para obtener todos los trabajos con estado [en busqueda]
router.get('/jobsMarketPlace', getAvailableJobs); // TODO: PROBAR

// Definir la ruta para obtener todos los trabajos con estado [en busqueda] POR CATEGORIA
router.get('/jobsMarketPlace/category/:categoriaId', getAvailableJobsByCategory); // TODO: PROBAR

// Definir la ruta para obtener todos los trabajos con estado [en busqueda] POR CATEGORIA
router.get('/:trabajoId', getJobById); // TODO: PROBAR

//Definir la ruta para crear el trabajo
router.post('/', createTrabajo); // TODO: PROBAR

module.exports = router;
