const express = require('express');
const { createPostulacion } = require('../controllers/postulaciones.controller');
const router = express.Router();

//DEfinir la ruta para crear la postulación
router.post('/', createPostulacion); // TODO: PROBAR

module.exports = router;
