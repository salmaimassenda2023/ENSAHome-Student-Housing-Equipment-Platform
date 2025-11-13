"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EquipementForm({ initialData = null, onSubmit, isEditing = false }) {
    const router = useRouter();

    // État pour éviter les erreurs d'hydratation
    const [isClient, setIsClient] = useState(false);

    // Effet pour indiquer que le composant est maintenant rendu côté client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Initialisation des états
    const [formData, setFormData] = useState({
        designation: initialData?.designation || "",
        etatEquipement: initialData?.etatEquipement || "Utilisé",
        prix: initialData?.prix || "",
        description: initialData?.description || "",
        photos: initialData?.photos || []
    });

    // État pour gérer les erreurs de validation
    const [errors, setErrors] = useState({});

    // Gestionnaire pour les champs de texte/nombre/select
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Effacer l'erreur lorsque l'utilisateur modifie le champ
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    // Gestionnaire pour l'upload de photos
    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);

        // Si c'est une modification, on ajoute les nouvelles photos aux anciennes
        // sauf si l'utilisateur remplace explicitement toutes les photos
        if (isEditing && formData.photos.length > 0 && !window.confirm("Voulez-vous remplacer toutes les photos existantes?")) {
            setFormData(prev => ({
                ...prev,
                photos: [...prev.photos, ...files]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                photos: files
            }));
        }

        // Effacer l'erreur pour les photos
        if (errors.photos) {
            setErrors(prev => ({
                ...prev,
                photos: undefined
            }));
        }
    };

    // Validation du formulaire
    const validateForm = () => {
        const newErrors = {};

        if (!formData.designation) newErrors.designation = "Veuillez indiquer la désignation de l'équipement";
        if (!formData.etatEquipement) newErrors.etatEquipement = "Veuillez sélectionner l'état de l'équipement";
        if (!formData.prix && formData.prix !== "0") newErrors.prix = "Veuillez indiquer le prix";
        if (!formData.description) newErrors.description = "Veuillez ajouter une description";

        // Si c'est une création, on vérifie les photos
        // Si c'est une modification et qu'il n'y a pas de photos existantes, on vérifie aussi
        if (!isEditing && formData.photos.length === 0) {
            newErrors.photos = "Veuillez ajouter au moins une photo";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestionnaire de soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Créer un FormData pour envoyer les fichiers
            const formDataToSend = new FormData();

            // Ajouter les données textuelles
            for (const key in formData) {
                if (key !== 'photos') {
                    formDataToSend.append(key, formData[key]);
                }
            }

            // Ajouter les photos
            formData.photos.forEach((photo, index) => {
                // Si photo est un objet File ou Blob, on l'ajoute directement
                if (photo instanceof File || photo instanceof Blob) {
                    formDataToSend.append(`photo-${index}`, photo);
                } else {
                    // Sinon, c'est une URL ou une référence, on l'ajoute comme chaîne
                    formDataToSend.append(`photo-url-${index}`, photo);
                }
            });

            // Si nous avons une fonction onSubmit (cas d'édition via modal)
            if (onSubmit) {
                onSubmit({
                    ...formData,
                    id: initialData?.id // Conserver l'ID pour l'identification
                });
            } else {
                // Cas d'ajout normal
                console.log("Données à envoyer:", formData);
                alert("Annonce d'équipement publiée avec succès!");
                // router.push('/confirmation');
            }
        } else {
            console.log("Formulaire invalide, veuillez corriger les erreurs");
        }
    };

    // Gestionnaire pour annuler
    const handleCancel = () => {
        if (onSubmit) {
            // Si on est dans un modal, on appelle la fonction onSubmit avec null pour indiquer une annulation
            onSubmit(null);
        } else {
            // Sinon, on redirige comme avant
            router.push('/profil/publications');
        }
    };

    return (
        <div className="container mx-auto max-w-5xl">
            {!isEditing && (
                <h1 className="text-3xl leading-tight text-green-600 text-center mb-9">
                    Partagez votre équipement avec des étudiants
                </h1>
            )}

            {/* Nous ne rendons le contenu que côté client pour éviter les erreurs d'hydratation */}
            {isClient && (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-12">
                        {/* Désignation */}
                        <div>
                            <label className="block text-xl font-medium text-gray-700 leading-tight">Désignation :</label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className={`mt-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.designation ? 'border-red-500' : ''}`}
                            />
                            {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                        </div>

                        {/* État d'équipement */}
                        <div>
                            <label className="block text-xl font-medium text-gray-700 leading-tight">État d'équipement :</label>
                            <select
                                name="etatEquipement"
                                value={formData.etatEquipement}
                                onChange={handleChange}
                                className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.etatEquipement ? 'border-red-500' : ''}`}
                            >
                                <option value="Neuf">Neuf</option>
                                <option value="Utilisé">Utilisé</option>
                            </select>
                            {errors.etatEquipement && <p className="text-red-500 text-sm mt-1">{errors.etatEquipement}</p>}
                        </div>

                        {/* Prix */}
                        <div>
                            <label className="block text-xl font-medium text-gray-700 leading-tight">Prix <span className="text-md text-gray-500">(mettez 0 si tu veux le céder)</span> :</label>
                            <div className="relative mt-2">
                                <input
                                    type="number"
                                    name="prix"
                                    value={formData.prix}
                                    onChange={handleChange}
                                    min="0"
                                    className={`block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-12 ${errors.prix ? 'border-red-500' : ''}`}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none bg-gray-100 rounded-r-md border-l">
                                    <span className="text-gray-500">DH</span>
                                </div>
                            </div>
                            {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix}</p>}
                        </div>

                        {/* Photos */}
                        <div>
                            <label className="block text-xl font-medium text-gray-700 leading-tight">Photos de l'équipement :</label>
                            <div className="mt-2 flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <span className="text-sm text-gray-500">
                                            {isEditing ? "Ajouter ou remplacer des photos" : "Téléchargement d'une pièce jointe"}
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {errors.photos && <p className="text-red-500 text-sm mt-1">{errors.photos}</p>}
                            {formData.photos.length > 0 && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {formData.photos.length} fichier(s) sélectionné(s)
                                </p>
                            )}
                        </div>

                        {/* Description - Pleine largeur */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xl font-medium text-gray-700 leading-tight">Description :</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
                                rows="4"
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex justify-end mt-4 flex space-x-4 col-span-2">
                            <div>
                                <button
                                    type="submit"
                                    className="cursor-pointer px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {isEditing ? "Mettre à jour" : "Partager"}
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="cursor-pointer px-6 py-3 border border-red-300 text-gray-700 hover:bg-red-200 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}