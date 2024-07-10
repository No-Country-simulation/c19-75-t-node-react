"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { pathname } = router;

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
    username: "Nacho",
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link href="/" className="link">
            <img src="" />
            <span className="text">LaburApp</span>
          </Link>
        </div>
        <div className="links">
          <span>Quiero trabajar</span>
          <span>Quiero contratar</span>
          {!user && <span>Iniciar Sesión</span>}
          {!user?.isTrabajador && <span>Ofrecer mis changas</span>}
          {!user && <button>Registrarse</button>}
          {user && (
            <div className="user" onClick={() => setOpen(!open)}>
            <img src="" alt="" />
            <span>{user.username}</span>
            {open && (
              <div className="options">
                {user?.isTrabajador && (
                  <>
                    <Link href="/" legacyBehavior>
                      <a className="link">Laburos</a>
                    </Link>
                    <Link href="/" legacyBehavior>
                      <a className="link">Agregar nuevo laburo</a>
                    </Link>
                    <Link href="/" legacyBehavior>
                      <a className="link">Encargos</a>
                    </Link>
                  </>
                )}
                <Link href="/" legacyBehavior>
                  <a className="link">Mensajes</a>
                </Link>
                <Link href="/" legacyBehavior>
                  <a className="link">Cerrar sesión</a>
                </Link>
              </div>
            )}
          </div>
          
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link href="/" legacyBehavior>
              <a className="link">Mantenimiento</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="link">Albañiería</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="link">Plomería</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="link">Gasistas</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="link">Electricistas</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="link">Jardinería</a>
            </Link>

            <Link href="/" legacyBehavior>
              <a className="link">Pinturería</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="link">Carpintería</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="link">Herrería</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
