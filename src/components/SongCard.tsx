// src/components/SongCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SongCard.module.css';
import { type Song } from '../data/mockSongs';

interface SongCardProps {
  song: Song;
  onToggleFavorite: (song: Song) => void;
  isFavorite: boolean;
  onAddToList: (song: Song) => void; // <-- NUEVA PROP: Función para añadir a playlist
}

const SongCard: React.FC<SongCardProps> = ({ song, onToggleFavorite, isFavorite, onAddToList }) => { // <-- RECIBE LA NUEVA PROP
  return (
    <div className={styles.songCard}>
      <img src={song.imageUrl} alt={song.title} className={styles.songImage} />
      <div className={styles.songInfo}>
        <h3>
          <Link to={`/song/${song.id}`} className={styles.songTitleLink}>
            {song.title}
          </Link>
        </h3>
        <p className={styles.songArtist}>{song.artist}</p>
        <p className={styles.songDuration}>{song.duration}</p>
      </div>
      {/* BOTÓN/ICONO DE FAVORITO */}
      <button
        onClick={() => onToggleFavorite(song)}
        className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
        aria-label={isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      {/* BOTÓN PARA AÑADIR A PLAYLIST */}
      <button
        onClick={() => onAddToList(song)} // Llama a la función recibida por props
        className={styles.addToListButton} // Crearemos este estilo
        aria-label="Añadir a playlist"
      >
        ➕ {/* Un icono simple de "más" */}
      </button>
    </div>
  );
};

export default SongCard;