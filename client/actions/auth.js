'use server';
import { LoginSchema, RegisterSchema, ResetPasswordSchema } from '@/libs/validations';
import { createSession, destroySession } from '@/libs/sessions';
import { loginUser, getUserIdByEmail, createUser } from '@/actions/actions';
import bcrypt from 'bcrypt';

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
  const { id } = res;
  if (!id) {
    return {
      ...prevState,
      errors: { principal: ['El email no esta registrado'] },
      success: false,
    };
  }

  // 4. Comprobamos si las credenciales son correctas
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
    // password,
    // name,
    // lastname,
    // province,
    // city,
    // barrio,
    // postalCode,
    // phone,
    // userOccupations,
  } = validateFields.data;
  // const userOccupationsArray = userOccupations.split(',').map((occupation) => parseInt(occupation, 10));

  // 2. Comprobar si el usuario ya existe
  let res = null;
  try {
    res = await getUserIdByEmail(email);
  } catch (error) {
    console.log('aca');
    return {
      ...prevState,
      errors: { principal: error },
      success: false,
    };
  }

  let { id } = res;
  const existingUser = !id;

  if (!existingUser) {
    return {
      ...prevState,
      errors: { principal: ['El email ya esta registrado'] },
      success: false,
    };
  }

  // 3. Crear el usuario en la base de datos
  const user = {
    esprofesional: validateFields.data.userType === 'trabajador',
    mail: validateFields.data.email,
    pass: validateFields.data.password,
    nombre: validateFields.data.name,
    apellido: validateFields.data.lastname,
    provincia: validateFields.data.province,
    ciudad: validateFields.data.city,
    barrio: validateFields.data.barrio,
    cp: validateFields.data.postalCode,
    tel: validateFields.data.phone,
    categorias: validateFields.data.userOccupations,
  };
  user.pass = await bcrypt.hash(user.pass, 10);
  user.categorias = user.categorias.split(',').map((occupation) => parseInt(occupation, 10));

  try {
    res = await createUser(user);
  } catch (error) {
    return {
      ...prevState,
      errors: { principal: error },
      success: false,
    };
  }

  // 4. Crear la sesion
  const isWorker = user.esprofesional;
  const name = user.nombre;
  id = res.id;
  await createSession(id, name, isWorker);
  return {
    ...prevState,
    errors: { principal: res.message },
    success: true,
  };
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
