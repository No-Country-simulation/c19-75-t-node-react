import SingupForm from '@/components/Forms/SingupForm';
import styles from '../AuthPage.module.scss';

import Link from 'next/link';

const SingupPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Crear una Cuenta</h1>
          <div className={`${styles.divider}`}></div>
        </div>
        <div className={styles.body}>
          <SingupForm />
        </div>
        <div className={styles.footer}>
          {/* <div className={`${styles.divider} ${styles.divider__small}`}></div> */}
          <p className={styles.text}>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className={styles.link}>
              Iniciar Sesion
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingupPage;
