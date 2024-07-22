"use client";

import React, { useState } from "react";
import styles from "./Trabajadores.module.scss";
import { FaSort } from "react-icons/fa";
import TrabajadoresCard from "@/components/trabajadoresCard/TrabajadoresCard";
import { laburos } from "@/data";

const Trabajadores = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("laburos");

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className={styles.trabajadores}>
      <div className={styles.container}>
        <span className={styles.breadcrumbs}>LABURAPP / TRABAJADORES / ALBAÑILERIA /</span>
        <h1>Albañiles</h1>
        <p>
          Explora los distintos profesionales en albañileria que podrían darte una solución.
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
          {laburos.map(laburo=>(
            <TrabajadoresCard key={laburo.id} item={laburo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trabajadores;
