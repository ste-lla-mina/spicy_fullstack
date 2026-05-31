import React from 'react';
import Navbar from './components/Navbar'; 
import bgImage from './assets/bg.png';    

function App() {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-32 px-12 text-white">
        </div>
      </div>
    </div>
  );
}

export default App;