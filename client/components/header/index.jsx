'use client';
import Link from 'next/link';
import styles from './Header.module.scss';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logout } from '@/actions/auth';
import { useSessionContext } from '@/context/SessionContext';
import { CATEGORIES } from '@/types/types';

const Header = () => {
    const { userSessionData, setSessionActive, sessionActive } = useSessionContext();
    const [active, setActive] = useState(true);
    const [open, setOpen] = useState(false);

    const pathname = usePathname();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', isActive);

        return () => {
            window.removeEventListener('scroll', isActive);
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        setSessionActive(false);
        setOpen(false);
    };

    const NavbarReder = () => {
        // Mapea las páginas a las redirecciones
        const redirectMap = {
            signup: 'trabajadores',
            login: 'trabajadores',
            'reset-password': 'trabajadores',
            laburos: 'laburos',
            trabajadores: 'trabajadores',
            '': userSessionData?.isWorker ? 'laburos' : 'trabajadores',
            usuario: userSessionData?.isWorker ? 'laburos' : 'trabajadores',
        };

        // Obtén la página actual home (/) | signup | login | register | user | marketplace (laburos / trabajadores)
        const actualPage = pathname.split('/')[1];

        // Usa el objeto de configuración para determinar la redirección
        const redirectPage = redirectMap[actualPage] || 'trabajadores';

        return (
            <>
                {CATEGORIES.map((category) => (
                    <Link
                        key={category.url}
                        href={`/${redirectPage}/${category.url}`}
                        className={styles.link}
                    >
                        {category.name}
                    </Link>
                ))}
            </>
        );
    };

    const SignupRender = () => {
        return (
            <>
                {pathname !== '/signup' && (
                    <>
                        <div className={styles.link}>
                            <Link href="/signup?role=trabajador">
                                <h4>Quiero trabajar</h4>
                            </Link>
                        </div>
                        <div className={styles.link}>
                            <Link href="/signup?role=cliente">
                                <h4>Quiero contratar</h4>
                            </Link>
                        </div>
                    </>
                )}
                {pathname !== '/login' && (
                    <div className={styles.link}>
                        <Link href="/login">
                            <h4>Iniciar Sesión</h4>
                        </Link>
                    </div>
                )}
            </>
        );
    };
    const OptionsRender = ({ isWorker }) => {
        return (
            <div className={styles.options}>
                <Link
                    href={`/usuario/${userSessionData?.userId}`}
                    className={styles.link}
                    onClick={() => setOpen(false)}
                >
                    Perfil
                </Link>
                {isWorker && (
                    <Link
                        href={`/usuario/${userSessionData?.userId}?opcion=solicitudes`}
                        className={styles.link}
                        onClick={() => setOpen(false)}
                    >
                        Solicitudes
                    </Link>
                )}
                <Link
                    href={`/usuario/${userSessionData?.userId}?opcion=trabajos`}
                    className={styles.link}
                    onClick={() => setOpen(false)}
                >
                    {/* FIXME: Decidir el texto */}
                    {isWorker ? 'Trabajos' : 'Ofertas de trabajo'}
                </Link>
                <Link
                    href={`/usuario/${userSessionData?.userId}?opcion=postulaciones`}
                    className={styles.link}
                    onClick={() => setOpen(false)}
                >
                    Postulaciones
                </Link>
                <button href="/" className={`${styles.link} ${styles.linkMenu}`} onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        );
    };
    return (
        <header className={`${styles.navbar} ${active || pathname !== '/' ? styles.active : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/" className={styles.link}>
                        <img src="" />
                        <span className={styles.text}>
                            <span className={styles.labur}>Labur</span>app.
                        </span>
                    </Link>
                </div>
                <div className={styles.links}>
                    {!userSessionData ? (
                        <SignupRender />
                    ) : (
                        <>
                            {!userSessionData?.isWorker && (
                                <button className={styles.buttonCliente}>
                                    <Link
                                        className={styles.buttonLink}
                                        onClick={() => setOpen(false)}
                                        href={`/`}
                                        // href={`/add`}
                                    >
                                        Publicar oferta de Trabajo
                                    </Link>
                                </button>
                            )}
                            <div className={styles.user}>
                                <div onClick={() => setOpen(!open)}>
                                    <img src="" alt="" />
                                    <span className={styles.link}>
                                        {userSessionData ? userSessionData?.name : 'Menu'}
                                    </span>
                                </div>
                                {open && <OptionsRender isWorker={userSessionData?.isWorker} />}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {(active || pathname !== '/') && (
                <>
                    <hr />
                    <div className={styles.menu}>
                        <NavbarReder />
                    </div>
                    <hr />
                </>
            )}
        </header>
    );
};

export default Header;
