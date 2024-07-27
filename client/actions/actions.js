'use server';
import { getSession } from '@/libs/sessions';
import { getUserById } from '@/data/db';

/*
 * session: {
 *  userId: number,
 *  name: string,
 *  isWorker: boolean,
 * }
 */

export async function userSession() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function userInfo() {
  // 1. Verificar user's session
  const session = await getSession();
  if (!session) return null;

  // 2. Fetch user data
  try {
    return await getUserById(session.userId); // Obtiene la data del usuario con el id de la sesion  desde la base de datos
  } catch (error) {
    console.log('Failed to fetch user data', error);
    return null;
  }
}
