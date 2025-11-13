import Image from "next/image";
import { IoIosAlert } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

export default function NotificationLocataire({ notification }) {
    function handleCloseNotif() {
        // à compléter : fermer la notification, changer un état ou autre
    }

    return (
        <div className="relative w-full max-w-screen-lg  m-auto p-4 md:p-8 border border-gray-200 rounded shadow-xl mb-3 bg-white">
            {/* Bouton close en absolute top-right */}
            <button
                onClick={handleCloseNotif}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-200"
                aria-label="Fermer la notification"
            >
                <FaTimes size={20} />
            </button>

            <div className="flex flex-col md:flex-row md:space-x-6">
                {/* image visible uniquement à partir de md */}
                <div className="hidden md:block">
                    <div className="w-[180px] h-[120px] rounded-md overflow-hidden">
                        <Image
                            src={notification.logement.photos[0]}
                            alt="logement"
                            width={180}
                            height={120}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="text-sm font-medium mt-2 flex items-center justify-between">
                        <span className="text-gray-700">{notification.logement.type}</span>
                        <span className="text-green-600">{notification.logement.loyer} DH/mois</span>
                    </div>
                </div>

                {/* infos */}
                <div className="flex-1 mt-4 md:mt-0">
                    <div className="flex items-start space-x-3 mb-5">
                        <IoIosAlert size={30} className="text-orange-400 mt-1" />
                        <p className="text-lg text-gray-700 font-semibold">
                            Votre annonce a expiré automatiquement après 30 jours.
                        </p>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 w-160">
                        Les annonces sont retirées de la plateforme après un mois pour garantir la fraîcheur des logements proposés.
                        Vous pouvez les republier à tout moment si elles sont toujours disponibles.
                    </p>

                    {/* Bouton republier */}
                    <div className="flex justify-end">
                        <button className="bg-green-700 text-white px-4 py-1 rounded-full text-sm hover:bg-green-800 transition">
                            Republier l’annonce
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
