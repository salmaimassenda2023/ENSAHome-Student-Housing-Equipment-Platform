import Image from "next/image";
import {IoIosArrowForward} from "react-icons/io";
import Link from "next/link";

export default function LogementCard({id, photos, nbresPiece, loyer, type, commodites = []}){

    return(
        <div className="rounded-lg overflow-hidden shadow-lg w-150 h-125">
            {/*    image */}
            <div className="relative h-100 w-full mb-5 overflow-hidden">
                {photos && photos.trim() !== "" ? (
                    <Image
                        src={photos}
                        alt="photos"
                        fill
                        className="rounded-lg object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                        <span className="text-gray-500">Aucune image</span>
                    </div>
                )}

                {/* loyer*/}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-transparent ">
                    <div className="bg-transparent border bg-opacity-60 text-black px-6 py-2 rounded-full text-lg shadow-lg backdrop-blur-sm">
                        {loyer}<span className="text-xs"> DH/mois</span>
                    </div>
                </div>
                <Link
                    href={`/logements/${id}`}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100 mr-3"
                >
                    <IoIosArrowForward size={24} className="text-gray-600" />
                </Link>
            </div>

            {/* type & nbresPiece   */}
            <div className="flex items-center justify-between m-3">
                <h4 className="text-base font-medium ">{type}</h4>
                <h4 className="text-base font-medium ">{nbresPiece} pièces</h4>
            </div>

            {/*  commodites  */}
            <div className="flex space-x-5 m-3">
                {
                    commodites && commodites.length > 0 && commodites.map((com) => (
                        <div className="flex space-x-2" key={com.nom} >
                            <div className="text-blue-500 text-xl">{com.icon}</div>
                            <h5 className="text-sm font-medium">{com.nom}</h5>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}