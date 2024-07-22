import React from "react";
import styles from "./Footer.module.scss";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.item}>
            <h2>Categorias</h2>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
          </div>
          <div className={styles.item}>
            <h2>Categorias</h2>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
          </div>
          <div className={styles.item}>
            <h2>Categorias</h2>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
          </div>
          <div className={styles.item}>
            <h2>Categorias</h2>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
          </div>
        </div>
        <hr />
        <div className={styles.bottom}>
          <div className={styles.left}>
            <h2>Laburapp.</h2>
            <span>™ Laburapp. 2024 ®</span>
          </div>
          <div className={styles.right}>
            <div className={styles.social}>
              <a target="_blank" href="https://www.instagram.com/">
                <RiInstagramFill className={styles.icon} />
              </a>
              <a target="_blank" href="">
                <BsTwitterX className={styles.icon} />
              </a>
              <a target="_blank" href="">
                <FaLinkedin className={styles.icon} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
