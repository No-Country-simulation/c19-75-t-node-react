'use server';

import { z } from 'zod';

const messages = {
  required: 'El campo es obligatorio',
};

/*** INICIO DE SESOIN ***/
const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: messages.required })
    .email({ message: 'El email es invalido' })
    .max(50, { message: 'El email es invalido' }),
  password: z.string().min(1, { message: messages.required }),
});
export async function loginUserAction(prevState, formData) {
  const validateFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validateFields.success) {
    return {
      ...prevState,
      zodErrors: validateFields.error.flatten().fieldErrors,
      message: 'Error al iniciar sesion, revise los campos',
    };
  }

  return {
    ...prevState,
    zodErrors: {}, // Limpia los errores
    messages: 'ok',
    data: validateFields.data,
  };
  // fetch('...', {} ) -> POST
}

/*** REGISTRO ***/
const RegisterSchema = z.object({
  userType: z.enum(['cliente', 'profesional'], {
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
          'La contraseña debe contener al menos una letra mayuscula, una minuscula y un numero',
      }
    ),
  name: z.string().min(1, { message: messages.required }),
  lastname: z.string().min(1, { message: messages.required }),
  province: z.string(),
  city: z.string(),
  address: z.string().min(1, { message: messages.required }),
  number: z
    .string()
    .min(1, { message: messages.required })
    .regex(/^\d+.{1,}$/, { message: 'Debe contener solo numeros' })
    .max(99999, { message: 'El numero es invalido' }),
  floor: z.string().optional(),
  postalCode: z.string().optional(),
  areaCode: z.string(),
  phone: z
    .string()
    .min(1, { message: messages.required })
    .regex(/^\d+$/, { message: 'Debe contener solo numeros' })
    .min(8, { message: 'El telefono es invalido, minimo 8 numeros' })
    .max(12, { message: 'El telefono es invalido, maximo 12 numeros' }),
  occupations: z.array(z.string()).optional(),
});
export async function registerUserAction(prevState, formData) {
  console.log(formData);
  const validateFields = RegisterSchema.safeParse({
    userType: formData.get('userType'),
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    province: formData.get('province'),
    city: formData.get('city'),
    address: formData.get('address'),
    number: formData.get('number'),
    floor: formData.get('floor'),
    postalCode: formData.get('postalCode'),
    areaCode: '+54',
    phone: formData.get('phone'),
    occupations: formData.getAll('occupations'),
  });
  if (!validateFields.success) {
    return {
      ...prevState,
      zodErrors: validateFields.error // -> el objeto con los errores
        .flatten().fieldErrors, // -> Convierte la estructura de errores en un estructura facil de leer // -> Del resultado de flatten, propiedad que contiene un objeto con los errores
      message: 'Error al registrar usuario, revise los campos',
    };
  }

  return {
    ...prevState,
    zodErrors: {}, // Limpia los errores
    messages: 'ok',
    data: validateFields.data,
  };
}

/*** RECUPERAR CONTRASEÑA ***/
const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: messages.required })
    .email({ message: 'El email es invalido' })
    .max(50, { message: 'El email es invalido' }),
});
export async function resetPasswordAction(prevState, formData) {
  const validateFields = ResetPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validateFields.success) {
    return {
      ...prevState,
      zodErrors: validateFields.error.flatten().fieldErrors,
      message: 'Error al restablecer la contraseña, revise el campo',
    };
  }

  return {
    ...prevState,
    zodErrors: {}, // Limpia los errores
    messages: 'ok',
    data: validateFields.data,
  };

  // fetch('...', {} ) -> PATCH
}
