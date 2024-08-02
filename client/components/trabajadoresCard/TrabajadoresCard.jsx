import React, { useState } from "react";
import Link from "next/link";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import styles from "./TrabajadoresCard.module.scss";

const TrabajadoresCard = ({ nombre, apellido, foto, puntuacion, categoria, usuario_id, ciudad, provincia }) => {

  const categoriaImagenes = {
    'Plomeria/Gasista': '/categorias/plomeria.jpg',
    Pintureria: '/categorias/pintureria.jpg',
    Herreria: '/categorias/herreria.jpg',
    Mantenimiento: '/categorias/mantenimiento.jpg',
    Electricidad: '/categorias/electricidad.jpg',
    Jardineria: '/categorias/jardineria.jpg',
    Albañileria: '/categorias/albañileria.jpg',
    Carpinteria: '/categorias/carpinteria.jpg',
  };

  const imagenCategoria = categoriaImagenes[categoria]
  const [fav, setFav] = useState(false);

  return (
    <div className={styles.link}>
      <div className={styles.trabajadoresCard}>
        <img src={imagenCategoria} alt={nombre} className={styles.image} />
        <div className={styles.info}>
          <div className={styles.user}>
            <img src={foto ? foto : "/usuario_default.png"}
              alt={nombre}
              className={styles.profilePic} />
            <span className={styles.username}>{nombre + ' ' + apellido}</span>
          </div>
          <div className={styles.star}>
            <FaStar className={styles.starIcon} />
            <span className={styles.rating}>{puntuacion || "No disponible"}</span>
          </div>
        </div>
        <hr className={styles.separator} />
        <p>{categoria}</p>
        <p>{ciudad + '/' + provincia}</p>
        <div className={styles.details}>
          <div
            onClick={() => {
              setFav(!fav);
            }}
            className={styles.favorite}
          >
            {fav ? <FaHeart className={styles.heart} /> : <FaRegHeart className={styles.heart} />}
          </div>
          <Link href={`/usuarios/${usuario_id}`} className={styles.button}>
            Ver Perfil
            <TbPlayerTrackNext className={styles.nextIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrabajadoresCard;

