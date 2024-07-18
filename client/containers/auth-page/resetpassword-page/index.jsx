'use client';

import styles from '../AuthPage.module.scss';
import localStyles from './ResetPasswordPage.module.scss';

import { useRouter } from 'next/navigation';

import ResetPasswordForm from '@/components/Forms/ResetPasswordForm';
import { ArrowLeft } from '@/components/Icons';
const ResetPasswordPage = () => {
  const router = useRouter();
  return (
    <section className={`${styles.section} ${localStyles.section__position}`}>
      <button
        type="button"
        className={localStyles.backButton}
        onClick={() => router.back({ scroll: false })}
      >
        <ArrowLeft otherStyles={localStyles.leftArrowIcon} />
      </button>
      <div className={styles.header}>
        <h1>Restablecer Contraseña</h1>
        <div className={`${styles.divider}`}></div>
      </div>
      <div className={styles.body}>
        <ResetPasswordForm />
      </div>
    </section>
  );
};

export default ResetPasswordPage;
