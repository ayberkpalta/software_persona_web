import React from 'react';

export default function CoffeeForm({
    name, setName,
    price, setPrice,
    description, setDescription,
    image, setImage,
    handleSubmit, editingId, cancelEdit
}) {
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-brew-dark">
                {editingId ? '☕ Kahveyi Düzenle' : '➕ Yeni Kahve Ekle'}
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kahve Adı</label>
                    <input
                        type="text" placeholder="Örn: Espresso Solo" value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brew-accent bg-gray-50 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fiyat (₺)</label>
                    <input
                        type="text" placeholder="Örn: 85.00" value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brew-accent bg-gray-50 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Açıklama / Hakkında</label>
                    <textarea
                        rows="3" placeholder="Kahve çekirdeği, süt durumu vb..." value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brew-accent bg-gray-50 text-sm resize-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Görsel (Dosya Yükle)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImage(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brew-accent bg-gray-50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brew-accent file:text-white hover:file:bg-orange-600"
                    />
                    {image && (
                        <div className="mt-3 relative inline-block">
                            <img src={image} alt="Önizleme" className="h-20 rounded-lg object-cover border border-gray-200" />
                            <button 
                                type="button" 
                                onClick={() => setImage('')} 
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-brew-dark text-white p-3 rounded-xl font-semibold text-sm hover:bg-opacity-90 transition">
                        {editingId ? 'Güncelle' : 'Menüye Ekle'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={cancelEdit} className="bg-gray-200 text-gray-700 px-4 rounded-xl font-semibold text-sm hover:bg-gray-300 transition">
                            İptal
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}