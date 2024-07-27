import { useState, useEffect } from 'react';
import styles from "./LaburosPorOficioList.module.scss"
import { ofertas } from '@/data';
import LaburoPorOficioCard from '../laburoPorOficioCard/LaburoPorOficioCard.jsx';


const LaburosPorOficioList = ({ oficio }) => {
  // const [trabajadores, setTrabajadores] = useState([]);

  // llamada a la API para obtener los trabajadores del oficio específico
  {/*useEffect(() => {
    const fetchTrabajadores = async () => {
      const res = await fetch(`/api/trabajadores?oficio=${oficio}`);
      const data = await res.json();
      setTrabajadores(data);
    };

    fetchTrabajadores();
  }, [oficio]);*/}

  return (
    <div className={styles.cards}>
      {ofertas.map(oferta => (
        <LaburoPorOficioCard key={oferta.id} oferta={oferta} oficio={oficio} item={oferta} />
      ))}
    </div>
  );
}

export default LaburosPorOficioList