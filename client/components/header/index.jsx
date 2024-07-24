'use client';
import Link from 'next/link';
import styles from './Header.module.scss';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
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

    const user = {
        id: 1,
        userType: 'cliente',
        name: 'Nacho',
    };
    // const user = null;

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

    const OptionsRender = ({ isTrabajador }) => {
        return (
            <div className={styles.options}>
                <Link href={`/${user.name}`} className={styles.link}>
                    Perfil
                </Link>
                {isTrabajador && (
                    <>
                        <Link href={`/${user.name}?opcion=laburos`} className={styles.link}>
                            Laburos
                        </Link>
                        <Link href={`/${user.name}?opcion=ordenes`} className={styles.link}>
                            Ordenes
                        </Link>
                        <Link href={`/${user.name}?opcion=postulaciones`} className={styles.link}>
                            Postulaciones
                        </Link>
                    </>
                )}
                {!isTrabajador && (
                    <Link href={`/${user.name}?opcion=changas`} className={styles.link}>
                        Changas
                    </Link>
                )}
                <Link href="/" className={`${styles.link} ${styles.linkMenu}`}>
                    Cerrar sesión
                </Link>
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
                    {!user ? (
                        <SignupRender />
                    ) : (
                        <>
                            {user?.userType === 'cliente' && <span>Ofrecer mis changas</span>}
                            <div className={styles.user}>
                                <div onClick={() => setOpen(!open)}>
                                    <img src="" alt="" />
                                    <span className={styles.link}>{user?.name}</span>
                                </div>
                                {open && <OptionsRender isTrabajador={user?.userType === 'trabajador'} />}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {active && pathname === '/' && (
                <>
                    <hr />
                    <div className={styles.menu}>
                        <Link href="/" className={styles.link}>
                            Mantenimiento
                        </Link>
                        <Link href="/" className={styles.link}>
                            Albañiería
                        </Link>
                        <Link href="/" className={styles.link}>
                            Plomería
                        </Link>
                        <Link href="/" className={styles.link}>
                            Gasistas
                        </Link>
                        <Link href="/" className={styles.link}>
                            Electricistas
                        </Link>
                        <Link href="/" className={styles.link}>
                            Jardinería
                        </Link>

                        <Link href="/" className={styles.link}>
                            Pinturería
                        </Link>
                        <Link href="/" className={styles.link}>
                            Carpintería
                        </Link>
                        <Link href="/" className={styles.link}>
                            Herrería
                        </Link>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
