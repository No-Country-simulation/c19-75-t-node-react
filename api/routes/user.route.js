const express = require('express');
const {
  getUserById,
  getAllProfessionals,
  getProfessionalsByCategory,
  getUsersByLocation
} = require('../controllers/user.controller');
const router = express.Router();

// Definir la ruta para obtener un usuario por ID
router.get('/usuarios/:userId', getUserById);

// Definir la ruta para obtener todos los profesionales
router.get('/trabajadores', getAllProfessionals);

// Definir la ruta para obtener todos los profesionales filtrados por categoria
router.get('/trabajadores/categorias/:id', getProfessionalsByCategory);

// Definir la ruta para filtrar usuarios por provincia y ciudad
router.get('/ubicacion', getUsersByLocation);

module.exports = router;
