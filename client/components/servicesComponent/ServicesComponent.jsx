"use client";

import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import styles from "./ServicesComponent.module.scss";

const ServicesComponent = () => {
  return (
    <div className={styles.features}>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1>Todo un mundo de talento en oficios a tu alcance</h1>
          <div className={styles.title}>
            <CiCircleCheck className={styles.icon} />
            Lo mejor para cada presupuesto
          </div>
          <p>
            Encuentre servicios de alta calidad a todos los precios. Sin tarifas
            por hora, solo precios basados ​​en proyectos.
          </p>
          <div className={styles.title}>
            <CiCircleCheck className={styles.icon} />
            Trabajo de calidad realizado rápidamente
          </div>
          <p>
            Encuentre el profesional adecuado para comenzar a trabajar en su
            proyecto en cuestión de minutos.
          </p>
          <div className={styles.title}>
            <CiCircleCheck className={styles.icon} />
            Pagos protegidos, siempre
          </div>
          <p>
            Sepa siempre que pagará por adelantado. Su pago no se libera hasta
            que apruebe el trabajo.
          </p>
          <div className={styles.title}>
            <CiCircleCheck className={styles.icon} />
            Soporte 24 horas al día, 7 días a la semana
          </div>
          <p>
            Nuestro equipo de soporte está disponible para resolver tus dudas y
            asistirte en todo lo que necesites.
          </p>
        </div>
        <div className={styles.item}>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
