// TODO: Implementar las funciones de acceso a la base de datos. Aca solo hay tests
import { cache } from 'react';
import bcrypt from 'bcrypt';
const users = [
  {
    id: 1,
    email: 'user1@gmail.com',
    password: '$2b$10$k6d8YPjfElLM6To9K.r3W.jCi2YH22nGFTU57jhcotAPAwD/h0H4a', // 123
    name: 'Juan',
    isWorker: true,
  },
  {
    id: 2,
    email: 'user2@gmail.com',
    name: 'Pedro',
    password: '$2b$10$yUTswJN/nSp0oM8iicUcUOjUDb/jbrKehNaJ/CU0US/.o8RsokQf.', // asd
    isWorker: false,
  },
];

/**
 * Inicia sesión de un usuario verificando su correo electrónico y contraseña.
 *
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<object|null>} - Un objeto con la información del usuario si las credenciales son válidas, o null si no lo son.
 */
export const loginUser = cache(async (email, password) => {
  try {
    // Buscar el usuario por su correo electrónico
    // const data = await db. ->
    const user = users.find((user) => user.email === email);

    // Verificar si el usuario existe
    if (!user) {
      return null;
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    // Información específica a obtener del usuario para cuidar la privacidad
    const userData = {
      id: user.id,
      name: user.name,
      isWorker: user.isWorker,
    };
    return userData;
  } catch (error) {
    console.log('Failed to login user', error);
    return null;
  }
});

/**
 * Obtiene la información de un usuario según su ID.
 *
 * @param {number} userId - El ID del usuario cuya información se desea obtener.
 * @returns {Promise<object|null>} - Información del usuario, o null si el usuario no existe.
 */
export const getUserById = cache(async (userId) => {
  // 1. Fetch user data
  try {
    const data = users[userId - 1];
    // const data = await db.query.users.find({where: eq(users.id, session.userId)});
    // Informa especifica a obtener del usuario para cuidar la privacidad
    const user = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
    };
    return user;
  } catch (error) {
    console.log('Failed to fetch user data', error);
    return null;
  }
});

/**
 * Verifica si existe un usuario con el correo electrónico proporcionado.
 *
 * @param {string} email - El correo electrónico del usuario.
 * @returns {Promise<number|null>} - El ID del usuario si existe, o null si el usuario no existe.
 */
export const getUserIdByEmail = cache(async (email) => {
  try {
    const user = users.find((user) => user.email === email);
    // const user = await db.query.users.find({where: eq(users.email, email)});
    return user ? user.id : null;
  } catch (error) {
    console.log('Failed to get user ID by email', error);
    return null;
  }
});

/**
 * Actualiza la contraseña de un usuario según su ID.
 *
 * @param {number} userId - El ID del usuario cuya contraseña se desea actualizar.
 * @param {string} newPassword - La nueva contraseña del usuario.
 * @returns {Promise<boolean>} - True si la actualización fue exitosa, false en caso contrario.
 */
export const updateUserPassword = cache(async (userId, password) => {});

/**
 * Crear un nuevo usuario en la base de datos.
 *
 * @param {object} userData - Un objeto con la información del nuevo usuario (nombre, email, contraseña, etc.).
 * @returns {Promise<number>} - El ID del nuevo usuario creado.
 * @throws {Error} - Si el correo electrónico ya está registrado.
 */
export const createUser = cache(async (userData) => {});
