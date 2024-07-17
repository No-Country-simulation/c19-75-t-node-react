import styles from './ButtonForm.module.scss';

export default function Button({ type, children }) {
  return (
    <button type={type} className={styles.button}>
      {children}
    </button>
  );
}
