import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import AddOrder from './AddOrder';
import { orderApi } from '../../api/client';

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const [stats, setStats] = useState({ total: 0, paid: 0, unpaid: 0, served: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const [ordersRes, statsRes] = await Promise.all([orderApi.getAll(), orderApi.getStats()]);
      setOrdersList(ordersRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const handleCreateOrder = async (newOrderData) => {
    try {
      await orderApi.create({
        item: newOrderData.item,
        quantity: newOrderData.quantity,
        unitPrice: newOrderData.unitPrice,
        specialInstructions: newOrderData.specialInstructions,
        modifiers: newOrderData.modifiers,
        notesForKitchen: newOrderData.notesForKitchen,
        sendTo: newOrderData.sendTo,
        timing: newOrderData.timing,
        customerName: 'Walk-in Customer'
      });
      await loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create order');
    }
  };

  const handlePay = async (order) => {
    try {
      await orderApi.pay(order._id);
      await loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Payment failed');
    }
  };

  if (loading) return <div className="p-8 text-gray-400">Loading orders...</div>;

  return (
    <div className="w-full p-8 font-sans select-none box-border grid grid-cols-12 gap-6" style={{ backgroundImage: `url(/src/assets/bg.png)` }}>
      <div className="col-span-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[#F99B0C] text-xl font-bold tracking-wide">Orders</h1>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold px-5 py-2 rounded-xl text-xs tracking-wide shadow-lg shadow-[#F99B0C]/10 transition-all">
            <Plus size={16} strokeWidth={3} /> New order
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 auto-rows-max">
          {ordersList.map((order) => (
            <div key={order._id} className="bg-[#050505]/90 border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F99B0C] flex items-center justify-center text-white font-bold text-xs shadow-sm">{order.id}</div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white">{order.customer}</span>
                      <span className="text-[9px] font-medium text-gray-500">{order.date}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border ${order.status === 'Served' ? 'border-[#F99B0C]/20 text-[#F99B0C] bg-[#F99B0C]/5' : 'border-amber-600/20 text-amber-500 bg-amber-600/5'}`}>{order.status}</span>
                </div>

                <div className="w-full border-b border-white/5 pb-2 mb-2">
                  <div className="grid grid-cols-12 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 px-1">
                    <span className="col-span-6">Item</span>
                    <span className="col-span-3 text-center">Qty</span>
                    <span className="col-span-3 text-right">Price</span>
                  </div>
                  <div className="space-y-2 max-h-24 overflow-y-auto pr-1">
                    {order.items.map((dish, dIdx) => (
                      <div key={dIdx} className="grid grid-cols-12 text-[11px] font-medium text-gray-300 px-1">
                        <span className="col-span-6 truncate font-semibold text-white">{dish.name}</span>
                        <span className="col-span-3 text-center font-bold text-gray-400">{dish.qty}</span>
                        <span className="col-span-3 text-right font-bold text-white">${dish.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-white mb-3 px-1">
                  <span className="text-gray-400 font-semibold">Total</span>
                  <span className="text-sm">${order.total}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="w-full bg-transparent border border-white/10 hover:border-white/30 text-white font-bold text-[10px] py-2 rounded-xl transition-all">See details</button>
                  <button onClick={() => handlePay(order)} disabled={order.paymentStatus === 'Paid'} className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] disabled:opacity-50 text-white font-bold text-[10px] py-2 rounded-xl transition-all">
                    {order.paymentStatus === 'Paid' ? 'Paid' : 'Pay bills'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-4 mt-12">
        <div className="bg-[#050505]/90 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-between shadow-md h-[calc(100vh-14rem)] min-h-[460px]">
          <h2 className="text-xs font-bold text-white tracking-wide uppercase self-start">Order Statics</h2>
          <div className="relative w-44 h-44 my-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-white" strokeWidth="4.5" stroke="currentColor" fill="transparent" strokeDasharray="100 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-[#F99B0C]" strokeWidth="4.5" strokeDasharray={`${stats.total ? Math.round((stats.served / stats.total) * 100) : 0} 100`} strokeLinecap="square" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 bg-[#050505] rounded-full m-[16px]" />
          </div>
          <div className="w-full space-y-6 pt-2">
            <div className="flex flex-col space-y-3 px-2">
              <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#F99B0C]" /><span className="text-[11px] font-bold text-[#F99B0C] tracking-wide">Served Orders</span></div>
              <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-white" /><span className="text-[11px] font-bold text-white tracking-wide">Pending Orders</span></div>
            </div>
            <div className="border-t border-white/5 pt-4 space-y-3 text-xs font-bold px-2">
              <div className="flex justify-between items-center"><span className="text-gray-400 font-semibold">Total Orders:</span><span className="text-white text-sm font-extrabold">{stats.total}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400 font-semibold">Payed :</span><span className="text-white text-sm font-extrabold">{stats.paid}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400 font-semibold">Unpayed:</span><span className="text-white text-sm font-extrabold">{stats.unpaid}</span></div>
            </div>
          </div>
        </div>
      </div>

      <AddOrder isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleCreateOrder} />
    </div>
  );
};

export default Orders;
