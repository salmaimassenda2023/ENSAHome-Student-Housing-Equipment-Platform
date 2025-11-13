import {FaCouch, FaParking, FaRecycle, FaSnowflake, FaWifi} from "react-icons/fa";

export const typeLogement=["appartement","Chambre","studios"]



export const logements=[
    //Appartement 1

    {
        id:1,
        photos:["/aprt_nn.png" ,"/image-.png","/aprt_nn.png","/image-.png"],
        adresee:"Khouribga Nahda",
        proximite:"15 ",
        desc:"EXCLUSIVITÉ - EN BON ÉTAT GÉNÉRAL En location : venez découvrir à AVESNES SUR HELPE (59440) cet appartement de 2 pièces de 40 m². Il est agencé comme suit :un séjour de 17 m², une chambre, une cuisine équipée et une salle d'eau.",
        type:"Appartement",
        nombrePieces:2 ,
        loyer : 200,
        commodites :[
            {nom: "Wifi" ,icon:<FaWifi />},
            {nom: "Parking" ,icon:<FaParking />},
        ]
    },
    //Appartement 2
    {
        id:2,
        photos:["/aprt1.png" ,"/image-2.png","/aprt1.png","/image-2.png"],
        adresee:"Khouribga - Nahda",
        proximite:"15 ",
        desc:"cet appartement de 2 pièces de 40 m². Il est agencé comme suit :un séjour de 17 m², une chambre, une cuisine équipée et une salle d'eau.",
        type:"Appartement",
        nombrePieces:2 ,
        loyer : 200,
        commodites :[
            {nom: "Meuble" ,icon:<FaCouch />},
            {nom: "climat" ,icon:<FaSnowflake />},
            {nom: "Wifi" ,icon:<FaWifi />},
            {nom: "Parking" ,icon:<FaParking />},
        ]
    },
    //Appartement 3
    {
        id:3,
        photos:["/aprt_nn.png" ,"/aprt_nn.png","/aprt_nn.png"],
        adresee:"Khouribga Nahda",
        proximite:"15 ",
        desc:"desc",
        type:"Appartement",
        nombrePieces:2 ,
        loyer : 200,
        commodites :[
            {nom: "Wifi" ,icon:<FaWifi />},
            {nom: "Parking" ,icon:<FaParking />},
        ]
    },
    //Appartement 4
    {
        id:4,
        photos:["/aprt1.png" ,"/image-2.png","/aprt1.png","/image-2.png"],
        adresee:"Khouribga Nahda",
        proximite:"15 ",
        desc:"desc",
        type:"Appartement",
        nombrePieces:2 ,
        loyer : 200,
        commodites :[
            {nom: "Meuble" ,icon:<FaCouch />},
            {nom: "climat" ,icon:<FaSnowflake />},
        ]
    }
];
export const publications=[
    //pub 1

    {
        id:1,
        typePub:"equipements",
        photos:["/ordi.png","/ordi.png","/ordi.png"],
        etas :{non:"utilisé",icon:<FaRecycle />},
        designation:"PC Portable",
        desc: "Ordinateur portable performant pour le travail académique et personnel.",
        prix:3000,
    },
    //pub 2
    {
        id:2,
        typePub:"logements",
        photos:["/aprt1.png" ,"/image-2.png","/aprt1.png","/image-2.png"],
        adresee:"Khouribga - Nahda",
        proximite:"15 ",
        desc:"cet appartement de 2 pièces de 40 m². Il est agencé comme suit :un séjour de 17 m², une chambre, une cuisine équipée et une salle d'eau.",
        type:"Appartement",
        nombrePieces:2 ,
        loyer : 200,
        commodites :[
            {nom: "Meuble" ,icon:<FaCouch />},
            {nom: "climat" ,icon:<FaSnowflake />},
            {nom: "Wifi" ,icon:<FaWifi />},
            {nom: "Parking" ,icon:<FaParking />},
        ]
    },
    //pub 3
    {
        id:3,
        typePub:"equipements",
        photos:["/ordi.png","/ordi.png","/ordi.png"],
        etas :{non:"utilisé",icon:<FaRecycle />},
        designation:"PC Portable",
        desc: "Ordinateur portable performant pour le travail académique et personnel.",
        prix:3000,
    },
    //pub 4
    {
        id:4,
        typePub:"logements",
        photos:["/aprt1.png" ,"/image-2.png","/aprt1.png","/image-2.png"],
        adresee:"Khouribga Nahda",
        proximite:"15 ",
        desc:"desc",
        type:"Appartement",
        nombrePieces:2 ,
        loyer : 200,
        commodites :[
            {nom: "Meuble" ,icon:<FaCouch />},
            {nom: "climat" ,icon:<FaSnowflake />},
        ]
    }
];
export const equipements=[
    {
        id:1,
        photos:["/ordi.png","/ordi.png","/ordi.png"],
        etas :{non:"utilisé",icon:<FaRecycle />},
        designation:"PC Portable",
        desc: "Ordinateur portable performant pour le travail académique et personnel.",
        prix:3000,
    },
    {
        id:2,
        photos:["/salle.png","/salle.png"],
        etas :{non:"utilisé",icon:<FaRecycle />},
        designation:"Salle a manger",
        desc:"Salle à manger moderne composée d'une table spacieuse et de chaises assorties. Parfaite pour vos repas en famille ou entre amis. Design élégant, matériaux durables.\n" +
            "\n",
        prix: 0,
    },
    {
        id:3,
        photos:["/ordi.png","/ordi.png","/ordi.png"],
        etas :{non:"utilisé",icon:<FaRecycle />},
        designation:"PC Portable",
        desc: "Ordinateur portable performant pour le travail académique et personnel.",
        prix:3000,
    },
    {
        id:4,
        photos:["/salle.png","/salle.png"],
        etas :{non:"utilisé",icon:<FaRecycle />},
        designation:"Salle a manger",
        desc:"Salle à manger moderne composée d'une table spacieuse et de chaises assorties. Parfaite pour vos repas en famille ou entre amis. Design élégant, matériaux durables.\n" +
            "\n",
        prix: 0,
    }
]


export const notificationsLocataie = [
    {
        id: 1,
        logement: logements[0],
        message: "Votre annonce a expiré automatiquement après 30 jours.",
        detail:
            "Les annonces sont retirées de la plateforme après un mois pour garantir la fraîcheur des logements proposés.",
        dateExpiration: "2025-05-01",
    },
    {
        id: 2,
        logement: logements[1],
        message: "Votre annonce a expiré automatiquement après 30 jours.",
        detail:
            "Les annonces sont retirées de la plateforme après un mois pour garantir la fraîcheur des logements proposés.",
        dateExpiration: "2025-05-10",
    },
];













