import React, { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import DetailScreen from './pages/DetailScreen';
import MenuAdmin from './pages/MenuAdmin';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigateTo = (screen, data = null) => {
    if (data) setSelectedCoffee(data);
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {currentScreen === 'login' && <LoginScreen onLogin={() => navigateTo('home')} />}
      {currentScreen === 'home' && <HomeScreen onNavigate={navigateTo} cartItems={cartItems} setCartItems={setCartItems} />}
      {currentScreen === 'detail' && (
        <DetailScreen coffee={selectedCoffee} onBack={() => navigateTo('home')} cartItems={cartItems} setCartItems={setCartItems} />
      )}
      {currentScreen === 'admin' && <MenuAdmin onBack={() => navigateTo('home')} />}
    </div>
  );
}

export default App;