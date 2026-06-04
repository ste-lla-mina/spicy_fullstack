import React, { useState } from 'react';
import { CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';

const Tables = () => {
  // Exact data mapping from image_da4efa.png
  const [tables, setTables] = useState([
    { id: '8', status: 'Occupied', client: 'John Tee', orderNo: '0098', orderStatus: 'Served' },
    { id: '24', status: 'Occupied', client: 'Ella Iriza', orderNo: '0100', orderStatus: 'Served' },
    { id: '18', status: 'Free', client: 'None', orderNo: '—', orderStatus: '—' },
    { id: '3', status: 'Occupied', client: 'Anna Keza', orderNo: '0109', orderStatus: 'Pending' }
  ]);

  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAction = (id) => {
    setTables(prev => prev.map(table => {
      if (table.id === id) {
        if (table.status === 'Occupied') {
          return { ...table, status: 'Free', client: 'None', orderNo: '—', orderStatus: '—' };
        } else {
          return { ...table, status: 'Occupied', client: 'New Client', orderNo: '0110', orderStatus: 'Pending' };
        }
      }
      return table;
    }));
  };

  const filteredTables = tables.filter(t => filter === 'All' || t.status === filter);

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center text-white p-8 relative font-sans select-none"
      style={{ backgroundImage: `url('/src/assets/bg.png')` }}
    >
      {/* Background Masking Layer */}
      <div className="absolute inset-0 bg-black/95 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        
        {/* Header Block with Custom "All" Dropdown Selector */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-wide text-[#FF9F0D]">Tables</h2>
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#FF9F0D] text-black font-extrabold text-sm px-5 py-2 rounded-xl flex items-center gap-4 transition-all hover:bg-[#e08b0b]"
            >
              <span>{filter}</span>
              {isDropdownOpen ? <ChevronUp className="w-4 h-4 stroke-[3]" /> : <ChevronDown className="w-4 h-4 stroke-[3]" />}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-50">
                {['All', 'Occupied', 'Free'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFilter(opt);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Outer Database Container Box */}
        <div className="w-full bg-black/40 border border-zinc-900/60 rounded-2xl p-6 backdrop-blur-md">
          
          {/* Table Headers */}
          <div className="grid grid-cols-6 text-zinc-200 font-bold text-sm px-6 pb-4 border-b border-zinc-900/20">
            <div>Table No</div>
            <div>Status</div>
            <div>Client</div>
            <div>Order No</div>
            <div>Order Status</div>
            <div className="text-right pr-4">Actions</div>
          </div>

          {/* Table Rows Wrapper Stack */}
          <div className="mt-4 space-y-3">
            {filteredTables.map((table) => (
              <div 
                key={table.id}
                className="grid grid-cols-6 items-center bg-[#070708]/90 border border-zinc-900/80 rounded-2xl p-5 px-6 transition-all hover:border-zinc-800"
              >
                {/* Table Number */}
                <div className="font-extrabold text-base text-zinc-100">
                  {table.id}
                </div>

                {/* Status Column */}
                <div className="font-bold text-sm text-[#FF9F0D]">
                  {table.status}
                </div>

                {/* Client Identifiers */}
                <div className="font-bold text-sm text-zinc-300">
                  {table.client}
                </div>

                {/* Order Number String */}
                <div className="font-bold text-sm text-zinc-100 font-mono">
                  {table.orderNo}
                </div>

                {/* Order Status Node */}
                <div className="font-bold text-sm">
                  {table.orderStatus !== '—' ? (
                    <span className="text-[#FF9F0D]">{table.orderStatus}</span>
                  ) : (
                    <span className="text-[#FF9F0D]/60">—</span>
                  )}
                </div>

                {/* Interactive Dynamic Action Modifier Buttons */}
                <div className="text-right">
                  <button
                    onClick={() => handleAction(table.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF9F0D] text-black font-extrabold text-xs uppercase tracking-wide rounded-xl shadow-md transition-all hover:bg-[#e08b0b] active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{table.status === 'Occupied' ? 'Mark Free' : 'Occupied'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Tables;