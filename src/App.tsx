// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SongDetail from './components/SongDetail';
import CategorySongs from './components/CategorySongs';
import FavoritesList from './components/FavoritesList';
import Navbar from './components/Navbar';
import Container from './components/Container';
import SongCard from './components/SongCard';
import Sidebar from './components/Sidebar';
import { mockSongs, type Song } from './data/mockSongs';

export type Playlist = {
  id: string;
  name: string;
  description: string;
  songs: Song[];
};

function App() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);

  // NUEVOS ESTADOS PARA EL MODAL DE AÑADIR A PLAYLIST
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState<boolean>(false); // Controla la visibilidad del modal
  const [songToAdd, setSongToAdd] = useState<Song | null>(null); // Guarda la canción seleccionada para añadir

  const addPlaylist = (name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      songs: [],
    };
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    console.log('Nueva playlist creada:', newPlaylist);
  };

  const toggleFavorite = (song: Song) => {
    setFavoriteSongs((prevFavorites) => {
      const isFavorite = prevFavorites.some((favSong) => favSong.id === song.id);
      if (isFavorite) {
        console.log(`Eliminando ${song.title} de favoritos`);
        return prevFavorites.filter((favSong) => favSong.id !== song.id);
      } else {
        console.log(`Añadiendo ${song.title} a favoritos`);
        return [...prevFavorites, song];
      }
    });
  };

  const isSongFavorite = (songId: string): boolean => {
    return favoriteSongs.some((favSong) => favSong.id === songId);
  };

  // NUEVAS FUNCIONES PARA AÑADIR A PLAYLIST
  const handleAddSongToPlaylistClick = (song: Song) => {
    setSongToAdd(song); // Guarda la canción que se va a añadir
    setShowAddToPlaylistModal(true); // Muestra el modal
  };

  const handleCloseAddToPlaylistModal = () => {
    setShowAddToPlaylistModal(false); // Cierra el modal
    setSongToAdd(null); // Limpia la canción seleccionada
  };

  const handleAddSongToExistingPlaylist = (playlistId: string) => {
    if (!songToAdd) return; // No hay canción para añadir

    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) => {
        if (playlist.id === playlistId) {
          // Asegurarse de no añadir duplicados en la misma playlist
          if (!playlist.songs.some((s) => s.id === songToAdd.id)) {
            console.log(`Añadiendo ${songToAdd.title} a la playlist ${playlist.name}`);
            return { ...playlist, songs: [...playlist.songs, songToAdd] };
          } else {
            console.log(`${songToAdd.title} ya está en la playlist ${playlist.name}`);
          }
        }
        return playlist;
      })
    );
    handleCloseAddToPlaylistModal(); // Cierra el modal después de añadir
  };


  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar onAddPlaylist={addPlaylist} playlists={playlists} />
          <div className="main-content-area" style={{ flexGrow: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={
                <Container title="Nuestra Lista de Canciones">
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '20px',
                      marginTop: '20px',
                    }}
                  >
                    {mockSongs.map((song) => (
                      <SongCard
                        key={song.id}
                        song={song}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={isSongFavorite(song.id)}
                        onAddToList={handleAddSongToPlaylistClick} // <-- NUEVA PROP: Pasar la función
                      />
                    ))}
                  </div>
                  <div className="app-nav-links">
                    <Link to="/song/1">Ir a Detalles de la Canción 1 (ejemplo)</Link>
                    <Link to="/category/Rock">Ir a Canciones de Rock (ejemplo)</Link>
                    <Link to="/favoritos">Ir a Mis Favoritas</Link>
                  </div>
                </Container>
              } />

              <Route path="/song/:id" element={<SongDetail />} />
              <Route path="/category/:id" element={
                <CategorySongs
                  onToggleFavorite={toggleFavorite}
                  isSongFavorite={isSongFavorite}
                  onAddToList={handleAddSongToPlaylistClick} // <-- NUEVA PROP
                />
              } />

              <Route path="/favoritos" element={
                <FavoritesList
                  favoriteSongs={favoriteSongs}
                  onToggleFavorite={toggleFavorite}
                  isSongFavorite={isSongFavorite}
                  onAddToList={handleAddSongToPlaylistClick} // <-- NUEVA PROP
                />
              } />
              
            </Routes>
          </div>
        </div>
      </div>

      {/* Renderizar el modal de añadir a playlist si showAddToPlaylistModal es true */}
      {showAddToPlaylistModal && songToAdd && (
        <div className="add-to-playlist-modal-overlay"> {/* Este será el fondo oscuro */}
          <div className="add-to-playlist-modal"> {/* Este será el contenido del modal */}
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
    </Router>
  );
}

export default App;