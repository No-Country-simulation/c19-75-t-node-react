import styles from '../Form.module.scss';
import Link from 'next/link';

import Input from '@/components/Forms/Input';
import ButtonForm from '@/components/Forms/ButtonForm';

const LoginForm = () => {
  return (
    <form action="" className={styles.form} name="loginForm">
      <Input type="Email" name="email" placeholder="Email" />
      <Input type="password" name="password" placeholder="Contraseña" />
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
