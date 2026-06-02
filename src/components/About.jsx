import React from 'react';
import { UserPlus, UtensilsCrossed, ClipboardCheck } from 'lucide-react';
import bgImage from '../assets/bg.png';
import fryingBg from '../assets/frying.jpg';

const About = () => {
  return (
    <div id="about" className="w-full text-white select-none bg-[#1e1e1e]">
      <div 
        className="relative w-full h-[550px] flex items-center px-20 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${fryingBg})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          <div className="lg:col-span-6 flex flex-col space-y-5 pl-4">
            <h2 className="text-white font-sans text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Work Smarter with <span className="text-[#F99B0C] drop-shadow-[0_0_15px_rgba(249,155,12,0.3)]">Spicy!</span>
            </h2>
            <p className="text-gray-300 text-lg font-medium max-w-lg leading-relaxed">
              We do make sure that everyone is included and served.
            </p>
          </div>

          <div className="lg:col-span-6 relative w-full h-[400px] flex items-center justify-end pr-4">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[440px] h-[330px] rounded-[24px] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-20 bg-neutral-950">
              <img 
                src="/src/assets/spicy.jpg" 
                alt="Wok tossing food" 
                className="w-full h-full object-cover scale-105"
              />
            </div>

            <div className="absolute right-[350px] top-[15px] w-[135px] h-[115px] rounded-[18px] border border-white/15 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30 bg-neutral-950">
              <img 
                src="/src/assets/fry.jpg" 
                alt="Chef cooking with fire" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute right-[350px] bottom-[15px] w-[135px] h-[115px] rounded-[18px] border border-white/15 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30 bg-neutral-950">
              <img 
                src="/src/assets/beef.jpg" 
                alt="Grilling meat skewers" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div 
        className="relative w-full pt-20 pb-28 px-20 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat border-t border-white/5"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 pointer-events-none" />

        <div className="relative w-full max-w-[1250px] mx-auto flex flex-col items-center z-10">
          <h2 className="text-white font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-16 relative">
            How It Works.
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#F99B0C] rounded-full" />
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="bg-[#161616]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-10 flex flex-col items-center text-center space-y-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#F99B0C]/20 hover:shadow-[0_20px_40px_rgba(249,155,12,0.05)] transition-all duration-300 group">
              <div className="text-[#F99B0C] bg-[#F99B0C]/5 p-4 rounded-xl group-hover:scale-110 group-hover:bg-[#F99B0C]/10 transition-all duration-300 shadow-inner">
                <UserPlus size={32} strokeWidth={2.2} />
              </div>
              <div className="space-y-2">
                <h3 className="text-white text-xl font-bold tracking-wide">Step 1</h3>
                <p className="text-gray-400 text-sm font-medium px-2 leading-relaxed">
                  Register the restaurant.
                </p>
              </div>
            </div>

            <div className="bg-[#161616]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-10 flex flex-col items-center text-center space-y-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#F99B0C]/20 hover:shadow-[0_20px_40px_rgba(249,155,12,0.05)] transition-all duration-300 group">
              <div className="text-[#F99B0C] bg-[#F99B0C]/5 p-4 rounded-xl group-hover:scale-110 group-hover:bg-[#F99B0C]/10 transition-all duration-300 shadow-inner">
                <UtensilsCrossed size={32} strokeWidth={2.2} />
              </div>
              <div className="space-y-2">
                <h3 className="text-white text-xl font-bold tracking-wide">Step 2</h3>
                <p className="text-gray-400 text-sm font-medium px-2 leading-relaxed">
                  Add the menu.
                </p>
              </div>
            </div>

            <div className="bg-[#161616]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-10 flex flex-col items-center text-center space-y-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#F99B0C]/20 hover:shadow-[0_20px_40px_rgba(249,155,12,0.05)] transition-all duration-300 group">
              <div className="text-[#F99B0C] bg-[#F99B0C]/5 p-4 rounded-xl group-hover:scale-110 group-hover:bg-[#F99B0C]/10 transition-all duration-300 shadow-inner">
                <ClipboardCheck size={32} strokeWidth={2.2} />
              </div>
              <div className="space-y-2">
                <h3 className="text-white text-xl font-bold tracking-wide">Step 3</h3>
                <p className="text-gray-400 text-sm font-medium px-2 leading-relaxed">
                  Start receiving orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;