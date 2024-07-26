'use client';
import Link from 'next/link';
import styles from './Header.module.scss';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logout } from '@/actions/auth';
import { useHeaderContext } from '@/context/HeaderContext';

const Header = () => {
    const { userSessionData, setUserSessionData, setSessionActive } = useHeaderContext();
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

    // const userSessionData = {
    //     id: 1,
    //     name: 'Nacho',
    //     isWorker: true, // true | false
    // };
    // const userSessionData = null;

    const handleLogout = async () => {
        await logout();
        setSessionActive(false);
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
                <Link href={`/${userSessionData.name}`} className={styles.link}>
                    Perfil
                </Link>
                {isWorker && (
                    <>
                        <Link href={`/${userSessionData.name}?opcion=laburos`} className={styles.link}>
                            Laburos
                        </Link>
                        <Link href={`/${userSessionData.name}?opcion=ordenes`} className={styles.link}>
                            Ordenes
                        </Link>
                        <Link href={`/${userSessionData.name}?opcion=postulaciones`} className={styles.link}>
                            Postulaciones
                        </Link>
                    </>
                )}
                {!isWorker && (
                    <Link href={`/${userSessionData.name}?opcion=changas`} className={styles.link}>
                        Changas
                    </Link>
                )}
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
                            {!userSessionData?.isWorker && <span>Ofrecer mis changas</span>}
                            <div className={styles.user}>
                                <div onClick={() => setOpen(!open)}>
                                    <img src="" alt="" />
                                    <span className={styles.link}>
                                        {userSessionData ? userSessionData.name : 'Menu'}
                                    </span>
                                </div>
                                {open && <OptionsRender isWorker={userSessionData?.isWorker} />}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {active && pathname === '/' && (
                <>
                    <hr />
                    <div className={styles.menu}>
                        <Link href="/trabajadores/categorias/6" className={styles.link} legacyBehavior>
                            Mantenimiento
                        </Link>
                        <Link href="/trabajadores/categorias/7" className={styles.link} legacyBehavior>
                            Albañiería
                        </Link>
                        <Link href="/trabajadores/categorias/3" className={styles.link} legacyBehavior>
                            Plomería
                        </Link>
                        <Link href="/trabajadores/categorias/3" className={styles.link} legacyBehavior>
                            Gasistas
                        </Link>
                        <Link href="/trabajadores/categorias/4" className={styles.link} legacyBehavior>
                            Electricistas
                        </Link>
                        <Link href="/trabajadores/categorias/5" className={styles.link} legacyBehavior>
                            Jardinería
                        </Link>
                        <Link href="/trabajadores/categorias/1" className={styles.link} legacyBehavior>
                            Pinturería
                        </Link>
                        <Link href="/trabajadores/categorias/8" className={styles.link} legacyBehavior>
                            Carpintería
                        </Link>
                        <Link href="/trabajadores/categorias/2" className={styles.link} legacyBehavior>
                            Herrería
                        </Link>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
