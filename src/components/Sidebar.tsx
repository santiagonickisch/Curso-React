import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import PlaylistForm from './PlaylistForm';
import type { Playlist } from '../App';
import { Link } from 'react-router-dom';

type SidebarProps = {
  onAddPlaylist: (name: string, description: string) => void;
  playlists: Playlist[];
};

const Sidebar = ({ onAddPlaylist, playlists }: SidebarProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleNewPlaylistClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handlePlaylistSubmit = (name: string, description: string) => {
    onAddPlaylist(name, description);
    setIsFormVisible(false);
  };

  return (
    <div className={styles.sidebar}>
      <button
        className={styles.newPlaylistButton}
        onClick={handleNewPlaylistClick}
      >
        {isFormVisible ? 'Cancelar' : 'Nueva playlist'}
      </button>

      <Link to="/create-song" className={styles.createSongButton}>
        Crear nueva canción
      </Link>
      
      <Link to="/favoritos" className={styles.favoritesButton}>
        Ir a mis favoritos
      </Link>
      
      {isFormVisible && (
        <PlaylistForm
          onSubmit={handlePlaylistSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      <div className={styles.playlistsList}>
        {playlists.length > 0 ? (
          <>
            <h3>Mis Playlists</h3>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist.id} className={styles.playlistItem}>
                  {playlist.name}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className={styles.noPlaylistsMessage}>No tienes playlists aún.</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;