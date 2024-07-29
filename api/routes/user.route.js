const express = require('express');
const {
    getUserById,
    getAllProfessionals,
    getProfessionalsByCategory,
    register
} = require('../controllers/user.controller');
const router = express.Router();

// Definir la ruta para obtener un usuario por ID
router.get('/usuarios/:userId', getUserById);

// Definir la ruta para obtener todos los profesionales
router.get('/trabajadores', getAllProfessionals);

// Definir la ruta para obtener todos los profesionales filtrados por categoria
router.get('/trabajadores/categorias/:id', getProfessionalsByCategory);

router.post('/register', register);



module.exports = router;