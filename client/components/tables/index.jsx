/* import React, { useState } from 'react';
import Link from 'next/link';
import styles from './TableComponent.module.scss'; // Asegúrate de que esta ruta sea correcta

const TableComponent = ({ title, status, subTables }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.tableTitle}>{title}</span>
        <span className={styles.tableStatus}>{status}</span>
      </div>
      {isOpen && (
        <div className={styles.subTables}>
          {subTables.map((subTable, index) => (
            <div key={index} className={styles.subTable}>
              <span className={styles.subTableTitle}>{subTable.title}</span>
              <span className={styles.subTableSolicitante}>{subTable.solicitante}</span>
              {title === "Solicitudes" ? (
                <div className={styles.actionButtons}>
                  {subTable.value.aceptar && (
                    <Link href="" legacyBehavior>
                      <a className={styles.acceptButton}>Aceptar</a>
                    </Link>
                  )}
                  {subTable.value.rechazar && (
                    <Link href="" legacyBehavior>
                      <a className={styles.rejectButton}>Rechazar</a>
                    </Link>
                  )}
                </div>
              ) : (
                <span className={styles.subTableValue}>{subTable.value}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileTables = ({ tables }) => {
  return (
    <div className={styles.profileTables}>
      {tables.map((table, index) => (
        <TableComponent key={index} {...table} />
      ))}
    </div>
  );
};

export default ProfileTables; */

import React, { useState } from "react";
import Link from "next/link";
import styles from "./TableComponent.module.scss"; // Asegúrate de que esta ruta sea correcta

const TableComponent = ({ title, subTables }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader} onClick={() => setIsOpen(!isOpen)}>
        {!isOpen && <span className={styles.tableTitle}>{title}</span>}
        {isOpen && (
          <div className={styles.tableHeaderContent}>
            <div className={styles.fila}>
              <h1 className={styles.titles}>{title}</h1>
              {title === "Solicitudes" && (
                <>
                  <span className={styles.titles}>Solicitantes</span>
                  <span className={styles.titles}>Estado</span>
                </>
              )}
            </div>

            <div className={styles.fila}>
              {title === "Postulaciones" && (
                <>
                  <span className={styles.tableHeaderLaburoDe}>Laburo de</span>
                  <span className={styles.titles}>Estado</span>
                </>
              )}
            </div>
            <div>
              {title === "Trabajos" && (
                <>
                  <span className={styles.tableHeaderLaburoPara}>
                    Laburo para
                  </span>
                  <span className={styles.titles}>Estado</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles.subTables}>
          {subTables.map((subTable, index) => (
            <div key={index} className={styles.subTable}>
              <span className={styles.subTableTitle}>{subTable.title}</span>
              <span className={styles.subTableSolicitante}>
                {subTable.solicitante}
              </span>
              {title === "Solicitudes" ? (
                <div className={styles.actionButtons}>
                  {subTable.value.aceptar && (
                    <Link href="" legacyBehavior>
                      <a className={styles.acceptButton}>Aceptar</a>
                    </Link>
                  )}
                  {subTable.value.rechazar && (
                    <Link href="" legacyBehavior>
                      <a className={styles.rejectButton}>Rechazar</a>
                    </Link>
                  )}
                </div>
              ) : (
                <span className={styles.subTableValue}>{subTable.value}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileTables = ({ tables }) => {
  return (
    <div className={styles.profileTables}>
      <h3>Panel de control</h3>
      {tables.map((table, index) => (
        <TableComponent key={index} {...table} />
      ))}
    </div>
  );
};

export default ProfileTables;
