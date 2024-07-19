import styles from '../Form.module.scss';

import Input from '@/components/Forms/Input';
import ButtonForm from '@/components/Forms/ButtonForm';

import { resetPasswordAction } from '@/libs/validations';
import { useFormState } from 'react-dom';
const INITIAL_STATE_FORM = {
  zodErrors: {},
  message: '',
  data: {
    email: '',
  },
};

const ResetPasswordForm = () => {
  const [formState, formAction] = useFormState(
    resetPasswordAction,
    INITIAL_STATE_FORM
  );
  return (
    <form action={formAction} className={styles.form} name="resetPasswordForm">
      <p className={`${styles.text} ${styles.text__major}`}>
        Ingresa tu dirección de correo electrónico y recibirás instrucciones
        para restablecer tu contraseña.
      </p>
      <div className={styles.campo}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          error={formState?.zodErrors?.email}
        />
      </div>
      <ButtonForm type="submit">Restablecer Contraseña</ButtonForm>
    </form>
  );
};

export default ResetPasswordForm;
