import styles from './CardsSections.module.scss';
import { FaSort } from 'react-icons/fa';

import { useState, useEffect } from 'react';

import MarketPlaceCard from '@/components/MarketPlaceCard';
import { ArrowDropdown } from '@/components/Icons';
import { useRouter } from 'next/navigation';

const ORDENAMIENTOS = {
    DEFAULT: 'Más relevantes',
    PUNTUACION: 'Mayor puntuación',
    CERCANIA: 'Mas Cercano',
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

    useEffect(() => {
        if (sort === ORDENAMIENTOS.PUNTUACION) {
            setData((prevData) => [...prevData].sort((a, b) => b.puntuacion - a.puntuacion));
        } else if (sort === ORDENAMIENTOS.DEFAULT) {
            setData(originalData);
        }
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
                        {Object.entries(ORDENAMIENTOS).map(([key, value]) => (
                            <option key={key}>{value}</option>
                        ))}
                    </select>
                    {/* <ArrowDropdown otherStyles={styles.icon} onClick={() => setOpen(!open)} /> */}
                </div>
            </div>
            <div className={styles.cards}>
                {data === undefined ? (
                    <p>Cargando...</p>
                ) : data.length > 0 ? (
                    data.map((data) => <MarketPlaceCard key={data.id} data={data} pathname={pathname} />)
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
