import styles from './ZodErrors.module.scss';

export default function ZodErrors({ error }) {
  if (!error) return null;

  const RenderErrors = () => {
    const [firstError] = error; // Solo mostramos el primer error de la lista debido a que es el mas relevante
    if (
      firstError === 'El campo es obligatorio' ||
      firstError.includes('Debe contener')
    ) {
      return (
        <ul className={styles.error__list}>
          <li className={styles.error__message}>{firstError}</li>
        </ul>
      );
    }
    return (
      <ul className={styles.error__list}>
        {error.map((err, index) => (
          <li key={index} className={styles.error__message}>
            {err}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.error} name="error">
      <RenderErrors />
    </div>
  );
}
