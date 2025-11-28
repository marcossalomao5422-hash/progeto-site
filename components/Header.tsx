
import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Store, TicketPercent, Coins, Crown, Bell, User, Menu, Heart } from 'lucide-react';
import { Notification } from '../types';

interface HeaderProps {
  cartCount: number;
  onNavigate: (view: any) => void;
  onSearch: (term: string) => void;
  notifications: Notification[];
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onNavigate, onSearch, notifications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-black sticky top-0 z-50 shadow-md text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4 md:gap-8 pt-1">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-10 h-8 border-2 border-white rounded-md flex items-center justify-center bg-transparent transform group-hover:-rotate-3 transition-transform">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="hidden md:block font-extrabold text-white text-2xl tracking-tighter uppercase">ALFAN</span>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <div className="flex shadow-sm rounded-sm overflow-hidden bg-white">
                <input
                type="text"
                className="w-full py-2.5 pl-4 pr-10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 nav-search-input"
                id="cb1-edit"
                name="as_word"
                placeholder="Buscar produtos, marcas e muito mais…"
                maxLength={120}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="off"
                aria-autocomplete="list"
                aria-expanded="false"
                role="combobox"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="bg-gray-100 px-4 text-gray-800 hover:text-black hover:bg-gray-200 border-l border-gray-300">
                <Search size={20} />
                </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-6 text-gray-200">
             
             {/* Notificações */}
             <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="hidden md:flex flex-col items-center leading-none hover:text-white group transition-colors relative"
                >
                  <Bell size={20} className="mb-1 text-gray-300 group-hover:text-white group-hover:scale-110 transition-transform"/>
                  <span className="text-[10px] font-bold">Avisos</span>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-black"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-10 w-72 bg-white text-gray-900 rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                    <div className="p-3 bg-gray-50 border-b border-gray-100 font-bold text-sm">Notificações</div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-gray-600">Sem notificações novas.</div>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className={`p-3 border-b border-gray-50 text-xs hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-blue-50/30' : ''}`}>
                             <p className="font-bold mb-1 text-gray-900">{n.title}</p>
                             <p className="text-gray-700">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
             </div>

             <button 
                onClick={() => onNavigate('favorites')}
                className="hidden lg:flex flex-col items-center leading-none hover:text-white group transition-colors"
            >
                <Heart size={20} className="mb-1 text-gray-300 group-hover:text-white group-hover:scale-110 transition-transform"/>
                <span className="text-[10px] font-bold">Favoritos</span>
             </button>

             <button className="hidden lg:flex flex-col items-center leading-none hover:text-white group transition-colors">
                <Crown size={20} className="mb-1 text-gray-300 group-hover:text-white group-hover:scale-110 transition-transform"/>
                <span className="text-[10px] font-bold">Prime</span>
             </button>

            {/* Menu Logista / Usuário */}
            <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden md:flex flex-col items-center leading-none hover:text-white group transition-colors"
                >
                  <User size={20} className="mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px]">Conta</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-10 w-48 bg-white text-gray-900 rounded-md shadow-lg border border-gray-200 overflow-hidden z-50 py-1">
                     <button onClick={() => {onNavigate('seller-dashboard'); setShowUserMenu(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 font-medium">
                        <Store size={14}/> Painel do Vendedor
                     </button>
                     <button onClick={() => {onNavigate('admin-dashboard'); setShowUserMenu(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100 font-medium">
                        <Crown size={14}/> Admin (Demo)
                     </button>
                     <button onClick={() => {onNavigate('purchases'); setShowUserMenu(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-medium text-gray-700">Minhas Compras</button>
                     <button onClick={() => {onNavigate('favorites'); setShowUserMenu(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-medium text-gray-700">Favoritos</button>
                     <button onClick={() => {onNavigate('auth'); setShowUserMenu(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-medium text-gray-700">Sair</button>
                  </div>
                )}
            </div>

            <button onClick={() => onNavigate('cart')} className="relative hover:text-white transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sub-header Navigation */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-300 pb-1">
          <button className="flex items-center gap-1 hover:border-gray-500 hover:text-white rounded px-2 py-1 -ml-2 transition-colors border border-transparent">
            <MapPin size={16} className="text-gray-300" />
            <div className="flex flex-col leading-none text-left">
                <span className="text-[10px] text-gray-400">Enviar para</span>
                <span className="font-medium text-xs text-white">São Paulo, Capital</span>
            </div>
          </button>
          
          <div className="hidden md:flex gap-6 text-xs font-medium items-center">
            <button 
                onClick={() => onNavigate('categories')} 
                className="hover:text-white transition-colors flex items-center gap-1 font-bold"
            >
                <Menu size={18} />
                Categorias
            </button>
            <button 
                onClick={() => onNavigate('sell')} 
                className="hover:text-white transition-colors"
            >
                Vender
            </button>
            <button className="hover:text-white transition-colors">Ofertas do Dia</button>
            <button onClick={() => onNavigate('purchases')} className="hover:text-white transition-colors">Histórico</button>
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Recomendados</button>
            <button className="hover:text-white transition-colors">Moda</button>
          </div>

          <div className="hidden md:flex gap-4 text-xs font-medium">
            <button onClick={() => onNavigate('auth')} className="cursor-pointer hover:text-white transition-colors">Crie sua conta</button>
            <button onClick={() => onNavigate('auth')} className="cursor-pointer hover:text-white transition-colors">Entre</button>
            <button onClick={() => onNavigate('purchases')} className="cursor-pointer hover:text-white transition-colors">Compras</button>
          </div>
        </div>
      </div>
    </header>
  );
};