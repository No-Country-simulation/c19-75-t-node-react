import { z } from 'zod';

const messages = {
  required: 'El campo es obligatorio',
};

/*** INICIO DE SESOIN ***/
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: messages.required })
    .email({ message: 'El email es invalido' })
    .max(50, { message: 'El email es invalido' }),
  password: z.string().min(1, { message: messages.required }),
});

/*** REGISTRO ***/
export const RegisterSchema = z.object({
  userType: z.enum(['cliente', 'trabajador'], {
    message: 'Tipo de usuario invalido',
  }),
  email: z
    .string()
    .min(1, { message: messages.required })
    .email({ message: 'El email es invalido' })
    .max(50, { message: 'El email es invalido' }),
  password: z
    .string()
    .min(1, { message: messages.required })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .max(20, { message: 'La contraseña debe tener menos de 20 caracteres' })
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,20}$/,
      // (?=.*\d) -> Al menos un numero
      // (?=.*[A-Z]) -> Al menos una mayuscula
      // (?=.*\W) -> Al menos un caracter especial
      // .{6,20} -> De 6 a 20 caracteres
      {
        message:
          'La contraseña debe contener al menos una letra mayuscula, una minuscula, un numero y un caracter especial',
      }
    ),
  name: z.string().min(1, { message: messages.required }),
  lastname: z.string().min(1, { message: messages.required }),
  province: z.string().optional(),
  city: z.string().optional(),
  barrio: z.string().min(1, { message: messages.required }),
  postalCode: z.string().optional(),
  areaCode: z.string().optional(),
  phone: z
    .string()
    .min(1, { message: messages.required })
    .regex(/^\d+$/, { message: 'Debe contener solo numeros' })
    .min(8, { message: 'El telefono es invalido, minimo 8 numeros' })
    .max(12, { message: 'El telefono es invalido, maximo 12 numeros' }),
  userOccupations: z.string().optional(),
});

/*** RECUPERAR CONTRASEÑA ***/
export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: messages.required })
    .email({ message: 'El email es invalido' })
    .max(50, { message: 'El email es invalido' }),
});
