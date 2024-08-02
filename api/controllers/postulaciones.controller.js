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

//obtener todas las postulaciones para un determinado trabajo
const getAllPostulacionesByTrabajoId = async (req, res) => {
    const trabajoId = req.params.trabajoId; // Obtener el ID del trabajo desde los parámetros de la solicitud
    const userType = req.params.userType; // Obtener el tipo de usuario ('cliente' o 'profesional')

    try {
        const pool = await connectDB();
        let postulacionesResultado;

        if (userType === 'cliente') {
            // Caso: cliente viendo su perfil
            postulacionesResultado = await pool.request()
                .input('trabajoId', sql.Int, trabajoId) // Pasar el ID del trabajo como parámetro
                .query(`
                SELECT 
                    p.fecha_postulacion AS fecha, 
                    u.nombre AS nombre,
                    u.apellido AS apellido
                FROM postulacioness p
                JOIN profesionales pr on p.profesional_id = pr.id
				Join usuarios u on pr.usuario_id = u.id
                WHERE p.trabajo_id = @trabajoId;
            `);
        } else if (userType === 'profesional') {
            // Caso: profesional viendo su perfil
            postulacionesResultado = await pool.request()
                .input('trabajoId', sql.Int, trabajoId) // Pasar el ID del trabajo como parámetro
                .query(`
                        SELECT DISTINCT
                            p.estado AS estado,
                            t.titulo AS titulo
                        FROM postulacioness p
                        JOIN trabajos t ON t.id = p.trabajo_id
                        WHERE p.trabajo_id = @trabajoId;
                `);
        } else {
            // Tipo de usuario no válido
            return res.status(400).json({ error: 'Tipo de usuario no válido' });
        }

        const postulaciones = postulacionesResultado.recordset;
        res.status(200).json(postulaciones);
    } catch (err) {
        console.error('Error al obtener las postulaciones:', err);
        res.status(500).json({ error: 'Error al obtener las postulaciones' });
    }
};

//obtener si yo profesional estoy postulado a un trabajo o no
const getEstoyPostulado = async (req, res) => {
    const trabajoId = parseInt(req.params.trabajoId, 10);
    const profesionalId = parseInt(req.params.profesionalId, 10);

    console.log(`Trabajo ID: ${trabajoId}, Profesional ID: ${profesionalId}`);

    try {
        const pool = await connectDB();
        let postulacionResultado;

        postulacionResultado = await pool.request()
            .input('trabajoId', sql.Int, trabajoId)
            .input('profesionalId', sql.Int, profesionalId)
            .query(`
            SELECT DISTINCT po.estado
                FROM Postulacioness po
                JOIN Profesionales p ON po.profesional_id = p.ID
                JOIN Trabajos t ON po.trabajo_id = t.ID
                WHERE p.ID = @profesionalId
                AND t.ID = @trabajoId;
            `);

        console.log('Resultado de la consulta:', postulacionResultado.recordset);

        const postulacion = postulacionResultado.recordset;
        res.status(200).json(postulacion);
    } catch (err) {
        console.error('Error al obtener la relación:', err);
        res.status(500).json({ error: 'Error al obtener la relación' });
    }
};


module.exports = {
    createPostulacion,
    getAllPostulacionesByTrabajoId,
    getEstoyPostulado
};