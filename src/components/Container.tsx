import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  title?: string; 
  children: React.ReactNode; 
}

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </div>
  );
};

export default Container;