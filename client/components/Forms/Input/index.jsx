'use client';
import { useEffect, useState } from 'react';

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
  return (
    <>
      <input
        className={`${styles.input}
        ${otherStyles ? styles[otherStyles] : ''}
        ${!isEditing && error ? styles.input__error : ''}
      `}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={() => !isEditing && setIsEditing(true)}
        {...props}
      />
    </>
  );
}
