'use client';
import React, { useState, useEffect } from 'react';

import styles from '../../MarketplaceLayout.module.scss';

import { usePathname } from 'next/navigation';
import MarketPlaceHeroSection from '@/containers/marketplace-page/hero-section';
import MarketPlaceCardsSection from '@/containers/marketplace-page/cards-section';
import { CATEGORIES } from '@/types/types';

const getIdFromCategory = (categoryName) => {
    for (const [_, cat] of Object.entries(CATEGORIES)) {
        if (cat.url === categoryName) {
            return cat.id;
        }
    }
    return null; // Devuelve null si la categoría no se encuentra
};

const LaburosPorOficio = ({ params }) => {
    const pathname = usePathname();
    const firstPath = pathname.split('/')[1];
    const { categoria } = params;
    const [laburos, setLaburos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLaburos = async () => {
        try {
            const categoriaId = getIdFromCategory(categoria);
            if (categoriaId === null) {
                throw new Error('Categoría no encontrada');
            }
            const response = await fetch(
                `http://localhost:5000/api/trabajos/jobsMarketPlace/category/${categoriaId}`
            );
            const data = await response.json();
            setLaburos(data);
        } catch (error) {
            console.error('Error fetching trabajadores:', error);
            setError('Error al obtener los trabajadores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLaburos();
    }, []);

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }
    return (
        <>
            <MarketPlaceHeroSection pathname={firstPath} categoria={categoria} />
            {loading ? (
                <div className={styles.loading}>Cargando...</div>
            ) : (
                <MarketPlaceCardsSection pathname={firstPath} initialData={laburos} categoria={categoria} />
            )}
        </>
    );
};

export default LaburosPorOficio;
