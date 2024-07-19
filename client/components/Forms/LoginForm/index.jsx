'use client';
import styles from '../Form.module.scss';
import Link from 'next/link';

import { loginUserAction } from '@/libs/validations';
import { useFormState } from 'react-dom';
const INITIAL_STATE_FORM = {
  zodErrors: {},
  message: '',
  data: {
    email: '',
    password: '',
  },
};

import Input from '@/components/Forms/Input';
import ButtonForm from '@/components/Forms/ButtonForm';

const LoginForm = () => {
  const [formState, formAction] = useFormState(
    loginUserAction,
    INITIAL_STATE_FORM
  );
  return (
    <form action={formAction} className={styles.form} name="loginForm">
      <div className={styles.campo}>
        <Input
          type="Email"
          name="email"
          placeholder="Email"
          error={formState?.zodErrors?.email}
        />
      </div>
      <div className={styles.campo}>
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          error={formState?.zodErrors?.password}
        />
      </div>
      <p className={`${styles.text} ${styles.text__right}`}>
        <Link href="/reset-password" className={styles.link}>
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
      <ButtonForm type="submit">Iniciar Sesion</ButtonForm>
    </form>
  );
};

export default LoginForm;
