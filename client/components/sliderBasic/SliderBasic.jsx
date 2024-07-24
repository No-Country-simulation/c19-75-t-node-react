import React, { useState, useEffect, useRef } from 'react';
import styles from './SliderBasic.module.scss';

const SliderBasic = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const slidesToShow = 4; // Número de elementos a mostrar
    const totalItems = items.length;

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none'; // Desactivar la transición al iniciar
            setCurrentIndex(slidesToShow); // Posicionar en la primera copia de los elementos
        }
    }, [slidesToShow]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'transform 0.5s ease-in-out'; // Activar la transición
        }
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            if (newIndex >= totalItems + slidesToShow) {
                return slidesToShow; // Volver a la primera copia de los elementos
            }
            return newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            if (newIndex < slidesToShow) {
                return totalItems; // Ir a la última copia de los elementos
            }
            return newIndex;
        });
    };

    return (
        <div className={styles.slide}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>
                        Explorá los <span className={styles.highlight}>laburos</span> ya realizados.
                        <div className={styles.subtitle}>
                            Estos son algunos de los laburos ya terminados por profesionales de Laburapp.
                        </div>
                    </h1>
                </div>
            </div>
            <div className={styles.sliderWrapper}>
                <button className={styles.prevButton} onClick={prevSlide}>
                    &#10094;
                </button>
                <div
                    className={styles.slider}
                    ref={sliderRef}
                    style={{ transform: `translateX(-${(currentIndex - slidesToShow) * (100 / slidesToShow)}%)` }}
                >
                    {/* Duplicar los elementos para la transición infinita */}
                    {[...items.slice(totalItems - slidesToShow), ...items, ...items.slice(0, slidesToShow)].map((item, index) => (
                        <div
                            key={index}
                            className={styles.slide}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <button className={styles.nextButton} onClick={nextSlide}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default SliderBasic;