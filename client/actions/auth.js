'use server';
import { LoginSchema, RegisterSchema, ResetPasswordSchema } from '@/libs/validations';
import { createSession, destroySession } from '@/libs/sessions';
import { loginUser, getUserIdByEmail, createUser } from '@/data/db';

// * THIS WORK * //
export async function login(prevState, formData) {
  console.log('login', formData);
  // 1. Validar los campos
  const validateFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validateFields.success) {
    return {
      ...prevState,
      errors: validateFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // 2. Preparar los datos
  const { email, password } = validateFields.data;
  // 3. Buscar el usuario en la base de datos
  const user = await loginUser(email, password);

  if (!user) {
    return {
      ...prevState,
      errors: { principal: ['Crenciales incorrectas'] },
      success: false,
    };
  }

  // 4. Crear la sesion
  const { id, name, isWorker } = user;

  await createSession(id, name, isWorker);
  return {
    ...prevState,
    errors: { principal: ['Credenciales correctas'] },
    success: true,
  };
}
// * THIS WORK * //
export async function logout() {
  await destroySession();
}

// TODO: Completar con los campos faltantes
export async function singup(prevState, formData) {
  // 1. Validar los campos
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
    console.log('not succes');
    return {
      ...prevState,
      zodErrors: validateFields.error // -> el objeto con los errores
        .flatten().fieldErrors, // -> Convierte la estructura de errores en un estructura facil de leer // -> Del resultado de flatten, propiedad que contiene un objeto con los errores
      message: 'Error al registrar usuario, revise los campos',
    };
  }

  const { email } = validateFields.data; // FIXME: tomar todos los datos

  // 2. Comprobar si el usuario ya existe
  const existingUser = false;

  if (existingUser) {
    return {
      ...prevState,
      zodErrors: { email: ['El email ya esta registrado'] },
      message: 'El email ya esta registrado',
    };
  }

  // 3. Crear el usuario en la base de datos
  // const user = await createUser(validateFields.data);

  const user = {};
  if (!user) {
    return { message: 'Error al registrar el usuario' };
  }

  // 4. Crear la sesion
  const userId = user.id.toString();
  await createSession(userId);
}

// FIXME: Completar con los campos faltantes y la implementacoin visual
export async function resetPassword(prevState, formData) {
  console.log('resetPassword', formData);
  // 1. Validar los campos
  const validateFields = ResetPasswordSchema.safeParse({
    email: formData.get('email'),
  });
  if (!validateFields.success) {
    return {
      ...prevState,
      errors: validateFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  return null;
  // const { email } = validateFields.data;

  // FALTA TODAVIA POR IMPLEMENTAR, ADEMAS DE LO VISUAL
}
