const connectDB = require('../config/db');

const getAllTrabajos = async (req, res) => {
    try {
        const pool = await connectDB();
        const trabajosResultado = await pool.request().query('SELECT t.titulo AS titulo, t.fotos As fotos, t.id as id, u.nombre AS nombre, u.apellido AS apellido, u.foto AS foto, v.puntuacion as puntuacion, v.comentario AS comentario FROM trabajos t JOIN profesionales p ON t.profesional_id = p.id JOIN usuarios u ON p.usuario_id = u.id LEFT JOIN valoraciones v ON t.id = v.trabajo_id;');

        trabajos = trabajosResultado.recordset
        res.status(200).json(trabajos);
    } catch (err) {
        console.error('Error al obtener los trabajos:', err);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
};

module.exports = {
    getAllTrabajos
};