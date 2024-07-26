'use client';
import Link from 'next/link';
import styles from './Header.module.scss';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logout } from '@/actions/auth';
import { useSessionContext } from '@/context/SessionContext';

const Header = () => {
    const { userSessionData, setSessionActive } = useSessionContext();
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
        setOpen(false);
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
                        <Link
                            href={
                                userSessionData?.isWorker
                                    ? '/laburos/mantenimiento'
                                    : '/trabajadores/mantenimiento'
                            }
                            className={styles.link}
                            legacyBehavior
                        >
                            Mantenimiento
                        </Link>
                        <Link
                            href={
                                userSessionData?.isWorker
                                    ? '/laburos/albanileria'
                                    : '/trabajadores/albanileria'
                            }
                            className={styles.link}
                            legacyBehavior
                        >
                            Albañiería
                        </Link>
                        <Link
                            href={userSessionData?.isWorker ? '/laburos/plomeria' : '/trabajadores/plomeria'}
                            className={styles.link}
                            legacyBehavior
                        >
                            Plomería
                        </Link>
                        <Link
                            href={userSessionData?.isWorker ? '/laburos/gasista' : '/trabajadores/gasistas'}
                            className={styles.link}
                            legacyBehavior
                        >
                            Gasistas
                        </Link>
                        <Link
                            href={
                                userSessionData?.isWorker
                                    ? '/laburos/electricista'
                                    : '/trabajadores/electricistas'
                            }
                            className={styles.link}
                            legacyBehavior
                        >
                            Electricistas
                        </Link>
                        <Link
                            href={
                                userSessionData?.isWorker ? '/laburos/jardineria' : '/trabajadores/jardineria'
                            }
                            className={styles.link}
                            legacyBehavior
                        >
                            Jardinería
                        </Link>

                        <Link
                            href={
                                userSessionData?.isWorker ? '/laburos/pintureria' : '/trabajadores/pintureria'
                            }
                            className={styles.link}
                            legacyBehavior
                        >
                            Pinturería
                        </Link>
                        <Link
                            href={
                                userSessionData?.isWorker
                                    ? '/laburos/carpinteria'
                                    : '/trabajadores/carpinteria'
                            }
                            className={styles.link}
                            legacyBehavior
                        >
                            Carpintería
                        </Link>
                        <Link
                            href={userSessionData?.isWorker ? '/laburos/herreria' : '/trabajadores/herreria'}
                            className={styles.link}
                            legacyBehavior
                        >
                            Herrería
                        </Link>
                    </div>
                    <hr />
                </>
            )}
        </header>
    );
};

export default Header;
