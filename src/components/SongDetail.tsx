import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from './Container';
import styles from './SongDetail.module.css';
import { useQuery } from '@tanstack/react-query';
import { musicService } from '../services/musicService';

const SongDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: song, isLoading, isError, error } = useQuery({
    queryKey: ['song', id],
    queryFn: () => musicService.getSongById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container title="Cargando...">
        <p>Cargando detalles de la canción...</p>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container title="Error">
        <p className={styles.errorMessage}>Error: {(error as Error).message}</p>
      </Container>
    );
  }

  if (!song) {
    return (
      <Container title="Canción No Encontrada">
        <p className={styles.errorMessage}>Lo sentimos, la canción con ID "{id}" no fue encontrada.</p>
        <Link to="/">Volver a la Lista de Canciones</Link>
      </Container>
    );
  }

  return (
    <Container title={`Detalles de: ${song.title}`}>
      <div className={styles.songDetailCard}>
        <img src={song.imageUrl} alt={song.title} className={styles.songImage} />
        <div className={styles.songInfo}>
          <h2>{song.title}</h2>
          <p><strong>Artista:</strong> {song.artist}</p>
          <p><strong>Duración:</strong> {song.duration}</p>
          <p><strong>Categoría:</strong> {song.category}</p>
          <p><strong>Álbum:</strong> {song.album}</p>
        </div>
        <Link to="/" className={styles.backButton}>Volver a la Lista de Canciones</Link>
      </div>
    </Container>
  );
};

export default SongDetail;