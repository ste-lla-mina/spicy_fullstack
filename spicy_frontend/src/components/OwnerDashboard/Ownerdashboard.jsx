import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Overview from './Overview';
import Menu from './Menu';
import Orders from './Order';
import Clients from './Clients';
import Tables from './Table';
import Settings from './Settings';

const OwnerDashboard = ({ onLogout, credentials }) => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="w-full min-h-screen bg-cover bg-center text-white flex select-none font-sans relative" style={{ backgroundImage: `url(/src/assets/bg.jpg)` }}>
      <div className="absolute inset-0 bg-black/95 pointer-events-none" />

      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={onLogout} 
      />

      <div className="flex-1 flex flex-col min-h-screen ml-64 relative z-10">
        <TopBar credentials={credentials} />

        <main className="flex-1 mt-20 overflow-y-auto">
          {activeSection === 'overview' && <Overview />}
          {activeSection === 'menu' && <Menu />}
          {activeSection === 'orders' && <Orders />}
          {activeSection === 'clients' && <Clients />}
          {activeSection === 'tables' && <Tables />}
          {activeSection === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;