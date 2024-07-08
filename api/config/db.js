const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: process.env.SQL_ENCRYPT === 'true'
    }
};

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
