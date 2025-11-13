'use client'
import NotificationLocataire from "@/components/ui/NotificationLocataire";
import {notificationsLocataie} from "@/data";


export default function NotificationPage(){
    return(
        <div className="container max-w-8xl m-auto">

            <div className="text-center mb-8 ">
                <h1 className="text-4xl leading-tight text-gray-600 font-bold">Notifications</h1>
            </div >
            <div className="center-content">
                {
                    notificationsLocataie.map((not)=>(
                        <NotificationLocataire key={not.id} notification={not}/>
                    ))

                }
            </div>


        </div>
    )

}