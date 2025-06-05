import Navbar from './components/Navbar';
import Container from './components/Container';
import SongCard from './components/SongCard'; 
import { mockSongs } from './data/mockSongs'; 

export type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  imageUrl: string;
};

function App() {
  return (
    <div>
      <Navbar />
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
  );
}

export default App;