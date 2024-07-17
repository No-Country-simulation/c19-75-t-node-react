"use client";

import React, { useState } from "react";
import "./Laburos.scss";
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
    <div className="laburos">
      <div className="container">
        <span className="breadcrumbs">LABURAPP / OFERTAS / ALBAÑILERIA /</span>
        <h1>Laburos de Albañilería</h1>
        <p>
          Explora los distintos laburos de albañileria a los que puedes
          postularte.
        </p>
        <div className="menu">
          {/*<div className="left">
            <span>Presupuesto</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Aplicar</button>
          </div>*/}
          <div className="right">
            <span className="sortBy">Ordenar por:</span>
            <span className="sortType">
              {sort === "laburos" ? "Más valorados" : "Más cercanos"}
            </span>
            <FaSort className="icon" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
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
        <div className="cards">
          {ofertas.map(oferta=>(
            <LaburoCard key={oferta.id} item={oferta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laburos;
