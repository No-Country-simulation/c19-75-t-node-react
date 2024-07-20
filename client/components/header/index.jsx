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
        (active || pathname) !== '/' && `${styles.active}`
      } `}
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
                      <Link href="/mislaburos" legacyBehavior>
                        <a className={styles.link}>Laburos</a>
                      </Link>
                      <Link href="/add" legacyBehavior>
                        <a className={styles.link}>Agregar nuevo laburo</a>
                      </Link>
                      <Link href="/orders" legacyBehavior>
                        <a className={styles.link}>Encargos</a>
                      </Link>
                    </>
                  )}
                  <Link href="/messages" legacyBehavior>
                    <a className={styles.link}>Mensajes</a>
                  </Link>
                  <Link href="/" legacyBehavior>
                    <a className={styles.link}>Cerrar sesión</a>
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
            <Link href="/" legacyBehavior>
              <a className={styles.link}>Mantenimiento</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className={styles.link}>Albañiería</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className={styles.link}>Plomería</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className={styles.link}>Gasistas</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className={styles.link}>Electricistas</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className={styles.link}>Jardinería</a>
            </Link>

            <Link href="/" legacyBehavior>
              <a className={styles.link}>Pinturería</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className={styles.link}>Carpintería</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className={styles.link}>Herrería</a>
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
