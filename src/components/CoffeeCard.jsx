import React from 'react';

export default function CoffeeCard({ coffee, startEdit, deleteCoffee }) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-brew-dark">{coffee.name}</h3>
                    <span className="text-base font-bold text-brew-accent">₺{coffee.price}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                    {coffee.description || 'Açıklama girilmedi.'}
                </p>
            </div>

            <div className="flex gap-2 border-t border-gray-50 pt-3">
                <button
                    onClick={() => startEdit(coffee)}
                    className="flex-1 text-xs bg-brew-cream text-brew-dark font-medium py-2 rounded-lg hover:bg-brew-light transition"
                >
                    ✏️ Düzenle
                </button>
                <button
                    onClick={() => deleteCoffee(coffee.id)}
                    className="text-xs bg-red-50 text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-red-100 transition"
                >
                    🗑️ Sil
                </button>
            </div>
        </div>
    );
}