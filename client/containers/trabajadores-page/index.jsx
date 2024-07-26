'use client';
// import styles from './HeaderSection.module.scss'
import styles from '@/app/trabajadores/Trabajadores.module.scss';
import { FaSort } from 'react-icons/fa';

import { useState, useEffect } from 'react';
import TrabajadorCard from '@/components/TrabajadorCard';

export default function TrabajadoresPage({ inicialTrabajadores, categoria }) {
    console.log(inicialTrabajadores);
    const [trabajadores, setTrabajadores] = useState(inicialTrabajadores || []);
    const [originalTrabajadores, _] = useState(inicialTrabajadores || []);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState('default');

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    useEffect(() => {
        if (sort === 'puntuacion') {
            setTrabajadores((prevTrabajadores) =>
                [...prevTrabajadores].sort((a, b) => b.puntuacion - a.puntuacion)
            );
        } else if (sort === 'default') {
            setTrabajadores(originalTrabajadores);
        }
    }, [sort, originalTrabajadores]);

    return (
        <div className={styles.container}>
            <span className={styles.breadcrumbs}>
                LABURAPP / TRABAJADORES / CATEGORIA / {categoria?.toUpperCase()}
            </span>
            <h1>
                {categoria === null
                    ? 'Todos los trabajadores'
                    : categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()}
            </h1>
            <p>
                Explora los distintos profesionales {categoria && `en ${categoria}`} que podrían darte una
                solución.
            </p>
            <div className={styles.menu}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                    <span className={styles.sortBy}>Ordenar por:</span>
                    <span className={styles.sortType}>
                        {sort === 'default' ? 'Predeterminado' : 'Mejor puntuación'}
                    </span>
                    <FaSort className={styles.icon} onClick={() => setOpen(!open)} />
                    {open && (
                        <div className={styles.rightMenu}>
                            {sort === 'default' ? (
                                <span onClick={() => reSort('puntuacion')}>Mejor puntuación</span>
                            ) : (
                                <span onClick={() => reSort('default')}>Predeterminado</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.cards}>
                {trabajadores === undefined ? (
                    <p>Cargando...</p>
                ) : trabajadores.length > 0 ? (
                    trabajadores.map((trabajador) => (
                        <TrabajadorCard key={trabajador.id} trabajador={trabajador} />
                    ))
                ) : (
                    <p>No hay trabajadores en esta categoría</p>
                )}
            </div>
        </div>
    );
}
