const API_BASE_URL = 'https://apis.datos.gob.ar/georef/api';

export const fetchProvincias = async () => {
  const response = await fetch(`${API_BASE_URL}/provincias?orden=nombre`);
  if (!response.ok) {
    throw new Error('Error al obtener las provincias');
  }
  return response.json();
};

export const fetchLocalidades = async (provinciaId) => {
  const response = await fetch(`${API_BASE_URL}/localidades?provincia=${provinciaId}&orden=nombre&max=999`);
  if (!response.ok) {
    throw new Error('Error al obtener las localidades');
  }
  return response.json();
};
