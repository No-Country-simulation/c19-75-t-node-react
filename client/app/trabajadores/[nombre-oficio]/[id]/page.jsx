import React from "react";
import styles from "./TrabajadorPorOficioPage.module.scss";
// import { Slider } from "infinite-react-carousel/lib";
import { FaStar } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GrDocumentVerified } from "react-icons/gr";
import { MdVerified } from "react-icons/md";
import Link from "next/link";

const TrabajadorPorOficioPage = ({ oficio }) => {
  return (
    <div className={styles.trabajo}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.breadCrumbs}>
            {" "}
            LABURAPP / TRABAJADOR / {oficio}
          </span>
          <h1>Titulo del servicio que ofrece</h1>
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
          <h2 className={styles.titles}>Acerca de sus trabajos</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            eius fugit voluptas, ipsa soluta sapiente debitis. Quos, alias
            asperiores molestiae quaerat ipsa ducimus dolores fugit praesentium
            magnam, a, itaque esse!
          </p>
          <div className={styles.trabajador}>
            <h2 className={styles.titles}>Acerca del trabajador</h2>
            <div className={styles.user}>
              <img src="" alt="" />
              <div className={styles.info}>
                <span>Nombre trabajador</span>
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
                Mi nombre es Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Nulla similique, laboriosam numquam officia non sit
                veritatis ab ut quasi quaerat blanditiis tempora distinctio
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
                  <span>Nombre cliente</span>
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
                Me parecio un buen trabajo en tiempo y forma Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Nulla quidem porro facere
                dolore rerum, inventore fugit commodi vero quos, tenetur eveniet
                provident deserunt sapiente praesentium dolorum nostrum vel
                sequi eius?
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
          
          <h3>Titulo del servicio que ofrece</h3>
          
          <p>
            Soy responsable de diagnosticar, reparar y mantener heladeras de
            diversos tipos y modelos, asegurando su correcto funcionamiento.
            Tengo sólidos conocimientos en sistemas de refrigeración y un
            enfoque orientado al cliente.
          </p>
          <div className={styles.details}>
            <div className={styles.item}>
              <FaClockRotateLeft className={styles.icon}/>
              <span>Respuesta indemiata</span>
            </div>
            <div className={styles.item}>
              <GrDocumentVerified className={styles.icon}/>
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
            <a className={styles.button}>Contratar</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrabajadorPorOficioPage;
