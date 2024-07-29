const connectDB = require('../config/db');
const sql = require('mssql');

const getUserById = async (req, res) => {
    try {
        const pool = await connectDB();
        const userId = req.params.userId;

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

const getAllProfessionals = async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query(`
           SELECT 
                p.id AS profesional_id,
                u.id AS usuario_id,
                u.nombre AS nombre,
                u.apellido AS apellido,
                u.foto AS foto,
                u.provincia AS provincia,
                u.ciudad AS ciudad,
                ISNULL(punt.puntuacion_promedio, 0) as puntuacion,
                c.nombre AS categoria
            FROM Profesionales p
            INNER JOIN Usuarios u ON p.usuario_id = u.id
            LEFT JOIN Puntuaciones punt ON p.id = punt.profesional_id
            LEFT JOIN ProfesionalCategorias pc ON p.id = pc.ProfesionalID
            LEFT JOIN Categorias c ON pc.CategoriaID = c.id;
        `);

        const trabajadores = result.recordset;

        console.log(trabajadores); // Para depuración

        res.status(200).json(trabajadores);

    } catch (err) {
        console.error('Error fetching professionals:', err);
        res.status(500).json({ error: 'Error al obtener los profesionales' });
    }
};

const getProfessionalsByCategory = async (req, res) => {
    try {
        const pool = await connectDB();
        const id = req.params.id;


        const categoriaResult = await pool.request().query(`
                SELECT 
                p.id AS profesional_id, 
                u.id AS usuario_id,
                u.nombre AS nombre,
                u.apellido AS apellido,
                u.foto AS foto,
                u.provincia AS provincia,
                u.ciudad AS ciudad,
                ISNULL(punt.puntuacion_promedio, 0) as puntuacion,
                c.nombre AS categoria
                FROM Profesionales p
                INNER JOIN Usuarios u ON p.usuario_id = u.id
                LEFT JOIN Puntuaciones punt ON p.id = punt.profesional_id
                LEFT JOIN ProfesionalCategorias pc ON p.id = pc.ProfesionalID
                LEFT JOIN Categorias c ON pc.CategoriaID = c.id
                WHERE c.id = ${id}`);

        if (categoriaResult.recordset.length === 0) {
            return res.status(404).json({ error: 'No hay usuarios encontrados para esta categoria' });
        }

        const categoriaResultados = categoriaResult.recordset;
        console.log(categoriaResultados); // Para depuración
        res.status(200).json(categoriaResultados);

    } catch (err) {
        console.error('Error fetching professionals by category:', err);
        res.status(500).json({ error: 'Error al obtener los profesionales' });
    }
};

//Crear un nuevo usuario
const register = async (req, res) => {
    const { nombre, apellido, ciudad, cp, provincia, tel, mail, pass, esprofesional } = req.body;

    if (!nombre || !apellido || !ciudad || !cp || !provincia || !tel || !mail || !pass || esprofesional === undefined) {
        return res.status(400).json({ error: 'Por favor, ingresar nombre, apellido, ciudad, provincia, cp, tel, mail, pass y esprofesional' });
    }

    try {
        const pool = await connectDB();

        // Iniciar una transacción para que ambas acciones se completen juntas (ya que si el usuario es profesional, 
        //tambien se crea el registro en usuarios), si una falla, se revierte todo.
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Crear nuevo usuario
        const usuarioResult = await transaction.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('apellido', sql.NVarChar, apellido)
            .input('ciudad', sql.NVarChar, ciudad)
            .input('cp', sql.Int, cp)
            .input('provincia', sql.NVarChar, provincia)
            .input('tel', sql.NVarChar, tel)
            .input('mail', sql.NVarChar, mail)
            .input('pass', sql.NVarChar, pass)
            .input('esprofesional', sql.Bit, esprofesional)
            .query(`
                INSERT INTO usuarios (
                    nombre, 
                    apellido, 
                    ciudad, 
                    cp,
                    provincia,
                    tel,
                    mail,
                    password,
                    esprofesional
                ) 
                OUTPUT INSERTED.id 
                VALUES (
                    @nombre, 
                    @apellido, 
                    @ciudad, 
                    @cp,
                    @provincia,
                    @tel,
                    @mail,
                    @pass,
                    @esprofesional
                )
            `);

        //output inserted.id para q devuelva el id del usuario nuevo creado

        const usuarioId = usuarioResult.recordset[0].id;

        // Crear una entrada en la tabla profesionales si el usuario es profesional
        if (esprofesional) {
            await transaction.request()
                .input('usuario_id', sql.Int, usuarioId)
                .query('INSERT INTO profesionales (usuario_id) VALUES (@usuario_id)');
        }

        // Confirmar la transacción
        await transaction.commit();

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (err) {
        console.error('Error al crear el usuario:', err);

        try {
            // Intentar deshacer la transacción en caso de error
            await transaction.rollback();
        } catch (rollbackErr) {
            console.error('Error al deshacer la transacción:', rollbackErr);
        }

        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

module.exports = {
    getUserById,
    getAllProfessionals,
    getProfessionalsByCategory,
    register
};