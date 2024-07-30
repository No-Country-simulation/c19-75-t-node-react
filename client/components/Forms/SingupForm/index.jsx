'use client';
import styles from '../Form.module.scss';
import localStyles from './Singup.module.scss';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

/* Data */ // FIXME: Remplace this data from bd or api
import { singup } from '@/actions/auth';
import { PROFESIONS } from '@/types/types';
import { useLocationData } from '@/hook/useLocationData';

import Input from '@/components/Forms/Input';
import ButtonForm from '@/components/Forms/ButtonForm';
import Label from '@/components/Forms/Label';
import Select from '../Select';

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
    occupations: [],
  },
};

const SingupForm = ({ userTypeSelected }) => {
  const [userType, setUserType] = useState(userTypeSelected); // tUserType: cliente | trabajador | ''
  const [userOccupations, setUserOccupations] = useState([]);
  const [formState, formAction, pending] = useFormState(singup, INITIAL_STATE_FORM);
  const { provincias, localidades, setSelectedProvincia, error } = useLocationData();

  return (
    <>
      <form action={formAction} className={`${styles.form} ${localStyles.form}`} name="singupForm">
        <div className={styles.campo}>
          <div className={localStyles.optionsUsers}>
            <button
              type="button"
              className={`${localStyles.optionUser} ${
                userType == 'cliente'
                  ? localStyles.active
                  : userType == 'trabajador'
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
                userType == 'trabajador'
                  ? localStyles.active
                  : userType == 'cliente'
                  ? localStyles.inactive
                  : ''
              }`}
              onClick={() => setUserType('trabajador')}
            >
              trabajador
            </button>
            <Input type="hidden" name="userType" value={userType} error={formState?.zodErrors?.userType} />
          </div>
        </div>
        {/*  */}
        {userType && (
          <>
            <div className={styles.campo}>
              <Label for="email">Email</Label>
              <Input type="email" name="email" placeholder="Email" error={formState?.zodErrors?.email} />
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
                <Input type="text" name="name" placeholder="Nombre" error={formState?.zodErrors?.name} />
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
              <div className={styles.campo}>
                <Label for="province">Provincia</Label>
                <Select
                  id="provincia"
                  name="province"
                  options={provincias}
                  onChange={(e) => setSelectedProvincia(e.target.value)}
                  error={formState?.zodErrors?.province}
                >
                  <option value="">Selecciona una provincia</option>
                </Select>
              </div>
              <div className={styles.campo}>
                <Label for="city">Ciudad</Label>
                <Select id="localidad" name="city" options={localidades} error={formState?.zodErrors?.city}>
                  <option value="">Selecciona una ciudad</option>
                </Select>

                {/* <Input type="text" name="city" placeholder="Ciudad" error={formState?.zodErrors?.city} /> */}
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.campo}>
                <Label for="barrio">Barrio</Label>
                <Input type="text" name="barrio" placeholder="Barrio" error={formState?.zodErrors?.barrio} />
              </div>
              <div className={styles.campo}>
                <Label for="postalCode">Codigo Postal</Label>
                <Input type="number" name="postalCode" placeholder="Codigo Postal" min={0} max={9999} />
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
            {userType === 'trabajador' && (
              <div className={styles.campo}>
                <Label for="userOccupations">Ocupación</Label>
                <Input type="hidden" name="userOccupations" value={userOccupations} />
                <div className={styles.campo__row}>
                  {PROFESIONS.map((occupation) => (
                    <button
                      key={occupation.id}
                      type="button"
                      className={`${localStyles.optionOccupation} ${
                        userOccupations.includes(occupation.id) ? localStyles.activeOccupation : ''
                      }`}
                      onClick={() => {
                        if (userOccupations.includes(occupation.id)) {
                          setUserOccupations(userOccupations.filter((id) => id !== occupation.id));
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
            <ButtonForm type="submit" pending={pending} textPending={'Creando Cuenta...'}>
              Crear Cuenta
            </ButtonForm>
          </>
        )}
      </form>
    </>
  );
};

export default SingupForm;
