import React, { useState } from 'react';
import { ShoppingBag, Search, User, Coffee, Star, ChevronRight, Snowflake, Droplet, Minus, Plus, Heart, ArrowLeft } from 'lucide-react';

function DetailScreen({ coffee, onBack, cartItems, setCartItems }) {
  const [selectedSize, setSelectedSize] = useState('Orta');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(coffee?.isFavorite || false);
  const [toastMessage, setToastMessage] = useState('');

  if (!coffee) return null;

  const handleAddToCart = () => {
    // Add multiple items based on quantity
    const newItems = Array(quantity).fill({ ...coffee, price: (parseFloat(coffee.price)).toString() });
    setCartItems(prev => [...prev, ...newItems]);
    setToastMessage(`${quantity} adet ${coffee.name} sepete eklendi!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed top-28 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
              <div className="w-12 h-12 bg-brew-dark text-white rounded-full flex items-center justify-center">
                <Coffee size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">BrewMaster</span>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#" className="text-gray-500 font-medium hover:text-brew-accent transition-colors" onClick={onBack}>Ana Sayfa</a>
              <a href="#" className="text-gray-900 font-medium hover:text-brew-accent transition-colors">Kahveler</a>
              <a href="#" className="text-gray-500 font-medium hover:text-brew-accent transition-colors">Hakkımızda</a>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-gray-500 hover:text-gray-900 transition-colors">
                <Search size={22} />
              </button>
              <button className="text-gray-500 hover:text-gray-900 transition-colors">
                <User size={22} />
              </button>
              <button className="flex items-center gap-2 bg-brew-dark text-white px-5 py-2.5 rounded-full hover:bg-black transition-all shadow-lg shadow-brew-dark/20">
                <ShoppingBag size={20} />
                <span className="font-medium">Sepet ({cartItems.length})</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button onClick={onBack} className="hover:text-brew-accent transition-colors">Ana Sayfa</button>
          <ChevronRight size={16} />
          <button className="hover:text-brew-accent transition-colors">Kahveler</button>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">{coffee.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden bg-gray-50 aspect-square">
              <img 
                src={coffee.image} 
                alt={coffee.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors group"
              >
                <Heart size={28} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-500 transition-colors"} />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="rounded-2xl overflow-hidden aspect-square border-2 border-brew-dark">
                <img src={coffee.image} alt="Thumb 1" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square border-2 border-transparent hover:border-gray-200 cursor-pointer opacity-70 hover:opacity-100 transition-all">
                <img src={coffee.image} alt="Thumb 2" className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-bold tracking-wider mb-4">Popüler Seçim</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{coffee.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current opacity-50" />
              </div>
              <span className="text-lg font-bold text-gray-900">{coffee.rating}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-gray-900 transition-colors">
                1.2k+ Değerlendirme
              </span>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              {coffee.description}
            </p>

            {/* Boyut Seçimi */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Boyut Seçimi</h3>
              <div className="flex gap-4">
                {[
                  { id: 'Küçük', ml: '355ml' },
                  { id: 'Orta', ml: '473ml' },
                  { id: 'Büyük', ml: '591ml' }
                ].map(size => (
                  <button 
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`flex-1 py-5 px-2 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      selectedSize === size.id 
                        ? 'bg-brew-dark border-brew-dark text-white shadow-lg shadow-brew-dark/20' 
                        : 'bg-white border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Coffee size={28} className={selectedSize === size.id ? 'text-brew-accent' : 'text-gray-400'} />
                    <span className="text-base font-bold">{size.id}</span>
                    <span className={`text-sm ${selectedSize === size.id ? 'text-gray-300' : 'text-gray-400'}`}>{size.ml}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tercihler */}
            <div className="mb-12">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Ekstra Tercihler</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="bg-white p-5 rounded-2xl flex items-center justify-between border-2 border-gray-100 shadow-sm cursor-pointer hover:border-gray-300 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Snowflake size={24} className="text-blue-500" />
                    </div>
                    <span className="text-lg font-medium text-gray-800">Ekstra Buz</span>
                  </div>
                  <input type="checkbox" className="w-6 h-6 rounded border-gray-300 text-brew-dark focus:ring-brew-dark accent-brew-dark" />
                </label>
                
                <label className="bg-white p-5 rounded-2xl flex items-center justify-between border-2 border-gray-100 shadow-sm cursor-pointer hover:border-gray-300 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                      <Droplet size={24} className="text-yellow-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-800">Yağsız Süt</span>
                  </div>
                  <input type="checkbox" className="w-6 h-6 rounded border-gray-300 text-brew-dark focus:ring-brew-dark accent-brew-dark" />
                </label>
              </div>
            </div>

            {/* Fiyat ve Sepet (Sticky on mobile, static on desktop) */}
            <div className="mt-auto flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-gray-100">
              <div className="flex-shrink-0 text-center sm:text-left w-full sm:w-auto mb-4 sm:mb-0">
                <span className="block text-sm text-gray-500 mb-1">Toplam Fiyat</span>
                <span className="text-4xl font-bold text-gray-900">₺{(parseFloat(coffee.price) * quantity).toFixed(2)}</span>
              </div>

              <div className="flex items-center w-full sm:w-auto gap-4 flex-1">
                <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500 hover:text-black hover:bg-gray-200 p-2 rounded-xl transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-bold text-xl w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-500 hover:text-black hover:bg-gray-200 p-2 rounded-xl transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-brew-dark text-white rounded-2xl py-5 flex items-center justify-center gap-3 font-bold text-lg shadow-xl shadow-brew-dark/20 hover:bg-black hover:-translate-y-1 transition-all"
                >
                  <ShoppingBag size={24} />
                  Sepete Ekle
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Simplified Footer for Detail Page */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>&copy; 2026 BrewMaster Coffee. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

export default DetailScreen;
