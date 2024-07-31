import { useState } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  const sendNotification = (message) => {
    addNotification({ message });
  };

  return { notifications, addNotification, sendNotification };
};

export default useNotifications;