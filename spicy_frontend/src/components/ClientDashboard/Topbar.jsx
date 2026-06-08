import React from 'react';
import { Search, Bell } from 'lucide-react';

const TopBar = ({ credentials }) => {
  const getDisplayName = () => {
    if (credentials?.name) return credentials.name;
    if (credentials?.email) {
      const namePart = credentials.email.split('@')[0];
      return namePart
        .split(/[._-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return 'Guest';
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-20 px-10 flex items-center justify-between bg-cover bg-center border-b border-white/5 overflow-hidden z-30" style={{ backgroundImage: `url(/src/assets/frying.jpg)` }}>
      <div className="absolute inset-0 bg-black/80 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
          <Search size={16} />
        </span>
        <input 
          type="text" 
          placeholder="Search for anything here ..." 
          className="w-full bg-black/40 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-xs text-white placeholder-white focus:outline-none focus:border-[#F99B0C]/40 focus:ring-1 focus:ring-[#F99B0C]/20 transition-all"
        />
      </div>

      <div className="relative z-10 flex items-center gap-6">
        <button className="w-10 h-10 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center relative text-white/80 hover:text-white transition-colors">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#F99B0C] rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-300">{getDisplayName()}</span>
          <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/10 overflow-hidden">
            <img 
              src="src/assets/profile.jpg" 
              alt="Manager Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;