'use client';
import React, { useState, useEffect } from 'react';

import styles from '../../MarketplaceLayout.module.scss';

import { usePathname } from 'next/navigation';
import MarketPlaceHeroSection from '@/containers/marketplace-page/hero-section';
import MarketPlaceCardsSection from '@/containers/marketplace-page/cards-section';

const CATEGORIAS = {
    0: 'Todas las categorias',
    1: 'pintureria',
    2: 'herreria',
    3: 'plomeria',
    4: 'electricitstas',
    5: 'jardineria',
    6: 'mantenimiento',
    7: 'albanileria',
    8: 'carpinteria',
};

const getIdFromCategory = (categoryName) => {
    for (const [id, name] of Object.entries(CATEGORIAS)) {
        if (name === categoryName) {
            return Number(id);
        }
    }
    return null; // Devuelve null si la categoría no se encuentra
};

const TrabajadoresPorCategoria = ({ params }) => {
    const pathname = usePathname();
    const firstPath = pathname.split('/')[1];
    const { categoria } = params;
    const [trabajadores, setTrabajadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfesionales = async () => {
        try {
            const id = getIdFromCategory(categoria);
            if (id === null) {
                throw new Error('Categoría no encontrada');
            }
            const response = await fetch(`http://localhost:5000/api/users/trabajadores/categorias/${id}`);
            const data = await response.json();
            setTrabajadores(data);
        } catch (err) {
            setError('Error al obtener los trabajadores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categoria) fetchProfesionales();
    }, [categoria]);

    return (
        <>
            <MarketPlaceHeroSection pathname={firstPath} categoria={categoria} />
            {loading ? (
                <div className={styles.loading}>Cargando...</div>
            ) : (
                <MarketPlaceCardsSection
                    pathname={firstPath}
                    initialData={trabajadores}
                    categoria={categoria}
                />
            )}
        </>
    );
};

export default TrabajadoresPorCategoria;
