"use client"
import {equipements, logements} from "@/data";
import "../../globals.css"
import {useState} from "react";
import {useParams} from "next/navigation";
import {FaMapMarkerAlt, FaRegClock, FaWallet} from "react-icons/fa";
import {LuHouse} from "react-icons/lu";
import LogementCard from "@/components/ui/LogementCard";
import EquipementCard from "@/components/ui/EquipementCard";

export default function EquipementDetails(){
    const [index, setIndex] = useState(0);
    // get id of the product selected
    const params = useParams();
    const id = parseInt(params.id);
    // get logement from data
    const equipement = equipements.find(item => item.id === id);

    return(
        <div className="m-30">
            {/* Main product container with proper flex alignment */}
            <div className="flex flex-col md:flex-row justify-between gap-2 ">
                {/* Left side - Image section */}
                <div className="md:w-1/2">
                    <div>
                        {equipement.photos && equipement.photos[index] && (
                            <img
                                src={equipement.photos[index]}
                                alt="image not found"
                                className="product-detail-image w-full h-auto rounded-lg"
                            />
                        )}
                    </div>
                    <div className="small-images-container flex gap-3 mt-4">
                        {equipement.photos?.map((item, i) => (
                            <img
                                key={i}
                                src={item}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                                alt="NF"
                            />
                        ))}
                    </div>

                </div>

                {/* Right side - Details section */}
                <div className="details md:w-1/2 mt-2">
                    <h1 className="mb-10 text-3xl font-bold">{equipement.designation}</h1>

                    {/* etas */}
                    <div className="flex space-x-3 mb-6">
                        <div className="text-blue-500 text-xl">
                            {equipement.etas.icon}
                        </div>
                        <div>
                            {equipement.etas.non}
                        </div>
                    </div>


                    {/* Price */}
                    <div className="flex space-x-3 mb-6">

                        <div className={`bg-transparent border px-6 py-2 rounded-full text-lg shadow-lg backdrop-blur-sm ${
                            equipement.prix === 0 ? "text-red-500 border-red-500" : "text-black border-black"
                        }`}>
                            {equipement.prix === 0 ? "À céder" : `${equipement.prix} DH`}
                        </div>
                    </div>


                    {/* Description */}
                    <div className="border border-solid rounded-xl p-5 w-120 h-50">
                        <h1 className="mb-3 text-2xl font-medium">Description</h1>
                        <p>{equipement.desc}</p>
                    </div>
                </div>
            </div>

            {/* Similar properties section */}
            <div className="mt-20 mb-10 hidden md:block">
                <h2 className="text-3xl font-bold mb-8 text-center">Nos biens similaires</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {equipements.map((item) => (
                            <EquipementCard
                                key={item.id}
                                id={item.id}
                                photos={item.photos[0]}
                                designation={item.designation}
                                prix={item.prix}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}