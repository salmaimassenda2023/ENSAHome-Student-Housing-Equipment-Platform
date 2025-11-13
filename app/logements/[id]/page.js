"use client"
import {logements} from "@/data";
import "../../globals.css"
import {useState} from "react";
import {useParams} from "next/navigation";
import {FaMapMarkerAlt, FaRegClock, FaWallet} from "react-icons/fa";
import {LuHouse} from "react-icons/lu";
import LogementCard from "@/components/ui/LogementCard";

export default function LogementDetails(){
    const [index, setIndex] = useState(0);
    // get id of the product selected
    const params = useParams();
    const id = parseInt(params.id);
    // get logement from data
    const logement = logements.find(item => item.id === id);

    return(
        <div className="m-30">
            {/* Main product container with proper flex alignment */}
            <div className="flex flex-col md:flex-row justify-between gap-2 ">
                {/* Left side - Image section */}
                <div className="md:w-1/2">
                    <div>
                        {logement.photos && logement.photos[index] && (
                            <img
                                src={logement.photos[index]}
                                alt="image not found"
                                className="product-detail-image w-full h-auto rounded-lg"
                            />
                        )}
                    </div>
                    <div className="small-images-container flex gap-3 mt-4">
                        {logement.photos?.map((item, i) => (
                            <img
                                key={i}
                                src={item}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                                alt="NF"
                            />
                        ))}
                    </div>

                    {/* Caractéristiques */}
                    <h1 className="mb-4 mt-10 text-2xl font-medium">Caractéristiques</h1>
                    <div className="grid grid-cols-2 gap-5">
                        {logement.commodites.map((item, index) => (
                            <div key={index} className="flex space-x-3">
                                <div className="text-blue-500 text-xl">
                                    {item.icon}
                                </div>
                                <div>
                                    {item.nom}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side - Details section */}
                <div className="details md:w-1/2 mt-2">
                    <h1 className="mb-10 text-3xl font-bold">Location {logement.type}</h1>

                    {/* Address */}
                    <div className="flex space-x-3 mb-6">
                        <div className="text-xl">
                            <FaMapMarkerAlt className="text-blue-500 text-xl" />
                        </div>
                        <div>
                            {logement.adresee}
                        </div>
                    </div>

                    {/* Proximity */}
                    <div className="flex space-x-3 mb-6">
                        <div className="text-xl">
                            <FaRegClock className="text-blue-500 text-xl" />
                        </div>
                        <div>
                            {logement.proximite} min
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex space-x-3 mb-6">
                        <div className="text-xl">
                            <FaWallet className="text-blue-500 text-xl" />
                        </div>
                        <div>
                            {logement.loyer} DH/mois
                        </div>
                    </div>

                    {/* Number of rooms */}
                    <div className="flex space-x-3 mb-10">
                        <div className="text-xl">
                            <LuHouse className="text-blue-500 text-xl" />
                        </div>
                        <div>
                            {logement.nombrePieces} pièces
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border border-solid rounded-xl p-5 w-120 h-50">
                        <h1 className="mb-3 text-2xl font-medium">Description</h1>
                        <p>{logement.desc}</p>
                    </div>
                </div>
            </div>

            {/* Similar properties section */}
            <div className="mt-20 mb-10 hidden md:block">
                <h2 className="text-3xl font-bold mb-8 text-center">Nos biens similaires</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {logements.map((item) => (
                            <LogementCard
                                key={item.id}
                                id={item.id}
                                photos={item.photos[0]}
                                nbresPiece={item.nombrePieces}
                                loyer={item.loyer}
                                type={item.type}
                                commodites={item.commodites}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}