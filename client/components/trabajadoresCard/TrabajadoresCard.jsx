import React, { useState } from "react";
import Link from "next/link";
import { FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import styles from "./TrabajadoresCard.module.scss";

const TrabajadoresCard = ({ item }) => {
  const [fav, setFav] = useState(false);

  return (
    <div className={styles.link}>
      <div className={styles.trabajadoresCard}>
        <img src={item.img} alt="" className={styles.image} />
        <div className={styles.info}>
          <div className={styles.user}>
            <img src={item.pp} alt="" className={styles.profilePic} />
            <span className={styles.username}>{item.username}</span>
          </div>
          <p className={styles.description}>{item.desc}</p>
          <div className={styles.star}>
            <FaStar className={styles.starIcon} />
            <span className={styles.rating}>{item.star}</span>
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
  );
};

export default TrabajadoresCard;

