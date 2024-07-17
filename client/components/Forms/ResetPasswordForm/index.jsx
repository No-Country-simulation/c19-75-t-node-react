import styles from '../Form.module.scss';
import Link from 'next/link';

import Input from '@/components/Forms/Input';
import ButtonForm from '@/components/Forms/ButtonForm';

const ResetPasswordForm = () => {
  return (
    <form action="" className={styles.form} name="resetPasswordForm">
      <p className={`${styles.text} ${styles.text__major}`}>
        Ingresa tu dirección de correo electrónico y recibirás instrucciones
        para restablecer tu contraseña.
      </p>
      <Input type="text" name="email" placeholder="Email" />
      <div className={styles.footer}>
        <ButtonForm type="submit">Restablecer Contraseña</ButtonForm>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
