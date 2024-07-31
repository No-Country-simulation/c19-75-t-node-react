import React from 'react';
import styles from './HomeMarketplace.module.scss';

import {
  Mantenimiento,
  Electricista,
  Plomeria,
  Gasista,
  Albanileria,
  Jardineria,
  Pintureria,
  Carpinteria,
  Herreria,
} from '@/components/Icons';
import Link from 'next/link';
import { CATEGORIES } from '@/types/types';
import { GrVmMaintenance } from 'react-icons/gr';
const iconMpa = {
  mantenimiento: Mantenimiento,
  electricidad: Electricista,
  plomeria: Plomeria,
  gasista: Gasista,
  albanileria: Albanileria,
  jardineria: Jardineria,
  pintureria: Pintureria,
  carpinteria: Carpinteria,
  herreria: Herreria,
};

const homeMarketplace = () => {
  const renderCategories = () => {
    return CATEGORIES.map((category) => {
      const Icon = iconMpa[category.url];
      return (
        <Link key={category.url} href={`/laburos/${category.url}`} className={styles.categoryCard}>
          {Icon && <Icon otherStyles={styles.icon} />}
          <h3 className={styles.title}>{category.name}</h3>
        </Link>
      );
    });
  };
  return (
    <div className={styles.homemarketplace}>
      <div className={styles.container}>
        <h1>Marketplace para trabajadores.</h1>
        <h2>Explorá las distintas categorías y encontrá el laburo ideal para vos.</h2>
        <Link href="/laburos" className={styles.button}>
          Explorar todos los laburos disponibles
        </Link>
        <div className={styles.categories}>{renderCategories()}</div>
      </div>
    </div>
  );
};

export default homeMarketplace;
