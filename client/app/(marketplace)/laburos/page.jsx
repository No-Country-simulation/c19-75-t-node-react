'use client';

import React, { useState, useEffect } from 'react';
import styles from '../MarketplaceLayout.module.scss';

import { usePathname } from 'next/navigation';
import MarketPlaceHeroSection from '@/containers/marketplace-page/hero-section';
import MarketPlaceCardsSection from '@/containers/marketplace-page/cards-section';

const Laburos = () => {
    const pathname = usePathname();
    const firstPath = pathname.split('/')[1];
    const [laburos, setLaburos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLaburos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/trabajos/jobsMarketPlace');
            const data = await response.json();
            setLaburos(data);
        } catch (error) {
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
            <MarketPlaceHeroSection pathname={firstPath} categoria={null} />
            {loading ? (
                <div className={styles.loading}>Cargando...</div>
            ) : (
                <MarketPlaceCardsSection pathname={firstPath} initialData={laburos} categoria={null} />
            )}
        </>
    );
};

export default Laburos;
