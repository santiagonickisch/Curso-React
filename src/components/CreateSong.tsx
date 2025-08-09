import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Container from './Container';
import { musicService } from '../services/musicService';
import styles from './CreateSong.module.css';

const CreateSong: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [newSongData, setNewSongData] = useState({
    title: '',
    artist: '',
    album: '',
    category: '',
    duration: '',
    imageUrl: '',
  });

  // Hook de mutación
  const mutation = useMutation({
    mutationFn: musicService.createSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      navigate('/');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSongData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(newSongData);
  };

  return (
    <Container title="Crear Nueva Canción">
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label className={styles.formLabel}>
          Título:
          <input type="text" name="title" value={newSongData.title} onChange={handleChange} required />
        </label>
        <label className={styles.formLabel}>
          Artista:
          <input type="text" name="artist" value={newSongData.artist} onChange={handleChange} required />
        </label>
        <label className={styles.formLabel}>
          Álbum:
          <input type="text" name="album" value={newSongData.album} onChange={handleChange} required />
        </label>
        <label className={styles.formLabel}>
          Categoría:
          <select name="category" value={newSongData.category} onChange={handleChange} required>
            <option value="">Selecciona una categoría</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Grunge">Grunge</option>
          </select>
        </label>
        <label className={styles.formLabel}>
          Duración:
          <input type="text" name="duration" value={newSongData.duration} onChange={handleChange} required />
        </label>
        <label className={styles.formLabel}>
          URL de la imagen:
          <input type="url" name="imageUrl" value={newSongData.imageUrl} onChange={handleChange} />
        </label>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creando...' : 'Crear Canción'}
        </button>
        {mutation.isError && <p className={styles.errorMessage}>Error: {(mutation.error as Error).message}</p>}
      </form>
    </Container>
  );
};

export default CreateSong;