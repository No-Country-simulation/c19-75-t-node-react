const sql = require('mssql');
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');

/**
 * Comprobar si el email ya está registrado
 *
 * @param {object} req - Request object with user data (email)
 * @param {object} res - Response object
 * @returns {object} - Response object with id if the email is already registered
 * @returns {object} - Response object with error message and status code
 */
exports.isEmailRegistered = async (req, res) => {
    const { email } = req.body;

    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT id FROM usuarios WHERE mail = @email');

        if (result.recordset.length > 0) {
            // Si el email está registrado, devolver el id del usuario
            return res.status(200).json({ id: result.recordset[0].id });
        } else {
            // Si el email no está registrado, devolver un mensaje de que no está registrado
            return res.status(404).json({ message: 'Email no registrado' });
        }
    } catch (error) {
        // En caso de error, devolver un mensaje de error y el código de estado
        return res.status(500).json({ message: 'Error al comprobar el email', error: error.message });
    }
};

/**
 * Comprobar contraseña
 *
 * @param {object} req - Request object con user data (id, password)
 * @param {object} res - Response object
 * @returns {object} - Response object con user data (id, nombre, esprofesional) o error
 */
exports.login = async (req, res) => {
    const { id, password } = req.body;

    try {
        const pool = await connectDB();
        // Obtener usuario según ID
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT id, nombre, password, esprofesional FROM usuarios WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = result.recordset[0];
        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Si la contraseña es válida, devolver los datos del usuario
        const { nombre, esprofesional } = user;
        return res.status(200).json({ id, nombre, esprofesional });

    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};