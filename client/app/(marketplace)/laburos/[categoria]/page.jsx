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

const LaburosPorOficio = ({ params }) => {
    const pathname = usePathname();
    const firstPath = pathname.split('/')[1];
    const { categoria } = params;
    console.log('categoria:', categoria);
    const [laburos, setLaburos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLaburos = async () => {
        try {
            const id = getIdFromCategory(categoria);
            if (id === null) {
                throw new Error('Categoría no encontrada');
            }
            // TODO: Implement this
            // const response = await fetch('http://localhost:5000/api/trabajos/categorias/${id}');
            // const data = await response.json();
            // setLaburos(data);
        } catch (error) {
            // console.error('Error fetching trabajadores:', error);
            // setError('Error al obtener los trabajadores');
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
