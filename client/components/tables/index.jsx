import React, { useState } from "react";
import Link from "next/link";
import styles from "./TableComponent.module.scss";

const TableComponent = ({ title, subTables }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader} onClick={() => setIsOpen(!isOpen)}>
        {!isOpen && <span className={styles.tableTitle}>{title}</span>}
        {isOpen && (
          <div className={styles.tableHeaderContent}>
            <div className={styles.fila}>
              {title === "Solicitudes" && (
                <>
                  <span className={styles.headerTitles}>Solicitudes</span>
                  <span className={styles.headerTitles}>Oferta de</span>
                  <span className={styles.headerTitles}></span>
                </>
              )}
              {title === "Postulaciones" && (
                <>
                  <span className={styles.headerTitles}>Postulaciones</span>
                  <span className={styles.headerTitles}>Laburo para</span>
                  <h3 className={styles.headerTitles}>Estado</h3>
                </>
              )}
              {title === "Laburos" && (
                <>
                  <span className={styles.headerTitles}>Laburos</span>
                  <span className={styles.headerTitles}>Cliente</span>
                  <h3 className={styles.headerTitles}>Estado</h3>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles.subTablesWrapper}>
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
        </div>
      )}
    </div>
  );
};

const ProfileTables = ({ tables }) => {
  return (
    <div className={styles.profileTables}>
      <h3>Panel de control</h3>
      <div>
        {tables.map((table, index) => (
          <TableComponent key={index} {...table} />
        ))}
      </div>
    </div>
  );
};

export default ProfileTables;
