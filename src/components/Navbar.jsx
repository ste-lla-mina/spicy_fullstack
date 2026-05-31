import React from 'react';
import { Search, Bell, LogIn } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[1400px] z-50 px-8 py-3 flex items-center justify-between rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(249,155,12,0.15)]">
      
      <div className="flex items-center cursor-pointer select-none">
        <img 
          src={logo} 
          alt="Spicy Logo" 
          className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(249,155,12,0.4)]" 
        />
         <span className="text-[#F99B0C] ml-2 font-bold text-2xl tracking-wide font-sans drop-shadow-[0_0_10px_rgba(249,155,12,0.3)]">
           Spicy
        </span>
      </div>

      <ul className="hidden md:flex items-center gap-14 text-[#d9d9d9] font-medium text-base tracking-wide">
        <li className="cursor-pointer hover:text-[#F99B0C] hover:drop-shadow-[0_0_8px_rgba(249,155,12,0.6)] transition-all duration-200">Home</li>
        <li className="cursor-pointer hover:text-[#F99B0C] hover:drop-shadow-[0_0_8px_rgba(249,155,12,0.6)] transition-all duration-200">About</li>
        <li className="cursor-pointer hover:text-[#F99B0C] hover:drop-shadow-[0_0_8px_rgba(249,155,12,0.6)] transition-all duration-200">Why Us</li>
      </ul>

      <div className="flex items-center gap-6">
        <button className="text-white/80 hover:text-[#F99B0C] hover:drop-shadow-[0_0_6px_rgba(249,155,12,0.5)] transition-all duration-200 focus:outline-none">
          <Search size={20} strokeWidth={2.2} />
        </button>
        
        <button className="text-white/80 hover:text-[#F99B0C] hover:drop-shadow-[0_0_6px_rgba(249,155,12,0.5)] transition-all duration-200 relative focus:outline-none">
          <Bell size={20} strokeWidth={2.2} />
        </button>

        <button className="bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-semibold px-7 py-2.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(249,155,12,0.4)] hover:shadow-[0_0_22px_rgba(249,155,12,0.6)] transition-all duration-200 active:scale-95 focus:outline-none">
          <span className="tracking-wide text-sm">Login</span> 
          <LogIn size={16} strokeWidth={2.5} />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;