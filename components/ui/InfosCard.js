export default function InfosCard(){
    return(
        <div  className="max-w-3xl mx-auto ">
            <div>
                <h1 className="text-4xl leading-tight text-green-600 font-bold">Infos Personnelles</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-2">
                {/*nom*/}
                <div>
                    <label className="block text-gray-700 mb-2">Prénom</label>
                    <input type="text" placeholder="prénom" className="w-full p-3 rounded-md bg-gray-100" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Nom</label>
                    <input type="text" placeholder="Nom" className="w-full p-3 rounded-md bg-gray-100" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input type="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-100" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">numéro de téléphone</label>
                    <input type="tel" placeholder="(+212)633-333-333" className="w-full p-3 rounded-md bg-gray-100" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Ville</label>
                    <input type="text"  placeholder="Ville" className="w-full p-3 rounded-md bg-gray-100" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Badge</label>
                    <input type="text" placeholder="(si tu est étudiant)" className="w-full p-3 rounded-md bg-gray-100" />
                </div>

            </div>
            <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
                <button type="button" className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50">
                    Annuler
                </button>
                <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
                    Appliquer
                </button>
            </div>

        </div>
    )
}