// src/data/music.ts

import type { Song } from '../App';

export const musicDB: Song[] = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
    imageUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Rock",
    album: "A Night at the Opera"
  },
  {
    id: 2,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    duration: "8:02",
    imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Rock",
    album: "Led Zeppelin IV"
  },
  {
    id: 3,
    title: "Hotel California",
    artist: "Eagles",
    duration: "6:30",
    imageUrl: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Rock",
    album: "Hotel California"
  },
  {
    id: 4,
    title: "Billie Jean",
    artist: "Michael Jackson",
    duration: "4:54",
    imageUrl: "https://images.pexels.com/photos/2549013/pexels-photo-2549013.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Pop",
    album: "Thriller"
  },
  {
    id: 5,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    duration: "5:01",
    imageUrl: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Grunge",
    album: "Nevermind"
  },
  {
    id: 6,
    title: "Sweet Child o' Mine",
    artist: "Guns N' Roses",
    duration: "5:56",
    imageUrl: "https://images.pexels.com/photos/1779414/pexels-photo-1779414.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Rock",
    album: "Appetite for Destruction"
  },
  {
    id: 7,
    title: "Imagine",
    artist: "John Lennon",
    duration: "3:03",
    imageUrl: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Pop",
    album: "Imagine"
  },
];

let nextId: number = musicDB.length + 1;

export const getNextId = (): number => {
  return nextId++;
};