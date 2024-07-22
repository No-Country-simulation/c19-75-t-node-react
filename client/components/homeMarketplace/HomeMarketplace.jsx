import React from "react";
import styles from "./HomeMarketplace.module.scss";
import { GrVmMaintenance } from "react-icons/gr";
import { FcElectricity } from "react-icons/fc";
import { MdOutlinePlumbing, MdConstruction, MdCarpenter } from "react-icons/md";
import { FaFire, FaPaintRoller } from "react-icons/fa";
import { GiGardeningShears, GiBlacksmith } from "react-icons/gi";


const homeMarketplace = () => {
  return (
    <div className={styles.homemarketplace}>
      <div className={styles.container}>
        <h1>Marketplace para trabajadores.</h1>
        <h2>Explora las distintas categorías y encontrá el laburo ideal para vos.</h2>
        <div className={styles.categories}>
          <div className={styles.button}>
            <h3 className={styles.title}>Mantenimiento</h3>
            <GrVmMaintenance className={styles.icon}/>
          </div>
          <div className={styles.button}>
            <h3 className={styles.title}>Electricista</h3>
            <FcElectricity className={styles.icon}/>
          </div>
          <div className={styles.button}>
            <h3 className={styles.title}>Plomería</h3>
            <MdOutlinePlumbing className={styles.icon}/>
          </div>
          <div className={styles.button}>
            <h3 className={styles.title}>Gasista</h3>
            <FaFire className={styles.icon}/>
          </div>
          <div className={styles.button}>
            <h3 className={styles.title}>Albañilería</h3>
            <MdConstruction className={styles.icon}/>
          </div>
          <div className={styles.button}>
            <h3 className={styles.title}>Jardinería</h3>
            <GiGardeningShears className={styles.icon}/>
          </div>
          <div className={styles.button}>
            <h3 className={styles.title}>Pinturería</h3>
            <FaPaintRoller className={styles.icon}/>
          </div>
          <div className={styles.button}>
            <h3 className={styles.title}>Carpintería</h3>
            <MdCarpenter className={styles.icon}/>
          </div>
          <div className={styles.button}>
            <h3 className={styles.title}>Herrería</h3>
            <GiBlacksmith className={styles.icon}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default homeMarketplace;
