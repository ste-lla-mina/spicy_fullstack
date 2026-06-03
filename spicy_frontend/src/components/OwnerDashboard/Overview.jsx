import React from 'react';
import { MoreVertical } from 'lucide-react';
import shawarmaImg from '../../assets/shawarma.jpg';
import friesImg from '../../assets/fries.jpg';

const Overview = () => {
  const stats = [
    { label: 'Menu', value: '346' },
    { label: 'Clients', value: '221' },
    { label: 'Revenue', value: '$ 951' },
    { label: 'Tables Taken', value: '48' }
  ];

  const clients = [
    { name: 'Nobleza Hotel', orders: '56 orders last week' },
    { name: 'Capcino Burgers', orders: '48 orders last week' },
    { name: 'Drimm Bakery', orders: '39 orders last week' }
  ];

  const menuItems = [
    { name: 'Shawarma', image: shawarmaImg },
    { name: 'Cheese Fries', image: friesImg }
  ];

  return (
    <div className="w-full min-h-screen bg-cover bg-center p-8 font-sans select-none relative" style={{ backgroundImage: `url(/src/assets/bg.png)` }}>
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-8">
        <div>
          <h1 className="text-[#F99B0C] text-2xl font-bold tracking-wide">Overview</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-black/60 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 backdrop-blur-sm">
              <span className="text-xs font-bold text-white tracking-wide">{stat.label}</span>
              <span className="text-[#F99B0C] text-xl font-black">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 bg-black/60 border border-white/10 rounded-3xl p-8 flex flex-col justify-between backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-white tracking-wide">Sales Statistics</h2>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F99B0C]" />
                <span className="text-xs font-bold text-white">Food</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white" />
                <span className="text-xs font-bold text-white">Drinks</span>
              </div>
            </div>

            <div className="flex justify-center my-auto py-4">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white"
                    strokeWidth="4.5"
                    stroke="currentColor"
                    fill="transparent"
                    strokeDasharray="100 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#F99B0C]"
                    strokeWidth="4.5"
                    strokeDasharray="75 100"
                    strokeLinecap="square"
                    stroke="currentColor"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 bg-[#070707] rounded-full m-[22px]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white text-center py-3 rounded-full font-bold text-xs text-[#F99B0C]">
                Food: 75%
              </div>
              <div className="bg-[#F99B0C] text-center py-3 rounded-full font-bold text-xs text-white">
                Drinks: 25%
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-black/60 border border-white/10 rounded-3xl p-8 flex flex-col backdrop-blur-sm">
            <h2 className="text-sm font-bold text-white tracking-wide text-center mb-8">Top Clients</h2>
            <div className="flex flex-col space-y-4 my-auto w-full">
              {clients.map((client, i) => (
                <div key={i} className="border border-white/10 bg-transparent rounded-2xl p-4 flex flex-col justify-center space-y-1">
                  <span className="text-xs font-bold text-white">{client.name}</span>
                  <span className="text-[10px] font-bold text-[#F99B0C]">{client.orders}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-black/60 border border-white/10 rounded-3xl p-8 flex flex-col backdrop-blur-sm">
            <h2 className="text-sm font-bold text-white tracking-wide text-center mb-6">Top on the Menu</h2>
            <div className="flex flex-col space-y-4 my-auto w-full">
              {menuItems.map((item, i) => (
                <div key={i} className="border border-white/10 bg-transparent rounded-2xl p-3 flex flex-col items-center space-y-3">
                  <div className="w-full h-24 rounded-xl overflow-hidden border border-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-[#F99B0C] tracking-wide">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;