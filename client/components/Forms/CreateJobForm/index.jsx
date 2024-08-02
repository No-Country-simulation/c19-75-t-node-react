'use client';
import styles from '../Form.module.scss';
import localStyles from './CreateJob.module.scss';

import { useEffect, useState, useRef } from 'react';

import { CATEGORIES } from '@/types/types';

import Input from '@/components/Forms/Input';
import ButtonForm from '@/components/Forms/ButtonForm';
import Label from '@/components/Forms/Label';
import ZodErrors from '../Custom';
import { useRouter } from 'next/navigation';

const CreateJobForm = () => {
  const [jobCategory, setJobCategory] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [falseSubmit, setFalseSubmit] = useState(false); // Fixme: Delte this
  const router = useRouter();
  useEffect(() => {
    console.log('Selected files:', selectedFiles);
  }, [selectedFiles]);

  useEffect(() => {
    const newPreviews = selectedFiles.map((file) => {
      return URL.createObjectURL(file);
    });
    setFilePreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleSubmit = (event) => {
    // Fixme: Delte this
    event.preventDefault();
    setTimeout(() => {
      setFalseSubmit(true);
    }, 2500);
    setTimeout(() => {
      router.back();
    }, 5000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles.form} ${localStyles.form}`} name="singupForm">
        <div className={styles.campo}>
          <Label for="title">Titulo del trabajo</Label>
          <Input type="text" name="title" placeholder="Titulo" />
        </div>
        <div className={styles.campo}>
          <Label for="descripcion">Descripcion</Label>
          <textarea
            name="descripcion"
            id="coment"
            cols="30"
            rows="10"
            placeholder="Escribe una descripción del trabajo a realizar."
            className={localStyles.textarea}
          ></textarea>
        </div>
        <div className={styles.campo}>
          <Label for="">Fotos</Label>
          <div className={localStyles.infoImg}>
            <input
              type="file"
              name="imgs"
              id="imgs"
              className={localStyles.inputfile}
              data-multiple-caption="{count} files selected"
              multiple
              onChange={handleFileChange}
            />
            <label for="imgs">Selecciona unas fotos</label>
            <p>{selectedFiles.length} archivo(s) seleccionado(s)</p>
          </div>
          <div className={localStyles.previews}>
            {filePreviews.map((url, index) => (
              <img key={index} src={url} alt={`Preview ${index}`} className={localStyles.previewImage} />
            ))}
          </div>
        </div>

        <div className={styles.campo}>
          <Label for="userOccupations">Ocupaciónes</Label>
          <Input type="hidden" name="userOccupations" value={jobCategory} />
          <div className={styles.campo__row}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${localStyles.optionOccupation} ${
                  jobCategory === cat.id ? localStyles.activeOccupation : ''
                }`}
                onClick={() => setJobCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <ButtonForm type="submit">Crear oferta</ButtonForm>
        {falseSubmit && (
          <ZodErrors error={'Oferta de trabajo creada con exito'} type="principal" success={true} />
        )}
      </form>
    </>
  );
};

export default CreateJobForm;
