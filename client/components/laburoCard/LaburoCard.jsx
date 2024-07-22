import React, { useState } from "react";
import styles from "./LaburoCard.module.scss";
import Link from "next/link";
import { FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";

const LaburoCard = ({ item }) => {
  const [fav, setFav] = useState(false);

  return (
    <div className={styles.link}>
      <div className={styles.laburoCard}>
        <img src={item.img} alt="" />
        <div className={styles.info}>
          <div className={styles.user}>
            <div className={styles.username}>
              <img src={item.pp} alt="" />
              <span>{item.username}</span>
            </div>
            <span>{item.ubi}</span>
          </div>
          <h2 className={styles.title}>{item.title}</h2>
          <p>{item.desc}</p>
          <div className={styles.star}>
            <FaStar className={styles.starIcon} />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className={styles.details}>
          <div
            onClick={() => {
              setFav(!fav);
            }}
          >
            {fav ? (
              <FaHeart className={styles.heart} />
            ) : (
              <FaRegHeart className={styles.heart} />
            )}
          </div>
          <Link href="/" className={styles.button}>
            Postularme
            <TbPlayerTrackNext className={styles.nextIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaburoCard;

