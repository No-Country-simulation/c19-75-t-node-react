const sql = require('mssql'); // módulo mssql para interactuar con SQL server con node.js
const dotenv = require('dotenv'); // se utiliza para cargar variables de entorno desde un archivo .env

dotenv.config(); // carga las variables de entorno definidas en .env

// Se define un objeto config que contiene la configuración necesaria para conectarse a SQL Server
const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: process.env.SQL_ENCRYPT === 'true' // opción para encriptar la conexión
    }
};

// Función de Conexión a la Base de Datos
const connectDB = async () => {
    try {
        const pool = await sql.connect(config);
        console.log('SQL Server connected...');
        return pool; // Retorna el pool de conexiones
    } catch (err) {
        console.error('Database connection failed: ', err);
        process.exit(1);
    }
};

module.exports = connectDB;