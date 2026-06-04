import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import TopBar from './TopBar';   


const ClientDashboard = ({ onLogout, credentials }) => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center text-white flex select-none font-sans relative" 
      style={{ backgroundImage: `url(/src/assets/bg.jpg)` }}
    >
      <div className="absolute inset-0 bg-black/95 pointer-events-none" />

      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={onLogout} 
      />

      <div className="flex-1 flex flex-col min-h-screen ml-64 relative z-10">
        <TopBar credentials={credentials} />

        <main className="flex-1 mt-20 p-10 overflow-y-auto">
          {activeSection === 'overview' && (
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-gray-400 text-sm">Explore meals and manage your orders instantly.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;