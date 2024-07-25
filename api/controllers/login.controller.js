const sql = require('mssql');
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