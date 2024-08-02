import CreateJobForm from '@/components/Forms/CreateJobForm';
import styles from '../auth-page/AuthPage.module.scss';

const CreateJobPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Crear oferta de trabajo</h1>
          <div className={`${styles.divider}`}></div>
        </div>
        <div className={styles.body}>
          <CreateJobForm />
        </div>
      </div>
    </section>
  );
};

export default CreateJobPage;
