import 'server-only'; // El codigo contiene informacion sensible como claves secretas o credenciales de bases de datos. Este codigo nunca puede ser ejecutado en el cliente.
// TODO: IMPLEMENTAR:
// - implementar try catch en todas las funciones y manejar los errores
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers.js';
import { redirect } from 'next/navigation';

// Reemplaza con tu clave secreta real
const secretKey = 'secret'; // TODO: Cambiar por una clave secreta real // process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey); // convierte la clave secreta en un array de bytes

const cookie = {
  name: 'session',
  options: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
  // hhtpOnly -> solo se puede acceder a la cookie desde el servidor
  // secure -> solo se puede acceder a la cookie a través de HTTPS
  // sameSite -> previene ataques CSRF
  // path -> define la ruta donde se puede acceder a la cookie (todo el sitio)
  duration: 1000 * 60 * 60 * 24 * 7, // 1 week
};

/*
 * La función encrypt recibe un payload y devuelve un token JWT encriptado.
 *
 * @param {object} payload - Payload a encriptar
 * @returns {Promise<string>} - Token JWT encriptado
 */
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // setProtectedHeader -> define el algoritmo de encriptación
    .setIssuedAt() // setIssuedAt -> define la fecha de emisión
    .setExpirationTime('1 week') // setExpirationTime -> define la fecha de expiración
    .sign(key); // sign -> encripta el payload con la clave secreta
}

/*
 * La función decrypt recibe un token JWT y devuelve el payload desencriptado.
 *
 * @param {string} input - Token JWT encriptado
 * @returns {Promise<object>} - Payload desencriptado
 */
export async function decrypt(input) {
  // jwtVerify -> desencripta el token JWT
  // algorithms -> define el algoritmo de desencriptación
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

// * THIS WORK * //
export async function createSession(userId) {
  console.log('==creando session==');
  const expires = new Date(Date.now() + cookie.duration); // set la fecha de expiracion de la sesion
  const session = await encrypt({ userId, expires }); // encripta la sesion

  cookies().set(cookie.name, session, { ...cookie.options, expires }); // set la cookie en el cliente
  redirect('/'); // redirige al usuario a la pagina principal
}

// * THIS WORK * //
export async function destroySession() {
  console.log('==destruyendo session==');
  cookies().delete(cookie.name); // elimina la cookie del cliente
  redirect('/'); // redirige al usuario a la pagina principal
}

// * CHECK THIS * //
// Esta funcion sera utilizada en ocasiones donde el usuario entre contninuamente a la pagina para evitar que la cookie expire, si no entra por un tiempo la cookie expira y se cierra la sesion
export async function updateSession(request) {
  const session = request.cookies.get(cookie.name)?.value;
  const payload = await decrypt(session); // payload -> data de la sesion
  if (!session || !payload) return null;

  // Actualizar la sesion con una nueva fecha de expiracion
  const expires = new Date(Date.now() + cookie.duration);
  cookies().set(cookie.name, session, { ...cookie.options, expires });
}

// *** UTILS *** //

// * IMPLEMENT THIS * //
export async function isSessionExpired(payload) {
  // Verifica si la sesion ha expirado
  return new Date(payload.expires) < new Date();
}

// * THIS WORK * //
export async function getSession() {
  console.log('==obteniendo session==');
  const session = cookies().get(cookie.name)?.value;
  if (!session) return null;
  return await decrypt(session);
}
