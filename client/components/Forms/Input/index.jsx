import { useEffect, useState } from 'react';
import ZodErrors from '@/components/Forms/Custom';
import styles from './Input.module.scss';

export default function Input({
  type,
  name,
  placeholder,
  otherStyles,
  error,
  ...props
}) {
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    setIsEditing(false);
  }, [error]);

  const renderInput = () => {
    return (
      <input
        className={`${styles.input} ${otherStyles ? styles[otherStyles] : ''} ${
          error ? styles.input__error : ''
        } } ${type === 'hidden' ? styles.input__hidden : ''}`}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={() => !isEditing && setIsEditing(true)}
        {...props}
      />
    );
  };

  return (
    <>
      {renderInput()}
      {!isEditing && error ? <ZodErrors error={error} /> : null}
    </>
  );
}
