import React from "react";
import "./SlideTrabajos.scss";
import { Slider } from "infinite-react-carousel";
import Link from "next/link";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slide">
      <div className="container">
        <div className="title">
          <h1>
            Explorá los <span>laburos</span> ya realizados.
            <div className="subtitle">
              Estos son algunos de los laburos ya terminados por profesionales
              de Laburapp.
            </div>
          </h1>
        </div>
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
