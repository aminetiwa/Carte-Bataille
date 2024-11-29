import React from "react";


interface Joueurs {
  numero: number; 
  cartes: { valeur: string, force: number }[];  
}

export default function Joueur({ numero, cartes }: Joueurs) {
  return (
    <div>
      <h2>Joueur {numero}</h2>
      <p>Cartes restantes : {cartes.length}</p>
    </div>
  );
}
