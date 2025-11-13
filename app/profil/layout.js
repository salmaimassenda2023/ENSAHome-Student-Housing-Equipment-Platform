'use client';

import { createContext, useState, useContext } from 'react';
import Banner from "@/components/layout/Banner";

// Créer un contexte pour partager l'état de l'onglet actif
export const ProfileContext = createContext();

export default function ProfileLayout({ children }) {
    const [activeTab, setActiveTab] = useState("publications");

    return (
        <ProfileContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="bg-gray-50 min-h-screen">
                <Banner activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="container mx-auto px-4 py-6">
                    {children}
                </div>
            </div>
        </ProfileContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte du profil
export function useProfileContext() {
    return useContext(ProfileContext);
}