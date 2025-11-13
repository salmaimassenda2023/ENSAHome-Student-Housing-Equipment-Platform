'use client'

import React, { useState } from 'react';
import { Home, Upload, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import userService from '../../services/userService'; // Ajustez le chemin selon votre structure

export default function SignUpComponent() {
    const [activeRole, setActiveRole] = useState('students'); // 'proprietaire' ou 'students'
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        mobile: '',
        anneeEtudes: '',
        villeEcole: '',
        pieceIdentite: null,
        villeProprietaire: '',
        password: '',
        confirmPassword: '',
        acceptConditions: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Effacer les messages quand l'utilisateur tape
        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            pieceIdentite: file
        }));
    };

    const validateForm = () => {
        // Validation des champs obligatoires
        const requiredFields = ['nom', 'prenom', 'email', 'mobile', 'password', 'confirmPassword'];

        // Ajouter des champs spécifiques selon le rôle
        if (activeRole === 'students') {
            requiredFields.push('anneeEtudes', 'villeEcole');
        } else {
            requiredFields.push('villeProprietaire');
            if (!formData.pieceIdentite) {
                setError('Please upload an identity document');
                return false;
            }
        }

        // Vérifier les champs obligatoires
        for (const field of requiredFields) {
            if (!formData[field] || formData[field] === 'Select') {
                setError('Please fill in all required fields');
                return false;
            }
        }

        // Vérifier les mots de passe
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        // Vérifier les conditions d'utilisation
        if (!formData.acceptConditions) {
            setError('You must accept the terms and conditions');
            return false;
        }

        // Validation email pour les étudiants avec domaine ENSA
        if (activeRole === 'students' && !formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            // Préparer les données utilisateur
            const userData = {
                firstName: formData.prenom,
                lastName: formData.nom,
                email: formData.email,
                phone: formData.mobile,
                password: formData.password,
                role: activeRole,
                // Champs spécifiques selon le rôle
                ...(activeRole === 'students' && {
                    studyYear: formData.anneeEtudes,
                    villeEcole: formData.villeEcole
                }),
                ...(activeRole === 'proprietaire' && {
                    ville: formData.villeProprietaire,
                    // Note: La pièce d'identité nécessiterait un upload séparé
                    hasIdentityDocument: !!formData.pieceIdentite
                })
            };

            const result = await userService.register(userData);

            if (result.success) {
                setSuccess('Account created successfully! You can now log in.');
                // Optionnel: rediriger automatiquement vers la page de connexion après 2 secondes
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError(result.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const anneesEtudes = [
        'Select',
        '1ère année',
        '2ème année',
        '3ème année',
        '4ème année',
        '5ème année',
        'Master 1',
        'Master 2',
        'Doctorat'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
            <div className="flex max-w-6xl mx-auto px-4 gap-8">
                {/* Section logo */}
                <div className="w-96 flex items-center justify-center">
                    <div className="inline-flex items-center justify-center rounded-2xl mb-4">
                        <Image
                            src="/logo-2.png"
                            alt="logo"
                            width={350}
                            height={350}
                        />
                    </div>
                </div>

                {/* Section formulaire */}
                <div className="flex-1">
                    {/* Header avec navigation des rôles */}
                    <div className="pt-4 px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-black rounded-lg p-1 flex items-center mb-6">
                                <div className="flex flex-1">
                                    <button
                                        onClick={() => setActiveRole('proprietaire')}
                                        disabled={loading}
                                        className={`flex-1 py-2 px-6 text-center transition-all duration-200 disabled:opacity-50 ${
                                            activeRole === 'proprietaire'
                                                ? 'bg-white text-black rounded-lg font-medium'
                                                : 'text-white hover:text-gray-200'
                                        }`}
                                    >
                                        Propriétaire
                                    </button>

                                    <button
                                        onClick={() => setActiveRole('students')}
                                        disabled={loading}
                                        className={`flex-1 py-2 px-6 text-center transition-all duration-200 disabled:opacity-50 ${
                                            activeRole === 'students'
                                                ? 'bg-white text-black rounded-lg font-medium'
                                                : 'text-white hover:text-gray-200'
                                        }`}
                                    >
                                        Étudiants
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section formulaire */}
                    <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                        <div className="mb-6">
                            <h2 className="text-2xl font-medium text-gray-700 text-center">
                                Create your account
                            </h2>
                            <p className="text-gray-500 text-center mt-2">
                                {activeRole === 'students' ? 'Student Registration' : 'Property Owner Registration'}
                            </p>
                        </div>

                        {/* Messages d'erreur et de succès */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
                                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                <span className="text-sm">{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nom et Prénom */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nom"
                                        placeholder="Enter your last name..."
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prénom <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        placeholder="Enter your first name..."
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email et Mobile */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {activeRole === 'students' ? 'Email' : 'Email institutionnel'} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={activeRole === 'students' ? 'info@xyz.com' : 'Ex: name@ensa-khouribga.ac.ma'}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mobile No. <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="+212 - 6XX XX XX XX"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Champs spécifiques selon le rôle */}
                            {activeRole === 'students' ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Année d'études <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="anneeEtudes"
                                                value={formData.anneeEtudes}
                                                onChange={handleInputChange}
                                                disabled={loading}
                                                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                required
                                            >
                                                {anneesEtudes.map((annee) => (
                                                    <option key={annee} value={annee}>
                                                        {annee}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ville de l'école <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="villeEcole"
                                                value={formData.villeEcole}
                                                onChange={handleInputChange}
                                                disabled={loading}
                                                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="khouribga">Khouribga</option>
                                                <option value="casablanca">Casablanca</option>
                                                <option value="rabat">Rabat</option>
                                                <option value="fes">Fès</option>
                                                <option value="marrakech">Marrakech</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pièce d'identité <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="pieceIdentite"
                                                name="pieceIdentite"
                                                onChange={handleFileUpload}
                                                disabled={loading}
                                                className="hidden"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                            />
                                            <label
                                                htmlFor="pieceIdentite"
                                                className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg cursor-pointer flex items-center text-gray-500 hover:bg-gray-200 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <Upload className="h-5 w-5 mr-2" />
                                                {formData.pieceIdentite ? formData.pieceIdentite.name : 'Upload identity document'}
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ville de propriétaire <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="villeProprietaire"
                                            placeholder="Enter your city..."
                                            value={formData.villeProprietaire}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Mots de passe */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Min 6 characters"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        minLength="6"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Repeat password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Conditions d'utilisation */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="acceptConditions"
                                    name="acceptConditions"
                                    checked={formData.acceptConditions}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                                    required
                                />
                                <label htmlFor="acceptConditions" className="ml-2 text-sm text-gray-700">
                                    I accept the <Link href="/terms" className="text-blue-600 hover:underline">terms and conditions</Link> <span className="text-red-500">*</span>
                                </label>
                            </div>

                            {/* Bouton de soumission */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Creating account...
                                    </div>
                                ) : (
                                    'Sign up'
                                )}
                            </button>
                        </form>

                        {/* Lien vers la page de connexion */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}