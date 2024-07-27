import React from 'react';
import { Slider } from 'infinite-react-carousel';
import Link from 'next/link';
import styles from './Slide.module.scss';

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
    return (
        <div className={styles.slide}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>
                        Cual es tu <span className={styles.urgency}>urgencia?</span>
                        <div className={styles.subtitle}>
                            Explora los distintos profesionales que pueden darle una solución a tu problema.
                        </div>
                        <Link href="/trabajadores" legacyBehavior>
                            <a>Ver todos los trabajadores</a>
                        </Link>
                    </h1>
                </div>
                <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
                    {children}
                </Slider>
            </div>
        </div>
    );
};

export default Slide;
