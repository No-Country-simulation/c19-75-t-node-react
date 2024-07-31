'use client';
import { useState, useEffect } from 'react';
import { fetchProvincias, fetchLocalidades } from '@/services/apiService';
import { IoConstructOutline } from 'react-icons/io5';

export const useLocationData = () => {
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPronvincias = async () => {
      try {
        const provincias = await fetchProvincias();
        setProvincias(provincias.provincias);
      } catch (error) {
        setError(error);
      }
    };

    getPronvincias();
  }, []);

  useEffect(() => {
    if (selectedProvincia) {
      const getLocalidades = async () => {
        try {
          const localidades = await fetchLocalidades(selectedProvincia);
          setLocalidades(localidades.localidades);
        } catch (error) {
          setError(error);
        }
      };

      getLocalidades();
    }
  }, [selectedProvincia]);

  return { provincias, localidades, setSelectedProvincia, error };
};
