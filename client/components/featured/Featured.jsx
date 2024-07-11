import React from "react";
import "./Featured.scss";

const Featured = () => {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <div className="slogan">
            <h1>Soluciones al alcance</h1>
            <h1>de un <span className="click">Click.</span></h1>
          </div>
          <div className="search">
            <div className="searchInput">
              <img src="" alt="" />
              <input type="text" placeholder='"Reparación de heladeras..."' />
            </div>
            <button>Buscar</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Reparar mi celular</button>
            <button>Tengo una fuga de gas</button>
            <button>Servicio de jardinería</button>
          </div>
        </div>
        <div className="right">
          <img src="" alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
