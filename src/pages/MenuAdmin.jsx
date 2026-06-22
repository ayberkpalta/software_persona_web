import React, { useState, useEffect } from 'react';
import CoffeeForm from '../components/CoffeeForm';
import CoffeeCard from '../components/CoffeeCard';

export default function MenuAdmin({ onBack }) {
    // LİSTELEME (Read) - LocalStorage entegrasyonu
    const [coffees, setCoffees] = useState(() => {
        const saved = localStorage.getItem('brewmaster_menu');
        let parsed = saved ? JSON.parse(saved) : null;
        if (parsed && parsed.length > 0 && !parsed[0].image) {
            localStorage.removeItem('brewmaster_menu');
            parsed = null;
        }

        return parsed ? parsed : [
            {
              id: 1,
              name: "Cappuccino Art",
              subtitle: "Klasik & Sütlü",
              price: "88.00",
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80",
              description: "Taze demlenmiş zengin espressonun, vanilya aromalı şurup ve kadifemsi süt köpüğüyle mükemmel uyumu."
            },
            {
              id: 2,
              name: "Iced Caramel",
              subtitle: "Soğuk & Karamel",
              price: "95.00",
              rating: 4.9,
              image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80",
              description: "Sıcak yaz günlerinde içinizi ferahlatacak, bol buzlu, yoğun karamel aromalı serinletici kahve deneyimi."
            },
            {
              id: 3,
              name: "Espresso Solo",
              subtitle: "Yoğun & Saf",
              price: "62.00",
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80",
              description: "Gerçek kahve tutkunları için, özenle kavrulmuş çekirdeklerden elde edilen yoğun, aromatik tek shot espresso."
            },
            {
              id: 4,
              name: "Flat White",
              subtitle: "Dengeli & Kadifemsi",
              price: "82.00",
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1585494156145-1c60a4fe952c?w=800&q=80",
              description: "İnce süt köpüğü ve çift shot ristretto ile hazırlanan, süt ve kahvenin en mükemmel dengesi."
            }
        ];
    });

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        localStorage.setItem('brewmaster_menu', JSON.stringify(coffees));
    }, [coffees]);

    // EKLEME (Create) & GÜNCELLEME (Update)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price) return;

        const defaultImage = image || "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80";

        if (editingId) {
            setCoffees(coffees.map(coffee =>
                coffee.id === editingId ? { ...coffee, name, price, description, image: defaultImage } : coffee
            ));
            setEditingId(null);
        } else {
            const newCoffee = { 
                id: Date.now(), 
                name, 
                price, 
                description, 
                image: defaultImage,
                rating: 4.5,
                subtitle: "Özel Harman"
            };
            setCoffees([...coffees, newCoffee]);
        }
        cancelEdit();
    };

    const startEdit = (coffee) => {
        setEditingId(coffee.id);
        setName(coffee.name);
        setPrice(coffee.price);
        setDescription(coffee.description);
        setImage(coffee.image || '');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setName('');
        setPrice('');
        setDescription('');
        setImage('');
    };

    // SİLME (Delete)
    const deleteCoffee = (id) => {
        if (window.confirm('Bu kahveyi silmek istediğinize emin misiniz?')) {
            setCoffees(coffees.filter(coffee => coffee.id !== id));
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            {/* Üst Logo ve Başlık */}
            <div className="flex justify-between items-center mb-8 border-b border-brew-light pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brew-dark rounded-xl flex items-center justify-center text-white text-xl">☕</div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-brew-dark">BrewMaster</h1>
                        <p className="text-xs text-amber-800 font-semibold tracking-wider uppercase">Menu & Sipariş Yönetim Portalı</p>
                    </div>
                </div>
                <button 
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                    Ana Sayfaya Dön
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SOL: Bileşen olarak çağırdığımız Form */}
                <div className="lg:col-span-1">
                    <CoffeeForm
                        name={name} setName={setName}
                        price={price} setPrice={setPrice}
                        description={description} setDescription={setDescription}
                        image={image} setImage={setImage}
                        handleSubmit={handleSubmit} editingId={editingId} cancelEdit={cancelEdit}
                    />
                </div>

                {/* SAĞ: Listeleme ve Kartlar */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 text-brew-dark flex justify-between items-center">
                        <span>Aktif Menü Ürünleri</span>
                        <span className="text-xs bg-brew-accent text-white px-2 py-1 rounded-md">{coffees.length} Çeşit</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {coffees.map(coffee => (
                            <CoffeeCard
                                key={coffee.id}
                                coffee={coffee}
                                startEdit={startEdit}
                                deleteCoffee={deleteCoffee}
                            />
                        ))}

                        {coffees.length === 0 && (
                            <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
                                Menüde hiç kahve kalmadı.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}