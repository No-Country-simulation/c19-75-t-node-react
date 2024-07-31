import ZodErrors from '@/components/Forms/Custom';
import styles from './Select.module.scss';

export default function Select({ name, otherStyles, options, children, error, ...props }) {
  return (
    <>
      <select id={name} name={name} className={styles.select} onChange={props.onChange} {...props}>
        {children}
        {options.map((option) => (
          <option key={option.id} value={option.nombre}>
            {option.nombre}
          </option>
        ))}
      </select>
      {error ? <ZodErrors error={error} /> : null}
    </>
  );
}
