import React, { useState } from 'react';
import Navbar from './components/Landing/Navbar'; 
import Hero from './components/Landing/Hero';
import About from './components/Landing/About';
import WhyUs from './components/Landing/WhyUs';
import Footer from './components/Landing/Footer';
import SignUp from './components/Landing/SignUp';
import Login from './components/Landing/Login';

function App() {
  const [view, setView] = useState('landing'); 

  if (view === 'signup') {
    return <SignUp onNavigate={setView} />;
  }

  if (view === 'login') {
    return <Login onNavigate={setView} />;
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