import React from 'react';
import { useParams, Link } from 'react-router-dom'; 
import Container from './Container';
import { mockSongs, type Song } from '../data/mockSongs'; 
import styles from './SongDetail.module.css'; 

const SongDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const song = mockSongs.find((s: Song) => s.id === id);

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
        </div>
        <Link to="/" className={styles.backButton}>Volver a la Lista de Canciones</Link>
      </div>
    </Container>
  );
};

export default SongDetail;