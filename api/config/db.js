const sql = require('mssql'); //modulo mssql sirve para interactuar con SQL server con node.js
const dotenv = require('dotenv'); //se utiliza para cargar variables de entorno desde un archivo .env 

dotenv.config(); //carga las variables de entorno definidas en .env. Esto permite acceder a esas variables en el código.

//Se define un objeto config que contiene la configuración necesaria para conectarse a SQL Server. Los valores se obtienen de las variables de entorno
const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: process.env.SQL_ENCRYPT === 'true' //opción para encriptar la conexión, que se establece a true o false en función del valor de .env.SQL_ENCRYPT.
    }
};


//Función de Conexión a la Base de Datos:
const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('SQL Server connected...');
    } catch (err) {
        console.error('Database connection failed: ', err);
        process.exit(1);
    }
};

module.exports = connectDB;

//Se define una función asíncrona connectDB que intenta conectarse a la base de datos utilizando la configuración definida.
//await sql.connect(config): Intenta establecer una conexión a SQL Server usando la configuración.
//process.exit(1): Si falla la conexión, el proceso se termina con un código de salida 1, indicando un error.