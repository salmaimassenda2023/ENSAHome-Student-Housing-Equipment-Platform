
'use client';

import React from 'react';

export default function PasswordCard() {
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2  className="text-4xl leading-tight text-green-600 font-bold">Changer Mot De Passe</h2>
            <form className="space-y-6 mt-2">
                <div>
                    <label className="block text-gray-700 mb-2">ancien mot de passe</label>
                    <input type="password" className="w-full p-3 rounded-md bg-gray-100" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">nouveau mot de passe</label>
                    <input type="password" className="w-full p-3 rounded-md bg-gray-100" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">confirmer le vouveau mot de passe</label>
                    <input type="password" className="w-full p-3 rounded-md bg-gray-100" />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button type="button" className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50">
                        Annuler
                    </button>
                    <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
                        Appliquer
                    </button>
                </div>
            </form>
        </div>
    );
}
