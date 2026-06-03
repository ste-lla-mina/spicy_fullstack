import React, { useState, useEffect } from 'react';
import bgImage from '../../assets/bg.png';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "I have been working with Spicy for two years and from then since now my company has became more huge, with new innovations and customer satisfactions.",
    name: "Sarah Jenkins",
    role: "Restaurant Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    quote: "Integrating our kitchen workflow with their system cut down order processing times by nearly half. Our customers noticed the speed upgrade instantly.",
    name: "Marcus Chen",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    quote: "The revenue growth was noticeable within the first 30 days. The platform streamlines everything so we can focus strictly on crafting great food.",
    name: "Elena Rostova",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const WhyUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleTimeoutTransition();
    }, 3000); 

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleTimeoutTransition = () => {
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
      setIsFading(false);
    }, 2000); 
  };

  const handleProfileClick = (index) => {
    if (index === activeIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsFading(false);
    }, 300);
  };

  return (
    <div 
     id="why-us" className="relative w-full py-24 px-20 flex items-center justify-center bg-cover bg-center bg-no-repeat border-t border-white/5 select-none overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0  pointer-events-none" />

      <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10 px-4">
        
        <div className="lg:col-span-6 relative w-full h-[450px] flex items-center justify-start">
          <div className="absolute left-4 top-6 w-[320px] h-[320px] rounded-full overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500" 
              alt="Plated Pasta Dish" 
              className="w-full h-full object-cover grayscale-[15%] brightness-90"
            />
          </div>

          <div className="absolute left-[160px] bottom-6 w-[280px] h-[280px] rounded-full overflow-hidden border-2 border-[#1e1e1e] shadow-[0_30px_70px_rgba(0,0,0,0.8)] z-20">
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500" 
              alt="Grilled Skewers and BBQ" 
              className="w-full h-full object-cover scale-105"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 pr-4">
          
          <div className="space-y-2">
            <h2 className="text-[#F99B0C] font-sans text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(249,155,12,0.15)]">
              Let's See What Others Say.
            </h2>
          </div>

          <div className="relative min-h-[160px] flex flex-col justify-start">
            <span className="text-white text-6xl font-serif leading-none h-6 opacity-40 select-none">“</span>
            
            <p className={`text-gray-200 text-lg font-medium leading-relaxed pl-4 pt-2 transition-all duration-500 transform ${
              isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
            }`}>
              {TESTIMONIALS[activeIndex].quote}
            </p>
            
            <span className="text-white text-6xl font-serif leading-none h-2 text-right opacity-40 select-none mt-2">”</span>
          </div>

          <div className="flex items-center gap-6 pl-4 pt-4">
            {TESTIMONIALS.map((person, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={person.id}
                  onClick={() => handleProfileClick(index)}
                  className="relative focus:outline-none group transition-all duration-300"
                >
                  <div className={`absolute -inset-1.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'border-2 border-[#F99B0C] scale-105 shadow-[0_0_15px_rgba(249,155,12,0.4)] opacity-100' 
                      : 'border border-white/10 scale-100 opacity-60 group-hover:opacity-100 group-hover:border-white/30'
                  }`} />
                  
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-neutral-800 shadow-md">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
            <div className={`flex flex-col pl-2 transition-all duration-300 ${
              isFading ? 'opacity-30' : 'opacity-100'
            }`}>
              <span className="text-white font-bold text-base tracking-wide">
                {TESTIMONIALS[activeIndex].name}
              </span>
              <span className="text-gray-400 text-xs font-semibold">
                {TESTIMONIALS[activeIndex].role}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WhyUs;