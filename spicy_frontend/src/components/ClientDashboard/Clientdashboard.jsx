import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import TopBar from './TopBar';  
import Menu from './Menu'; 
import Orders from './Orders';


const ClientDashboard = ({ onLogout, credentials }) => {
  const [activeSection, setActiveSection] = useState('menu');

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center text-white flex select-none font-sans relative" 
      style={{ backgroundImage: `url(/src/assets/bg.png)` }}
    >
      <div className="absolute inset-0  pointer-events-none" />

      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={onLogout} 
      />

      <div className="flex-1 flex flex-col min-h-screen ml-64 relative z-10">
        <TopBar credentials={credentials} />

        <main className="flex-1 mt-20 p-10 overflow-y-auto">
        {activeSection === 'menu' && (
       <Menu onAddToOrder={(item) => console.log("Selected to checkout:", item)} />
      )}
        {activeSection === 'orders' && <Orders />}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;