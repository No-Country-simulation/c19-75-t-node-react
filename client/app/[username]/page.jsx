'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import estilo from './perfilUsuario.module.scss';

const PerfilUsuario = ({ params, searchParams }) => {
    const { username } = params;
    /*
     * username: Represeta la url dinamica, no es la id
     * La utilizamos visualmente, debido a que la id del usuario es la que esta en la cookie
     */
    const { opcion } = searchParams;
    /*
     * Opcion: Representa la opción seleccionada del menu de navegación
     * Puede ser 'laburos', 'ordenes', 'postulaciones', 'changas'
     * La utilizamos para redenderizar componentes segun la opcion.
     */
    console.log('Username:', username);
    console.log('Opción:', opcion);

    const userId = '2'; // Valor por defecto para pruebas
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Función para obtener los datos del usuario desde la API
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <p>Cargando...</p>;
    }

    // Construir el enlace de WhatsApp
    const mensaje = 'Hola, estoy interesado en tus servicios. ¿Podemos hablar más al respecto?';
    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroTelefono = user.tel;
    const enlaceWhatsApp = numeroTelefono ? `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}` : '#';

    return (
        <div className={estilo.contenedorGeneral}>
            <div className={estilo.contenedorPrincipal}>
                <div className={estilo.contenedorPerfil}>
                    <Image
                        src={user.foto ? `/${user.foto}` : '/usuario_default.png'}
                        width={150}
                        height={150}
                        className={estilo.perfilImagen}
                        alt={user.nombre}
                        priority
                    />
                    <div className={estilo.contenedorPerfilTexto}>
                        <h1 className={estilo.textoNombre}>
                            <strong>{user.nombre + ' ' + user.apellido}</strong>
                        </h1>
                        {user.esprofesional && (
                            <>
                                <p className={estilo.textoCategoria}>{user.profesionalData.categorias.join(', ')}</p>
                                <p className={estilo.textoValoracion}>
                                    Calificación:{' '}
                                    {user.profesionalData.puntuacion_promedio
                                        ? user.profesionalData.puntuacion_promedio
                                        : 'Este usuario aún no tiene calificaciones'}
                                    ★
                                </p>
                            </>
                        )}
                        <p className={estilo.textoLocalidad}>
                            {user.ciudad} / {user.provincia}
                        </p>

                        <hr className={estilo.separador} />

                        <div className={estilo.contenedorContactar}>
                            {user.esprofesional && (
                                <a href={enlaceWhatsApp} target="_blank" rel="noopener noreferrer">
                                    <button>Contactar</button>
                                </a>
                            )}
                            <button>Denunciar perfil</button>
                        </div>
                    </div>
                </div>

                {user.esprofesional && (
                    <div className={estilo.contenedorTrabajos}>
                        <h2 className={estilo.tituloTrabajos}>Trabajos Realizados</h2>
                        <hr className={estilo.separador} />
                        <ul>
                            {user.trabajosData.map((trabajo, index) => {
                                const fecha = new Date(trabajo.fecha_creacion);
                                const fechaFormateada = fecha.toLocaleDateString();

                                return (
                                    <li key={index}>
                                        <h3>{trabajo.Titulo}</h3>
                                        <p>
                                            <strong>Descripción:</strong> {trabajo.descripcion}
                                        </p>
                                        <p>
                                            <strong>Fecha:</strong> {fechaFormateada}
                                        </p>
                                        <p>
                                            <strong>Estado:</strong> {trabajo.estado}
                                        </p>
                                        {trabajo.valoracionesData && trabajo.valoracionesData.length > 0 ? (
                                            trabajo.valoracionesData.map((valoracion, idx) => (
                                                <div key={idx}>
                                                    <p>
                                                        <strong>Valoración:</strong> {valoracion.puntuacion}
                                                    </p>
                                                    <p>
                                                        <strong>Comentario:</strong> {valoracion.comentario}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No hay valoraciones disponibles.</p>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {!user.esprofesional && (
                    <div className={estilo.contenedorTrabajos}>
                        <h2 className={estilo.tituloTrabajos}>Trabajos Contratados</h2>
                        <ul>
                            {user.trabajosData.map((trabajo, index) => (
                                <li key={index}>
                                    <h3>{trabajo.titulo}</h3>
                                    <p>
                                        <strong>Descripción:</strong> {trabajo.descripcion}
                                    </p>
                                    <p>
                                        <strong>Fecha:</strong> {trabajo.fecha_creacion}
                                    </p>
                                    <p>
                                        <strong>Estado:</strong> {trabajo.estado}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {user.esprofesional && (
                <div className={estilo.contenedorBio}>
                    <p className={estilo.textoBio}>
                        <strong>Acerca de mí: </strong>
                        {user.profesionalData.descripcion
                            ? user.profesionalData.descripcion
                            : 'Este usuario aun no añadió una descripción personal'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PerfilUsuario;
