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

  const tUserWatching = {
    Visitor: 'visitor',
    My: 'my',
    Client: 'client',
    Worker: 'worker',
    none: null,
  };

  const whoIsWatching = (pageId) => {
    if (!userSessionData) return tUserWatching.Visitor; // No hay usuario logueado
    if (isUserWatchingOwnPage(pageId)) return tUserWatching.My; // El usuario logueado esta viendo su propia pagina
    return userSessionData.isWorker ? tUserWatching.Worker : tUserWatching.Client; // El usuario logueado esta viendo la pagina de otro usuario
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
        whoIsWatching,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
