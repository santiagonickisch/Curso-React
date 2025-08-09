import { musicDB, getNextId } from '../data/music';
import type { Song } from '../App';

// Simula un retraso de API
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service con operaciones CRUD
export const musicService = {
  // GET all songs
  async getAllSongs(): Promise<Song[]> {
    await delay(300);
    const stored = localStorage.getItem('musicDB');
    if (stored) {
      return JSON.parse(stored);
    }
    return [...musicDB];
  },

  // GET song by ID
  async getSongById(id: string | number): Promise<Song> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : musicDB;
    const song = songs.find((s) => s.id === Number(id));
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  },

  // GET songs by category
  async getSongsByCategory(category: string): Promise<Song[]> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : musicDB;

    if (!category) {
      throw new Error('Category parameter is required');
    }

    return songs.filter((song) =>
      song.category && song.category.toLowerCase() === category.toLowerCase()
    );
  },

  // GET songs by album
  async getSongsByAlbum(album: string): Promise<Song[]> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : musicDB;

    if (!album) {
      throw new Error('Album parameter is required');
    }

    return songs.filter((song) => song.album && song.album.toLowerCase() === album.toLowerCase());
  },

  // GET songs by artist
  async getSongsByArtist(artist: string): Promise<Song[]> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : musicDB;

    if (!artist) {
      throw new Error('Artist parameter is required');
    }

    return songs.filter((song) => song.artist.toLowerCase().includes(artist.toLowerCase()));
  },
  
  // POST - Create new song
  async createSong(songData: Omit<Song, 'id'>): Promise<Song> {
    await delay(400);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : [...musicDB];

    const newSong: Song = {
      ...songData,
      id: getNextId(),
      imageUrl:
        songData.imageUrl ||
        'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    };

    songs.push(newSong);
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return newSong;
  },

  // PUT - Update existing song
  async updateSong(id: string | number, songData: Partial<Song>): Promise<Song> {
    await delay(400);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : [...musicDB];

    const index = songs.findIndex((s) => s.id === Number(id));
    if (index === -1) {
      throw new Error('Song not found');
    }

    songs[index] = { ...songs[index], ...songData };
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return songs[index];
  },

  // DELETE song
  async deleteSong(id: string | number): Promise<{ success: boolean }> {
    await delay(300);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : [...musicDB];

    const index = songs.findIndex((s) => s.id === Number(id));
    if (index === -1) {
      throw new Error('Song not found');
    }

    songs.splice(index, 1);
    localStorage.setItem('musicDB', JSON.stringify(songs));
    return { success: true };
  },
  
  // Search songs
  async searchSongs(query: string): Promise<Song[]> {
    await delay(200);
    const stored = localStorage.getItem('musicDB');
    const songs: Song[] = stored ? JSON.parse(stored) : musicDB;

    if (!query) return songs;

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase()) ||
        (song.category && song.category.toLowerCase().includes(query.toLowerCase()))
    );
  },
};