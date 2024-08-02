import styles from './ComentSection.module.scss';
import { useState } from 'react';

import { Star } from '@/components/Icons';

const ComentSection = ({ data, isUserWatchingOwnPage }) => {
  const [rating, setRating] = useState(0); // Estado para la puntuación
  // isUserWatchingOwnPage = true;

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  return (
    <section className={styles.coment}>
      {isUserWatchingOwnPage ? (
        <form action="" type="submit" className={styles.form}>
          <div className={styles.title}>
            <h4>
              Valoracion de {data.client_name} {data.client_lastname}
            </h4>
          </div>
          <div className={styles.rating}>
            <label htmlFor="">Puntaje</label>
            <Star otherStyles={styles.star} />
            <select id="rating" value={rating} onChange={handleRatingChange}>
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          {/* <p>¿Cómo valorarías el trabajo realizado?</p> */}
          <hr />
          <label htmlFor="coment"></label>
          <textarea
            name="coment"
            id="coment"
            cols="30"
            rows="10"
            placeholder="Escribe un comentario sobre el trabajo realizado."
            className={styles.textarea}
          ></textarea>
          <button className={styles.btn}>Valorar Trabajo</button>
        </form>
      ) : (
        <div className={styles.comentWorkerView}>
          <h4 className={styles.title}>
            Valoracion de {data.client_name} {data.client_lastname}
          </h4>
          <div className={styles.rating}>
            <p>{data.job_rating}</p>
            <Star otherStyles={styles.star} />
          </div>
          <hr className={styles.hr} />
          <p>{data.job_coment}</p>
        </div>
      )}
    </section>
  );
};

export default ComentSection;
