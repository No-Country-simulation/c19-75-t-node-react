const connectDB = require('../config/db');

const getUserById = async (req, res) => {
    try {
        const pool = await connectDB();
        const userId = req.params.id;

        // Consulta principal del usuario
        const userResult = await pool.request().query(`SELECT * FROM Usuarios WHERE id = ${userId}`);

        if (userResult.recordset.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = userResult.recordset[0];

        // Si el usuario es profesional, obtener datos adicionales
        if (user.esprofesional) {
            const profesionalResultados = await pool.request().query(`
                SELECT p.*, punt.puntuacion_promedio, punt.total_valoraciones
                FROM Profesionales p
                LEFT JOIN Puntuaciones punt ON p.id = punt.profesional_id
                WHERE p.usuario_id = ${userId}
            `);

            if (profesionalResultados.recordset.length > 0) {
                const profesionalId = profesionalResultados.recordset[0].id;
                const categoriasResultados = await pool.request().query(`
                    SELECT c.nombre
                    FROM ProfesionalCategorias pc
                    JOIN Categorias c ON pc.categoriaID = c.id
                    WHERE pc.profesionalID = ${profesionalId}
                `);

                const trabajosResultados = await pool.request().query(`SELECT * FROM Trabajos WHERE profesional_id = ${profesionalId}`);

                for (let trabajo of trabajosResultados.recordset) {
                    const valoracionesResultados = await pool.request().query(`SELECT * FROM Valoraciones WHERE trabajo_id = ${trabajo.id}`);
                    trabajo.valoracionesData = valoracionesResultados.recordset;
                }

                user.profesionalData = profesionalResultados.recordset[0];
                user.profesionalData.categorias = categoriasResultados.recordset.map(row => row.nombre);
                user.trabajosData = trabajosResultados.recordset;
            }
        } else {
            const trabajosResultados = await pool.request().query(`SELECT * FROM Trabajos WHERE cliente_id = ${userId}`);
            user.trabajosData = trabajosResultados.recordset;
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ error: 'Error al obtener los datos del usuario' });
    }
};

module.exports = { getUserById };