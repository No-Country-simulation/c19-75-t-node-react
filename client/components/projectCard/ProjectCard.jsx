import React from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.scss';

const ProjectCard = ({ titulo, nombre, apellido, foto, puntuacion, comentario, fotos }) => {
  return (
    <Link href="/" className={styles.link}>
      <div className={styles.projectCard}>
        <img
          src={fotos && fotos.length > 0 ? fotos[0] : "img/asador.jpg"}
          alt={`Foto del trabajo`}
          className={styles.mainImage}
        />

        <div className={styles.info}>
          <img
            src={foto ? foto : '/usuario_default.png'}
            alt="Foto del profesional"
            className={styles.profileImage}
          />
          <div className={styles.texts}>
            <h2>{titulo}</h2>
            <span>{nombre} {apellido}</span>
            {puntuacion && <p>{puntuacion}★</p>}
            {comentario && <p>Comentario: {comentario}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
