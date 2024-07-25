"use client";

import React, { useState } from "react";
import styles from "./LaburosPorOficio.module.scss";
import { FaSort } from "react-icons/fa";
import { useParams } from "next/navigation";
import LaburosPorOficioList from "@/components/laburosPorOficioList/LaburosPorOficioList";


const LaburosPorOficio = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("laburos");
  const params = useParams()
  const oficio = params["laburosPorOficio"]
  
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className={styles.laburos}>
      <div className={styles.container}>
        <span className={styles.breadcrumbs}>LABURAPP / LABUROS / {oficio === "albanileria" ? "ALBAÑILERIA" : oficio.toUpperCase()}</span>
        <h1>{oficio === "albanileria" ? "Albañilería" : oficio.charAt(0).toUpperCase() + oficio.slice(1).toLowerCase()}</h1>
        <p>
          Explora los distintos laburos de {oficio} a los que podrías postularte.
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
            <LaburosPorOficioList oficio={oficio}/>
        </div>
      </div>
    </div>
  );
};

export default LaburosPorOficio;
