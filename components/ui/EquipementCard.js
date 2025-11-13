import Image from "next/image";
import {IoIosArrowForward} from "react-icons/io";
import Link from "next/link";


export default function EquipementCard({id,photos,designation,prix}){

    return(

        <div className="rounded-lg overflow-hidden shadow-lg w-150 h-115">
            {/*    image */}
            <div className="relative h-100 w-full mb-4 overflow-hidden">
                <Image
                    src={photos}
                    alt="photos"
                    fill
                    className="rounded-lg object-cover"
                />
                {/* prix*/}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-transparent">
                    <div className={`bg-transparent border px-6 py-2 rounded-full text-lg shadow-lg backdrop-blur-sm ${
                        prix === 0 ? "text-red-500 border-red-500" : "text-black border-black"
                    }`}>
                        {prix === 0 ? "À céder" : `${prix} DH`}
                    </div>
                </div>

                <Link
                    href={`/equipements/${id}`}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100 mr-3"
                >
                    <IoIosArrowForward size={24} className="text-gray-600" />
                </Link>
            </div>
            {/* design et desc   */}
            <div className="flex items-center justify-between m-3">
                <h4 className="text-base font-medium ">{designation}</h4>
                {/*<h5 className="text-base font-medium ">{description} </h5>*/}
            </div>

        </div>

    )
}