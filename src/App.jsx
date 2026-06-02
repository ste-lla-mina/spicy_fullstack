import React, { useState } from 'react';
import Navbar from './components/Navbar'; 
import Hero from './components/Hero';
import About from './components/About';
import WhyUs from './components/WhyUs';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

function App() {
  const [view, setView] = useState('landing'); 

  if (view === 'signup') {
    return <SignUp />;
  }

  return (
    <div className="w-full min-h-screen bg-[#1e1e1e] text-white overflow-x-hidden">
      <Navbar onNavigate={setView} />
      <Hero onNavigate={setView} />
      <About />
      <WhyUs />
      <Footer />
    </div>
  );
}

export default App;