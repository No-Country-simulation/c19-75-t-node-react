const connectDB = require('../config/db');
const sql = require('mssql');


//Obtener todos los trabajos
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
    getAllTrabajos,
    createTrabajo
};