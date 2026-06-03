import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import fryingBg from '../../assets/frying.jpg';

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <footer 
      className="relative w-full py-12 px-6 md:px-20 bg-cover bg-center bg-no-repeat overflow-hidden border-t border-white/5 select-none"
      style={{ backgroundImage: `url(${fryingBg})` }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[6px] pointer-events-none" />

      <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center z-10 text-white">
        
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[#F99B0C] text-3xl font-black font-sans tracking-wide flex items-center gap-1">
             Spicy
            </span>
          </div>
          <p className="text-gray-300 text-sm font-medium tracking-wide md:pl-1">
            Dine Smarter!
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start space-y-4 text-gray-200 font-medium text-sm">
          <div className="flex items-center gap-3.5 group">
            <MapPin size={18} className="text-[#F99B0C] shrink-0" />
            <span className="tracking-wide">KK405 street</span>
          </div>
          
          <div className="flex items-center gap-3.5 group">
            <Mail size={18} className="text-[#F99B0C] shrink-0" />
            <span className="tracking-wide">supamenu.ac.rw</span>
          </div>
          
          <div className="flex items-center gap-3.5 group">
            <Phone size={18} className="text-[#F99B0C] shrink-0" />
            <span className="tracking-wide">+250 788 123 345</span>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end w-full">
          <form onSubmit={handleSubscribe} className="flex flex-col items-center md:items-end w-full max-w-sm space-y-3.5">
            <label className="text-[#F99B0C] font-bold text-base tracking-wide text-center md:text-right w-full">
              Subscribe to our NewsLetter.
            </label>
            
            <div className="w-full relative">
              <input 
                type="email" 
                required
                placeholder="Enter your email address" 
                className="w-full bg-black/40 border border-white/10 rounded-full py-3 px-6 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#F99B0C]/50 focus:ring-1 focus:ring-[#F99B0C]/30 backdrop-blur-md transition-all tracking-wide"
              />
            </div>

            <button 
              type="submit" 
              className="bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold px-10 py-2.5 rounded-full shadow-[0_4px_15px_rgba(249,155,12,0.3)] transition-all duration-200 active:scale-95 text-sm tracking-wide w-full md:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;