'use server';
import { getSession } from '@/libs/sessions';

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
        // Obtiene la data de la respuesta
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error.message;
    }
}
export async function loginUser(id, password) {
    if (!id || !password) throw new Error('Faltan datos');

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
        console.error('Error en la solicitud', error.message);
        throw error.message;
    }
}

export async function createUser(user) {
    if (!user) throw new Error('Faltan datos');
    console.log('data:', user);

    try {
        const response = await fetch('http://localhost:5000/api/createUser/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        // Verifica el estado de la respuesta
        const status = response.status;
        if (!response.ok) {
            if (status === 500) {
                throw new Error('Error interno, compruebe más tarde');
            }
            const { error } = await response.json();
            throw new Error(error);
        }
        // Obtiene la data de la respuesta
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error.message;
    }
}

export async function userSession() {
    const session = await getSession();
    if (!session) return null;
    return session;
}
