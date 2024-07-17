"use client";

import React, { useState } from "react";
import "./Trabajadores.scss";
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
    <div className="trabajadores">
      <div className="container">
        <span className="breadcrumbs">LABURAPP / TRABAJADORES / ALBAÑILERIA /</span>
        <h1>Albañiles</h1>
        <p>
          Explora los distintos profesionales en albañileria que podrían darte una solución.
        </p>
        <div className="menu">
          <div className="left">
            <span>Presupuesto</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Aplicar</button>
          </div>
          <div className="right">
            <span className="sortBy">Ordenar por:</span>
            <span className="sortType">
              {sort === "laburos" ? "Más baratos" : "Más contratados"}
            </span>
            <FaSort className="icon" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
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
        <div className="cards">
          {laburos.map(laburo=>(
            <TrabajadoresCard key={laburo.id} item={laburo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trabajadores;
