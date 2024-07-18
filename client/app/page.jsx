<<<<<<< HEAD
'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('Conectando...');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Función para verificar el estado de la conexión
    const checkConnection = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/status');
        setConnectionStatus(response.data);
      } catch (error) {
        setConnectionStatus('No se pudo establecer la conexión');
        console.error('Error fetching connection status: ', error);
      }
    };

    // Función para obtener los datos de los usuarios
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    checkConnection(); // Verificar la conexión al montar el componente
    fetchUsers(); // Obtener los datos de los usuarios al montar el componente
  }, []);

  return (
    <div className="App">
      <h1>Estado de la Conexión</h1>
      <p>{connectionStatus}</p>
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Direccion</th>
            <th>Ciudad</th>
            <th>Provincia</th>
            <th>Cp</th>
            <th>Tel</th>
            <th>Email</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.direccion}</td>
              <td>{user.ciudad}</td>
              <td>{user.provincia}</td>
              <td>{user.cp}</td>
              <td>{user.tel}</td>
              <td>{user.mail}</td>
              <td>{user.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


=======


export default function Home() {
  return (
    <main>
      HomePage 
    </main>
  );
}
>>>>>>> 413a58aab03e36ef7c65f631d969b87bb53184b8
