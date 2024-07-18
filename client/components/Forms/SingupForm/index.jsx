'use client';
import styles from '../Form.module.scss';
import localStyles from './Singup.module.scss';

import { useState } from 'react';

/* Data */ // FIXME: Remplace this data from bd or api
import data from '@/data/data';
const { occupations } = data;

import Input from '@/components/Forms/Input';
import ButtonForm from '@/components/Forms/ButtonForm';
import Label from '@/components/Forms/Label';

import { registerUserAction } from '@/lib/auth';
import { useFormState } from 'react-dom';
const INITIAL_STATE_FORM = {
  zodErrors: {},
  message: '',
  data: {
    userType: '',
    email: '',
    password: '',
    name: '',
    lastname: '',
    province: '',
    city: '',
    address: '',
    number: null,
    floor: '',
    postalCode: null,
    areaCode: '+54',
    phone: null,
    occupations: '',
  },
};

const SingupForm = () => {
  const [userType, setUserType] = useState(''); // tUserType: cliente | profesional | ''
  const [userOccupations, setUserOccupations] = useState([]);
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE_FORM
  );

  return (
    <form
      action={formAction}
      className={`${styles.form} ${localStyles.form}`}
      name="singupForm"
    >
      <div className={styles.campo}>
        <div className={localStyles.optionsUsers}>
          <Input
            type="hidden"
            name="userType"
            value={userType}
            error={formState?.zodErrors?.userType}
          />
          <button
            type="button"
            className={`${localStyles.optionUser} ${
              userType == 'cliente'
                ? localStyles.active
                : userType == 'profesional'
                ? localStyles.inactive
                : ''
            }`}
            onClick={() => setUserType('cliente')}
          >
            Cliente
          </button>
          <button
            type="button"
            className={`${localStyles.optionUser} ${
              userType == 'profesional'
                ? localStyles.active
                : userType == 'cliente'
                ? localStyles.inactive
                : ''
            }`}
            onClick={() => setUserType('profesional')}
          >
            Profesional
          </button>
        </div>
      </div>
      {/*  */}
      {userType && (
        <>
          <div className={styles.campo}>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              error={formState?.zodErrors?.email}
            />
          </div>
          <div className={styles.campo}>
            <Label for="password">Contraseña</Label>
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              error={formState?.zodErrors?.password}
            />
          </div>
          <div className={styles.group}>
            <div className={styles.campo}>
              <Label for="name">Nombre</Label>
              <Input
                type="text"
                name="name"
                placeholder="Nombre"
                error={formState?.zodErrors?.name}
              />
            </div>
            <div className={styles.campo}>
              <Label for="lastname">Apellido</Label>
              <Input
                type="text"
                name="lastname"
                placeholder="Apellido"
                error={formState?.zodErrors?.lastname}
              />
            </div>
          </div>
          <div className={styles.group}>
            {/* TODO: Implemetar Provincias y Localidades con una API */}
            <div className={styles.campo}>
              <Label for="province">Provincia</Label>
              <Input type="text" name="province" placeholder="Provincia" />
            </div>
            <div className={styles.campo}>
              <Label for="city">Ciudad</Label>
              <Input type="text" name="city" placeholder="Ciudad" />
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.campo}>
              <Label for="address">Calle</Label>
              <Input
                type="text"
                name="address"
                placeholder="Direccion"
                error={formState?.zodErrors?.address}
              />
            </div>
            <div className={styles.campo}>
              <Label for="number">Numero</Label>
              <Input
                type="number"
                name="number"
                placeholder="Numero"
                min={0}
                error={formState?.zodErrors?.number}
              />
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.campo}>
              <Label for="floor">Piso (opcional)</Label>
              <Input
                type="text"
                name="floor"
                placeholder="Piso"
                error={formState?.zodErrors?.floor}
              />
            </div>
            <div className={styles.campo}>
              <Label for="postalCode">Codigo Postal</Label>
              <Input
                type="number"
                name="postalCode"
                placeholder="Codigo Postal"
                min={0}
                max={8}
              />
            </div>
          </div>
          <div className={styles.campo}>
            <Label for="phone">Telefono</Label>
            <div className={`${styles.group} ${styles.group__column}`}>
              <Input
                type="text"
                name="areaCode"
                placeholder="Codigo de area"
                otherStyles={'areaCode'}
                defaultValue={'+54'}
                readOnly
                disabled
              />
              <Input
                type="number"
                name="phone"
                placeholder="Telefono"
                error={formState?.zodErrors?.phone}
                min={0}
              />
            </div>
          </div>
          {userType === 'profesional' && (
            <div className={styles.campo}>
              <Label for="userOccupations">Ocupación</Label>
              <Input
                type="hidden"
                name="userOccupations"
                value={userOccupations}
              />
              <div className={styles.campo__row}>
                {occupations.map((occupation) => (
                  <button
                    key={occupation.id}
                    type="button"
                    className={`${localStyles.optionOccupation} ${
                      userOccupations.includes(occupation.id)
                        ? localStyles.activeOccupation
                        : ''
                    }`}
                    onClick={() => {
                      if (userOccupations.includes(occupation.id)) {
                        setUserOccupations(
                          userOccupations.filter((id) => id !== occupation.id)
                        );
                      } else {
                        setUserOccupations([...userOccupations, occupation.id]);
                      }
                    }}
                  >
                    {occupation.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <ButtonForm type="submit">Crear Cuenta</ButtonForm>
        </>
      )}
    </form>
  );
};

export default SingupForm;
