import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import Link from "next/link";
import styles from "./OficioComp.module.scss";

const OficioComp = () => {
  return (
    <div className={styles.feature}>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1>Ofrecé tus laburos en Laburapp!</h1>
          <h2>Maximizá tu alcance y simplificá la búsqueda de clientes</h2>
          <div className={styles.title}>
            <CiCircleCheck className={styles.icon} />
            Fácil acceso a Clientes Potenciales
          </div>
          <p>
            Puedes llegar a una amplia audiencia de clientes que buscan expertos
            en tu oficio. Esto aumenta tus oportunidades de trabajo y te permite
            conectarte con quienes realmente necesitan tus habilidades.
          </p>
          <div className={styles.title}>
            <CiCircleCheck className={styles.icon} />
            Gestión simplificada de Proyectos
          </div>
          <p>
            Nuestra plataforma te permite administrar tus trabajos y clientes en
            un solo lugar. Desde la creación de presupuestos hasta la
            coordinación de citas.
          </p>
          <div className={styles.title}>
            <CiCircleCheck className={styles.icon} />
            Seguridad y Confianza en los Pagos
          </div>
          <p>
            Los pagos se liberan solo una vez que el trabajo es aprobado,
            asegurando que siempre recibas la compensación que mereces.
          </p>

          <Link href="/" legacyBehavior>
            <div className={styles.button}>Ofrecer mis Laburos</div>
          </Link>
        </div>
        <div className={styles.item}>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default OficioComp;

