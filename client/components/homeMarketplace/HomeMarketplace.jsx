import React from "react";
import styles from "./HomeMarketplace.module.scss";
import { GrVmMaintenance } from "react-icons/gr";
import { MdOutlinePlumbing, MdConstruction, MdCarpenter, MdElectricBolt } from "react-icons/md";
import { FaFire, FaPaintRoller } from "react-icons/fa";
import { GiGardeningShears, GiBlacksmith } from "react-icons/gi";
import Link from "next/link";

const homeMarketplace = () => {
  return (
    <div className={styles.homemarketplace}>
      <div className={styles.container}>
        <h1>Marketplace para trabajadores.</h1>
        <h2>
          Explorá las distintas categorías y encontrá el laburo ideal para vos.
        </h2>
        <Link href="/laburos" className={styles.button}>
          Explorar todos los laburos disponibles
        </Link>
        <div className={styles.categories}>
          <Link href="/laburos/mantenimiento" legacyBehavior>
            <a className={styles.button}>
              <GrVmMaintenance className={styles.icon} />
              <h3 className={styles.title}>Mantenimiento</h3>
            </a>
          </Link>
          <Link href="/laburos/electricista" legacyBehavior>
            <a className={styles.button}>
              <MdElectricBolt  className={styles.icon} />
              <h3 className={styles.title}>Electricista</h3>
            </a>
          </Link>
          <Link href="/laburos/plomeria" legacyBehavior>
            <a className={styles.button}>
              <MdOutlinePlumbing className={styles.icon} />
              <h3 className={styles.title}>Plomería</h3>
            </a>
          </Link>
          <Link href="/laburos/gasista" legacyBehavior>
            <a className={styles.button}>
              <FaFire className={styles.icon} />
              <h3 className={styles.title}>Gasista</h3>
            </a>
          </Link>
          <Link href="/laburos/albanileria" legacyBehavior>
            <a className={styles.button}>
              <MdConstruction className={styles.icon} />
              <h3 className={styles.title}>Albañilería</h3>
            </a>
          </Link>
          <Link href="/laburos/jardineria" legacyBehavior>
            <a className={styles.button}>
              <GiGardeningShears className={styles.icon} />
              <h3 className={styles.title}>Jardinería</h3>
            </a>
          </Link>
          <Link href="/laburos/pintureria" legacyBehavior>
            <a className={styles.button}>
              <FaPaintRoller className={styles.icon} />
              <h3 className={styles.title}>Pinturería</h3>
            </a>
          </Link>
          <Link href="/carpinteria" legacyBehavior>
            <a className={styles.button}>
              <MdCarpenter className={styles.icon} />
              <h3 className={styles.title}>Carpintería</h3>
            </a>
          </Link>
          <Link href="/herreria" legacyBehavior>
            <a className={styles.button}>
              <GiBlacksmith className={styles.icon} />
              <h3 className={styles.title}>Herrería</h3>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default homeMarketplace;
