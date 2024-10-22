import React, { useState } from "react";
import styles from "./NotificationBell.module.scss";
import { IoMdNotifications  } from "react-icons/io";
import useNotifications from "../utils/notifications";
import Link from "next/link";

const NotificationBell = () => {
  // const { notifications } = useNotifications();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      usuario: "Marta Lopez",
    },
    {
      id: 2,
      usuario: "Marta Lopez",
    },
    {
      id: 3,
      usuario: "Marta Lopez",
    },
    {
      id: 4,
      usuario: "Marta Lopez",
    },
    {
      id: 5,
      usuario: "Marta Lopez",
    },
    {
      id: 6,
      usuario: "Marta Lopez",
    },
    {
      id: 7,
      usuario: "Marta Lopez",
    },
    {
      id: 8,
      usuario: "Marta Lopez",
    },
    {
      id: 9,
      usuario: "Marta Lopez",
    },
    {
      id: 10,
      usuario: "Marta Lopez",
    },
    {
      id: 11,
      usuario: "Marta Lopez",
    },
  ];

  return (
    <>
      <div
        className={styles.notificationBellContainer}
        onClick={() => setOpen(!open)}
      >
        <div
          className={`${styles.notificationBell} ${
            active ? styles.active : styles.inactive
          }`}
        >
          <IoMdNotifications
            className={`${styles.iconBell} ${
              active ? styles.activeIcon : styles.inactiveIcon
            }`}
          />
        </div>
        {active && (
          <span className={styles.notificationCount}>
            {notifications.length}
          </span>
        )}
      </div>
      {open && (
        <div className={styles.notificationsOpen}>
          {notifications.map((notification) => (
            <>
              <div className={styles.notificationFila}>
                <ul key={notification.id} className={styles.notification}>
                  <span className={styles.oferta}>Solicitud de: </span>
                  <span className={styles.usuario}> {notification.usuario}</span>
                </ul>
                <Link href="" className={styles.button}>
                  <h5>Ver solicitud</h5>
                </Link>
              </div>
              <hr />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationBell;
