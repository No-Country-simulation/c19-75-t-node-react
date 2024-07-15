const express = require('express'); //para crear el servidor web
const cors = require('cors'); //manejo de políticas de CORS
const sql = require('mssql'); //para conectarse a SQL Server
const dotenv = require('dotenv'); //para cargar variables de entorno desde un archivo .env.
const userRoutes = require('./routes/user.route'); // Importa las rutas de usuario

dotenv.config(); //cargar las variables de entorno


//Se crea una instancia de la aplicación Express y se configura para usar CORS, lo que permite solicitudes de diferentes orígenes.
const app = express();
app.use(cors());


//Se define un objeto config que contiene la configuración necesaria para conectarse a SQL Server,
const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: process.env.SQL_ENCRYPT === 'true'
    }
};

//Se declara una variable pool que almacenará el pool de conexiones a la base de datos.
let pool;

//Función para conectar a la base de datos
//Se define una función asíncrona connectDB que intenta conectarse a SQL Server usando la configuración definida.
//si la conexion es exitosa, el pool de conexiones se almacena en pool.
//Si ocurre un error durante la conexión, pool se establece en null.
const connectDB = async () => {
    try {
        pool = await sql.connect(config);
        console.log('Conexión establecida con SQL Server');
    } catch (err) {
        console.error('Error de conexión:', err.message);
        pool = null;
    }
};

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





