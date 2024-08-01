"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useSessionContext } from "@/context/SessionContext";
import React, { useEffect, useState, useRef } from "react";
import styles from "./perfilUsuarios.module.scss";
import { Slider } from "infinite-react-carousel/lib";
import { FaStar } from "react-icons/fa";
import { FaClockRotateLeft, FaLocationDot } from "react-icons/fa6";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GrDocumentVerified } from "react-icons/gr";
import { MdVerified, MdEdit } from "react-icons/md";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import TrabajosSlider from "@/components/trabajosSlider";
import ProfileTables from "@/components/tables";
import useNotifications from "../../../components/utils/notifications";

const PerfilUsuario = ({ params, searchParams }) => {
  const { userSessionData, sessionActive } = useSessionContext();
  const { userId } = params;
  const { opcion } = searchParams;
  const [user, setUser] = useState(null);
  const [isViewingOwnProfile, setIsViewingOwnProfile] = useState(true); // Variable para saber si el usuario está viendo su propio perfil y renderizar ciertas opciones/acciones
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const { sendNotification } = useNotifications();

  const handleButtonClick = () => {
    sendNotification("notificacion");
  };

  //En vez de esta tabla estaria el fetch que trae las los trabajos, sus clientes y estados.
  const tables = [
    {
      title: "Solicitudes",
      subTables: [
        {
          title: "Pintura exterior",
          solicitante: "Juan Pérez",
          value: { aceptar: true, rechazar: true },
        },
        {
          title: "Pintar baño",
          solicitante: "María González",
          value: { aceptar: true, rechazar: true },
        },
        {
          title: "Revestimiento exterior",
          solicitante: "Carlos Rodríguez",
          value: { aceptar: true, rechazar: true },
        },
        {
          title: "Revestimiento exterior",
          solicitante: "Carlos Rodríguez",
          value: { aceptar: true, rechazar: true },
        },
        {
          title: "Revestimiento exterior",
          solicitante: "Carlos Rodríguez",
          value: { aceptar: true, rechazar: true },
        },
        {
          title: "Revestimiento exterior",
          solicitante: "Carlos Rodríguez",
          value: { aceptar: true, rechazar: true },
        },
        {
          title: "Revestimiento exterior",
          solicitante: "Carlos Rodríguez",
          value: { aceptar: true, rechazar: true },
        },
      ],
    },
    {
      title: "Postulaciones",
      subTables: [
        {
          title: "Pintar mueble de madera",
          solicitante: "Ana Martínez",
          value: "Pendiente",
        },
        {
          title: "Pintar cocina",
          solicitante: "Luis Sánchez",
          value: "Pendiente",
        },
        {
          title: "Pintar habitacion",
          solicitante: "Elena López",
          value: "Rechazado",
        },
        {
          title: "Pintar habitacion",
          solicitante: "Elena López",
          value: "Rechazado",
        },
        {
          title: "Pintar habitacion",
          solicitante: "Elena López",
          value: "Rechazado",
        },
        {
          title: "Pintar habitacion",
          solicitante: "Elena López",
          value: "Rechazado",
        },
        {
          title: "Pintar habitacion",
          solicitante: "Elena López",
          value: "Rechazado",
        },
      ],
    },
    {
      title: "Laburos",
      subTables: [
        {
          title: "Pintar abertura",
          solicitante: "Roberto Fernández",
          value: "En progreso",
        },
        {
          title: "Revestimiento interior",
          solicitante: "Sofía Díaz",
          value: "Completado",
        },
        {
          title: "Revestimiento para techo",
          solicitante: "Diego Morales",
          value: "Pendiente",
        },
        {
          title: "Revestimiento para techo",
          solicitante: "Diego Morales",
          value: "Pendiente",
        },
        {
          title: "Revestimiento para techo",
          solicitante: "Diego Morales",
          value: "Pendiente",
        },
        {
          title: "Revestimiento para techo",
          solicitante: "Diego Morales",
          value: "Pendiente",
        },
        {
          title: "Revestimiento para techo",
          solicitante: "Diego Morales",
          value: "Pendiente",
        },
      ],
    },
  ];

  useEffect(() => {
    console.log("userId:", userId);
    console.log("userSessionData", userSessionData);
    console.log("sessionActive:", sessionActive);
    // Comprobar si hay un usuario logueado
    if (sessionActive) {
      // Comprobar si el usuario logueado es el mismo que el perfil que se está viendo
      if (userSessionData.id === userId) {
        setIsViewingOwnProfile(true);
      }
    }

    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/users/usuarios/${userId}`
          );
          const data = await response.json();
          setUser(data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      };

      fetchUser();
    }
  }, [userId]);

  if (!user) {
    return <p>Cargando...</p>;
  }

  // Construir el enlace de WhatsApp
  const mensaje =
    "Hola, estoy interesado en tus servicios. ¿Podemos hablar más al respecto?";
  const mensajeCodificado = encodeURIComponent(mensaje);
  const numeroTelefono = user.tel;
  const enlaceWhatsApp = numeroTelefono
    ? `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`
    : "#";

  return (
    <div className={styles.trabajo}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.breadCrumbs}>
            <Link href="/">LABURAPP</Link> /{" "}
            <Link href="/trabajadores">TRABAJADORES</Link> /
          </span>
          <div className={styles.user}>
            <img
              className={styles.pp}
              src={user.foto ? `/${user.foto}` : "/usuario_default.png"}
              alt=""
            />
            <h1>{user.nombre + " " + user.apellido}</h1>
            <div className={styles.stars}>
              <FaStar className={styles.icon} />
              <span>
                {user.profesionalData.puntuacion_promedio
                  ? user.profesionalData.puntuacion_promedio
                  : "Aún sin calificaciones"}
              </span>
            </div>
          </div>

          {isViewingOwnProfile ? (
            <ProfileTables tables={tables} />
          ) : (
            <div>
              <h2 className={styles.titles}>Acerca de sus trabajos</h2>
              <TrabajosSlider
                data={user.trabajosData}
                width={500}
                height={280}
              />
            </div>
          )}

          <div className={styles.trabajador}>
            {isViewingOwnProfile ? (
              <h2 className={styles.titles}>Acerca de mi</h2>
            ) : (
              <h2 className={styles.titles}>Acerca del trabajador</h2>
            )}
            <div className={styles.userContainer}>
              <div className={styles.user}>
                <img
                  src={user.foto ? `/${user.foto}` : "/usuario_default.png"}
                  alt=""
                />
                <div className={styles.info}>
                  <div className={styles.name}>
                    <span>{user.nombre + " " + user.apellido}</span>
                    <div className={styles.stars}>
                      <FaStar className={styles.icon} />
                      <span>
                        {user.profesionalData.puntuacion_promedio
                          ? user.profesionalData.puntuacion_promedio
                          : "Aún sin calificaciones"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={enlaceWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
                  >
                    Contactar
                  </Link>
                </div>
              </div>
              {isViewingOwnProfile ? (
                <div className={styles.userRight}>
                  <Link href="" className={styles.buttonEdit}>
                    <>
                      <MdEdit className={styles.iconEdit} />
                      Editar perfil
                    </>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.box}>
              <div className={styles.items}>
                <div className={styles.item}>
                  <span className={styles.title}>Es de</span>
                  <span className={styles.desc}>{user.provincia}</span>
                </div>
                <div className={styles.item}>
                  <span className={styles.title}>Reside en</span>
                  <span className={styles.desc}>{user.ciudad}</span>
                </div>
                <div className={styles.item}>
                  <span className={styles.title}>Oficios</span>
                  <span className={styles.desc}>
                    {user.profesionalData.categorias.join(", ")}
                  </span>
                </div>
                <div className={styles.item}>
                  <span className={styles.title}>Barrio o Localidad</span>
                  <span className={styles.desc}></span>
                </div>
              </div>
              <hr />
              <p>
                {user.profesionalData.descripcion
                  ? user.profesionalData.descripcion
                  : "Este usuario aun no añadió una descripción personal"}
              </p>
            </div>
          </div>
          <div className={styles.reviews}>
            {isViewingOwnProfile ? (
              <h2 className={styles.titles}>Mis valoraciones</h2>
            ) : (
              <h2 className={styles.titles}>Valoraciones</h2>
            )}
            <div>
              {user?.trabajosData.map((trabajo, index) => {
                const fecha = new Date(trabajo.fecha_creacion);
                const fechaFormateada = fecha.toLocaleDateString();
                return (
                  <div>
                    <div key={index} className={styles.item}>
                      <div className={styles.user}>
                        <img className={styles.pp} src="" alt="" />
                        <div className={styles.info}>
                          <span>{trabajo.titulo}</span>
                          <div className={styles.country}>
                            <img src="" alt="" />
                            <span>Fecha: {fechaFormateada}</span>
                          </div>
                        </div>
                      </div>

                      <p>
                        {trabajo.valoracionesData &&
                        trabajo.valoracionesData.length > 0 ? (
                          trabajo.valoracionesData.map((valoracion, idx) => (
                            <div key={idx}>
                              <p className={styles.stars}>
                                <strong>Puntuación:</strong>
                                <FaStar className={styles.icon} />
                                <span>{valoracion.puntuacion}</span>
                              </p>
                              <p>
                                <strong>Comentarios:</strong>{" "}
                                {valoracion.comentario}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No hay valoraciones disponibles.</p>
                        )}
                      </p>
                      <div className={styles.helpful}>
                        <BiLike className={styles.likes} />
                        <span>1</span>
                        <BiDislike className={styles.likes} />
                        <span>0</span>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <h3>{user.nombre + " " + user.apellido}</h3>
            <p className={styles.stars}>
              <span>Valoración</span>
              <div className={styles.star}>
                <span className={styles.promedio}>
                  {user.profesionalData.puntuacion_promedio}
                </span>
                <FaStar className={styles.icon} />
              </div>
            </p>
          </div>
          <div className={styles.details}>
            <div className={styles.item}>
              <FaClockRotateLeft className={styles.icon} />
              <span>Respuesta indemiata</span>
            </div>
            <div className={styles.item}>
              <GrDocumentVerified className={styles.icon} />
              <span>4 Contrataciones</span>
            </div>
          </div>
          <div className={styles.features}>
            <div className={styles.item}>
              <MdVerified className={styles.icon} />
              <span>{user.profesionalData.categorias.join(", ")}</span>
            </div>
            <div className={styles.item}>
              <FaLocationDot className={styles.icon} />
              <span>{user.ciudad}</span>
            </div>
          </div>
          {!isViewingOwnProfile ? (
            <Link href="" onClick={handleButtonClick} legacyBehavior>
              {
                <a
                  className={`${
                    solicitudEnviada ? styles.sendit : styles.button
                  }`}
                  onClick={() => {
                    setSolicitudEnviada(true);
                  }}
                >
                  {solicitudEnviada ? (
                    <>
                      Solicitud enviada <FaCheck />
                    </>
                  ) : (
                    "Contratar"
                  )}
                </a>
              }
            </Link>
          ) : (
          <div className={styles.buttonDisabled}>Mi perfil</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
