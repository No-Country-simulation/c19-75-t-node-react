'use client';

import React, { useState, useEffect } from 'react';
import styles from './Trabajadores.module.scss';

import { usePathname } from 'next/navigation';
import MarketPlaceHeroSection from '@/containers/marketplace-page/hero-section';
import MarketPlaceCardsSection from '@/containers/marketplace-page/cards-section';

const Trabajadores = () => {
    const pathname = usePathname();
    const firstPath = pathname.split('/')[1];
    const [trabajadores, setTrabajadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }
    return (
        <>
            <MarketPlaceHeroSection pathname={firstPath} categoria={null} />
            {loading ? (
                <div className={styles.loading}>Cargando...</div>
            ) : (
                <MarketPlaceCardsSection pathname={firstPath} initialData={trabajadores} categoria={null} />
            )}
        </>
    );
};

export default Trabajadores;
