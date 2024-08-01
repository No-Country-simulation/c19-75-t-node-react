'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { userSession } from '@/actions/actions';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [userSessionData, setUserSessionData] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await userSession(); // Obtiene data del usuario (id, nombre, esprofesional) desde cookie
      if (sessionData) {
        setSessionActive(true);
        setLoggedUserId(sessionData.userId);
      }
      setUserSessionData(sessionData);
    };
    fetchSession();
  }, [sessionActive]);

  const isUserWatchingOwnPage = (profileUserId) => {
    if (!userSessionData) return false;
    return loggedUserId === Number(profileUserId);
  };

  return (
    <SessionContext.Provider
      value={{
        userSessionData,
        setUserSessionData,
        setSessionActive,
        sessionActive,
        isUserWatchingOwnPage,
        loggedUserId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
