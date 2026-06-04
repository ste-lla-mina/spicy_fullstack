import React, { useState } from 'react';
import { Save, Sliders, ShieldCheck, Store } from 'lucide-react';

const Settings = () => {
  const [restaurantName, setRestaurantName] = useState('Spicy');
  const [currency, setCurrency] = useState('USD ($)');
  const [taxRate, setTaxRate] = useState('18');
  const [allowOrderCancel, setAllowOrderCancel] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('Settings configurations updated successfully!');
  };

  return (
    <div className="w-full p-8 font-sans select-none box-border space-y-6 py-20" style={{ backgroundImage: `url(/src/assets/bg.png)` }}>
      <div className="flex items-center justify-between">
        <h1 className="text-[#F99B0C] text-xl font-bold tracking-wide">Settings</h1>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        <form onSubmit={handleSaveSettings} className="col-span-8 bg-[#050505]/90 border border-white/5 rounded-2xl p-6 shadow-lg space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#F99B0C] pb-2 border-b border-white/5">
              <Store size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">Restaurant Information</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Restaurant Name</label>
                <input 
                  type="text" 
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F99B0C] transition-all" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">System Currency</label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F99B0C] transition-all"
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="RWF (FRW)">RWF (FRW)</option>
                  <option value="EUR (€)">EUR (€)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-[#F99B0C] pb-2 border-b border-white/5">
              <Sliders size={16} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">Operational Configurations</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Default Tax Rate (%)</label>
                <input 
                  type="number" 
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F99B0C] transition-all" 
                />
              </div>
              <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl px-4 h-[38px] mt-5">
                <span className="text-xs font-semibold text-gray-300">Allow Pending Order Cancellations</span>
                <input 
                  type="checkbox" 
                  checked={allowOrderCancel}
                  onChange={(e) => setAllowOrderCancel(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#F99B0C] focus:ring-[#F99B0C] accent-[#F99B0C] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold px-6 py-2.5 rounded-xl text-xs tracking-wide shadow-lg shadow-[#F99B0C]/10 transition-all"
            >
              <Save size={14} strokeWidth={2.5} />
              Save Configuration Updates
            </button>
          </div>
        </form>

        <div className="col-span-4 bg-[#050505]/90 border border-white/5 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-[#F99B0C] pb-2 border-b border-white/5">
            <ShieldCheck size={16} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">Access Scope</h2>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-white">Role: <span className="text-[#F99B0C]">Store Owner</span></div>
            <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
              Your system administrative account grants root configuration authority, allowing full modification of global rates, system inventory catalogs, and tracking metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;