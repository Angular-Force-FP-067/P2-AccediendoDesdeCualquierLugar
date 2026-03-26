// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABYM2MvAOC3WQDA9-g9Q_8ozAefluDu48",
  authDomain: "equipo-basket-e20b9.firebaseapp.com",
  projectId: "equipo-basket-e20b9",
  storageBucket: "equipo-basket-e20b9.firebasestorage.app",
  messagingSenderId: "704239206516",
  appId: "1:704239206516:web:1a4d79a7f147795dab9121"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const datos = [
    {
        id: 1,
        nombre: 'Precious',
        apellidos: 'Achiuwa',
        posicion: 'Alero',
        pais: 'Nigeria',
        edad: 26,
        altura: 203,
        peso: 110,
        PPP: 15.4,
        APP: 8.2,
        RPP: 3.5,
        TirosCampo: 45.3,
        videoURL: 'media/players/001/highlight.mp4',
        biografia: 'Nacido en Nigeria el 19 de septiembre de 1999, Precious Achiuwa es un ala-pívot/alero atlético que destaca por su potencia física y versatilidad defensiva. Jugó baloncesto universitario en Memphis antes de ser seleccionado en el Draft de la NBA de 2020 por los Miami Heat. Posteriormente pasó por los Toronto Raptors y New York Knicks. Es conocido por su energía, capacidad reboteadora y habilidad para correr la cancha en transición.',
        numejersey: 9,
        imagen: 'media/players/001/profile.png'
    },
    {
        id: 2,
        nombre: 'Bam',
        apellidos: 'Adebayo',
        posicion: 'Ala-pívot',
        pais: 'Estados Unidos',
        edad: 28,
        altura: 206,
        peso: 116,
        PPP: 18.7,
        APP: 2.9,
        RPP: 9.8,
        TirosCampo: 60.2,
        videoURL: 'media/players/002/highlight.mp4',
        biografia: 'Edrice “Bam” Adebayo nació el 18 de julio de 1997 en Estados Unidos. Es uno de los ala-pívots más completos de la NBA y pieza clave de los Miami Heat desde que fue elegido en el Draft de 2017. Destaca por su defensa élite, capacidad para cambiar en bloqueos, visión de juego y eficiencia ofensiva cerca del aro. Ha sido varias veces All-Star y es considerado uno de los mejores pívots defensivos de la liga.',
        numejersey: 13,
        imagen: 'media/players/002/profile.png'
    },
    {
        id: 3,
        nombre: 'Ochai',
        apellidos: 'Agbaji',
        posicion: 'Escolta',
        pais: 'Estados Unidos',
        edad: 25,
        altura: 196,
        peso: 98,
        PPP: 4.4,
        APP: 2.2,
        RPP: 0.8,
        TirosCampo: 15.6,
        videoURL: 'media/players/003/highlight.mp4',
        biografia: 'Ochai Agbaji nació el 20 de abril de 2000 en Estados Unidos. Se dio a conocer en la Universidad de Kansas, donde fue una pieza fundamental para ganar el campeonato nacional NCAA en 2022. Fue seleccionado en el Draft de la NBA de 2022 por Cleveland Cavaliers y posteriormente traspasado a Utah Jazz. Es un escolta con buen tiro exterior y capacidad atlética, enfocado en el juego sin balón y la defensa perimetral.',
        numejersey: 30,
        imagen: 'media/players/003/profile.png'
    },
    {
        id: 5,
        nombre: 'Santi',
        apellidos: 'Aldama Toledo',
        posicion: 'Base',
        pais: 'España',
        edad: 25,
        altura: 213,
        peso: 98,
        PPP: 14.0,
        APP: 6.7,
        RPP: 2.9,
        TirosCampo: 92.1,
        videoURL: 'media/players/005/highlight.mp4',
        biografia: 'Santi Aldama Toledo nació el 10 de enero de 2001 en Las Palmas de Gran Canaria, España. Es uno de los talentos españoles más prometedores de su generación. Tras jugar en Loyola University Maryland, fue elegido en el Draft de la NBA de 2021 y actualmente juega en los Memphis Grizzlies. Con 2,13 m de altura, combina tamaño y habilidad exterior, pudiendo jugar como ala-pívot o pívot abierto. También es internacional con la selección española.',
        numejersey: 7,
        imagen: 'media/players/005/profile.png'
    },
    {
        id: 6,
        nombre: 'Trey',
        apellidos: 'Alexander',
        posicion: 'Pívot',
        pais: 'Estados Unidos',
        edad: 22,
        altura: 196,
        peso: 84,
        PPP: 2.8,
        APP: 0.8,
        RPP: 1.0,
        TirosCampo: 23.4,
        videoURL: 'media/players/006/highlight.mp4',
        biografia: 'Trey Alexander nació en 2003 en Estados Unidos y destacó en el baloncesto universitario con Creighton. Es un jugador versátil en el perímetro, con capacidad para anotar desde media y larga distancia. Se caracteriza por su buena lectura ofensiva y capacidad para generar juego, aunque aún está en proceso de consolidarse a nivel profesional.',
        numejersey: 23,
        imagen: 'media/players/006/profile.png'
    },
    {
        id: 7,
        nombre: 'Nickeil',
        apellidos: 'Alexander-Walker',
        posicion: 'Escolta',
        pais: 'Canadá',
        edad: 27,
        altura: 196,
        peso: 93,
        PPP: 19.8,
        APP: 3.6,
        RPP: 3.8,
        TirosCampo: 55.7,
        videoURL: 'media/players/007/highlight.mp4',
        biografia: 'Nickeil Alexander-Walker nació el 2 de septiembre de 1998 en Canadá. Fue seleccionado en el Draft de la NBA de 2019 y ha jugado para New Orleans Pelicans, Utah Jazz y Minnesota Timberwolves. Es un escolta con buena capacidad anotadora, sólido defensor y capaz de crear su propio tiro. Destaca por su intensidad y versatilidad en ambos lados de la cancha.',
        numejersey: 7,
        imagen: 'media/players/007/profile.png'
    },
    {
        id: 8,
        nombre: 'Luka',
        apellidos: 'Dončić',
        posicion: 'Base',
        pais: 'Eslovenia',
        edad: 25,
        altura: 201,
        peso: 104,
        PPP: 32.8,
        APP: 8.6,
        RPP: 7.8,
        TirosCampo: 47.3,
        videoURL: 'media/players/008/highlight.mp4',
        biografia: 'Luka Dončić es uno de los mejores jugadores de la NBA, líder de los Dallas Mavericks y top anotador de la liga. Destaca por su visión de juego, tiro y capacidad para generar jugadas.',
        numejersey: 77,
        imagen: 'media/players/008/profile.png'
    },
    {
        id: 9,
        nombre: 'Stephen',
        apellidos: 'Curry',
        posicion: 'Base',
        pais: 'Estados Unidos',
        edad: 36,
        altura: 191,
        peso: 86,
        PPP: 29.0,
        APP: 6.1,
        RPP: 5.3,
        TirosCampo: 45.4,
        videoURL: 'media/players/009/highlight.mp4',
        biografia: 'Stephen Curry es uno de los mejores tiradores de la historia de la NBA, líder de los Golden State Warriors. Su capacidad para anotar triples ha cambiado la forma de jugar al baloncesto.',
        numejersey: 30,
        imagen: 'media/players/009/profile.png'
    },
    {
        id: 10,
        nombre: 'Giannis',
        apellidos: 'Antetokounmpo',
        posicion: 'Ala-pívot',
        pais: 'Grecia',
        edad: 29,
        altura: 211,
        peso: 110,
        PPP: 27.1,
        APP: 5.9,
        RPP: 11.8,
        TirosCampo: 55.2,
        videoURL: 'media/players/010/highlight.mp4',
        biografia: 'Giannis Antetokounmpo es un MVP de la NBA y pilar de los Milwaukee Bucks. Destaca por su físico, versatilidad y dominio en ambos extremos de la cancha.',
        numejersey: 34,
        imagen: 'media/players/010/profile.png'
    }
];

async function subirDatos() {
  for (const item of datos) {
    await setDoc(doc(db, "players", String(item.id)), item);
    console.log("Subido:", item.nombre);
  }
}

subirDatos()