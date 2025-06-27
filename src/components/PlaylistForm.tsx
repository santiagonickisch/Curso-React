import React, { useState } from 'react'; 
import styles from './PlaylistForm.module.css';


type PlaylistFormProps = {
  onSubmit: (name: string, description: string) => void;
  onCancel: () => void; 
};

const PlaylistForm = ({ onSubmit, onCancel }: PlaylistFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (name.trim()) { 
      onSubmit(name, description);
      setName('');
      setDescription('');
    }
  };

  return (
    <form className={styles.playlistForm} onSubmit={handleSubmit}>
      <h3>Crear Nueva Playlist</h3>
      <div className={styles.formGroup}>
        <label htmlFor="playlistName">Nombre:</label>
        <input
          type="text"
          id="playlistName"
          name="playlistName"
          className={styles.inputField}
          placeholder="Mi playlist favorita"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="playlistDescription">Descripción:</label>
        <textarea
          id="playlistDescription"
          name="playlistDescription"
          className={styles.textareaField}
          placeholder="Una breve descripción"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        ></textarea>
      </div>
      <div className={styles.formActions}> 
        <button type="submit" className={styles.submitButton}>
          Crear
        </button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PlaylistForm;