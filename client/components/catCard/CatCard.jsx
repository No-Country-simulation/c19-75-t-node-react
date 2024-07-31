import React from 'react';
import styles from './CatCard.module.scss';
import Link from 'next/link';

const CatCard = ({ item }) => {
  return (
    <Link href={item?.url ? item?.url : '/'}>
      <div className={styles.catCard}>
        <img src={item.img} alt="" />
        <span className={styles.title}>{item.title}</span>
        <span className={styles.subtitle}>{item.subTitle}</span>
      </div>
    </Link>
  );
};

export default CatCard;
