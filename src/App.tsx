import React, { useState } from "react";
import "./App.css"; 
import Joueur from "./components/Joueur";
import Carte from "./components/Carte";

interface Carte {
  valeur: string;
  force: number;
}
//cette boucle va parcourire le tableau pour le melanger 
const Melangedeck = (deck: Carte[]): Carte[] => {
  
  //parcour le tableau de la fin ver le debut 
  for (let i = deck.length - 1; i > 0; i--) {
    
    //donne un nombre aleatoires initialiser dans j entre 0 et i(taille du deck)
    const j = Math.floor(Math.random() * (i + 1));

    //initialise temp qui prend une valeur du tableau cela permet de garder la valeur avant l'echange
    const temp = deck[i];
    
    //echange
    deck[i] = deck[j];
    
    //Affecte la valeur initiale de deck[i] (stocker dans temp) a deck[j]
    deck[j] = temp;
  }

  //retourne le tableau melanger
  return deck;
};

export default function App() {
  
  //creation dun tableau qui contient les numeros des carte de 2 a A
  const num = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  
  //creation dun tableau qui contient les type des carte (pique,trefle,coeur..)
  const type = ["S", "H", "D", "C"];
  
  //creation dun tableau vide qui va etre initialiser plus tard ligne 42
  const deck: Carte[] = [];
  
  //boucle qui va parcourir les num des carte de 2 a A
  for (let i = 0; i < num.length; i++) {
    
    // bouclle qui va parcourire les type de carte de S a C
    for (let j = 0; j < type.length; j++) {
       
       //va assemble le num(2,3,4...) et le type(S,H,D...) pour faire numtype(2S,3S,4S....) puis definir la force 
        //va remplire le tableau deck
      deck.push({ valeur: `${num[i]}${type[j]}`, force: i });
    }
  }

//permet dinitialiser les carte distribuer au debut recupere le deck(deck: Carte[])
//et a l'aide de Melangedeck les carte vont etre melanger puis le resultat est divise par 2
// pour que les joueur ont chacun la moitier du nombre de carte disponible  
  const [joueur1, setJoueur1] = useState<Carte[]>(Melangedeck(deck).slice(0, Melangedeck(deck).length / 2));
  const [joueur2, setJoueur2] = useState<Carte[]>(Melangedeck(deck).slice(Melangedeck(deck).length / 2));
  
  //creation dun tableau qui contient les message du jeu 
  //exemple (Le jeu commence,joueur a gagner,egalite....") 
  //cest message pouront etre ecrit a l'aide de setmessage  
  const [message, setMessage] = useState("Le jeu commence!");
 
  //creation dun tableau pour stocker la carte selectioner par le joueur
  //pour ecrire ou mettre a jour la carte selectionner dans le tableau 
  //il faut utuliser setCarteSelectionneeJoueur1
  //useState peut etre null car le joueur n'a pas encore selectionner de carte
  //ou un objet de type carte qui contien les valeur de la carte selectionner 
  const [carteSelectionneeJoueur1, setCarteSelectionneeJoueur1] = useState<Carte | null>(null);
  
  //creation variable qui va stocker la valeur de la carte que le joueur aura choisi
  const selectionnerCarteJoueur1 = (carte: Carte) => {
    setCarteSelectionneeJoueur1(carte);
  };
  
  //creation foction pour verifier si le joueur a selectioner une carte
  const jouerTour = () => {
    
    //si carteSelectionneeJoueur1 est null alors ecrit un message
    //que le joueur doit selectionner une carte
    if (carteSelectionneeJoueur1 == null) {
      setMessage("Le joueur 1 dois selectionner une carte !");
      return;
    }
   
    //creationde variable carte1 et 2
    const carte1 = carteSelectionneeJoueur1;
    const carte2 = joueur2[0];

    //ici logique du jeu
    //si la valeur de la carte 1 est elever a celle de la carte2
    //le joueur1gagne
if (carte1.force > carte2.force) {
 
  //creation dun tableau pour stocker toute les carte du joueur sauf celle qui ont  ete poser 
  const nouvellesCartesJoueur1 = [];
 
  //boucle qui parcoure tous le tableau(la main du joueur1)
  for (let i = 0; i < joueur1.length; i++) {
    
    //condition pour que les carte selectionner ne soit pas recupere
    if (joueur1[i] !== carteSelectionneeJoueur1) {

      //remplie le tableau
      nouvellesCartesJoueur1.push(joueur1[i]); 
    }
  }
  
  //ajoute les carte gagner
  nouvellesCartesJoueur1.push(carte1); 
  nouvellesCartesJoueur1.push(carte2);
  setJoueur1(nouvellesCartesJoueur1);

  //creation dun tableau pour stocker toute les carte du joueur sauf celle qui ont  ete poser 
  const nouvellesCartesJoueur2 = [];

  //boucle qui parcoure tous le tableau(la main du joueur2) 
  for (let i = 1; i < joueur2.length; i++) {
    
    //stocke toute les carte qui nont pas ete poser
    nouvellesCartesJoueur2.push(joueur2[i]); 
  }

    //stocke les carte 
  setJoueur2(nouvellesCartesJoueur2);

  setMessage("Joueur 1 gagne ce tour !");

  //si le joueur2 a poser une carte plus forte que le joueur1
    // Joueur 2 gagne
} else if (carte1.force < carte2.force) {

//creation dun tableau pour stocker toute les carte du joueur sauf celle qui ont  ete poser 
  const nouvellesCartesJoueur2 = [];
 
  //boucle pour parcourire le tableau
  for (let i = 1; i < joueur2.length; i++) {
     
     //remplie le tableau
    nouvellesCartesJoueur2.push(joueur2[i]);
  }
  
  //recupere les carte gagner
  nouvellesCartesJoueur2.push(carte2); 
  nouvellesCartesJoueur2.push(carte1);
  setJoueur2(nouvellesCartesJoueur2);

  //creation dun tableau pour stocker toute les carte du joueur sauf celle qui ont  ete poser 
  const nouvellesCartesJoueur1 = [];

  //boucle pour parcourie le tableau(main du joueur1)
  for (let i = 0; i < joueur1.length; i++) {

     //condition pour que les carte selectionner ne soit pas recupere
    if (joueur1[i] !== carteSelectionneeJoueur1) {

      // Conserve les cartes non selectionner
      nouvellesCartesJoueur1.push(joueur1[i]); 
    }
  }
      //stocke les carte 
  setJoueur1(nouvellesCartesJoueur1);

  //ecrit le message
  setMessage("Joueur 2 gagne ce tour !");

//si cest une egaliter
} else {

  //ecrits le message
  setMessage("Egaliter ! Bataille !");
  
   //creation dun tableau pour stocker toute les carte du joueur sauf celle qui ont  ete poser 
  const nouvellesCartesJoueur1 = [];
 
 //boucle pour parcourie le tableau(main du joueur1)
  for (let i = 0; i < joueur1.length; i++) {
  
  //condition pour que les carte selectionner ne soit pas recupere
    if (joueur1[i] !== carteSelectionneeJoueur1) {

      // Conserve les cartes non selectionner
      nouvellesCartesJoueur1.push(joueur1[i]); 
  }}
  //stocke les cartes
  setJoueur1(nouvellesCartesJoueur1);

  const nouvellesCartesJoueur2 = [];
   
   //boucle pour parcourire le tableau
  for (let i = 1; i < joueur2.length; i++) {
    
    //remplie le tableau
    nouvellesCartesJoueur2.push(joueur2[i]); 
  }

  //stocke les cartes
  setJoueur2(nouvellesCartesJoueur2);
}

// Reinitialiser la carte selectionnet
setCarteSelectionneeJoueur1(null);

}

  return (
    <div>
      <h1>Jeu de carte Bataille</h1>
      
      
        <Joueur numero={1} cartes={joueur1} />
        <Joueur numero={2} cartes={joueur2} />
   

     
        <button onClick={jouerTour}>Jouer un tour</button>
        <p>{message}</p>
      

      <div className="carte-container">
        {joueur1.slice(0, 5).map((carte, index) => (
          <div key={index} onClick={() => selectionnerCarteJoueur1(carte)} className="carte-item">
            <Carte valeur={carte.valeur} />
            {carteSelectionneeJoueur1 === carte && <span>Carte selectionner</span>}
          </div>
        ))}
      </div>

     
        {joueur2[0] && <Carte valeur={joueur2[0].valeur} />}
      
    </div>
  );
}
