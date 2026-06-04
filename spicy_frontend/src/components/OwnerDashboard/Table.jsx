import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, HelpCircle } from 'lucide-react';

const Tables = () => {
  const [filter, setFilter] = useState('All');
  const [tablesList, setTablesList] = useState([
    { tableNo: '8', status: 'Occupied', client: 'John Tee', orderNo: '0098', orderStatus: 'Served' },
    { tableNo: '24', status: 'Occupied', client: 'Ella Iriza', orderNo: '0100', orderStatus: 'Served' },
    { tableNo: '18', status: 'Free', client: 'None', orderNo: '—', orderStatus: '—' },
    { tableNo: '3', status: 'Occupied', client: 'Anna Keza', orderNo: '0109', orderStatus: 'Pending' },
    { tableNo: '7', status: 'Free', client: 'None', orderNo: '—', orderStatus: '—' },
    { tableNo: '5', status: 'Free', client: 'None', orderNo: '—', orderStatus: '—' },
  ]);

  const toggleTableStatus = (tableNo) => {
    setTablesList(tablesList.map(table => {
      if (table.tableNo === tableNo) {
        if (table.status === 'Occupied') {
          return { ...table, status: 'Free', client: 'None', orderNo: '—', orderStatus: '—' };
        } else {
          return { ...table, status: 'Occupied', client: 'Walk-in Guest', orderNo: String(Math.floor(Math.random() * 9000) + 1000), orderStatus: 'Pending' };
        }
      }
      return table;
    }));
  };

  const filteredTables = tablesList.filter(table => {
    if (filter === 'All') return true;
    return table.status === filter;
  });

  return (
    <div className="w-full p-8 font-sans select-none box-border space-y-4" style={{ backgroundImage: `url(/src/assets/bg.png)` }}>
      <div className="flex items-center justify-between">
        <h1 className="text-[#F99B0C] text-xl font-bold tracking-wide">Tables</h1>
        
        <div className="relative inline-block text-left">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-extrabold pl-5 pr-10 py-2 rounded-xl text-xs tracking-wide shadow-lg shadow-[#F99B0C]/10 transition-all cursor-pointer focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Occupied">Occupied</option>
            <option value="Free">Free</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white">
            <ChevronDown size={14} strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="bg-[#050505]/90 border border-white/5 rounded-2xl p-6 shadow-lg min-h-[calc(100vh-14rem)]">
        <div className="grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider pb-4 px-6 border-b border-white/5">
          <div className="col-span-2 text-left">Table No</div>
          <div className="col-span-2 text-left">Status</div>
          <div className="col-span-3 text-left">Client</div>
          <div className="col-span-1 text-center">Order No</div>
          <div className="col-span-2 text-center">Order Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredTables.map((table, index) => (
            <div 
              key={index} 
              className="grid grid-cols-12 items-center bg-black/40 border border-white/5 hover:border-white/10 rounded-2xl py-4 px-6 text-sm font-semibold text-white transition-all"
            >
              <div className="col-span-2 text-left pl-3 font-extrabold text-white">
                {table.tableNo}
              </div>

              <div className="col-span-2 text-left">
                <span className={`text-xs font-black uppercase ${
                  table.status === 'Occupied' ? 'text-[#F99B0C]' : 'text-amber-600'
                }`}>
                  {table.status}
                </span>
              </div>

              <div className="col-span-3 text-left font-bold tracking-wide text-gray-200">
                {table.client}
              </div>

              <div className="col-span-1 text-center text-gray-400 font-mono text-xs">
                {table.orderNo}
              </div>

              <div className="col-span-2 text-center">
                <span className={`text-xs font-black uppercase ${
                  table.orderStatus === 'Served' ? 'text-[#F99B0C]' : table.orderStatus === 'Pending' ? 'text-amber-500' : 'text-gray-600'
                }`}>
                  {table.orderStatus}
                </span>
              </div>

              <div className="col-span-2 flex items-center justify-end">
                <button
                  onClick={() => toggleTableStatus(table.tableNo)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black tracking-wide uppercase transition-all shadow-md ${
                    table.status === 'Occupied'
                      ? 'bg-[#F99B0C] hover:bg-[#e08b0b] text-white shadow-[#F99B0C]/5'
                      : 'bg-transparent border border-[#F99B0C] text-[#F99B0C] hover:bg-[#F99B0C]/5'
                  }`}
                >
                  {table.status === 'Occupied' ? (
                    <>
                      <CheckCircle2 size={13} strokeWidth={2.5} />
                      Mark Free
                    </>
                  ) : (
                    <>
                      <HelpCircle size={13} strokeWidth={2.5} />
                      Occupied
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          {filteredTables.length === 0 && (
            <div className="text-center py-20 text-gray-600 text-xs font-bold uppercase tracking-widest">
              No matching tables found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tables;