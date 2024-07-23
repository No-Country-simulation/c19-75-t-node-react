import { useState, useEffect } from 'react';
import TrabajadorPorOficioCard from '../TrabajadorPorOficioCard/TrabajadorPorOficioCard.jsx'
import styles from "./TrabajadoresPorOficioList.scss"
import { trabajadores } from '@/data';


const TrabajadoresPorOficioList = ({ oficio }) => {
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
      {trabajadores.map(trabajador => (
        <TrabajadorPorOficioCard key={trabajador.id} trabajador={trabajador} oficio={oficio} />
      ))}
    </div>
  );
}

export default TrabajadoresPorOficioList