"use client";

import React, { useState } from "react";
import styles from "./TrabajadoresPorOficio.module.scss";
import { FaSort } from "react-icons/fa";
import { useParams } from "next/navigation";
import TrabajadoresPorOficioList from "@/components/TrabajadoresPorOficioList/TrabajadoresPorOficioList";

const TrabajadoresPorOficio = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("laburos");
  const params = useParams()
  const oficio = params["nombre-oficio"]

  
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className={styles.trabajadores}>
      <div className={styles.container}>
        <span className={styles.breadcrumbs}>LABURAPP / TRABAJADORES / {oficio === "albanileria" ? "ALBAÑILERIA" : oficio.toUpperCase()}</span>
        <h1>{oficio === "albanileria" ? "Albañilería" : oficio.charAt(0).toUpperCase() + oficio.slice(1).toLowerCase()}</h1>
        <p>
          Explora los distintos profesionales en {oficio} que podrían darte una solución.
        </p>
        <div className={styles.menu}>
          <div className={styles.left}>
            <span>Presupuesto</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Aplicar</button>
          </div>
          <div className={styles.right}>
            <span className={styles.sortBy}>Ordenar por:</span>
            <span className={styles.sortType}>
              {sort === "laburos" ? "Más baratos" : "Más contratados"}
            </span>
            <FaSort className={styles.icon} onClick={() => setOpen(!open)} />
            {open && (
              <div className={styles.rightMenu}>
                {sort === "laburos" ? (
                  <span onClick={() => reSort("createdAt")}>
                    Más contratados
                  </span>
                ) : (
                  <span onClick={() => reSort("laburos")}>Más baratos</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.cards}>
            <TrabajadoresPorOficioList oficio={oficio}/>
        </div>
      </div>
    </div>
  );
};

export default TrabajadoresPorOficio;
