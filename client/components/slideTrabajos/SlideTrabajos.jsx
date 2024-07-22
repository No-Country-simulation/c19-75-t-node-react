import React from "react";
import { Slider } from "infinite-react-carousel";
import Link from "next/link";
import styles from "./SlideTrabajos.module.scss";

const SlideTrabajos = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>
            Explorá los <span className={styles.highlight}>laburos</span> ya realizados.
            <div className={styles.subtitle}>
              Estos son algunos de los laburos ya terminados por profesionales de Laburapp.
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

export default SlideTrabajos;

