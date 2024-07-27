'use server';
import { getSession } from '@/libs/sessions';
import { getUserById } from '@/data/db';
import bcrypt from 'bcrypt';

/*
 * session: {
 *  userId: number,
 *  name: string,
 *  isWorker: boolean,
 * }
 */

// * LOGIN * //
export async function getUserIdByEmail(email) {
    if (!email) return null;
    try {
        const response = await fetch('http://localhost:5000/api/login/check-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        // Verifica el estado de la respuesta
        const status = response.status;
        if (status === 500) {
            throw new Error('Error en la respuesta de la API');
        }
        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
        }
        // Obtiene la data de la respuesta
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error.message;
    }
}
export async function loginUser(id, password) {
    if (!id || !password) return null;

    try {
        const response = await fetch('http://localhost:5000/api/login/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        // Verifica el estado de la respuesta
        const status = response.status;
        if (status === 500) {
            throw new Error('Error en la respuesta de la API');
        }
        if (!response.ok) {
            const { error } = await response.json();
            throw new Error(error);
        }
        // Obtiene la data de la respuesta
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud: ->', error.message);
        throw error.message;
    }
}

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
        console.error('Error al obtener la informacion del usuario:', error?.message);
        return null;
    }
}
