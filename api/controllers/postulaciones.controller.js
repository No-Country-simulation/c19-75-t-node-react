const connectDB = require('../config/db');
const sql = require('mssql');


//Crear una nueva postulación
async function createPostulacion(req, res) {
    const { cliente_id, trabajo_id, profesional_id } = req.body;

    if (!cliente_id || !trabajo_id || !profesional_id) {
        return res.status(400).json({ error: 'Por favor, ingresar cliente_id, profesional_id y trabajo_id' });
    }

    try {
        const pool = await connectDB();
        const postulacionResultado = await pool.request()
            .input('cliente_id', sql.Int, cliente_id)
            .input('trabajo_id', sql.Int, trabajo_id)
            .input('profesional_id', sql.Int, profesional_id)
            .input('estado', sql.NVarChar, 'Postulado')
            .query('INSERT INTO postulacioness (cliente_id, trabajo_id, profesional_id, estado) VALUES (@cliente_id, @trabajo_id, @profesional_id, @estado)');

        res.status(201).json({ message: 'Postulación realizada exitosamente' });
    } catch (err) {
        console.error('Error al crear la postulacion:', err);
        res.status(500).json({ error: 'Error al crear la postulacion' });
    }
}


module.exports = {
    createPostulacion
};