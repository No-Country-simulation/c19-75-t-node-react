'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { userSession } from '@/actions/actions';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [userSessionData, setUserSessionData] = useState(null);
  const [sessionActive, setSessionActive] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await userSession(); // Obtiene data del usuario (id, nombre, esprofesional) desde cookie
      console.log('session:', sessionData);

      setUserSessionData(sessionData);
    };
    fetchSession();
  }, [sessionActive]);

  return (
    <HeaderContext.Provider value={{ userSessionData, setUserSessionData, setSessionActive }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
