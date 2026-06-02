import React from 'react';
import backgImage from '../../assets/backg.png';

const Hero = ({ onNavigate }) => {
  return (
    <div 
     id="home" className="relative min-h-screen w-full flex items-center px-20 pt-16 pb-20 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${backgImage})` }}
    >
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        <div className="lg:col-span-6 flex flex-col items-start space-y-7 pl-4">
          <div className="bg-[#F99B0C] text-white font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-sm shadow-[0_4px_12px_rgba(249,155,12,0.25)]">
            One Spot
          </div>

          <h1 className="text-[#F99B0C] font-sans text-2xl md:text-[20px] font-bold tracking-wide leading-[1.15]">
            All You Need To Dine Smarter.
          </h1>

          <div className="space-y-1.5">
            <h2 className="text-white text-[22px] font-bold tracking-wide">
              Register restaurant on Spicy
            </h2>
            <p className="text-gray-300/90 text-base font-medium">
              and earn more revenue.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold px-9 py-3 rounded-full shadow-[0_6px_20px_rgba(249,155,12,0.35)] transition-all duration-200 active:scale-95 text-sm tracking-wide"
            >
              Register.
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="bg-transparent hover:bg-white/5 text-white font-semibold px-9 py-3 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-200 active:scale-95 text-sm tracking-wide"
            >
              Sign In.
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative w-full h-[600px] flex items-center justify-end pr-4">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/10 overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-20">
            <img 
              src="/src/assets/burger.jpg" 
              alt="Delicious Burger" 
              className="w-full h-full object-cover scale-105"
            />
          </div>

          <div className="absolute right-[10px] top-[100px] w-[100px] h-[100px] rounded-full border border-white/10 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-30">
            <img 
              src="/src/assets/sala.jpg" 
              alt="Healthy Bowl" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute right-[240px] bottom-[100px] w-[110px] h-[110px] rounded-full border border-white/10 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-30">
            <img 
              src="/src/assets/sa.jpg" 
              alt="Fresh Salad" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-10 z-20 bg-black/10 backdrop-blur-sm px-8 py-3 rounded-full border border-white/5 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden shadow-md hover:scale-105 transition-transform duration-200">
            <img src="/src/assets/pasta.jpg" alt="Pasta" className="w-full h-full object-cover" />
          </div>
          <div className="w-2 h-2 rounded-full bg-[#F99B0C] shadow-[0_0_8px_#F99B0C]" />
          <div className="w-2 h-2 rounded-full bg-[#F99B0C]/30" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-full border border-white/30 overflow-hidden shadow-md scale-110 ring-2 ring-[#F99B0C]/30 hover:scale-115 transition-transform duration-200">
            <img src="/src/assets/pizza.jpg" alt="Pizza" className="w-full h-full object-cover" />
          </div>
          <div className="w-2 h-2 rounded-full bg-[#F99B0C] shadow-[0_0_8px_#F99B0C]" />
          <div className="w-2 h-2 rounded-full bg-[#F99B0C]/30" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden shadow-md hover:scale-105 transition-transform duration-200">
            <img src="/src/assets/samosa.jpg" alt="Dessert" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;