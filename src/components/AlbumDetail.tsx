import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from './Container';
import SongCard from './SongCard';
import styles from './CategorySongs.module.css';
import { useQuery } from '@tanstack/react-query';
import { musicService } from '../services/musicService';
import { type Song } from '../App';

interface AlbumDetailProps {
  onToggleFavorite: (song: Song) => void;
  isSongFavorite: (songId: number) => boolean;
  onAddToList: (song: Song) => void;
}

const AlbumDetail: React.FC<AlbumDetailProps> = ({ onToggleFavorite, isSongFavorite, onAddToList }) => {
  const { id } = useParams<{ id: string }>();

  const { data: songs, isLoading, isError, error } = useQuery({
    queryKey: ['songsByAlbum', id], 
    queryFn: () => musicService.getSongsByAlbum(id!), 
    enabled: !!id, 
  });

  if (isLoading) {
    return (
      <Container title={`Cargando álbum "${id}"...`}>
        <p>Cargando canciones...</p>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container title="Error">
        <p className={styles.noSongsMessage}>Error al cargar las canciones del álbum: {(error as Error).message}</p>
      </Container>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <Container title={`Álbum: "${id || 'Desconocido'}"`}>
        <p className={styles.noSongsMessage}>No se encontraron canciones para el álbum "{id}".</p>
        <Link to="/" className={styles.backButton}>Volver a la Lista de Canciones</Link>
      </Container>
    );
  }

  return (
    <Container title={`Canciones de: ${id}`}>
      <div className={styles.songGrid}>
        {songs.map((song: Song) => (
          <SongCard
            key={song.id}
            song={song}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isSongFavorite(song.id)}
            onAddToList={onAddToList}
          />
        ))}
      </div>
      <Link to="/" className={styles.backButton}>Volver a la Lista de Canciones</Link>
    </Container>
  );
};

export default AlbumDetail;