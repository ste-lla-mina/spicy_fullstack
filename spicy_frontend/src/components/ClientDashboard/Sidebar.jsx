import React from 'react';
import { Utensils, ClipboardList, SquareDot, Settings, LogOut } from 'lucide-react';
import logo from '../../assets/logo.png';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'tables', label: 'Tables', icon: SquareDot },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-cover bg-center flex flex-col justify-between overflow-hidden select-none border-r border-white/5 z-40" style={{ backgroundImage: `url(/src/assets/frying.jpg)` }}>
      <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col space-y-10 pt-8 px-6">
        <div className="flex items-center gap-3 px-2">
          <img src={logo} alt="Spicy Logo" className="h-9 w-auto object-contain" />
          <span className="text-[#F99B0C] font-black text-2xl tracking-wide font-sans">
            Spicy
          </span>
        </div>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 group text-left ${
                  isActive
                    ? 'bg-[#F99B0C]/10 text-[#F99B0C] border-l-4 border-[#F99B0C] rounded-l-none pl-3'
                    : 'text-white hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#F99B0C]' : 'text-white group-hover:text-white transition-colors'} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="relative z-10 flex flex-col mt-auto">
        <div className="px-6 pb-4 flex flex-col space-y-2">
          <button
            onClick={() => setActiveSection('settings')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all text-left ${
              activeSection === 'settings'
                ? 'bg-[#F99B0C]/10 text-[#F99B0C] border-l-4 border-[#F99B0C] rounded-l-none pl-3'
                : 'text-white hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings size={18} />
            Settings
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold text-white hover:text-red-400 hover:bg-red-500/5 transition-all text-left"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="w-full h-20 overflow-hidden border-t border-white/10 mt-2">
          <img 
            src="/src/assets/roasted.jpg" 
            alt="Food Banner" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;