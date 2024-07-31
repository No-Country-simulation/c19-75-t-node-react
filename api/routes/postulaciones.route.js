const express = require('express');
const {
    createPostulacion,
    getAllPostulacionesByTrabajoId
} = require('../controllers/postulaciones.controller');
const router = express.Router();

//DEfinir la ruta para crear la postulación
router.post('/', createPostulacion);

//DEfinir la ruta para obtener las postulaciones de un trabajo en especifico
router.get('/porTrabajo/:trabajoId/:userType', getAllPostulacionesByTrabajoId);

module.exports = router;