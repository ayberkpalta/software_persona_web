import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ArrowRight, User, Coffee, Star, Settings } from 'lucide-react';

function HomeScreen({ onNavigate, cartItems, setCartItems }) {
  const [coffees, setCoffees] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('brewmaster_menu');
    let parsed = saved ? JSON.parse(saved) : null;
    
    // Auto-recovery if old bad data exists (missing image)
    if (parsed && parsed.length > 0 && !parsed[0].image) {
        localStorage.removeItem('brewmaster_menu');
        parsed = null;
    }

    if (parsed) {
      setCoffees(parsed);
    } else {
      const defaultCoffees = [
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
      setCoffees(defaultCoffees);
      localStorage.setItem('brewmaster_menu', JSON.stringify(defaultCoffees));
    }
  }, []);

  const handleAddToCart = (e, coffee) => {
    e.stopPropagation();
    setCartItems(prev => [...prev, coffee]);
    setToastMessage(`${coffee.name} sepete eklendi!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed top-28 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag size={20} /> Sepetiniz</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-red-500 font-bold text-xl">&times;</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">Sepetiniz şu an boş.</div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-brew-accent font-semibold">₺{item.price}</p>
                    </div>
                    <button 
                      onClick={() => setCartItems(cartItems.filter((_, i) => i !== index))}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      Sil
                    </button>
                  </div>
                ))
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                  <span>Toplam:</span>
                  <span className="text-brew-dark">
                    ₺{cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-brew-dark text-white py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-lg">
                  Siparişi Tamamla
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-12 h-12 bg-brew-dark text-white rounded-full flex items-center justify-center">
                <Coffee size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">BrewMaster</span>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#" onClick={(e) => scrollToSection(e, 'hero-section')} className="text-gray-900 font-medium hover:text-brew-accent transition-colors">Ana Sayfa</a>
              <a href="#" onClick={(e) => scrollToSection(e, 'menu-section')} className="text-gray-500 font-medium hover:text-brew-accent transition-colors">Kahveler</a>
              <button onClick={() => onNavigate('admin')} className="text-gray-500 font-medium hover:text-brew-accent transition-colors flex items-center gap-1">
                <Settings size={16} /> Admin Paneli
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-gray-500 hover:text-gray-900 transition-colors">
                <Search size={22} />
              </button>
              <button className="text-gray-500 hover:text-gray-900 transition-colors" onClick={() => onNavigate('login')}>
                <User size={22} />
              </button>
              <button 
                className="flex items-center gap-2 bg-brew-dark text-white px-5 py-2.5 rounded-full hover:bg-black transition-all shadow-lg shadow-brew-dark/20"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} />
                <span className="font-medium">Sepet ({cartItems.length})</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero-section" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brew-accent/10 text-brew-accent font-medium text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-brew-accent"></span>
              Yeni Hasat Çekirdekler Geldi
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Güne <span className="text-brew-accent">Mükemmel</span><br />Bir Başlangıç Yap.
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Dünyanın en iyi kahve çiftliklerinden özenle seçilen çekirdekleri, usta baristalarımızın ellerinde sanata dönüşüyor.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-brew-dark text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-all flex items-center gap-2 shadow-xl shadow-brew-dark/20">
                Menüyü İncele
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 rounded-full font-medium text-gray-900 border border-gray-200 hover:border-gray-900 transition-all">
                Hikayemizi Oku
              </button>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-12 lg:mt-0 px-4 lg:px-0">
          <div className="relative h-[400px] lg:h-full w-full rounded-3xl lg:rounded-none lg:rounded-l-[80px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&q=80" 
              alt="Coffee pour" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Popular Menu Section */}
      <section id="menu-section" className="py-24 bg-[#FAF8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Seçimler</h2>
              <p className="text-gray-600 max-w-2xl">Müşterilerimizin en çok tercih ettiği, imza niteliğindeki lezzetlerimiz. Her biri kendi karakterine sahip, eşsiz bir deneyim sunar.</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 font-medium text-brew-accent hover:text-brew-dark transition-colors">
              Tüm Menüyü Gör <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coffees.map((coffee) => (
              <div 
                key={coffee.id} 
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col"
                onClick={() => onNavigate('detail', coffee)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={coffee.image} 
                    alt={coffee.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{coffee.rating}</span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-bold text-brew-accent uppercase tracking-wider mb-2">{coffee.subtitle}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brew-accent transition-colors">{coffee.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1">{coffee.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-gray-900">₺{coffee.price}</span>
                    <button 
                      className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-brew-dark group-hover:text-white flex items-center justify-center transition-all"
                      onClick={(e) => handleAddToCart(e, coffee)}
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brew-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Coffee size={24} className="text-brew-accent" />
                <span className="text-2xl font-bold">BrewMaster</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Her yudumda tutkumuzu hissedin. En iyi kahve çekirdeklerini özenle seçiyor, ustalıkla demliyoruz.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Menü</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Kahveler</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Soğuk İçecekler</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tatlılar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kahve Çekirdekleri</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Kurumsal</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Şubelerimiz</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kariyer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Bülten</h4>
              <p className="text-sm text-gray-400 mb-4">Yeni kahvelerden ve kampanyalardan haberdar olun.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="E-posta adresiniz" className="bg-white/10 border-none rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-brew-accent outline-none w-full" />
                <button className="bg-brew-accent text-white px-4 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors">Kayıt</button>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            &copy; 2026 BrewMaster Coffee. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeScreen;
