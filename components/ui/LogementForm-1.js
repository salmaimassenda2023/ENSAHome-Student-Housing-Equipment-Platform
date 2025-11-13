
export default function LogementForm1(){
    return(
        <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl leading-tight text-green-600 text-center mb-9">
                Partagez votre logement avec des étudiants
            </h1>

            {/* form */}
            <form >
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

                    {/* photos */}
                    <div>
                        <label className="block text-xl font-medium text-gray-700 leading-tight">Photos du logement :</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.photos ? 'border-red-500' : ''}`}
                        />
                        {errors.photos && <p className="text-red-500 text-sm mt-1">{errors.photos}</p>}
                        {formData.photos.length > 0 && (
                            <p className="text-sm text-gray-600 mt-1">
                                {formData.photos.length} fichier(s) sélectionné(s)
                            </p>
                        )}
                    </div>



                    {/*/!* Bouton de soumission *!/*/}
                    {/*<div className="col-span-2 mt-8 flex justify-center">*/}
                    {/*    <button*/}
                    {/*        type="submit"*/}
                    {/*        className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"*/}
                    {/*    >*/}
                    {/*        Publier l'annonce*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </form>
        </div>
    )

}