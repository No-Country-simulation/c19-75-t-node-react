"use client";

import React, { useState } from "react";
import styles from "./Laburos.module.scss";
import { FaSort } from "react-icons/fa";
import AllLaburosCard from "@/components/allLaburosCard/AllLaburosCard";
import { ofertas } from "@/data";

const Laburos = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("laburos");

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className={styles.laburos}>
      <div className={styles.container}>
        <span className={styles.breadcrumbs}>LABURAPP / LABUROS /</span>
        <h1>Laburos </h1>
        <p>
          Explora todos los laburos disponibles a los que puedes
          postularte.
        </p>
        <div className={styles.menu}>
          {/*<div className={styles.left}>
            <span>Presupuesto</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Aplicar</button>
          </div>*/}
          <div className={styles.right}>
            <span className={styles.sortBy}>Ordenar por:</span>
            <span className={styles.sortType}>
              {sort === "laburos" ? "Más valorados" : "Más cercanos"}
            </span>
            <FaSort className={styles.icon} onClick={() => setOpen(!open)} />
            {open && (
              <div className={styles.rightMenu}>
                {sort === "laburos" ? (
                  <span onClick={() => reSort("createdAt")}>
                    Más cercanos
                  </span>
                ) : (
                  <span onClick={() => reSort("laburos")}>Más valorados</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.cards}>
          {ofertas.map(oferta=>(
            <AllLaburosCard key={oferta.id} item={oferta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laburos;

