'use client';
import styles from './LaburoPorOficioPage.module.scss';

import ContractDetailsSection from '@/containers/job-page/contract-details-section';
import AboutSection from '@/containers/job-page/about-section';
import ComentSection from '@/containers/job-page/coment-section';

import Link from 'next/link';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSessionContext } from '@/context/SessionContext';

const tStatus = {
  EnBusqueda: 'En busqueda',
  EnProceso: 'En proceso',
  Finalizado: 'Finalizado',
};

const DataBasic = {
  job_id: null,
  job_title: 'Titulo del laburo que se ofrece',
  job_desc:
    'El cliente no ha proporcionado una descripción del trabajo. Por favor, contacte al cliente para obtener más información.',
  cat_name: 'Categoria',
  job_coment: 'Por el momento el cliente no ha valorado el trabajo',
  //"Excelente trabajo que hiciste al cortar el césped, Aprecio mucho tu profesionalismo y la calidad del trabajo realizado. Sin duda, recomendaré tus servicios a otros"
  job_rating: 5,
  client_name: 'Nombre',
  client_lastname: 'Apellido',
  client_province: 'Buenos Aires',
  client_city: 'La Plata',
  client_barrio: 'Los Hornos',
  client_id: null,
  worker_fullname: 'Nombre Apellido',
  worker_id: null,
  job_status: tStatus.Finalizado,
};

