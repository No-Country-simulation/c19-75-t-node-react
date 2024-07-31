const express = require('express');
const {
  getBestTrabajos,
  getAvailableJobs,
  getAvailableJobsByCategory,
  getJobById,
  createTrabajo,

} = require('../controllers/trabajos.controller');
const router = express.Router();

// Definir la ruta para obtener todos los trabajos con estado [en busqueda]
router.get('/jobsMarketPlace', getAvailableJobs); // TODO: Listo


// Definir la ruta para obtener 10 trabajos con la mejor puntuación para el slider
router.get('/mejores', getBestTrabajos);

module.exports = router;

// Definir la ruta para obtener todos los trabajos con estado [en busqueda] POR CATEGORIA
router.get('/jobsMarketPlace/category/:categoriaId', getAvailableJobsByCategory); // TODO: Listo

// Definir la ruta para obtener todos los trabajos con estado [en busqueda] POR CATEGORIA
router.get('/:trabajoId', getJobById); // TODO: PROBAR

//Definir la ruta para crear el trabajo
router.post('/', createTrabajo); // TODO: PROBAR

module.exports = router;

