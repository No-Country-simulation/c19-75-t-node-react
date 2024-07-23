import Link from 'next/link';
import styles from "./TrabajadorPorOficioCard.module.scss"
import React, { useState } from "react";
import { FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";

const TrabajadorPorOficioCard = ({ trabajador, oficio }) => {
  const [fav, setFav] = useState(false);


  return (
    <Link href={`/trabajadores/${oficio}/${trabajador.id}`}>
      <div className={styles.link}>
      <div className={styles.trabajadoresCard}>
        <img src={trabajador.img} alt="" className={styles.image} />
        <div className={styles.info}>
          <div className={styles.user}>
            <img src={trabajador.pp} alt="" className={styles.profilePic} />
            <span className={styles.username}>{trabajador.username}</span>
          </div>
          <p className={styles.description}>{trabajador.desc}</p>
          <div className={styles.star}>
            <FaStar className={styles.starIcon} />
            <span className={styles.rating}>{trabajador.star}</span>
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.details}>
          <div
            onClick={() => {
              setFav(!fav);
            }}
            className={styles.favorite}
          >
            {fav ? <FaHeart className={styles.heart} /> : <FaRegHeart className={styles.heart} />}
          </div>
          <Link href="/" className={styles.button}>
            Contratar
            <TbPlayerTrackNext className={styles.nextIcon} />
          </Link>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default TrabajadorPorOficioCard

