/*
 * Middleware render on every request
 * Aca podemos proteger rutas, verificar sesiones, actualizar sesiones, etc
 */

import { NextResponse } from 'next/server';
import { updateSession, verifySession } from '@/libs/sessions';
import { cookies } from 'next/headers';

export default async function middleware() {}

/*
 * return await updateSession(req); // Actualiza la sesion
 * Esto permite actualizar la sesion del usuario.
 * Solo caundo el usuario no entre hace un tiempo (por ejemplo 1 semana) la cookie se expira y se cierra la sesion
 * Para evitar esto se actualiza la sesion cada vez que el usuario entra a la pagina
 */
