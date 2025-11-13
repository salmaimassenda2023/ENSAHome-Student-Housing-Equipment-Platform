'use client'

import React, { useState } from 'react';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Effacer l'erreur quand l'utilisateur tape
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // setLoading(true);
        // setError('');
        //
        // // Validation basique
        // if (!formData.email || !formData.password) {
        //     setError('Please fill in all fields');
        //     setLoading(false);
        //     return;
        // }
        //
        // try {
        //     const result = await userService.login({
        //         email: formData.email,
        //         password: formData.password
        //     });
        //
        //     if (result.success) {
        //         // Connexion réussie - rediriger vers le dashboard ou page d'accueil
        //         router.push('/'); // Ajustez selon votre structure de routes
        //     } else {
        //         setError(result.error || 'Login failed. Please try again.');
        //     }
        // } catch (err) {
        //     setError('An unexpected error occurred. Please try again.');
        //     console.error('Login error:', err);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="h-150 w-240 mt-10 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
            {/* Section gauche avec le logo */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    {/* Logo ENSAHome */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center rounded-2xl mb-4">
                            <Image
                                src="/logo-2.png"
                                alt="logo"
                                width={350}
                                height={350}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section droite avec le formulaire */}
            <div className="w-96 bg-white/80 backdrop-blur-sm border-l border-white/20 flex flex-col h-screen">
                {/* Formulaire de connexion */}
                <div className="flex-1 flex flex-col justify-center p-8">
                    <div className="mb-8">
                        <h2 className="text-xl font-medium text-gray-700 mb-2 text-center">
                            Login into your account
                        </h2>
                    </div>

                    {/* Message d'erreur */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Champ Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/70 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                            />
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/70 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                required
                            />
                        </div>

                        {/* Bouton de connexion */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Logging in...
                                </div>
                            ) : (
                                'Login now'
                            )}
                        </button>
                    </form>

                    {/* Lien vers la page d'inscription */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                href="/auth/signup"
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                            >
                                Create account
                            </Link>
                        </p>
                    </div>

                    {/* Lien mot de passe oublié (optionnel) */}
                    <div className="mt-4 text-center">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}