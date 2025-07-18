// src/components/FavoritesList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import SongCard from './SongCard';
import { type Song } from '../data/mockSongs'; // Asegúrate de importar 'type Song'
import styles from './FavoritesList.module.css';

interface FavoritesListProps {
  favoriteSongs: Song[];
  onToggleFavorite: (song: Song) => void;
  isSongFavorite: (songId: string) => boolean;
  onAddToList: (song: Song) => void; // <-- AÑADIDO ESTO
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favoriteSongs, onToggleFavorite, isSongFavorite, onAddToList }) => { // <-- RECIBE LA NUEVA PROP
  return (
    <Container title="Mis Canciones Favoritas">
      {favoriteSongs.length === 0 ? (
        <div className={styles.noFavorites}>
          <p>Aún no tienes canciones favoritas. ¡Explora y añade algunas!</p>
          <Link to="/" className={styles.backButton}>Ir a la Lista de Canciones</Link>
        </div>
      ) : (
        <div className={styles.favoritesGrid}>
          {favoriteSongs.map((song: Song) => (
            <SongCard
              key={song.id}
              song={song}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isSongFavorite(song.id)}
              onAddToList={onAddToList} // <-- Asegúrate de pasarla aquí también
            />
          ))}
        </div>
      )}
      {favoriteSongs.length > 0 && (
        <Link to="/" className={styles.backButton}>Volver a la Lista de Canciones</Link>
      )}
    </Container>
  );
};

export default FavoritesList;