'use client';
// import styles from './HeaderSection.module.scss'
import styles from '@/app/(marketplace)/trabajadores/Trabajadores.module.scss';
import { FaSort } from 'react-icons/fa';

import { useState, useEffect } from 'react';

export default function MarketPlacePage({ pathname, initialData, categoria }) {
    console.log(pathname, initialData?.length, categoria);
    const [data, setData] = useState(initialData || []);
    const [originalData, _] = useState(initialData || []);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState('default');

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    useEffect(() => {
        if (sort === 'puntuacion') {
            setData((prevData) => [...prevData].sort((a, b) => b.puntuacion - a.puntuacion));
        } else if (sort === 'default') {
            setData(originalData);
        }
    }, [sort, originalData]);

    const getDescriptionText = () => {
        if (pathname === 'trabajadores') {
            if (categoria) {
                return `profesionales en ${categoria} que podrían darte una solución.`;
            } else {
                return 'profesionales que podrían darte una solución.';
            }
        } else {
            return `${pathname} en ${categoria}`;
        }
    };

    return (
        <div className={styles.container}>
            <span className={styles.breadcrumbs}>
                LABURAPP / {pathname.toUpperCase} / {categoria && `/ CATEGORIA / ${categoria?.toUpperCase()}`}
            </span>
            <h1>
                {categoria === null
                    ? `Todos los ${pathname}`
                    : categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()}
            </h1>
            <p>Explora los distintos {getDescriptionText()}</p>
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
                {data === undefined ? (
                    <p>Cargando...</p>
                ) : data.length > 0 ? (
                    <p>data</p>
                ) : (
                    <p>No hay {pathname} en esta categoría</p>
                )}
            </div>
        </div>
    );
}
