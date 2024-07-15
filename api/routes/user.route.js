const express = require('express');
//Se crea una instancia del enrutador de Express. Esta instancia router se utilizará para definir rutas específicas para los usuarios.
const router = express.Router();

// Se define una ruta GET en la ruta raíz '/' del enrutador de usuarios.
//Cuando se recibe una solicitud GET en esta ruta, se envía la respuesta 'Ruta de usuarios'.
router.get('/', (req, res) => {
    res.send('Ruta de usuarios');
});

module.exports = router;



//Este archivo define un módulo de enrutamiento específico para las rutas relacionadas con los usuarios.