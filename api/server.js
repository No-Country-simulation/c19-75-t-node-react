const express = require('express'); //para crear el servidor web
const cors = require('cors'); //manejo de políticas de CORS
const sql = require('mssql'); //para conectarse a SQL Server
const userRoutes = require('./routes/user.route'); // Importa las rutas de usuario
const config = require('./config/db')


const app = express(); //instancia de la aplicación Express y configuracion CORS, permite solicitudes de diferentes orígenes.
app.use(cors());

let pool; //Para almacenar el pool de conexiones a la base de datos.


// Middleware para parsear JSON
app.use(express.json());
// Rutas de usuario
app.use('/api/users', userRoutes); // Utiliza las rutas de usuario bajo el path /api/users



// Ruta para verificar el estado de la conexión
//Se define una ruta GET /api/status que verifica si la conexión a la base de datos está establecida.
//Si pool no es null, envía un mensaje indicando que la conexión está establecida.
//Si pool es null, responde con un estado 500 y un mensaje de error.
app.get('/api/status', (req, res) => {
    if (pool) {
        res.send('Conexión establecida con SQL Server');
    } else {
        res.status(500).send('No se pudo establecer la conexión con SQL Server');
    }
});

// Endpoint para obtener datos desde SQL Server
//Se define una ruta GET /api/data que intenta obtener datos desde la base de datos.
//Si pool es null, lanza un error indicando que no hay conexión establecida.
//Si la conexión está establecida, ejecuta una consulta SQL para obtener todos los registros de la tabla Usuarios y envía el resultado en formato JSON.
//Si ocurre un error durante la consulta, se captura y se imprime el error en la consola, y responde con un estado 500 y un mensaje de error.
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


//Se define la variable PORT que toma el valor del puerto desde las variables de entorno o usa el puerto 5000 por defecto.
//Llama a connectDB para establecer la conexión a la base de datos.
//Una vez establecida la conexión, inicia el servidor Express y escucha en el puerto definido, imprimiendo un mensaje en la consola indicando que el servidor está corriendo.
const PORT = process.env.PORT || 5000;

// Llamar a connectDB al iniciar el servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});





