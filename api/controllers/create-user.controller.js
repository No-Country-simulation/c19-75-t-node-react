const connectDB = require('../config/db');
const sql = require('mssql');

/**
 * Crear un nuevo usuario
 * @param {object} req - Request object with user data
 * @param {object} res - Response object
 * @returns {object} - Response object with user data or error message
 */
const createUser = async (req, res) => {
    const { nombre, apellido, ciudad, cp, provincia, tel, mail, pass, esprofesional, categorias, barrio } =
        req.body;

    if (
        !nombre ||
        !apellido ||
        !ciudad ||
        !cp ||
        !provincia ||
        !tel ||
        !mail ||
        !pass ||
        !barrio ||
        esprofesional === undefined
    ) {
        return res.status(400).json({
            error: 'Por favor, ingresar nombre, apellido, ciudad, provincia, cp, tel, mail, barrios, pass y esprofesional',
        });
    }

    const pool = await connectDB();
    // Iniciar una transacción para que ambas acciones se completen juntas (ya que si el usuario es profesional,
    //tambien se crea el registro en usuarios), si una falla, se revierte todo.
    const transaction = new sql.Transaction(pool);

    try {
        await transaction.begin();

        // Crear nuevo usuario
        const usuarioResult = await transaction
            .request()
            .input('nombre', sql.NVarChar, nombre)
            .input('apellido', sql.NVarChar, apellido)
            .input('ciudad', sql.NVarChar, ciudad)
            .input('cp', sql.Int, cp)
            .input('provincia', sql.NVarChar, provincia)
            .input('barrio', sql.NVarChar, barrio)
            .input('tel', sql.NVarChar, tel)
            .input('mail', sql.NVarChar, mail)
            .input('pass', sql.NVarChar, pass)
            .input('esprofesional', sql.Bit, esprofesional).query(`
                INSERT INTO usuarios (
                    nombre, 
                    apellido, 
                    ciudad, 
                    cp,
                    provincia,
                    barrio,
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
                    @barrio,
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
            const profesionalResult = await transaction
                .request()
                .input('usuario_id', sql.Int, usuarioId)
                .query('INSERT INTO profesionales (usuario_id) OUTPUT INSERTED.id VALUES (@usuario_id)');

            const profesionalId = profesionalResult.recordset[0].id;

            if (categorias && categorias.length > 0) {
                for (const categoria of categorias) {
                    await transaction
                        .request()
                        .input('profesional_id', sql.Int, profesionalId)
                        .input('categoria_id', sql.Int, categoria)
                        .query(
                            'INSERT INTO profesionalCategorias (profesionalID, categoriaID) VALUES (@profesional_id, @categoria_id)'
                        );
                }
            }
        }

        // Confirmar la transacción
        await transaction.commit();

        return res.status(201).json({ message: 'Usuario creado exitosamente', id: usuarioId });
    } catch (err) {
        console.error('Error al crear el usuario:', err);

        try {
            // Intentar deshacer la transacción en caso de error
            await transaction.rollback();
        } catch (rollbackErr) {
            console.error('Error al deshacer la transacción:', rollbackErr);
        }

        return res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

module.exports = {
    createUser,
};
