import styles from './ContractDetailsSection.module.scss';
import Link from 'next/link';
import { useSessionContext } from '@/context/SessionContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EnlaceExterno } from '@/components/Icons';

// *contractDetailsSection
// Cliente { nombre, apellido, id }
// trabajador { nombre, apellido, id}
// laburo { categoria, status }

const tUserWatching = {
  Visitor: 'visitor',
  My: 'my',
  Client: 'client',
  Worker: 'worker',
  none: null,
};

const tStatus = {
  EnBusqueda: 'En busqueda',
  enbuesqueda: 'en busqueda',
  EnProceso: 'En proceso',
  Finalizado: 'Finalizado',
};

const tStatusWorker = {
  null: 'Postularse',
  Postulado: 'Postulado',
  Aceptado: 'Aceptado',
  Rechazado: 'Rechazado',
  Finalizado: 'Finalizado',
};

const ContractDetailsSection = ({ data, laburoId }) => {
  const router = useRouter();
  const [statusWorkerOnJob, setStatusWorkerOnJob] = useState(null); // null | Postulado | (Aceptado | Rechazado) | Contratado
  const [postulado, setPostulado] = useState(false);
  const { whoIsWatching } = useSessionContext();
  const userWatching = whoIsWatching(data.client_id);
  const [buttonText, setButtonText] = useState(data.job_status);

  useEffect(() => {
    fetch(`http://localhost:5000/api/postulaciones/postulado/${laburoId}/${data.worker_id}`)
      .then((response) => response.json())
      .then((statusWorker) => {
        if (statusWorker.length === 0) {
          setStatusWorkerOnJob(null);
          setPostulado(false);
          return;
        }
        setStatusWorkerOnJob(statusWorker[0].estado);
        if (statusWorker[0].estado !== null) {
          setPostulado(true);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el trabajo especifico:', error);
      });
  }, [laburoId]);

  useEffect(() => {
    if (data.job_status === tStatus.Finalizado || data.job_status === tStatus.EnProceso) {
      setButtonText(data.job_status);
    } else if (postulado && statusWorkerOnJob) {
      setButtonText(statusWorkerOnJob);
    } else {
      setButtonText('Postularme');
    }
  }, [statusWorkerOnJob, postulado, data.job_status]);

  const handleRedirect = () => {
    router.push('/signup?role=trabajador');
  };
  const handlePostular = () => {
    // TODO: endpoint para postularse
    setPostulado(true);
    setStatusWorkerOnJob('Postulado');
  };

  return (
    <section className={styles.contract}>
      <div className={styles.info}>
        <h4>Categoria</h4>
        <span className={styles.cat}>{data.cat_name}</span>
      </div>
      <div className={styles.info}>
        <h4>Cliente</h4>
        <Link href={`/usuario/${data.client_id}`} className={styles.link}>
          <span>
            {data.client_name} {data.client_lastname}
          </span>
          <EnlaceExterno />
        </Link>
      </div>
      {data?.job_status !== tStatus.EnBusqueda && data?.job_status !== tStatus.enbuesqueda && (
        <div className={styles.info}>
          <h4>Trabajor</h4>
          <Link href={`/usuario/${data.worker_id}`} className={styles.link}>
            <span>{data.worker_fullname}</span>
            <EnlaceExterno />
          </Link>
        </div>
      )}
      {data.job_status === tStatus.Finalizado || data.job_status === tStatus.EnProceso ? (
        <button className={`${styles.btn} ${styles.btnFinalizado}`}>{data.job_status}</button>
      ) : (
        <button
          className={`${styles.btn} ${
            postulado
              ? statusWorkerOnJob === 'Aceptado'
                ? styles.btnAceptado
                : statusWorkerOnJob === 'Rechazado'
                ? styles.btnRechazado
                : styles.btnPostulado
              : ''
          }`}
          onClick={userWatching === tUserWatching.Visitor ? handleRedirect : handlePostular}
        >
          {buttonText}
        </button>
      )}
    </section>
  );
};

export default ContractDetailsSection;
