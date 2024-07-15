import React from "react";
import "./Slide.scss";
import { Slider } from "infinite-react-carousel";
import Link from "next/link";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slide">
      <div className="container">
        <div className="title">
          <h1>
            Cual es tu <span>urgencia?</span>
            <div className="subtitle">
              Explora los distintos profesionales que pueden darle una solución
              a tus problemas.
              <Link href="/" legacyBehavior>
                <a>Ver todas</a>
              </Link>
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
