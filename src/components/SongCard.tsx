import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SongCard.module.css';
import { type Song } from '../App';

interface SongCardProps {
  song: Song;
  onToggleFavorite: (song: Song) => void;
  isFavorite: boolean;
  onAddToList: (song: Song) => void; 
}

const SongCard: React.FC<SongCardProps> = ({ song, onToggleFavorite, isFavorite, onAddToList }) => {
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
      <button
        onClick={() => onToggleFavorite(song)}
        className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
        aria-label={isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <button
        onClick={() => onAddToList(song)} 
        className={styles.addToListButton} 
        aria-label="Añadir a playlist"
      >
        ➕ 
      </button>
    </div>
  );
};

export default SongCard;