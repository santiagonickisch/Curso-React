import React from 'react';
import styles from './Container.module.css'; // Importa los estilos

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    // Elimina el atributo 'style' y usa 'className' con styles.container
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default Container;