import Link from 'next/link';
import styles from './Footer.module.scss';

import { Instagram, Twitter, Linkedin } from '@/components/Icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
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
              <Link href="/">
                <Instagram otherStyles={styles.icon} />
              </Link>
              <Link href="/">
                <Twitter otherStyles={styles.icon} />
              </Link>
              <Link href="/">
                <Linkedin otherStyles={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
