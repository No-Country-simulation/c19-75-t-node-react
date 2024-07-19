import React from 'react';
import Image from 'next/image';
import estilo from '@/app/usuarios/perfilUsuario.module.scss';

const perfilUsuario = () => {
    // Simulación de datos del usuario obtenidos desde una API o contexto
    const user = {
        foto: 'foto.jpg',//
        nombre: 'Pedro Gomez',//
        ciudad: 'Bahia Blanca',//
        provincia: 'Buenos Aires',//
        //email: 'pedrogomez@hotmail.com'
        esProfesional: true, // Esto determina si el usuario es profesional//
        categorias: 'Plomeria/Gasista', // CATEGORIAS
        putuacionPromedio: 5, // promedio de puntuaciones
        totalValoraciones: 5,
        bio: '¡Hola! Soy Pedro Gomez, un plomero y gasista con más de 10 años de experiencia en el sector. Me especializo en la instalación, mantenimiento y reparación de sistemas de plomería y gas. Durante mi carrera, he trabajado tanto en proyectos residenciales como comerciales, asegurando siempre la máxima calidad y seguridad en cada trabajo realizado. Mis servicios incluyen la instalación de sistemas de tuberías, reparación de fugas, mantenimiento de calderas, y la colocación de artefactos sanitarios y de gas.Mi objetivo es proporcionar soluciones eficaces y duraderas para todas tus necesidades de plomería y gas, siempre con un enfoque en la satisfacción del cliente y la atención al detalle. Soy un profesional comprometido con la excelencia y la puntualidad, y me esfuerzo por mantenerme actualizado con las últimas tecnologías y normativas del sector.Si buscas un plomero/ gasista confiable y con experiencia, no dudes en contactarme.Estoy aquí para ayudarte con cualquier proyecto o reparación que necesites.',//
        trabajos: [{
            Titulo: 'Mantenimiento Caldera',
            Descripcion: 'Mantenimiento y reparación de caldera.',
            Fecha: '2023-01-15',
            Estado: 'Completado',
            Valoracion: 5,
            Comentario: "Excelente profesional"
        },
        {
            Titulo: 'Plomeria en obra',
            Descripcion: 'Instalación de sistemas de plomería en construcción nueva.',
            Fecha: '2023-03-22',
            Estado: 'En Proceso',
            Valoracion: 5,
            Comentario: "Excelente profesional"
        },
        {
            Titulo: 'Colocación de artefactos sanitarios',
            Descripcion: 'Colocación y ajuste de artefactos sanitarios.',
            Fecha: '2023-06-10',
            Estado: 'Completado',
            Valoracion: 5,
            Comentario: "Excelente profesional"
        }]
    };

    return (
        <div className={estilo.contenedorPrincipal}>
            <div className={estilo.contenedorPerfil}>
                {/* agregar icono compartir y fav */}
                <Image
                    src="/foto.jpg"
                    width={150}
                    height={150}
                    className={estilo.perfilImagen}
                    alt="Nombre"
                />
                <div className={estilo.contenedorPerfilTexto}>
                    <h1 className={estilo.textoNombre}><strong>{user.nombre}</strong></h1>
                    {user.esProfesional && (
                        <>
                            <p className={estilo.textoCategoria}>{user.categorias}</p>
                            <p className={estilo.textoValoracion}>Calificación: {user.putuacionPromedio}★</p>
                        </>
                    )}
                    <p className={estilo.textoLocalidad}>{user.ciudad} / {user.provincia}</p>

                    <hr className={estilo.separador} />

                    <div className={estilo.contenedorContactar}>
                        {user.esProfesional && (
                            <button>Contactar</button>
                        )}
                        <button>Denunciar perfil</button>
                    </div>
                </div>
            </div>

            {user.esProfesional && (
                <>
                    <div className={estilo.contenedorBio}>
                        <p className={estilo.textoBio}><strong>Acerca de mi: </strong> {user.bio}</p>

                    </div>
                    <div className={estilo.contenedorTrabajos}>
                        <h2 className={estilo.tituloTrabajos}>Trabajos Realizados</h2>
                        <hr className={estilo.separador} />
                        <ul>
                            {user.trabajos.map((trabajo, index) => (
                                <li key={index}>
                                    <h3>{trabajo.Titulo}</h3>
                                    <p><strong>Descripción:</strong> {trabajo.Descripcion}</p>
                                    <p><strong>Fecha:</strong> {trabajo.Fecha}</p>
                                    <p><strong>Estado:</strong> {trabajo.Estado}</p>
                                    <p><strong>Valoración:</strong> {trabajo.Valoracion}</p>
                                    <p><strong>Comentario:</strong> {trabajo.Comentario}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}


            {!user.esProfesional && (
                <div className={estilo.contenedorTrabajos}>
                    <h2 className={estilo.tituloTrabajos}>Trabajos Contratados</h2>
                    <ul>
                        {user.trabajos.map((trabajo, index) => (
                            <li key={index}>
                                <h3>{trabajo.Titulo}</h3>
                                <p><strong>Descripción:</strong> {trabajo.Descripcion}</p>
                                <p><strong>Fecha:</strong> {trabajo.Fecha}</p>
                                <p><strong>Estado:</strong> {trabajo.Estado}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default perfilUsuario;