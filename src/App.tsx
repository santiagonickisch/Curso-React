import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Container from './components/Container';
import SongCard from './components/SongCard';
import Sidebar from './components/Sidebar';
import { mockSongs } from './data/mockSongs';

export type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  imageUrl: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  songs: Song[];
};

function App() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]); 


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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar onAddPlaylist={addPlaylist} playlists={playlists} />
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          <Container>
            <h2>Nuestra Lista de Canciones</h2>
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
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;