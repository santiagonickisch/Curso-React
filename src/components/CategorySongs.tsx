// src/components/CategorySongs.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from './Container';
import SongCard from './SongCard';
import { mockSongs, type Song } from '../data/mockSongs'; // Asegúrate de importar 'type Song'
import styles from './CategorySongs.module.css';

interface CategorySongsProps {
  onToggleFavorite: (song: Song) => void;
  isSongFavorite: (songId: string) => boolean;
  onAddToList: (song: Song) => void; // <-- AÑADIDO ESTO
}

const CategorySongs: React.FC<CategorySongsProps> = ({ onToggleFavorite, isSongFavorite, onAddToList }) => {
  const { id } = useParams<{ id: string }>();

  const filteredSongs = mockSongs.filter(
    (song: Song) => song.category.toLowerCase() === id?.toLowerCase()
  );

  if (filteredSongs.length === 0) {
    return (
      <Container title={`Categoría: "${id || 'Desconocida'}"`}>
        <p className={styles.noSongsMessage}>No se encontraron canciones para la categoría "{id}".</p>
        <Link to="/" className={styles.backButton}>Volver a la Lista de Canciones</Link>
      </Container>
    );
  }

  return (
    <Container title={`Canciones de ${id}`}>
      <div className={styles.songGrid}>
        {filteredSongs.map((song: Song) => (
          <SongCard
            key={song.id}
            song={song}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isSongFavorite(song.id)}
            onAddToList={onAddToList} // <-- Asegúrate de pasarla aquí también
          />
        ))}
      </div>
      <Link to="/" className={styles.backButton}>Volver a la Lista de Canciones</Link>
    </Container>
  );
};

export default CategorySongs;