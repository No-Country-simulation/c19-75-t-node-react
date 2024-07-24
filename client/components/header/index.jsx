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
    isTrabajador: true,
    username: 'Nacho',
  };

  return (
    <header
      className={`${styles.navbar} ${
        active || pathname !== '/' ? styles.active : ''
      }`}
    >
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
          <Link href="/register" legacyBehavior>
            <h4 className={styles.link}>Quiero trabajar</h4>
          </Link>
          <Link href="/register" legacyBehavior>
            <h4 className={styles.link}>Quiero contratar</h4>
          </Link>
          {!user && <span>Iniciar Sesión</span>}
          {!user?.isTrabajador && <span>Ofrecer mis changas</span>}
          {!user && <button>Registrarse</button>}
          {user && (
            <div className={styles.user} onClick={() => setOpen(!open)}>
              <img src="" alt="" />
              <span>{user.username}</span>
              {open && (
                <div className={styles.options}>
                  {user?.isTrabajador && (
                    <>
                      <Link
                        href="/mislaburos"
                        className={styles.link}
                        legacyBehavior
                      >
                        Laburos
                      </Link>
                      <Link href="/add" className={styles.link} legacyBehavior>
                        Agregar nuevo laburo
                      </Link>
                      <Link
                        href="/orders"
                        className={styles.link}
                        legacyBehavior
                      >
                        Encargos
                      </Link>
                    </>
                  )}
                  <Link href="/messages" className={styles.link} legacyBehavior>
                    Mensajes
                  </Link>
                  <Link href="/" className={styles.link} legacyBehavior>
                    Cerrar sesión
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== '/') && (
        <>
          <hr />
          <div className={styles.menu}>
            <Link href="/trabajadores/mantenimiento" className={styles.link} legacyBehavior>
              Mantenimiento
            </Link>
            <Link href="/trabajadores/albanileria" className={styles.link} legacyBehavior>
              Albañiería
            </Link>
            <Link href="/trabajadores/plomeria" className={styles.link} legacyBehavior>
              Plomería
            </Link>
            <Link href="/trabajadores/gasistas" className={styles.link} legacyBehavior>
              Gasistas
            </Link>
            <Link href="/trabajadores/electricistas" className={styles.link} legacyBehavior>
              Electricistas
            </Link>
            <Link href="/trabajadores/jardineria" className={styles.link} legacyBehavior>
              Jardinería
            </Link>

            <Link href="/trabajadores/pintureria" className={styles.link} legacyBehavior>
              Pinturería
            </Link>
            <Link href="/trabajadores/carpinteria" className={styles.link} legacyBehavior>
              Carpintería
            </Link>
            <Link href="/trabajadores/herreria" className={styles.link} legacyBehavior>
              Herrería
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
