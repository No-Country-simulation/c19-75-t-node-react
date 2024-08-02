const express = require('express');
const {
    createPostulacion,
    getAllPostulacionesByTrabajoId,
    getEstoyPostulado
} = require('../controllers/postulaciones.controller');
const router = express.Router();

//DEfinir la ruta para crear la postulación
router.post('/', createPostulacion); // TODO: PROBAR

//DEfinir la ruta para obtener las postulaciones de un trabajo en especifico
router.get('/porTrabajo/:trabajoId/:userType', getAllPostulacionesByTrabajoId);

//DEfinir la ruta para saber si estoy postulado o no a un trabajo
router.get('/postulado/:trabajoId/:profesionalId', getEstoyPostulado);

module.exports = router;
