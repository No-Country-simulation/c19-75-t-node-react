'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { userSession } from '@/actions/actions';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [userSessionData, setUserSessionData] = useState(null);
    const [sessionActive, setSessionActive] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await userSession(); // Obtiene data del usuario (id, nombre, esprofesional) desde cookie
            if (sessionData) {
                setSessionActive(true);
            }
            setUserSessionData(sessionData);
        };
        fetchSession();
    }, [sessionActive]);

    return (
        <SessionContext.Provider
            value={{ userSessionData, setUserSessionData, setSessionActive, sessionActive }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => useContext(SessionContext);
