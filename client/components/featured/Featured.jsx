import React from "react";
import styles from "./Featured.module.scss";
import { IoSearch } from "react-icons/io5";


const Featured = () => {
  return (
    <div className={styles.featured}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.slogan}>
            <h1>Soluciones al alcance</h1>
            <h1>de un <span className={styles.click}>Click.</span></h1>
          </div>
          <div className={styles.search}>
            <div className={styles.searchInput}>
              <IoSearch className={styles.icon} />
              <input type="text" placeholder='"Reparación de heladeras..."' />
            </div>
            <button>Buscar</button>
          </div>
          <div className={styles.popular}>
            <span>Popular:</span>
            <button>Reparar mi celular</button>
            <button>Tengo una fuga de gas</button>
            <button>Servicio de jardinería</button>
          </div>
        </div>
        <div className={styles.right}>
          <img src="" alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
