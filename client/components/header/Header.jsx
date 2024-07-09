"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./Header.scss";

const Header = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { pathname } = router;

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const user = {
    id: 1,
    isTrabajador: true,
    username: "Nacho",
  };

  return (
    <div>
      <div className={active || pathname !=="/" ? "header active" : "header"}>
        <div className="container">
          <div className="logo">
            <Link href="/" className="link"> 
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
            <div className="user" onClick={()=>setOpen(!open)}>
              <img src="" alt="" />
              <span>{user.username}</span>
              {open && <div className="options">
                {user?.isTrabajador && (
                  <>
                    <Link className="link" href="/">Laburos</Link>
                    <Link className="link" href="/">Agregar nuevo laburo</Link>
                    <Link className="link" href="/">Encargos</Link>
                  </>
                )}
              <Link className="link" href="/">Mensajes</Link>
              <Link className="link">Cerrar sesión</Link>
              </div>}
            </div>
          )}
        </div>
        </div>
        {(active || pathname !=="/") && (
          <>
          <hr />
          <div className="menu">
            <Link className="link" href="/">Mantenimiento</Link>
            <Link className="link" href="/">Albañiería</Link>
            <Link className="link" href="/">Plomería</Link>
            <Link className="link" href="/">Gasistas</Link>
            <Link className="link" href="/">Electricistas</Link>
            <Link className="link" href="/">Jardinería</Link>
            <Link className="link" href="/">Pinturería</Link>
            <Link className="link" href="/">Carpintería</Link>
            <Link className="link" href="/">Herrería</Link>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
