import { useState } from 'react';

const FileUpload = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="fileUpload" className={styles.label}>
        Subir Foto/s
      </label>
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.input}
      />
    </div>
  );
};

export default FileUpload;
