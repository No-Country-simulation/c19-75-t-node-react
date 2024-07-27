'use client';

import React, { useState, useEffect } from 'react';
import styles from './Trabajadores.module.scss';
import TrabajadoresPage from '@/containers/trabajadores-page';

const Trabajadores = () => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrabajadores = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/trabajadores');
            const data = await response.json();
            console.log(data);
            setTrabajadores(data);
        } catch (error) {
            console.error('Error fetching trabajadores:', error);
            setError('Error al obtener los trabajadores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrabajadores();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Cargando...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return <TrabajadoresPage inicialTrabajadores={trabajadores} categoria={null} />;
};

export default Trabajadores;
