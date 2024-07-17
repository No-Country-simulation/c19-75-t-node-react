import styles from '../Form.module.scss';

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

      <ButtonForm type="submit">Restablecer Contraseña</ButtonForm>
    </form>
  );
};

export default ResetPasswordForm;
