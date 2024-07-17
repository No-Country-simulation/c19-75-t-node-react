import LoginForm from '@/components/Forms/LoginForm';
import styles from '../AuthPage.module.scss';

import Link from 'next/link';

const LoginPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1>Iniciar Sesion</h1>
        <div className={`${styles.divider}`}></div>
      </div>
      <div className={styles.body}>
        <LoginForm />
      </div>
      <div className={styles.footer}>
        <p className={styles.text}>
          ¿No tienes una cuenta?{' '}
          <Link href="/signup" className={styles.link}>
            Regístrate
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
