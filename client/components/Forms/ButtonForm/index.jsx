import styles from './ButtonForm.module.scss';

export default function Button({ type, pending, textPending, children }) {
  return (
    <button type={type} className={styles.button} disabled={pending}>
      {pending ? textPending : children}
    </button>
  );
}
