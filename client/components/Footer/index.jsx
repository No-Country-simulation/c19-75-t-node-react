import Link from 'next/link';
import styles from './Footer.module.scss';

import { Instagram, Twitter, Linkedin } from '@/components/Icons';
import { CATEGORIES } from '@/types/types';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.item}>
                        <h2>Recursos</h2>
                        <Link href="#">
                            <span>Acerca de Laburapp</span>
                        </Link>
                        <Link href="#">
                            <span>Centro de soporte</span>
                        </Link>
                        <Link href="#">
                            <span>Terminos y condiciones</span>
                        </Link>
                        <Link href="#">
                            <span>Politica de Privacidad</span>
                        </Link>
                        <Link href="#">
                            <span>Preguntas Frecuentes</span>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <h2>Bucar laburos</h2>
                        {CATEGORIES.map((cat) => (
                            <Link key={cat.id} href={`/laburos/${cat.url}`}>
                                <span>{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                    <div className={styles.item}>
                        <h2>Bucar trabajadores</h2>
                        {CATEGORIES.map((cat) => (
                            <Link key={cat.id} href={`/trabajadores/${cat.url}`}>
                                <span>{cat.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className={styles.item}>
                        <h2>Integrantes</h2>
                        <div className={styles.memberContainer}>
                            <Link href="https://www.linkedin.com" target="_blanck">
                                <Linkedin otherStyles={styles.icon} />
                                <span>Brenda Giambelluca</span>
                            </Link>
                        </div>
                        <div className={styles.memberContainer}>
                            <Link href="https://www.linkedin.com" target="_blanck">
                                <Linkedin otherStyles={styles.icon} />
                                <span>Ignacio Carrabs</span>
                            </Link>
                        </div>
                        <div className={styles.memberContainer}>
                            <Link href="https://www.linkedin.com" target="_blanck">
                                <Linkedin otherStyles={styles.icon} />
                                <span>Nombre Apellido</span>
                            </Link>
                        </div>
                        <div className={styles.memberContainer}>
                            <Link href="https://www.linkedin.com" target="_blanck">
                                <Linkedin otherStyles={styles.icon} />
                                <span>Nombre Apellido</span>
                            </Link>
                        </div>
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
