
import React, { useState } from 'react';
import { Plus, Pencil, Trash2,CircleCheck } from 'lucide-react';

const Clients = () => {
  const [clientsList, setClientsList] = useState([
    { name: 'John Tee Kalisa', tableNo: '8', orderNo: '0098', status: 'Served' },
    { name: 'Musonera Tom Doe', tableNo: '12', orderNo: '0101', status: 'Pending' },
    { name: 'Anna Keza', tableNo: '3', orderNo: '0109', status: 'Pending' },
    { name: 'Iriza Shami Ella', tableNo: '24', orderNo: '0100', status: 'Served' },
    {name:'Shema Elvis' , tableNo:'11',orderNo:'0111' ,status:'Pending'},
    {name: 'Gihozo Ange', tableNo:'20', orderNo:'0104' ,status:'Pending'},
  ]);

  const [editingOrderNo, setEditingOrderNo] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTable, setEditTable] = useState('');

  const handleDeleteClient = (orderNoToDelete) => {
    setClientsList(clientsList.filter(client => client.orderNo !== orderNoToDelete));
  };

  const handleServeClient = (orderNoToServe) => {
    setClientsList(clientsList.map(client => 
      client.orderNo === orderNoToServe ? { ...client, status: 'Served' } : client
    ));
  };

  const startEdit = (client) => {
    setEditingOrderNo(client.orderNo);
    setEditName(client.name);
    setEditTable(client.tableNo);
  };

  const saveEdit = (orderNo) => {
    setClientsList(clientsList.map(client => 
      client.orderNo === orderNo ? { ...client, name: editName, tableNo: editTable } : client
    ));
    setEditingOrderNo(null);
  };

  return (
    <div className="w-full p-8 font-sans select-none box-border space-y-4" style={{ backgroundImage: `url(/src/assets/bg.png)` }}>
      <div className="flex items-center justify-between">
        <h1 className="text-[#F99B0C] text-xl font-bold tracking-wide">Clients</h1>
      </div>

      <div className="bg-[#050505]/90 border border-white/5 rounded-2xl p-6 shadow-lg min-h-[calc(100vh-14rem)]" >
        <div className="grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider pb-4 px-6 border-b border-white/5">
          <div className="col-span-4">Client Name</div>
          <div className="col-span-2 text-center">Table No</div>
          <div className="col-span-2 text-center">Order No</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="mt-4 space-y-3">
          {clientsList.map((client, index) => (
            <div 
              key={index} 
              className="grid grid-cols-12 items-center bg-black/40 border border-white/5 hover:border-white/10 rounded-2xl py-4 px-6 text-sm font-semibold text-white transition-all"
            >
              <div className="col-span-4 font-bold tracking-wide">
                {editingOrderNo === client.orderNo ? (
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#F99B0C]"
                  />
                ) : (
                  client.name
                )}
              </div>

              <div className="col-span-2 text-center text-gray-300 font-extrabold">
                {editingOrderNo === client.orderNo ? (
                  <input 
                    type="text" 
                    value={editTable} 
                    onChange={(e) => setEditTable(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded px-2 py-1 text-xs text-white text-center w-16 focus:outline-none focus:border-[#F99B0C]"
                  />
                ) : (
                  client.tableNo
                )}
              </div>

              <div className="col-span-2 text-center text-gray-400 font-mono text-xs">
                {client.orderNo}
              </div>

              <div className="col-span-2 text-center">
                <span className={`text-xs font-black uppercase ${
                  client.status === 'Served' ? 'text-[#F99B0C]' : 'text-amber-500'
                }`}>
                  {client.status}
                </span>
              </div>

              <div className="col-span-2 flex items-center justify-end gap-3 text-gray-400">
                {editingOrderNo === client.orderNo ? (
                  <button 
                    onClick={() => saveEdit(client.orderNo)}
                    className="bg-[#F99B0C] text-black text-[10px] font-black px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    {client.status !== 'Served' && (
                      <>
                        <button 
                          onClick={() => handleServeClient(client.orderNo)}
                          className="hover:text-green-500 transition-colors"
                          title="Mark as Served"
                        >
                          <CircleCheck size={16} className="text-[#f99b0c]" />
                        </button>
                        <button 
                          onClick={() => startEdit(client)}
                          className="hover:text-[#F99B0C] transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} className="text-[#F99B0C]" />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleDeleteClient(client.orderNo)}
                      className="hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} className="text-[#F99B0C] hover:text-red-500" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {clientsList.length === 0 && (
            <div className="text-center py-20 text-gray-600 text-xs font-bold uppercase tracking-widest">
              No customers yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;