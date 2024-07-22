"use client";

import React, { useState } from "react";
import styles from "./Laburos.module.scss";
import { FaSort } from "react-icons/fa";
import LaburoCard from "@/components/laburoCard/LaburoCard";
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
        <span className={styles.breadcrumbs}>LABURAPP / OFERTAS / ALBAÑILERIA /</span>
        <h1>Laburos de Albañilería</h1>
        <p>
          Explora los distintos laburos de albañileria a los que puedes
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
            <LaburoCard key={oferta.id} item={oferta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laburos;

