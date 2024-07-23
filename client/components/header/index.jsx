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

  const SignupRender = () => {
    // if (!user) {
    if (pathname !== '/signup') {
      return (
        <>
          <Link href="/signup?role=profesional">
            <h4 className={styles.link}>Quiero trabajar</h4>
          </Link>
          <Link href="/signup?role=cliente">
            <h4 className={styles.link}>Quiero contratar</h4>
          </Link>
        </>
      );
    }
    // }
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
          <SignupRender />
          {/* <Link
            href={{ pathname: '/signup', query: { usuario: 'profesional' } }}
          >
            <h4 className={styles.link}>Quiero trabajar</h4>
          </Link>
          <Link href={{ pathname: '/signup', query: { usuario: 'cliente' } }}>
            <h4 className={styles.link}>Quiero contratar</h4>
          </Link> */}
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
                      <Link href="/mislaburos" className={styles.link}>
                        Laburos
                      </Link>
                      <Link href="/add" className={styles.link}>
                        Agregar nuevo laburo
                      </Link>
                      <Link href="/orders" className={styles.link}>
                        Encargos
                      </Link>
                    </>
                  )}
                  <Link href="/messages" className={styles.link}>
                    Mensajes
                  </Link>
                  <Link href="/" className={styles.link}>
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
