'use client';
import styles from '../Form.module.scss';
import Link from 'next/link';

import { login } from '@/actions/auth';
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
import ZodErrors from '../Custom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHeaderContext } from '@/context/HeaderContext';

const LoginForm = () => {
  const router = useRouter();
  const { setSessionActive } = useHeaderContext();
  const [formState, formAction, pending] = useFormState(login, INITIAL_STATE_FORM);

  useEffect(() => {
    if (formState?.success) {
      setSessionActive(true);
      router.push('/');
    }
  }, [formState?.success]);

  return (
    <form action={formAction} className={styles.form} name="loginForm">
      {!formState?.success && (
        <ZodErrors
          error={formState?.errors?.principal}
          type="principal"
          success={formState?.success}
        />
      )}
      <div className={styles.campo}>
        <Input
          type="Email"
          name="email"
          placeholder="Email"
          error={formState?.errors?.email}
          defaultValue={'user1@gmail.com'} // FIXME: Delete this line
        />
      </div>
      <div className={styles.campo}>
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          error={formState?.errors?.password}
        />
      </div>
      <p className={`${styles.text} ${styles.text__right}`}>
        <Link href="/reset-password" className={styles.link}>
          ¿Olvidaste tu contraseña?
        </Link>
      </p>

      <ButtonForm type="submit" pending={pending} textPending={'Iniciando...'}>
        Iniciar Sesion
      </ButtonForm>
    </form>
  );
};

export default LoginForm;
