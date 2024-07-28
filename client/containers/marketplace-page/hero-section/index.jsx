import Link from 'next/link';
import styles from './HeroSection.module.scss';

const MarketPlaceHeroSection = ({ pathname, categoria }) => {
    const getDescriptionText = () => {
        if (pathname === 'trabajadores') {
            if (categoria) {
                return `profesionales en ${categoria} que podrían darte una solución.`;
            } else {
                return 'profesionales que podrían darte una solución.';
            }
        } else {
            return `${pathname} en ${categoria}`;
        }
    };
    return (
        <section className={styles.hero_section}>
            <span className={styles.breadcrumbs}>
                LABURAPP /{' '}
                {!categoria ? (
                    pathname.toUpperCase()
                ) : (
                    <>
                        <Link href={`/${pathname}`}>{pathname.toUpperCase()}</Link>
                        {categoria && ` / ${categoria.toUpperCase()}`}
                    </>
                )}
            </span>
            <h1>
                {categoria === null
                    ? `Todos los ${pathname}`
                    : `${pathname.charAt(0).toUpperCase() + pathname.slice(1).toLowerCase()} en ${
                          categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()
                      }`}
            </h1>
            <p>Explora los distintos {getDescriptionText()}</p>
        </section>
    );
};

export default MarketPlaceHeroSection;
