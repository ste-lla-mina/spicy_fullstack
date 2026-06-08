import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, CircleCheck } from 'lucide-react';
import { orderApi } from '../../api/client';

const Clients = () => {
  const [clientsList, setClientsList] = useState([]);
  const [editingOrderNo, setEditingOrderNo] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTable, setEditTable] = useState('');
  const [loading, setLoading] = useState(true);

  const loadClients = async () => {
    try {
      const { data } = await orderApi.getActiveClients();
      setClientsList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadClients(); }, []);

  const handleDeleteClient = async (client) => {
    try {
      await orderApi.remove(client._id);
      await loadClients();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove client');
    }
  };

  const handleServeClient = async (orderNo) => {
    try {
      await orderApi.serve(orderNo);
      await loadClients();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const startEdit = (client) => {
    setEditingOrderNo(client.orderNo);
    setEditName(client.name);
    setEditTable(client.tableNo);
  };

  const saveEdit = async (client) => {
    try {
      await orderApi.updateClient(client._id, { name: editName, tableNo: editTable });
      setEditingOrderNo(null);
      await loadClients();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save changes');
    }
  };

  if (loading) return <div className="p-8 text-gray-400">Loading clients...</div>;

  return (
    <div className="w-full p-8 font-sans select-none box-border space-y-4" style={{ backgroundImage: `url(/src/assets/bg.png)` }}>
      <div className="flex items-center justify-between">
        <h1 className="text-[#F99B0C] text-xl font-bold tracking-wide">Clients</h1>
      </div>

      <div className="bg-[#050505]/90 border border-white/5 rounded-2xl p-6 shadow-lg min-h-[calc(100vh-14rem)]">
        <div className="grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider pb-4 px-6 border-b border-white/5">
          <div className="col-span-4">Client Name</div>
          <div className="col-span-2 text-center">Table No</div>
          <div className="col-span-2 text-center">Order No</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="mt-4 space-y-3">
          {clientsList.map((client) => (
            <div key={client._id} className="grid grid-cols-12 items-center bg-black/40 border border-white/5 hover:border-white/10 rounded-2xl py-4 px-6 text-sm font-semibold text-white transition-all">
              <div className="col-span-4 font-bold tracking-wide">
                {editingOrderNo === client.orderNo ? (
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-neutral-900 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-[#F99B0C]" />
                ) : client.name}
              </div>
              <div className="col-span-2 text-center text-gray-300 font-extrabold">
                {editingOrderNo === client.orderNo ? (
                  <input type="text" value={editTable} onChange={(e) => setEditTable(e.target.value)} className="bg-neutral-900 border border-white/10 rounded px-2 py-1 text-xs text-white text-center w-16 focus:outline-none focus:border-[#F99B0C]" />
                ) : client.tableNo}
              </div>
              <div className="col-span-2 text-center text-gray-400 font-mono text-xs">{client.orderNo}</div>
              <div className="col-span-2 text-center">
                <span className={`text-xs font-black uppercase ${client.status === 'Served' ? 'text-[#F99B0C]' : 'text-amber-500'}`}>{client.status}</span>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-3 text-gray-400">
                {editingOrderNo === client.orderNo ? (
                  <button onClick={() => saveEdit(client)} className="bg-[#F99B0C] text-black text-[10px] font-black px-2 py-1 rounded">Save</button>
                ) : (
                  <>
                    {client.status !== 'Served' && (
                      <>
                        <button onClick={() => handleServeClient(client.orderNo)} className="hover:text-green-500 transition-colors" title="Mark as Served"><CircleCheck size={16} className="text-[#f99b0c]" /></button>
                        <button onClick={() => startEdit(client)} className="hover:text-[#F99B0C] transition-colors" title="Edit"><Pencil size={15} className="text-[#F99B0C]" /></button>
                      </>
                    )}
                    <button onClick={() => handleDeleteClient(client)} className="hover:text-red-500 transition-colors" title="Delete"><Trash2 size={15} className="text-[#F99B0C] hover:text-red-500" /></button>
                  </>
                )}
              </div>
            </div>
          ))}
          {clientsList.length === 0 && (
            <div className="text-center py-20 text-gray-600 text-xs font-bold uppercase tracking-widest">No customers yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
