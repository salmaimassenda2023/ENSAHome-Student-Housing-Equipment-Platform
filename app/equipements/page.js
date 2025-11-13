import {equipements, logements} from "@/data";
import EquipementCard from "@/components/ui/EquipementCard";



export default function EquipementsPage (){
    return(
        <div className="mt-20 mb-20 mr-30 ml-30 ">
            {/*titre*/}
            <div className="text-center">
                <h1 className="text-3xl leading-tight text-green-500">
                    Découvrez les équipements disponibles près de votre campus.
                </h1>
            </div>
            {/*sous titre*/}
            <div className="text-center m-10">
                <h2 className="text-3xl leading-tight text-gray-500">
                    Matériel et équipements
                </h2>
            </div>
            {/*liste de logements*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
                {
                    equipements.map( (item)=>(
                            <EquipementCard
                                key={item.id}
                                id={item.id}
                                photos={item.photos[0]}
                                designation={item.designation}
                                prix={item.prix}
                            />
                        )

                    )
                }

            </div>
        </div>
    )

}
