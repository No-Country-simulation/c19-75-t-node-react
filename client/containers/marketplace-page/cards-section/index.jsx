import styles from './CardsSections.module.scss';
import { FaSort } from 'react-icons/fa';

import { useState, useEffect } from 'react';

import MarketPlaceCard from '@/components/MarketPlaceCard';
import { ArrowDropdown } from '@/components/Icons';
import { useRouter } from 'next/navigation';

const ORDENAMIENTOS = {
    DEFAULT: 'Más relevantes',
    CERCANIA: 'Mas Cercano',
};

const ORDENAMIENTOS_WORKERS = {
    ...ORDENAMIENTOS,
    PUNTUACION: 'Mayor puntuación',
    CANT_TRABAJOS: 'Cantidad de trabajos',
};

const CATEGORIAS = {
    0: 'Todas las categorias',
    1: 'Pintureria',
    2: 'Herreria',
    3: 'Plomeria',
    4: 'Electricitstas',
    5: 'Jardineria',
    6: 'Mantenimiento',
    7: 'Albanileria',
    8: 'Carpinteria',
};

const MarketPlaceCardsSection = ({ pathname, initialData, categoria }) => {
    const router = useRouter();
    const [data, setData] = useState(initialData || []);
    const [originalData, _] = useState(initialData || []);
    const [sort, setSort] = useState(ORDENAMIENTOS.DEFAULT);

    const handleSort = (event) => {
        const nuevaOpcion = event.target.value;
        setSort(nuevaOpcion);
    };

    const handleFilter = (event) => {
        const nuevaOpcion = event.target.value.toLowerCase();
        if (nuevaOpcion === CATEGORIAS[0]) router.push(`/${pathname}`);
        else router.push(`/${pathname}/${nuevaOpcion}`);
    };

    const sortByRating = () =>
        setData((prevData) => [...prevData].sort((a, b) => b.puntuacion - a.puntuacion));
    const sortByCantWorks = () =>
        setData((prevData) => [...prevData].sort((a, b) => b.cant_trabajos - a.cant_trabajos));
    // const sortByDistance = () => {}
    const sortByDefault = () => setData(originalData);

    useEffect(() => {
        if (sort === ORDENAMIENTOS.PUNTUACION) sortByRating();
        else if (sort === ORDENAMIENTOS.CANT_TRABAJOS) sortByCantWorks();
        // else if (sort === ORDENAMIENTOS.CERCANIA) sortByDistance();
        else if (sort === ORDENAMIENTOS.DEFAULT) sortByDefault();
    }, [sort, originalData]);

    return (
        <section className={styles.cards_section}>
            <div className={styles.menu}>
                <div className={styles.right}>
                    {!categoria && (
                        <>
                            <span className={styles.sortBy}>Categorias</span>
                            <select className={styles.sortType} name="sort" id="sort" onChange={handleFilter}>
                                {Object.entries(CATEGORIAS).map(([key, value]) => (
                                    <option key={key}>{value}</option>
                                ))}
                            </select>
                        </>
                    )}
                    <span className={styles.sortBy}>Ordenar por</span>
                    <select className={styles.sortType} name="sort" id="sort" onChange={handleSort}>
                        {Object.entries(pathname === 'laburos' ? ORDENAMIENTOS : ORDENAMIENTOS_WORKERS).map(
                            ([key, value]) => (
                                <option key={key}>{value}</option>
                            )
                        )}
                    </select>
                </div>
            </div>
            <div className={styles.cards}>
                {data === undefined ? (
                    <p>Cargando...</p>
                ) : data.length > 0 ? (
                    data.map((item, idx) => (
                        <MarketPlaceCard key={item.usuario_id + '_' + idx} data={item} pathname={pathname} />
                    ))
                ) : (
                    <p>
                        No hay {pathname} {categoria && 'esta categoría'}
                    </p>
                )}
            </div>
        </section>
    );
};

export default MarketPlaceCardsSection;
