import styles from './Label.module.scss';

export default function Label({ htmlFor, children, otherStyles }) {
  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${otherStyles}`}>
      {children}
    </label>
  );
}
