const express = require('express'); // para crear el servidor web
const cors = require('cors'); // manejo de políticas de CORS
const connectDB = require('./config/db'); // importar la función de conexión a la base de datos
const userRoutes = require('./routes/user.route'); // Importar las rutas de usuario

// Se crea una instancia de la aplicación Express y se configura para usar CORS
const app = express();
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas de usuario
app.use('/api/users', userRoutes); // Utiliza las rutas de usuario bajo el path /api/users

// Variable para almacenar el pool de conexiones
let pool;

// Ruta para verificar el estado de la conexión
app.get('/api/status', (req, res) => {
    if (pool) {
        res.send('Conexión establecida con SQL Server');
    } else {
        res.status(500).send('No se pudo establecer la conexión con SQL Server');
    }
});

// Endpoint para obtener datos desde SQL Server
app.get('/api/data', async (req, res) => {
    try {
        if (!pool) {
            throw new Error('No hay conexión establecida con SQL Server');
        }
        const result = await pool.request().query('SELECT * FROM Usuarios');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching data from SQL Server: ', err);
        res.status(500).send('Server error');
    }
});

// Se define la variable PORT
const PORT = process.env.PORT || 5000;

// Llamar a connectDB al iniciar el servidor
connectDB().then((dbPool) => {
    pool = dbPool; // Almacenar el pool de conexiones
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});





