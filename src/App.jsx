import React from 'react';
import Navbar from './components/Navbar'; 
import Hero from './components/Hero';
import About from './components/About';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#1e1e1e] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}

export default App;