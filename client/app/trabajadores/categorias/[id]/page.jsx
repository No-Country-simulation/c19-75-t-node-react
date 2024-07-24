'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaSort } from "react-icons/fa";
import TrabajadoresCard from "@/components/trabajadoresCard/TrabajadoresCard";
import styles from "@/app/trabajadores/Trabajadores.module.scss";

const categorias = {
    1: 'Pinturería',
    2: 'Herrería',
    3: 'Plomería/Gasista',
    4: 'Electricidad',
    5: 'Jardinería',
    6: 'Mantenimiento',
    7: 'Albañilería',
    8: 'Carpintería',
};

const Trabajadores = () => {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState("laburos");
    const { id } = useParams();
    const [profesionales, setProfesionales] = useState([]);
    const [loading, setLoading] = useState(true);

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    useEffect(() => {
        if (id) {
            const fetchProfesionales = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/users/trabajadores/categorias/${id}`);
                    if (!response.ok) {
                        throw new Error('Error');
                    }
                    const data = await response.json();
                    setProfesionales(data);
                } catch (err) {
                    console.error('Error:', err);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfesionales();
        }
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    const categoriaNombre = categorias[id];

    return (

        <div className={styles.trabajadores}>
            <div className={styles.container}>
                <span className={styles.breadcrumbs}>LABURAPP / TRABAJADORES / CATEGORIA / {categoriaNombre} </span>
                <h1>Todos los trabajadores</h1>
                <p>
                    Explora los distintos profesionales que podrían darte una solución.
                </p>
                <div className={styles.menu}>
                    <div className={styles.left}>
                    </div>
                    <div className={styles.right}>
                        <span className={styles.sortBy}>Ordenar por:</span>
                        <span className={styles.sortType}>
                            {sort === "laburos" ? "Predeterminado" : "Mejor puntuación"}
                        </span>
                        <FaSort className={styles.icon} onClick={() => setOpen(!open)} />
                        {open && (
                            <div className={styles.rightMenu}>
                                {sort === "laburos" ? (
                                    <span onClick={() => reSort("createdAt")}>
                                        Mejor puntuación
                                    </span>
                                ) : (
                                    <span onClick={() => reSort("laburos")}>Predeterminado</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.cards}>
                    {profesionales.length > 0 ? (
                        profesionales.map((prof) => (
                            <TrabajadoresCard
                                key={prof.profesional_id}
                                nombre={prof.nombre}
                                apellido={prof.apellido}
                                foto={prof.foto}
                                puntuacion={prof.puntuacion}
                                categoria={prof.categoria}
                                usuario_id={prof.usuario_id}
                                ciudad={prof.ciudad}
                                provincia={prof.provincia}
                            />
                        ))
                    ) : (
                        <p>Aún no hay profesionales en esta categoría.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Trabajadores;