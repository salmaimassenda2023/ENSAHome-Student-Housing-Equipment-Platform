import { FaExclamationTriangle } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

export default function NotificationLocataire({ notification }) {
    const [visible, setVisible] = useState(true);
    const { logement, message, detail } = notification;

    if (!visible) return null;

    return (
        <div className="flex items-center justify-between gap-4 p-4 border rounded-2xl shadow-md bg-white mb-4">
            {/* Photo */}
            <div className="w-28 h-20 rounded-md overflow-hidden">
                <Image
                    src={logement.photos[0]}
                    alt="logement"
                    width={120}
                    height={80}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Texte */}
            <div className="flex-1">
                <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <FaExclamationTriangle />
                    <span>{message}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{detail}</p>
                <div className="text-sm font-medium mt-2">
                    <span className="text-gray-700">{logement.type}</span>{" "}
                    <span className="text-green-600">{logement.loyer} DH/mois</span>
                </div>
            </div>

            {/* Bouton */}
            <div className="flex flex-col items-end gap-2">
                <button
                    onClick={() => setVisible(false)}
                    className="text-xl text-green-800 font-bold"
                >
                    ×
                </button>
                <button className="bg-green-700 text-white px-4 py-1 rounded-full text-sm hover:bg-green-800 transition">
                    Republier l’annonce
                </button>
            </div>
        </div>
    );
}
