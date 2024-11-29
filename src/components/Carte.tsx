import React from "react";
import '../App.css';

interface Cartes {
  valeur: string;
}

const Carte = ({ valeur }: Cartes) => {
  const imageSrc = require(`./Images/${valeur}.jpg`);

  return (
    <div className="carte-container">  
      <img
        src={imageSrc}
        alt={`Carte ${valeur}`}
        className="carte-image"  
      />
    </div>
  );
};

export default Carte;
