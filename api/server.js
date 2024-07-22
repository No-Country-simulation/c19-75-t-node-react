const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');

const app = express();
app.use(cors());
app.use(express.json());

// Variable para almacenar el pool de conexiones
let pool;

connectDB().then((dbPool) => {
    pool = dbPool;

    // Definir rutas y endpoints
    app.use('/api/users', userRoutes);

    // Ruta de prueba
    // app.get('/api/status', (req, res) => {
    //     if (pool) {
    //         res.send('Conexión establecida con SQL Server');
    //     } else {
    //         res.status(500).send('No se pudo establecer la conexión con SQL Server');
    //     }
    // });

    // Iniciar el servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to database: ', err);
});







