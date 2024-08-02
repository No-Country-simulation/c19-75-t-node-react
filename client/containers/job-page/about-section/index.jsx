import styles from './AboutSection.module.scss';

const AboutSection = ({ data }) => {
  return (
    <section className={styles.about}>
      <div className={styles.info}>
        <h1>{data.job_title}</h1>
        <hr></hr>
        <div className={styles.descContainer}>
          <h4>Acerca del trabajo</h4>
          <p>{data.job_desc}</p>
        </div>
        <div className={styles.ubiContainer}>
          <h4>Ubicacion</h4>
          <ul>
            <li className={styles.ubi}>
              {data.client_province}, {data.client_city}, {data.client_barrio}
            </li>
          </ul>
        </div>

        <div className={styles.imgsContainer}>
          <h4>Imagenes</h4>
          <div className={styles.imgs}>
            <img src={data?.foto ? data.img : ''} alt="SIN-IMAGEN" className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
