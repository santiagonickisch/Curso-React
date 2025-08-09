import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SongDetail from './components/SongDetail';
import CategorySongs from './components/CategorySongs';
import FavoritesList from './components/FavoritesList';
import Container from './components/Container';
import SongCard from './components/SongCard';
import Sidebar from './components/Sidebar';
import { useQuery } from '@tanstack/react-query';
import { musicService } from './services/musicService';
import AlbumDetail from './components/AlbumDetail';
import CreateSong from './components/CreateSong';

export type Song = {
  id: number;
  title: string;
  artist: string;
  duration: string;
  imageUrl: string;
  category: string;
  album: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  songs: Song[];
};

function App() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);

  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState<boolean>(false);
  const [songToAdd, setSongToAdd] = useState<Song | null>(null);

  const { data: songs, isLoading, isError, error } = useQuery({
    queryKey: ['songs'],
    queryFn: musicService.getAllSongs,
  });

  const addPlaylist = (name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      songs: [],
    };
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
  };

  const toggleFavorite = (song: Song) => {
    setFavoriteSongs((prevFavorites) => {
      const isFavorite = prevFavorites.some((favSong) => favSong.id === song.id);
      if (isFavorite) {
        return prevFavorites.filter((favSong) => favSong.id !== song.id);
      } else {
        return [...prevFavorites, song];
      }
    });
  };

  const isSongFavorite = (songId: number): boolean => {
    return favoriteSongs.some((favSong) => favSong.id === songId);
  };

  const handleAddSongToPlaylistClick = (song: Song) => {
    setSongToAdd(song);
    setShowAddToPlaylistModal(true);
  };

  const handleCloseAddToPlaylistModal = () => {
    setShowAddToPlaylistModal(false);
    setSongToAdd(null);
  };

  const handleAddSongToExistingPlaylist = (playlistId: string) => {
    if (!songToAdd) return;
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) => {
        if (playlist.id === playlistId) {
          if (!playlist.songs.some((s) => s.id === songToAdd.id)) {
            return { ...playlist, songs: [...playlist.songs, songToAdd] };
          }
        }
        return playlist;
      })
    );
    handleCloseAddToPlaylistModal();
  };

  return (
    <div className="App">
      <Sidebar onAddPlaylist={addPlaylist} playlists={playlists} />
      <div className="main-content-area">
        <Routes>
          <Route path="/" element={
            <Container title="Nuestra Lista de Canciones">
              {isLoading && <p>Cargando canciones...</p>}
              {isError && <p>Error al cargar las canciones: {(error as Error).message}</p>}
              {!isLoading && !isError && songs && (
                <div className="song-list">
                  {songs.map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={isSongFavorite(song.id)}
                      onAddToList={handleAddSongToPlaylistClick}
                    />
                  ))}
                </div>
              )}
            </Container>
          } />
          <Route path="/song/:id" element={<SongDetail />} />
          <Route path="/category/:id" element={
            <CategorySongs
              onToggleFavorite={toggleFavorite}
              isSongFavorite={isSongFavorite}
              onAddToList={handleAddSongToPlaylistClick}
            />
          } />
          <Route path="/favoritos" element={
            <FavoritesList
              favoriteSongs={favoriteSongs}
              onToggleFavorite={toggleFavorite}
              isSongFavorite={isSongFavorite}
              onAddToList={handleAddSongToPlaylistClick}
            />
          } />
          <Route path="/album/:id" element={
            <AlbumDetail
              onToggleFavorite={toggleFavorite}
              isSongFavorite={isSongFavorite}
              onAddToList={handleAddSongToPlaylistClick}
            />
          } />
          <Route path="/create-song" element={<CreateSong />} />
        </Routes>
      </div>
      {showAddToPlaylistModal && songToAdd && (
        <div className="add-to-playlist-modal-overlay">
          <div className="add-to-playlist-modal">
            <h3>Añadir "{songToAdd.title}" a una Playlist</h3>
            {playlists.length === 0 ? (
              <p>No tienes playlists creadas. Por favor, crea una desde el menú lateral.</p>
            ) : (
              <div className="playlist-selection-grid">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => handleAddSongToExistingPlaylist(playlist.id)}
                    className="playlist-selection-button"
                  >
                    {playlist.name}
                  </button>
                ))}
              </div>
            )}
            <button onClick={handleCloseAddToPlaylistModal} className="modal-close-button">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;