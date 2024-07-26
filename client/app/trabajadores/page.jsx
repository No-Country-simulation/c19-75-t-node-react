'use client';

import React, { useState, useEffect } from 'react';
import styles from './Trabajadores.module.scss';
import { FaSort } from 'react-icons/fa';
import AllTrabajadoresCard from '@/components/allTrabajadoresCard/AllTrabajadoresCard';
import { laburos } from '@/data';

const Trabajadores = () => {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState('laburos');
    const [trabajadores, setTrabajadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    const fetchTrabajadores = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/trabajadores');
            const data = await response.json();
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

    useEffect(() => {
        if (sort === 'puntuacion') {
            setTrabajadores((prevTrabajadores) =>
                [...prevTrabajadores].sort((a, b) => b.puntuacion - a.puntuacion)
            );
        } else if (sort === 'laburos') {
            fetchTrabajadores();
        }
    }, [sort]);

    if (loading) {
        return <div className={styles.loading}>Cargando...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.trabajadores}>
            <div className={styles.container}>
                <span className={styles.breadcrumbs}>LABURAPP / TRABAJADORES / </span>
                <h1>Trabajadores</h1>
                <p>Explora los distintos profesionales de distintos rubros que podrían darte una solución.</p>
                <div className={styles.menu}>
                    <div className={styles.left}></div>
                    <div className={styles.right}>
                        <span className={styles.sortBy}>Ordenar por:</span>
                        <span className={styles.sortType}>
                            {sort === 'laburos' ? 'Predeterminado' : 'Mejor puntuación'}
                        </span>
                        <FaSort className={styles.icon} onClick={() => setOpen(!open)} />
                        {open && (
                            <div className={styles.rightMenu}>
                                {sort === 'laburos' ? (
                                    <span onClick={() => reSort('puntuacion')}>Mejor puntuación</span>
                                ) : (
                                    <span onClick={() => reSort('laburos')}>Predeterminado</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.cards}>
                    {laburos.map((laburo) => (
                        <AllTrabajadoresCard key={laburo.id} item={laburo} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trabajadores;
