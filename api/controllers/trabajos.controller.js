const connectDB = require('../config/db');
const sql = require('mssql');


//Obtener todos los trabajos disponibles
const getAvailableJobs = async (req, res) => {
    try {
        const pool = await connectDB();
        const { provincia, ciudad } = req.query; // provincia y ciudad de los parámetros de consulta

        let query = `
        SELECT 
            t.titulo AS titulo, 
            t.fotos AS fotos, 
            t.id AS id, 
            t.cliente_id AS cliente_id, 
            u.nombre AS nombre, 
            u.apellido AS apellido, 
            u.provincia AS provincia, 
            u.ciudad AS ciudad, 
            u.barrio AS barrio,
            c.nombre AS categoria_nombre
        FROM trabajos t
        JOIN usuarios u ON t.cliente_id = u.id
        LEFT JOIN trabajoCategorias tc ON t.id = tc.TrabajoID
        LEFT JOIN categorias c ON tc.CategoriaID = c.id
        WHERE t.estado = 'en busqueda'
    `;
        let queryParams = {};

        if (provincia) {
            query += ' AND u.provincia = @provincia';
            queryParams.provincia = provincia;
        }

        if (ciudad) {
            query += ' AND u.ciudad = @ciudad';
            queryParams.ciudad = ciudad;
        }

        const request = pool.request();

        // Agregar los parámetros a la consulta si existen
        if (queryParams.provincia) {
            request.input('provincia', sql.NVarChar, queryParams.provincia);
        }
        if (queryParams.ciudad) {
            request.input('ciudad', sql.NVarChar, queryParams.ciudad);
        }

        const trabajosResultado = await request.query(query);

        const trabajos = trabajosResultado.recordset;
        res.status(200).json(trabajos);
    } catch (err) {
        console.error('Error al obtener los trabajos:', err);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
};

const getAvailableJobsByCategory = async (req, res) => {
    const categoriaId = req.params.categoriaId; // Obtener el ID de la categoría desde los parámetros de la solicitud

    try {
        const pool = await connectDB();
        const trabajosResultado = await pool.request()
            .input('categoriaId', sql.Int, categoriaId) // Pasar el ID de la categoría como parámetro
            .query(`
                SELECT 
                    t.titulo AS titulo, 
                    t.fotos AS fotos, 
                    t.id AS id, 
                    t.cliente_id AS cliente_id, 
                    u.nombre AS nombre, 
                    u.apellido AS apellido, 
                    u.provincia AS provincia, 
                    u.ciudad AS ciudad, 
                    u.barrio AS barrio,
                    c.nombre AS categoria_nombre
                FROM trabajos t
                JOIN usuarios u ON t.cliente_id = u.id
                LEFT JOIN trabajoCategorias tc ON t.id = tc.TrabajoID
                LEFT JOIN categorias c ON tc.CategoriaID = c.id
                WHERE t.estado = 'en busqueda' 
                AND c.id = @categoriaId;
            `);

        const trabajos = trabajosResultado.recordset;
        res.status(200).json(trabajos);
    } catch (err) {
        console.error('Error al obtener los trabajos:', err);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
};

//obtener a UN trabajo especifico por ID
const getJobById = async (req, res) => {
    const trabajoId = req.params.trabajoId; // Obtener el ID del trabajo

    try {
        const pool = await connectDB();
        const trabajoResultado = await pool.request()
            .input('trabajoId', sql.Int, trabajoId) // Pasar el ID del trabajo como parámetro
            .query(`
                    SELECT
                    t.titulo AS titulo,
                    t.descripcion AS descripcion,
                    t.fotos AS fotos,
                    t.cliente_id AS cliente_id,
                    t.profesional_id AS profesional_id,
                    t.estado AS estado,
                    c.nombre AS categoria_nombre,
                    uc.nombre AS cliente_nombre,
                    uc.apellido AS cliente_apellido,
                    uc.provincia AS provincia,
                    uc.ciudad AS ciudad,
                    uc.barrio AS barrio,
                    CASE
                        WHEN t.estado = 'finalizado' THEN CONCAT(up.nombre, ' ', up.apellido)
                        ELSE NULL
                    END AS profesional_nombre,
                    CASE
                        WHEN t.estado = 'finalizado' THEN v.puntuacion
                        ELSE NULL
                    END AS puntuacion,
                    CASE
                        WHEN t.estado = 'finalizado' THEN v.comentario
                        ELSE NULL
                    END AS valoracion
                FROM trabajos t
                JOIN trabajoCategorias tc ON t.id = tc.trabajoID
                JOIN categorias c ON tc.categoriaID = c.id
                JOIN usuarios uc ON t.cliente_id = uc.id
                LEFT JOIN profesionales p ON t.profesional_id = p.id
                LEFT JOIN usuarios up ON p.usuario_id = up.id
                LEFT JOIN valoraciones v ON t.id = v.trabajo_id
                WHERE t.id = @trabajoID;
            `);

        const trabajo = trabajoResultado.recordset;
        res.status(200).json(trabajo);
    } catch (err) {
        console.error('Error al obtener el trabajo:', err);
        res.status(500).json({ error: 'Error al obtener el trabajo' });
    }
};

//obtener todos los trabajos con estado [finalizado] POR ID de usuario
const getTrabajosFinalizadosByUserId = async (req, res) => {
    const userId = req.params.usuarioId; // Obtener el ID del usuario (al q corresponde el perfil q estoy mirando) desde los parámetros de la solicitud
    const userType = req.params.userType; // Obtener el tipo de usuario ('cliente' o 'profesional')

    try {
        const pool = await connectDB();
        let trabajosResultado;

        if (userType === 'cliente') { //es decir estoy viendo el perfil de un cliente
            // Caso: profesional viendo perfil de un cliente
            trabajosResultado = await pool.request()
                .input('userId', sql.Int, userId) // Pasar el ID del cliente como parámetro
                .query(`
                    SELECT 
                        t.titulo AS titulo, 
                        t.fotos AS fotos, 
                        t.id AS id_trabajo, 
                        u.nombre AS nombre_profesional,
                        u.apellido AS apellido_profesional,
                        V.puntuacion AS puntuacion, 
                        v.comentario AS comentario
                    FROM trabajos t
                    JOIN valoraciones v ON t.id = v.trabajo_id
                    JOIN profesionales p ON t.profesional_id = p.id
                    JOIN usuarios u ON p.usuario_id = u.id
                    WHERE t.cliente_id = @userId AND t.estado = 'finalizado';
                `);
        } else if (userType === 'profesional') { //es decir, estyo viendo le perfil de un profesional
            // Caso: cliente viendo perfil de un profesional
            trabajosResultado = await pool.request()
                .input('userId', sql.Int, userId) // Pasar el ID del profesional como parámetro
                .query(`
                    SELECT 
                        t.titulo AS titulo, 
                        t.fotos AS fotos, 
                        u.nombre AS nombre_cliente,
                        u.apellido AS apellido_cliente,
                        t.id AS id_trabajo, 
                        V.puntuacion AS puntuacion, 
                        v.comentario AS comentario
                    FROM trabajos t
                    JOIN valoraciones v ON t.id = v.trabajo_id
                    JOIN usuarios u ON t.cliente_id = u.id
                    WHERE t.profesional_id = 2 AND t.estado = 'finalizado';
                `);
        } else {
            // Tipo de usuario no válido
            return res.status(400).json({ error: 'Tipo de usuario no válido' });
        }

        const trabajos = trabajosResultado.recordset;
        res.status(200).json(trabajos);
    } catch (err) {
        console.error('Error al obtener los trabajos:', err);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
};

//obtener todos los trabajos (sin importar su estado) POR ID de usuario
//esto seria para cuando estoy viendo MI PROPIO PERFIL, SEA UN CLIENTE O UN PROFESIONAL
const getAllTrabajosByUserId = async (req, res) => {
    const userId = req.params.usuarioId; // Obtener el ID del usuario desde los parámetros de la solicitud
    const userType = req.params.userType; // Obtener el tipo de usuario ('cliente' o 'profesional')

    try {
        const pool = await connectDB();
        let trabajosResultado;

        if (userType === 'cliente') {
            // Caso: cliente viendo su perfil
            trabajosResultado = await pool.request()
                .input('userId', sql.Int, userId) // Pasar el ID del cliente como parámetro
                .query(`
                    SELECT 
                        t.titulo AS titulo, 
                        t.fotos AS fotos, 
                        t.id AS trabajo_id, 
                        t.estado AS estado,
                        V.puntuacion AS puntuacion, 
                        v.comentario AS comentario
                    FROM trabajos t
                    LEFT JOIN valoraciones v ON t.id = v.trabajo_id
                    WHERE t.cliente_id = @userId;
                `);
        } else if (userType === 'profesional') {
            // Caso: profesional viendo su perfil
            trabajosResultado = await pool.request()
                .input('userId', sql.Int, userId) // Pasar el ID del profesional como parámetro
                .query(`
                    SELECT 
                        t.titulo AS titulo, 
                        t.fotos AS fotos, 
                        t.id AS trabajo_id, 
                        V.puntuacion AS puntuacion, 
                        v.comentario AS comentario
                    FROM trabajos t
                    LEFT JOIN valoraciones v ON t.id = v.trabajo_id
                    WHERE t.profesional_id = @userId;
                `);
        } else {
            // Tipo de usuario no válido
            return res.status(400).json({ error: 'Tipo de usuario no válido' });
        }

        const trabajos = trabajosResultado.recordset;
        res.status(200).json(trabajos);
    } catch (err) {
        console.error('Error al obtener los trabajos:', err);
        res.status(500).json({ error: 'Error al obtener los trabajos' });
    }
};

//Crear un nuevo trabajo
async function createTrabajo(req, res) {
    const { cliente_id, titulo, descripcion, categoria_id } = req.body;

    if (!cliente_id || !titulo || !descripcion || !categoria_id) {
        return res.status(400).json({ error: 'Por favor, ingresar cliente_id, titulo, descripcion y categoria' });
    }

    try {
        const pool = await connectDB();

        // Iniciar una transacción para que ambas acciones se completen juntas (ya que al crear el trabajo, 
        //se crea tambien la postulacion para ese trabajo), si una falla, se revierte todo.
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Crear el nuevo trabajo
        const trabajoResult = await transaction.request()
            .input('cliente_id', sql.Int, cliente_id)
            .input('titulo', sql.NVarChar, titulo)
            .input('descripcion', sql.NVarChar, descripcion)
            .input('estado', sql.NVarChar, 'en busqueda')
            .query('INSERT INTO trabajos (cliente_id, titulo, descripcion, estado) OUTPUT INSERTED.id VALUES (@cliente_id, @titulo, @descripcion, @estado)');
        //output inserted.id para q devuelva el id del trabajo nuevo creado

        const trabajoId = trabajoResult.recordset[0].id;

        // Crear una entrada en la tabla trabajoCategoria
        await transaction.request()
            .input('categoria_id', sql.Int, categoria_id)
            .input('trabajo_id', sql.Int, trabajoId)
            .query('INSERT INTO trabajoCategorias (categoriaId, trabajoId) VALUES (@categoria_id, @trabajo_id)');

        // Confirmar la transacción
        await transaction.commit();

        res.status(201).json({ message: 'Trabajo creado exitosamente', trabajoId });
    } catch (err) {
        console.error('Error al crear el trabajo:', err);

        try {
            // Intentar deshacer la transacción en caso de error
            await transaction.rollback();
        } catch (rollbackErr) {
            console.error('Error al deshacer la transacción:', rollbackErr);
        }

        res.status(500).json({ error: 'Error al crear el trabajo' });
    }
}


module.exports = {
    getAvailableJobs,
    getAvailableJobsByCategory,
    getJobById,
    getTrabajosFinalizadosByUserId,
    getAllTrabajosByUserId,
    createTrabajo
};