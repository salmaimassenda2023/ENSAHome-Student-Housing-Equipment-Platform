"use client";

import { IoIosNotifications } from "react-icons/io";
import Image from "next/image";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth"; // Ajustez le chemin selon votre structure

export default function Header() {
    const pathname = usePathname();
    const { isAuthenticated, loading, logout } = useAuth();

    // Afficher un loader pendant la vérification de l'authentification
    if (loading) {
        return (
            <div className="bg-black text-white flex items-center justify-between   pl-5 h-17">
                <div className="pt-7 pb-0">
                    <Image
                        src="/logo_ensahome_white.png"
                        alt="Logo de l'application"
                        width={110}
                        height={40}
                    />
                </div>
                <div className="flex space-x-20">
                    <span className="text-gray-300">Logement</span>
                    <span className="text-gray-300">Equipement</span>
                </div>
                <div className="flex justify-end m-5">
                    <div className="w-8 h-8 bg-gray-600 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white flex items-center justify-between pl-5 h-17">
            {/* Logo */}
            <div className="pt-7 pb-0">
                <Image
                    src="/logo_ensahome_white.png"
                    alt="Logo de l'application"
                    width={110}
                    height={40}
                />
            </div>

            {/* Logement et Equipement */}
            <div className="flex space-x-20">
                <Link
                    href="/"
                    className={`transition ${
                        pathname.startsWith("/logements") || pathname === "/" ? "text-white" : "text-gray-300"
                    }`}
                >
                    <span>Logement</span>
                </Link>

                <Link
                    href="/equipements/"
                    className={`transition ${
                        pathname.startsWith("/equipements") ? "text-white" : "text-gray-300"
                    }`}
                >
                    <span>Equipement</span>
                </Link>
            </div>

            {/* Section droite : Authentification conditionnelle */}
            <div className="flex justify-end m-5 space-x-3">
                {isAuthenticated ? (
                    // Utilisateur connecté
                    <>
                        <Link href="/notifications" className="hover:text-gray-300 transition" title="Notifications">
                            <IoIosNotifications className="text-2xl" />
                        </Link>
                        <Link href="/profil/publications" className="hover:text-gray-300 transition" title="Profil">
                            <IoPersonCircleSharp className="text-2xl" />
                        </Link>
                        <button
                            onClick={logout}
                            className="hover:text-gray-300 transition"
                            title="Se déconnecter"
                        >
                            <IoLogOutOutline className="text-2xl" />
                        </button>
                    </>
                ) : (
                    // Utilisateur non connecté
                    <Link
                        href="/auth/signin"
                        className="bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Se connecter
                    </Link>
                )}
            </div>
        </div>
    );
}