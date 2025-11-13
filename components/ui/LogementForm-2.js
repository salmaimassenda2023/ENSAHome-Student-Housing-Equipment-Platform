 export default function LogementForm2(){
    return(
        <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl leading-tight text-green-600 text-center mb-9">
                Partagez votre logement avec des étudiants
            </h1>

            {/* form */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-15 gap-x-25 mt-3">


                    {/* nom proprietaire */}
                    <div className="mt-2">
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
                    <div className="mt-2">
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
                    <div className="col-span-2 mt-4">
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
                    <div className="col-span-2 mt-4">
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

                    {/* Bouton de soumission */}
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