"use client";

import { useRouter } from 'next/navigation';
import { IoLogOutOutline } from 'react-icons/io5';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Supprimer le token
    localStorage.removeItem('token');

    // 2. Rediriger vers la page de login
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:text-gray-300 transition text-2xl"
      title="Déconnexion"
    >
      <IoLogOutOutline />
    </button>
  );
}