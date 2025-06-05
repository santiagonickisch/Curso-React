import type { Song } from '../App';
import styles from './SongCard.module.css'; 

type SongCardProps = {
  song: Song;
};

const SongCard = ({ song }: SongCardProps) => {
  return (
    <div className={styles.card}>
      <img
        src={song.imageUrl}
        alt={song.title}
        className={styles.image} 
      />

      <h3 className={styles.title}>{song.title}</h3> 
      <p className={styles.artist}>{song.artist}</p> 
      <p className={styles.duration}>Duración: {song.duration}</p> 

      <button className={styles.button}>
        ▶ Play
      </button>
    </div>
  );
};

export default SongCard;