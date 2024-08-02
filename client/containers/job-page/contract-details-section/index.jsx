import styles from './ContractDetailsSection.module.scss';
import { Star } from '@/components/Icons';
import Link from 'next/link';
import { useSessionContext } from '@/context/SessionContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  EnProceso: 'En proceso',
  Finalizado: 'Finalizado',
};

const tStatusWorker = {
  Postulado: 'Postulado',
  Aceptado: 'Aceptado',
  Tabajando: 'Rechazado',
  Finalizado: 'Finalizado',
};

const ContractDetailsSection = ({ data }) => {
  const router = useRouter();
  // const [statusJob, setStatusJob] = useState(data.job_status || tStatus.EnBusqueda);
  // const [statusJobWorker, setStatusJobWorker] = useState(data.worker_status || tStatus.EnBusqueda);
  const [postulado, setPostulado] = useState(data.worker_status !== null && data.worker_status !== undefined);
  const { whoIsWatching } = useSessionContext();
  const userWatching = whoIsWatching(data.client_id);

  const handleRedirect = () => {
    router.push('/signup?role=trabajador');
  };
  const handleChangeStatus = () => {
    // TODO: endpoint para postularse
    setPostulado(!postulado);
  };

  const RednerButonStatus = () => {
    if (data.job_status === tStatus.Finalizado || data.job_status === tStatus.EnProceso) {
      return <button className={`${styles.btn} ${styles.btnFinalizado}`}>{data.job_status}</button>;
    }
    // Cuando esta en busqueda
    if (userWatching === tUserWatching.My) {
      return <button className={styles.btn}>{data.job_status}</button>;
    }
    if (userWatching === tUserWatching.Visitor) {
      return (
        <button className={styles.btn} onClick={handleRedirect}>
          {data.job_status}
        </button>
      );
    }
    return (
      <button
        className={`${styles.btn} ${postulado ? styles.btnPostulado : ''}`}
        onClick={handleChangeStatus}
      >
        {!postulado ? data.job_status : data.worker_status}
      </button>
    );
  };

  return (
    <section className={styles.contract}>
      <div className={styles.info}>
        <h4>Categoria</h4>
        <span className={styles.cat}>{data.cat_name}</span>
      </div>
      <div className={styles.info}>
        <h4>Cliente</h4>
        <Link href={`/usuario/${data.client_id}`}>
          {data.client_name} {data.client_lastname}
        </Link>
      </div>
      {data?.job_status !== tStatus.EnBusqueda && (
        <div className={styles.info}>
          <h4>Trabajor</h4>
          <Link href={`/usuario/${data.worker_id}`}>{data.worker_fullname}</Link>
        </div>
      )}
      <RednerButonStatus />
    </section>
  );
};

export default ContractDetailsSection;
