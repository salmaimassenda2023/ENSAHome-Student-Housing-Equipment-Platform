// components/layout/Banner.js
'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosNotificationsOutline, IoIosStar } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { useProfileContext } from "@/app/profil/layout";

export default function Banner() {
    const { activeTab, setActiveTab } = useProfileContext();
    const router = useRouter();

    // Fonction pour gérer le changement d'onglet
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.push(`/profil/${tab}`);
    };

    return (
        <div className="bg-white shadow-sm">
            <div className="container mx-auto ">
                <div className="flex flex-col md:flex-row items-center justify-between py-4">
                    {/* Section profil */}
                    <div className="flex items-center space-x-5">
                        {/* Image de profil */}
                        <div className="relative h-20 w-20 rounded-full overflow-hidden">
                            <Image
                                src="/profil.png"
                                alt="profil image"
                                width={85}
                                height={85}
                                className="object-cover mt-2"
                            />
                        </div>
                        {/* Informations de profil */}
                        <div>
                            <h1 className="text-xl font-bold mb-1">SALMA IMASSENDA</h1>
                            <div className="flex items-center space-x-2">
                                <div className="text-green-500 text-lg">
                                    <IoIosStar />
                                </div>
                                <div>
                                    <h3 className="text-sm">Etudiant(e) - 4 ème année</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Boutons de navigation */}
                    <div className="flex flex-wrap gap-3 justify-end md:ml-auto">
                        {/* Bouton paramètres */}
                        <button
                            onClick={() => handleTabChange("settings")}
                            className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-colors cursor-pointer ${
                                activeTab === "settings"
                                    ? "bg-green-500 text-black"
                                    : "border hover:bg-gray-100"
                            }`}
                        >
                            <CiSettings className="text-xl" />
                            <span className="font-medium">Paramètres</span>
                        </button>

                        {/* Bouton publications */}
                        <button
                            onClick={() => handleTabChange("publications")}
                            className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-colors cursor-pointer ${
                                activeTab === "publications"
                                    ? "bg-green-500 text-black"
                                    : "border hover:bg-gray-100"
                            }`}
                        >
                            <IoPersonOutline className="text-xl" />
                            <span className="font-medium">Publications</span>
                        </button>

                        {/* Bouton notifications */}
                        <button
                            onClick={() => handleTabChange("notifications")}
                            className={`flex items-center space-x-2 rounded-full px-4 py-2 transition-colors cursor-pointer ${
                                activeTab === "notifications"
                                    ? "bg-green-500 text-black"
                                    : "border hover:bg-gray-100"
                            }`}
                        >
                            <IoIosNotificationsOutline className="text-xl" />
                            <span className="font-medium">Notifications</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}