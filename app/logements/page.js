import {logements} from "@/data";
import LogementCard from "@/components/ui/LogementCard";


export default function LogementsPage (){
    return(
        <div className="mt-20 mb-20 mr-30 ml-30 ">
            {/*titre*/}
            <div className="text-center">
                <h1 className="text-3xl leading-tight text-green-500">
                    Explorez les logements disponibles près de votre campus
                </h1>
            </div>
            {/*sous titre*/}
            <div className="text-center m-10">
                <h2 className="text-3xl leading-tight text-gray-500 " >
                    Biens immobiliers à louer
                </h2>

            </div>

            {/*liste de logements*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
                {
                    logements.map( (item)=>(
                        <LogementCard
                            key={item.id}
                            id={item.id}
                        photos={item.photos[0]}
                        nbresPiece={item.nombrePieces}
                        loyer={item.loyer}
                        type={item.type}
                        commodites={item.commodites}
                        />
                        )

                    )
                }

            </div>
        </div>
    )

}
