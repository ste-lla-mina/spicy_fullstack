import React, { useState, useEffect } from 'react';
import { Search, Bell, LogIn, X } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'why-us'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    onNavigate('landing');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[1400px] z-50 px-8 py-3 flex items-center justify-between rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(249,155,12,0.15)]">
        
        <div onClick={() => scrollToSection('home')} className="flex items-center cursor-pointer select-none">
          <img 
            src={logo} 
            alt="Spicy Logo" 
            className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(249,155,12,0.4)]" 
          />
          <span className="text-[#F99B0C] ml-2 font-bold text-2xl tracking-wide font-sans drop-shadow-[0_0_10px_rgba(249,155,12,0.3)]">
            Spicy
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-14 text-[#d9d9d9] font-medium text-[14px] tracking-wide">
          <li 
            onClick={() => scrollToSection('home')} 
            className={`cursor-pointer transition-all duration-200 ${activeSection === 'home' ? 'text-[#F99B0C] drop-shadow-[0_0_8px_rgba(249,155,12,0.6)]' : 'hover:text-[#F99B0C]'}`}
          >
            Home
          </li>
          <li 
            onClick={() => scrollToSection('about')} 
            className={`cursor-pointer transition-all duration-200 ${activeSection === 'about' ? 'text-[#F99B0C] drop-shadow-[0_0_8px_rgba(249,155,12,0.6)]' : 'hover:text-[#F99B0C]'}`}
          >
            About
          </li>
          <li 
            onClick={() => scrollToSection('why-us')} 
            className={`cursor-pointer transition-all duration-200 ${activeSection === 'why-us' ? 'text-[#F99B0C] drop-shadow-[0_0_8px_rgba(249,155,12,0.6)]' : 'hover:text-[#F99B0C]'}`}
          >
            Why Us
          </li>
        </ul>

        <div className="flex items-center gap-6 relative">
          <button 
            onClick={() => { setShowSearch(!showSearch); setShowNotifications(false); }}
            className={`transition-all duration-200 focus:outline-none ${showSearch ? 'text-[#F99B0C]' : 'text-white/80 hover:text-[#F99B0C]'}`}
          >
            <Search size={20} strokeWidth={2.2} />
          </button>
          
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowSearch(false); }}
            className={`relative transition-all duration-200 focus:outline-none ${showNotifications ? 'text-[#F99B0C]' : 'text-white/80 hover:text-[#F99B0C]'}`}
          >
            <Bell size={20} strokeWidth={2.2} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F99B0C] rounded-full animate-pulse" />
          </button>

          <button onClick={() => onNavigate('login')} className="bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-semibold px-7 py-2.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(249,155,12,0.4)] hover:shadow-[0_0_22px_rgba(249,155,12,0.6)] transition-all duration-200 active:scale-95 focus:outline-none">
            <span className="tracking-wide text-sm">Login</span> 
            <LogIn size={16} strokeWidth={2.5} />
          </button>

          {showNotifications && (
            <div className="absolute right-36 top-14 w-80 bg-[#111111] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Notifications</span>
                <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-white"><X size={14} /></button>
              </div>
              <div className="flex flex-col space-y-2 max-h-60 overflow-y-auto">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <p className="text-xs font-semibold text-[#F99B0C]">Welcome to Spicy!</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Explore menus and setup your portal accounts today.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {showSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-32 px-6">
          <div className="w-full max-w-2xl bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400 w-full">
                <Search size={20} className="text-[#F99B0C]" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search for dishes, restaurants, cuisines..." 
                  className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none text-base pl-1"
                />
              </div>
              <button 
                onClick={() => setShowSearch(false)} 
                className="bg-white/5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all ml-4"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;