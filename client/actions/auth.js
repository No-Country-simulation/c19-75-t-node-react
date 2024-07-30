'use server';
import { LoginSchema, RegisterSchema, ResetPasswordSchema } from '@/libs/validations';
import { createSession, destroySession } from '@/libs/sessions';
import { loginUser, getUserIdByEmail, createUser } from '@/actions/actions';
// import { loginUser, getUserIdByEmail, createUser } from '@/data/db';

// * THIS WORK * //
export async function login(prevState, formData) {
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

  // 3. Comprobamos si el mail existe
  let res = null;
  try {
    res = await getUserIdByEmail(email);
  } catch (error) {
    return {
      ...prevState,
      errors: { principal: error },
      success: false,
    };
  }

  // 4. Comprobamos si las credenciales son correctas
  const { id } = res;
  try {
    res = await loginUser(id, password);
  } catch (error) {
    return {
      ...prevState,
      errors: { principal: error },
      success: false,
    };
  }

  // 5. Crear la sesion
  const isWorker = res.esprofesional;
  await createSession(res.id, res.nombre, isWorker);
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
    barrio: formData.get('barrio'),
    postalCode: formData.get('postalCode'),
    areaCode: '+54',
    phone: formData.get('phone'),
    userOccupations: formData.get('userOccupations'),
  });
  if (!validateFields.success) {
    return {
      ...prevState,
      zodErrors: validateFields.error // -> el objeto con los errores
        .flatten().fieldErrors, // -> Convierte la estructura de errores en un estructura facil de leer // -> Del resultado de flatten, propiedad que contiene un objeto con los errores
      message: 'Error al registrar usuario, revise los campos',
    };
  }

  // Obtener los campos
  const {
    userType,
    email,
    password,
    name,
    lastname,
    province,
    city,
    barrio,
    postalCode,
    phone,
    userOccupations,
  } = validateFields.data;
  const userOccupationsArray = userOccupations.split(',').map((occupation) => parseInt(occupation, 10));

  return null;

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
  const isWorker = res.esprofesional;
  await createSession(res.id, res.nombre, isWorker);
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
