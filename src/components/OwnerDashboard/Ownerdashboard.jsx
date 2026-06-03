import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Overview from './Overview';
import Menu from './Menu';

const OwnerDashboard = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('menu'); // Set to 'menu' to test directly

  return (
    <div className="w-full min-h-screen bg-cover bg-center text-white flex select-none font-sans relative" style={{ backgroundImage: `url(/src/assets/bg.jpg)` }}>
      <div className="absolute inset-0 bg-black/95 pointer-events-none" />

      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onNavigate={onNavigate} 
      />

      <div className="flex-1 flex flex-col min-h-screen ml-64 relative z-10">
        <TopBar />

        <main className="flex-1 mt-20 overflow-y-auto">
          {activeSection === 'overview' && <Overview />}
          {activeSection === 'menu' && <Menu />}
          
          {activeSection !== 'overview' && activeSection !== 'menu' && (
            <div className="animate-in fade-in duration-200 text-center py-20 text-gray-500 text-sm">
              Section "{activeSection}" content subcomponent wireframe setup ready.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;