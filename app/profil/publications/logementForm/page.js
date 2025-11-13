"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogementForm({ initialData = null, onSubmit, isEditing = false }) {
    const router = useRouter();

    // État pour gérer l'étape actuelle du formulaire
    const [isClient, setIsClient] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Effet pour indiquer que le composant est maintenant rendu côté client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Initialisation des états
    const [formData, setFormData] = useState({
        type: initialData?.type || "Appartement",
        nombrePieces: initialData?.nombrePieces || "",
        ville: initialData?.ville || "Khouribga",
        quartier: initialData?.quartier || "",
        loyer: initialData?.loyer || "",
        description: initialData?.description || "",
        telephone: initialData?.telephone || "",
        nomProprietaire: initialData?.nomProprietaire || "",
        commodites: initialData?.commodites || {
            wifi: false,
            parking: false,
            ascenseur: false,
            climatisation: false,
            meuble: false,
            eauChaude: false,
        },
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
        setFormData(prev => ({
            ...prev,
            photos: files
        }));

        // Effacer l'erreur pour les photos
        if (errors.photos) {
            setErrors(prev => ({
                ...prev,
                photos: undefined
            }));
        }
    };

    // Gestionnaire pour les checkboxes (commodités)
    const handleCommoditeChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            commodites: {
                ...prev.commodites,
                [name]: checked
            }
        }));
    };

    // Validation de l'étape 1
    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.type) newErrors.type = "Veuillez sélectionner un type de logement";
        if (!formData.nombrePieces) newErrors.nombrePieces = "Veuillez indiquer le nombre de pièces";
        if (!formData.ville) newErrors.ville = "Veuillez sélectionner une ville";
        if (!formData.quartier) newErrors.quartier = "Veuillez indiquer le quartier";
        if (!formData.loyer) newErrors.loyer = "Veuillez indiquer le loyer mensuel";
        if (formData.photos.length === 0) newErrors.photos = "Veuillez ajouter au moins une photo";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validation de l'étape 2
    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.description) newErrors.description = "Veuillez ajouter une description";
        if (!formData.telephone) newErrors.telephone = "Veuillez indiquer un numéro de téléphone";
        if (!formData.nomProprietaire) newErrors.nomProprietaire = "Veuillez indiquer le nom du propriétaire";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestionnaire pour passer à l'étape suivante
    const handleNextStep = () => {
        if (validateStep1()) {
            setCurrentStep(2);
            // Réinitialiser les erreurs lors du changement d'étape
            setErrors({});
        } else {
            console.log("Veuillez compléter tous les champs requis avant de continuer");
        }
    };

    // Gestionnaire pour revenir à l'étape précédente
    const handlePrevStep = () => {
        setCurrentStep(1);
        // Réinitialiser les erreurs lors du changement d'étape
        setErrors({});
    };

    // Gestionnaire de soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateStep2()) {
            // Créer un FormData pour envoyer les fichiers
            const formDataToSend = new FormData();

            // Ajouter les données textuelles
            for (const key in formData) {
                if (key !== 'photos' && key !== 'commodites') {
                    formDataToSend.append(key, formData[key]);
                }
            }

            // Ajouter les commodités comme JSON
            formDataToSend.append('commodites', JSON.stringify(formData.commodites));

            // Ajouter les photos
            formData.photos.forEach((photo, index) => {
                formDataToSend.append(`photo-${index}`, photo);
            });

            // Ici, vous pourriez envoyer formDataToSend à votre API
            console.log("Données à envoyer:", formData);

            // Rediriger vers une page de confirmation ou rafraîchir le formulaire
            alert("Annonce publiée avec succès!");
            // router.push('/confirmation');
        } else {
            console.log("Formulaire invalide, veuillez corriger les erreurs");
        }
    };

    return (
        <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl leading-tight text-green-600 text-center mb-9">
                Partagez votre logement avec des étudiants
            </h1>

            {/* Nous ne rendons le contenu que côté client pour éviter les erreurs d'hydratation */}
            {isClient && (
                <>
                    {/* Indicateur d'étape - Corrigé pour que l'étape 2 soit verte lorsque currentStep === 2 */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                                1
                            </div>
                            <div className="w-16 h-1 bg-gray-300 mx-2"></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                                2
                            </div>
                        </div>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit}>
                        {/* Étape 1 - S'affiche uniquement quand currentStep === 1 */}
                        {currentStep === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-15 gap-x-25 mt-3">
                                {/* type */}
                                <div>
                                    <label className="block text-xl font-medium text-gray-700 leading-tight">Type de logement :</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.type ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">-- Sélectionnez --</option>
                                        <option value="Appartement">Appartement</option>
                                        <option value="Studio">Studio</option>
                                        <option value="Maison">Maison</option>
                                        <option value="Chambre">Chambre</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                                </div>

                                {/* nbre pieces */}
                                <div>
                                    <label className="block text-xl font-medium text-gray-700 leading-tight">Nombre de pièces :</label>
                                    <input
                                        type="number"
                                        name="nombrePieces"
                                        value={formData.nombrePieces}
                                        onChange={handleChange}
                                        min="1"
                                        className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.nombrePieces ? 'border-red-500' : ''}`}
                                    />
                                    {errors.nombrePieces && <p className="text-red-500 text-sm mt-1">{errors.nombrePieces}</p>}
                                </div>

                                {/* ville */}
                                <div>
                                    <label className="block text-xl font-medium text-gray-700 leading-tight">Ville :</label>
                                    <select
                                        name="ville"
                                        value={formData.ville}
                                        onChange={handleChange}
                                        className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 ${errors.ville ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">-- Sélectionnez --</option>
                                        <option value="Khouribga">Khouribga</option>
                                        <option value="Fes">Fes</option>
                                        <option value="El Jadida">El Jadida</option>
                                    </select>
                                    {errors.ville && <p className="text-red-500 text-sm mt-1">{errors.ville}</p>}
                                </div>

                                {/* quartier */}
                                <div>
                                    <label className="block text-xl font-medium text-gray-700 leading-tight">Quartier :</label>
                                    <input
                                        type="text"
                                        name="quartier"
                                        value={formData.quartier}
                                        onChange={handleChange}
                                        className={`mt-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.quartier ? 'border-red-500' : ''}`}
                                    />
                                    {errors.quartier && <p className="text-red-500 text-sm mt-1">{errors.quartier}</p>}
                                </div>

                                {/* loyer */}
                                <div>
                                    <label className="block text-xl font-medium text-gray-700 leading-tight">Loyer (DH/mois) :</label>
                                    <input
                                        type="number"
                                        name="loyer"
                                        value={formData.loyer}
                                        onChange={handleChange}
                                        min="0"
                                        className={`mt-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.loyer ? 'border-red-500' : ''}`}
                                    />
                                    {errors.loyer && <p className="text-red-500 text-sm mt-1">{errors.loyer}</p>}
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
                                                <span className="text-sm text-gray-500">Téléchargement d'une pièce jointe</span>
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

                                {/* Bouton Suivant */}
                                <div className="col-span-2 mt-3 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="flex flex-justify-end px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Étape 2 - S'affiche uniquement quand currentStep === 2 */}
                        {currentStep === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-15 gap-x-25 mt-3">
                                {/* nom proprietaire */}
                                <div>
                                    <label className="block text-xl font-medium text-gray-700 leading-tight">Nom Propriétaire :</label>
                                    <input
                                        type="text"
                                        name="nomProprietaire"
                                        value={formData.nomProprietaire}
                                        onChange={handleChange}
                                        className={`mt-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.nomProprietaire ? 'border-red-500' : ''}`}
                                    />
                                    {errors.nomProprietaire && <p className="text-red-500 text-sm mt-1">{errors.nomProprietaire}</p>}
                                </div>

                                {/* tel proprietaire */}
                                <div>
                                    <label className="block text-xl font-medium text-gray-700 leading-tight">Téléphone Propriétaire :</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        className={`mt-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.telephone ? 'border-red-500' : ''}`}
                                    />
                                    {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
                                </div>

                                {/* commodites */}
                                <div className="col-span-2 mt-2">
                                    <label className="block text-xl font-medium text-gray-700 leading-tight mb-2">Commodités :</label>
                                    <div className="p-4 border border-gray-300 rounded-md">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="meuble"
                                                    name="meuble"
                                                    checked={formData.commodites.meuble}
                                                    onChange={handleCommoditeChange}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 checked:accent-green-500"
                                                />
                                                <label htmlFor="meuble" className="ml-2 block text-sm text-gray-700">Meublé</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="wifi"
                                                    name="wifi"
                                                    checked={formData.commodites.wifi}
                                                    onChange={handleCommoditeChange}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 checked:accent-green-500"
                                                />
                                                <label htmlFor="wifi" className="ml-2 block text-sm text-gray-700">WiFi</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="parking"
                                                    name="parking"
                                                    checked={formData.commodites.parking}
                                                    onChange={handleCommoditeChange}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 checked:accent-green-500"
                                                />
                                                <label htmlFor="parking" className="ml-2 block text-sm text-gray-700">Parking</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="ascenseur"
                                                    name="ascenseur"
                                                    checked={formData.commodites.ascenseur}
                                                    onChange={handleCommoditeChange}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 checked:accent-green-500"
                                                />
                                                <label htmlFor="ascenseur" className="ml-2 block text-sm text-gray-700">Ascenseur</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="climatisation"
                                                    name="climatisation"
                                                    checked={formData.commodites.climatisation}
                                                    onChange={handleCommoditeChange}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 checked:accent-green-500"
                                                />
                                                <label htmlFor="climatisation" className="ml-2 block text-sm text-gray-700">Climatisation</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="eauChaude"
                                                    name="eauChaude"
                                                    checked={formData.commodites.eauChaude}
                                                    onChange={handleCommoditeChange}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 checked:accent-green-500"
                                                />
                                                <label htmlFor="eauChaude" className="ml-2 block text-sm text-gray-700">Eau chaude</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="col-span-2 mt-2">
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
                                <div className="col-span-2 mt-4 flex justify-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="px-6 py-3 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                    >
                                        Retour
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        Publier l'annonce
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.push('/profil/publications')}
                                        className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </>
            )}
        </div>
    );
}