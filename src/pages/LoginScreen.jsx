import React from 'react';
import { Coffee, Mail, Lock, ArrowRight } from 'lucide-react';

function LoginScreen({ onLogin }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-brew-dark opacity-5 -skew-y-6 transform origin-top-left -z-10"></div>
      
      {/* Navbar for Login Page (to feel like a real website) */}
      <nav className="absolute top-0 w-full flex justify-between items-center px-8 py-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brew-dark text-white rounded-full flex items-center justify-center">
            <Coffee size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">BrewMaster</span>
        </div>
        <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Ana Sayfaya Dön</a>
      </nav>

      <div className="w-full max-w-md px-4">
        {/* Main Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100 relative z-10">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz</h1>
            <p className="text-gray-500 text-sm">Gurme kahve deneyimi için giriş yapın.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">E-posta</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-focus-within:text-brew-accent transition-colors" />
                </div>
                <input 
                  type="email" 
                  placeholder="ornek@email.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brew-accent/20 focus:border-brew-accent transition-all hover:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                <label className="block text-sm font-semibold text-gray-700">Şifre</label>
                <a href="#" className="text-xs text-brew-accent font-medium hover:underline">Şifremi Unuttum</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-focus-within:text-brew-accent transition-colors" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-brew-accent/20 focus:border-brew-accent transition-all hover:bg-gray-50"
                />
              </div>
            </div>

            <button 
              onClick={onLogin}
              className="w-full bg-brew-dark text-white font-medium py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Giriş Yap
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Hesabınız yok mu? <a href="#" className="text-brew-accent font-bold hover:underline">Kayıt Olun</a>
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex justify-center gap-6 mt-8 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600 transition-colors">Kullanım Koşulları</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Gizlilik Politikası</a>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
