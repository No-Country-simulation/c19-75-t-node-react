'use client';
import styles from './LaburoPorOficioPage.module.scss';
// import { Slider } from "infinite-react-carousel/lib";
import { FaStar } from 'react-icons/fa';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { GrDocumentVerified } from 'react-icons/gr';
import { MdVerified } from 'react-icons/md';
import Link from 'next/link';

import { useState, useEffect } from 'react';

const LaburoPorOficioPage = ({ params }) => {
  const { categoria, laburoId } = params;
  const [laburoData, setLaburoData] = useState(null);

  console.log(laburoId);

  useEffect(() => {
    fetch(`http://localhost:5000/api/trabajos/${laburoId}`)
      .then((response) => response.json())
      .then((data) => {
        setLaburoData(data);
      })
      .catch((error) => console.error('Error al obtener el trabajo especifico:', error));
  }, []);

  console.log(' -> ', laburoData);
  return (
    <div className={styles.laburo}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.breadCrumbs}>LABURAPP / TRABAJADOR / {categoria.toUpperCase()} </span>
          <h1>Titulo del laburo que se ofrece</h1>
          <div className={styles.user}>
            <img className={styles.pp} src="" alt="" />
            <span>Nombre trabajador</span>
            <div className={styles.stars}>
              <FaStar className={styles.icon} />
              <FaStar className={styles.icon} />
              <FaStar className={styles.icon} />
              <FaStar className={styles.icon} />
              <FaStar className={styles.icon} />
              <span>5</span>
            </div>
          </div>
          <img src="" alt="" className={styles.slider} />
          {/*<Slider slidesToShow={1} arrowScroll={1} className={styles.slider}>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </Slider>*/}
          <h2 className={styles.titles}>Acerca del trabajo a realizar</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eius fugit voluptas, ipsa
            soluta sapiente debitis. Quos, alias asperiores molestiae quaerat ipsa ducimus dolores fugit
            praesentium magnam, a, itaque esse!
          </p>
          <div className={styles.trabajador}>
            <h2 className={styles.titles}>Acerca del contratista</h2>
            <div className={styles.user}>
              <img src="" alt="" />
              <div className={styles.info}>
                <span>Nombre contratista</span>
                <div className={styles.stars}>
                  <FaStar className={styles.icon} />
                  <FaStar className={styles.icon} />
                  <FaStar className={styles.icon} />
                  <FaStar className={styles.icon} />
                  <FaStar className={styles.icon} />
                  <span>5</span>
                </div>
                <Link href="/" className={styles.button}>
                  Contactar
                </Link>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.items}>
                <div className={styles.item}>
                  <span className={styles.title}>Nacionalidad</span>
                  <span className={styles.desc}>Argentina</span>
                </div>
                <div className={styles.item}>
                  <span className={styles.title}>Miembro desde</span>
                  <span className={styles.desc}>Agosto 2021</span>
                </div>
                <div className={styles.item}>
                  <span className={styles.title}>Último trabajo</span>
                  <span className={styles.desc}>1 semana</span>
                </div>
                <div className={styles.item}>
                  <span className={styles.title}>Vive en</span>
                  <span className={styles.desc}>Buenos Aires</span>
                </div>
              </div>
              <hr />
              <p>
                Mi nombre es Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla similique,
                laboriosam numquam officia non sit veritatis ab ut quasi quaerat blanditiis tempora distinctio
                accusantium obcaecati sunt! Architecto ea tenetur quos?
              </p>
            </div>
          </div>
          <div className={styles.reviews}>
            <h2 className={styles.titles}>Valoraciones</h2>
            <div className={styles.item}>
              <div className={styles.user}>
                <img className={styles.pp} src="" alt="" />
                <div className={styles.info}>
                  <span>Nombre trabajador</span>
                  <div className={styles.country}>
                    <img src="" alt="" />
                    <span>Argentina</span>
                  </div>
                </div>
              </div>
              <div className={styles.stars}>
                <FaStar className={styles.icon} />
                <FaStar className={styles.icon} />
                <FaStar className={styles.icon} />
                <FaStar className={styles.icon} />
                <FaStar className={styles.icon} />
                <span>5</span>
              </div>
              <p>
                Me parecio un buen trabajo en tiempo y forma Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Nulla quidem porro facere dolore rerum, inventore fugit commodi vero quos,
                tenetur eveniet provident deserunt sapiente praesentium dolorum nostrum vel sequi eius?
              </p>
              <div className={styles.helpful}>
                <BiLike className={styles.likes} />
                <span>1</span>
                <BiDislike className={styles.likes} />
                <span>0</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className={styles.right}>
          <h3>Titulo del laburo que se ofrece</h3>

          <p>
            Necesito pintar todas las paredes de mi casa, en total son 122 m2, solicito un presupuesto antes
            de recibir postulaciones. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sed
            blanditiis libero autem cupiditate illum explicabo odio repellat obcaecati consequuntur! Explicabo
            ipsa assumenda quod, ab unde ea quos incidunt eos. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Mollitia, at eius, sunt, fugiat quae quos quaerat nam modi rerum expedita
            assumenda. Dolores ut tenetur tempore obcaecati minus debitis possimus nulla.
          </p>
          <div className={styles.details}>
            <div className={styles.item}>
              <FaClockRotateLeft className={styles.icon} />
              <span>Respuesta indemiata</span>
            </div>
            <div className={styles.item}>
              <GrDocumentVerified className={styles.icon} />
              <span>4 Contrataciones</span>
            </div>
          </div>
          <div className={styles.features}>
            <div className={styles.item}>
              <MdVerified className={styles.icon} />
              <span>Detalle rapido</span>
            </div>
            <div className={styles.item}>
              <MdVerified className={styles.icon} />
              <span>Detalle rapido</span>
            </div>
            <div className={styles.item}>
              <MdVerified className={styles.icon} />
              <span>Detalle rapido</span>
            </div>
          </div>
          <Link href="/" legacyBehavior>
            <a className={styles.button}>Postularme</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaburoPorOficioPage;