const LaburoPorOficioPage = ({ params }) => {
  const { laburoId } = params;
  const pathname = usePathname();
  const firstPath = pathname.split('/')[1];
  const secondPath = pathname.split('/')[2];
  const { isUserWatchingOwnPage } = useSessionContext();

  const [laburoData, setLaburoData] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [bodyData, setBodyData] = useState(null);
  const [comentData, setComentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/trabajos/${laburoId}`)
      .then((response) => response.json())
      .then((data) => {
        setLaburoData(data);
        // Filter data for ContractDetailsSection
        const newContractData = {
          cat_name: data?.categoria_nombre || DataBasic.cat_name,
          client_name: data?.cliente_nombre || DataBasic.client_name,
          client_lastname: data?.cliente_apellido || DataBasic.client_lastname,
          client_id: data?.cliente_id || DataBasic.client_id,
          worker_fullname: data?.profesional_nombre || DataBasic.worker_fullname,
          worker_id: data?.profesional_id || DataBasic.worker_id,
          job_status: data?.estado || DataBasic.job_status,
          // job_status: tStatus.Finalizado,
        };
        setContractData(newContractData);
        const newBodyData = {
          job_title: data?.titulo || DataBasic.job_title,
          job_desc: data?.descripcion || DataBasic.job_desc,
          job_coment: data?.comentario || DataBasic.job_coment,
          job_rating: data?.rating || DataBasic.job_rating,
          client_province: data?.provincia || DataBasic.client_province,
          client_city: data?.ciudad || DataBasic.client_city,
          client_barrio: data?.barrio || DataBasic.client_barrio,
        };
        setBodyData(newBodyData);
        const newComentData = {
          client_id: data?.cliente_id || DataBasic.client_id,
          client_name: data?.cliente_nombre || DataBasic.client_name,
          client_lastname: data?.cliente_apellido || DataBasic.client_lastname,
          job_rating: data?.rating || DataBasic.job_rating,
          job_coment: data?.comentario || DataBasic.job_coment,
        };
        setComentData(newComentData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener el trabajo especifico:', error);
        setLoading(true);
      });
  }, [laburoId]);

  useEffect(() => {
    if (laburoData) {
      setOwner(isUserWatchingOwnPage(laburoData?.client_id));
    }
  }, [laburoData]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <span className={styles.breadcrumbs}>
        LABURAPP / <Link href={`/${firstPath}`}>{firstPath.toUpperCase()}</Link> /{' '}
        <Link href={`/${firstPath}/${secondPath}`}>{secondPath.toUpperCase()}</Link>
      </span>
      <div className={styles.laburoSection}>
        <AboutSection data={bodyData} />
        <ContractDetailsSection data={contractData} laburoId={laburoId}/>
        {laburoData?.estado === tStatus.Finalizado && (
          <ComentSection data={comentData} isUserWatchingOwnPage={owner} />
        )}
      </div>
    </>
  );
};

export default LaburoPorOficioPage;

// return (
//   <div className={styles.laburo}>
//     <div className={styles.container}>
//       <div className={styles.left}>
//         <span className={styles.breadCrumbs}>LABURAPP / TRABAJADOR / {categoria.toUpperCase()} </span>
//         <h1>Titulo del laburo que se ofrece</h1>
//         <div className={styles.user}>
//           <img className={styles.pp} src="" alt="" />
//           <span>Nombre trabajador</span>
//           <div className={styles.stars}>
//             <FaStar className={styles.icon} />
//             <FaStar className={styles.icon} />
//             <FaStar className={styles.icon} />
//             <FaStar className={styles.icon} />
//             <FaStar className={styles.icon} />
//             <span>5</span>
//           </div>
//         </div>
//         <img src="" alt="" className={styles.slider} />
//         {/*<Slider slidesToShow={1} arrowScroll={1} className={styles.slider}>
//           <img src="" alt="" />
//           <img src="" alt="" />
//           <img src="" alt="" />
//           <img src="" alt="" />
//         </Slider>*/}
//         <h2 className={styles.titles}>Acerca del trabajo a realizar</h2>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eius fugit voluptas, ipsa
//           soluta sapiente debitis. Quos, alias asperiores molestiae quaerat ipsa ducimus dolores fugit
//           praesentium magnam, a, itaque esse!
//         </p>
//         <div className={styles.trabajador}>
//           <h2 className={styles.titles}>Acerca del contratista</h2>
//           <div className={styles.user}>
//             <img src="" alt="" />
//             <div className={styles.info}>
//               <span>Nombre contratista</span>
//               <div className={styles.stars}>
//                 <FaStar className={styles.icon} />
//                 <FaStar className={styles.icon} />
//                 <FaStar className={styles.icon} />
//                 <FaStar className={styles.icon} />
//                 <FaStar className={styles.icon} />
//                 <span>5</span>
//               </div>
//               <Link href="/" className={styles.button}>
//                 Contactar
//               </Link>
//             </div>
//           </div>
//           <div className={styles.box}>
//             <div className={styles.items}>
//               <div className={styles.item}>
//                 <span className={styles.title}>Nacionalidad</span>
//                 <span className={styles.desc}>Argentina</span>
//               </div>
//               <div className={styles.item}>
//                 <span className={styles.title}>Miembro desde</span>
//                 <span className={styles.desc}>Agosto 2021</span>
//               </div>
//               <div className={styles.item}>
//                 <span className={styles.title}>Último trabajo</span>
//                 <span className={styles.desc}>1 semana</span>
//               </div>
//               <div className={styles.item}>
//                 <span className={styles.title}>Vive en</span>
//                 <span className={styles.desc}>Buenos Aires</span>
//               </div>
//             </div>
//             <hr />
//             <p>
//               Mi nombre es Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla similique,
//               laboriosam numquam officia non sit veritatis ab ut quasi quaerat blanditiis tempora distinctio
//               accusantium obcaecati sunt! Architecto ea tenetur quos?
//             </p>
//           </div>
//         </div>
//         <div className={styles.reviews}>
//           <h2 className={styles.titles}>Valoraciones</h2>
//           <div className={styles.item}>
//             <div className={styles.user}>
//               <img className={styles.pp} src="" alt="" />
//               <div className={styles.info}>
//                 <span>Nombre trabajador</span>
//                 <div className={styles.country}>
//                   <img src="" alt="" />
//                   <span>Argentina</span>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.stars}>
//               <FaStar className={styles.icon} />
//               <FaStar className={styles.icon} />
//               <FaStar className={styles.icon} />
//               <FaStar className={styles.icon} />
//               <FaStar className={styles.icon} />
//               <span>5</span>
//             </div>
//             <p>
//               Me parecio un buen trabajo en tiempo y forma Lorem ipsum dolor, sit amet consectetur
//               adipisicing elit. Nulla quidem porro facere dolore rerum, inventore fugit commodi vero quos,
//               tenetur eveniet provident deserunt sapiente praesentium dolorum nostrum vel sequi eius?
//             </p>
//             <div className={styles.helpful}>
//               <BiLike className={styles.likes} />
//               <span>1</span>
//               <BiDislike className={styles.likes} />
//               <span>0</span>
//             </div>
//           </div>
//           <hr />
//         </div>
//       </div>
//       <div className={styles.right}>
//         <h3>Titulo del laburo que se ofrece</h3>

//         <p>
//           Necesito pintar todas las paredes de mi casa, en total son 122 m2, solicito un presupuesto antes
//           de recibir postulaciones. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sed
//           blanditiis libero autem cupiditate illum explicabo odio repellat obcaecati consequuntur! Explicabo
//           ipsa assumenda quod, ab unde ea quos incidunt eos. Lorem ipsum, dolor sit amet consectetur
//           adipisicing elit. Mollitia, at eius, sunt, fugiat quae quos quaerat nam modi rerum expedita
//           assumenda. Dolores ut tenetur tempore obcaecati minus debitis possimus nulla.
//         </p>
//         <div className={styles.details}>
//           <div className={styles.item}>
//             <FaClockRotateLeft className={styles.icon} />
//             <span>Respuesta indemiata</span>
//           </div>
//           <div className={styles.item}>
//             <GrDocumentVerified className={styles.icon} />
//             <span>4 Contrataciones</span>
//           </div>
//         </div>
//         <div className={styles.features}>
//           <div className={styles.item}>
//             <MdVerified className={styles.icon} />
//             <span>Detalle rapido</span>
//           </div>
//           <div className={styles.item}>
//             <MdVerified className={styles.icon} />
//             <span>Detalle rapido</span>
//           </div>
//           <div className={styles.item}>
//             <MdVerified className={styles.icon} />
//             <span>Detalle rapido</span>
//           </div>
//         </div>
//         <Link href="/" legacyBehavior>
//           <a className={styles.button}>Postularme</a>
//         </Link>
//       </div>
//     </div>
//   </div>
// );
