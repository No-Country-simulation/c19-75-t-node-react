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
                SELECT p.*, punt.puntuacion_promedio AS puntuacion, punt.total_valoraciones AS cantLaburos
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

///Modulo para obtener todos los profesionales sin que se dupliquen, esta dividido en varias partes porq sino la consulta
//tardaba mucho y se agotaba el tiempo de espera del servidor

const getBasicProfessionalData = async () => {
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
                u.barrio AS barrio,
                ISNULL(punt.puntuacion_promedio, 0) AS puntuacion, 
                ISNULL(punt.total_valoraciones, 0) AS totalTrabajos
            FROM Profesionales p
            INNER JOIN Usuarios u ON p.usuario_id = u.id
            LEFT JOIN Puntuaciones punt ON p.id = punt.profesional_id;
        `);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching basic professional data:', err);
        throw err;
    }
};

const getProfessionalCategories = async () => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query(`
           SELECT 
            p.id AS profesional_id,
            STRING_AGG(c.nombre, ', ') AS categorias
            FROM ProfesionalCategorias pc
            INNER JOIN Categorias c ON pc.CategoriaID = c.id
            INNER JOIN Profesionales p ON pc.ProfesionalID = p.id
            GROUP BY p.id;
        `);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching professional categories:', err);
        throw err;
    }
};

const getAllProfessionals = async (req, res) => {
    try {
        // Obtener datos básicos
        const basicData = await getBasicProfessionalData();

        // Obtener categorías
        const categoriesData = await getProfessionalCategories();

        // Crear un mapa de categorías por profesional
        const categoriesMap = categoriesData.reduce((acc, curr) => {
            acc[curr.profesional_id] = curr.categorias;
            return acc;
        }, {});

        // Agregar las categorías a los datos básicos
        const trabajadores = basicData.map(prof => ({
            ...prof,
            categorias: categoriesMap[prof.profesional_id] || ''
        }));

        console.log(trabajadores); // Para depuración

        res.status(200).json(trabajadores);

    } catch (err) {
        console.error('Error fetching professionals:', err);
        res.status(500).json({ error: 'Error al obtener los profesionales' });
    }
};

//NOTA: LAS CATEGORIAS (EN CASO DE SER MAS DE UNA) LAS TRAE DE ESTA MANERA: categorias: 'Electricidad, Mantenimiento'
//FIN GETALLPROFESSIONALS
/////////////////////////////////////////////////////////////////////////////////

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

const getUsersByLocation = async (req, res) => {
    try {
        const pool = await connectDB();
        const { provincia, ciudad } = req.query; // Obtener provincia y ciudad de los parámetros de consulta en string

        let query = 'SELECT * FROM Usuarios WHERE esprofesional = 1';
        let queryParams = {};

        if (provincia) {
            query += ' AND provincia = @provincia';
            queryParams.provincia = provincia.trim();
        }

        if (ciudad) {
            query += ' AND ciudad = @ciudad';
            queryParams.ciudad = ciudad.trim();
        }

        const request = pool.request();

        // Agregar los parámetros a la consulta
        if (queryParams.provincia) {
            request.input('provincia', sql.NVarChar, queryParams.provincia);
        }
        if (queryParams.ciudad) {
            request.input('ciudad', sql.NVarChar, queryParams.ciudad);
        }

        const userResult = await request.query(query);

        if (userResult.recordset.length === 0) {
            return res.status(404).json({ error: 'No se encontraron usuarios para la ubicación dada' });
        }

        res.status(200).json(userResult.recordset);
    } catch (err) {
        console.error('Error fetching users by location:', err);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};


module.exports = {
    getUserById,
    getAllProfessionals,
    getProfessionalsByCategory,
    getUsersByLocation
};