import Link from 'next/link';
import styles from './TrabajadorPorOficioCard.module.scss';
import React, { useState } from 'react';
import { FaHeart, FaStar, FaRegHeart } from 'react-icons/fa';
import { TbPlayerTrackNext } from 'react-icons/tb';

const TrabajadorCard = ({ trabajador, oficio }) => {
    const [fav, setFav] = useState(false);

    return (
        <div className={styles.link}>
            <div className={styles.trabajadoresCard}>
                <img src={trabajador.foto} alt="" className={styles.image} />
                <div className={styles.info}>
                    <div className={styles.user}>
                        <img src={trabajador.pp} alt="" className={styles.profilePic} />
                        {/* FIXME: que es .pp */}
                        <span className={styles.username}>{trabajador.nombre}</span>
                    </div>
                    <p className={styles.description}>
                        {trabajador?.description ? trabajador?.description : 'No posee descripcion'}
                    </p>
                    <div className={styles.star}>
                        <FaStar className={styles.starIcon} />
                        <span className={styles.rating}>{trabajador.puntuacion}</span>
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
                    <Link href={`/usuario/${trabajador.usuario_id}`} className={styles.button}>
                        Contratar
                        <TbPlayerTrackNext className={styles.nextIcon} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrabajadorCard;
