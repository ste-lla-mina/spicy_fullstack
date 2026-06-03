import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddOrder from './AddOrder';

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordersList, setOrdersList] = useState([
    {
      id: '8',
      customer: 'John Tee',
      date: 'Wed May 6,2026',
      status: 'Served',
      items: [
        { name: 'Chicken Wings', qty: 4, price: 120 },
        { name: 'Milkshakes', qty: 2, price: 30 }
      ],
      total: 150
    },
    {
      id: '12',
      customer: 'Tom Doe',
      date: 'Wed May 6,2026',
      status: 'Pending',
      items: [
        { name: 'Jollof Rice', qty: 1, price: 45 },
        { name: 'Samosa', qty: 4, price: 40 },
        { name: 'Fanta', qty: 2, price: 20 }
      ],
      total: 115
    },
    {
      id: '3',
      customer: 'Anna Keza',
      date: 'Wed May 6,2026',
      status: 'Pending',
      items: [
        { name: 'Roasted Meat', qty: 1, price: 25 },
        { name: 'Red Wine', qty: 1, price: 25 }
      ],
      total: 50
    },
    {
      id: '24',
      customer: 'Ella Iriza',
      date: 'Wed May 6,2026',
      status: 'Served',
      items: [
        { name: 'Meat balls', qty: 4, price: 220 },
        { name: 'Chips and Stew', qty: 1, price: 5 }
      ],
      total: 225
    }
  ]);

  const totalOrdersCount = 180; 
  const paidOrdersCount = 134;
  const unpaidOrdersCount = 46;

  const handleCreateOrder = (newOrderData) => {
    const formattedOrder = {
      id: String(Math.floor(Math.random() * 100) + 1),
      customer: 'Walk-in Customer',
      date: 'Wed May 6,2026',
      status: 'Pending',
      items: [
        { 
          name: newOrderData.item || 'Custom Dish', 
          qty: newOrderData.quantity, 
          price: newOrderData.unitPrice * newOrderData.quantity 
        }
      ],
      total: newOrderData.unitPrice * newOrderData.quantity
    };

    setOrdersList((prev) => [formattedOrder, ...prev]);
  };

  return (
    <div className="w-full p-8 font-sans select-none box-border grid grid-cols-12 gap-6" style={{ backgroundImage: `url(/src/assets/bg.png)` }}>
      <div className="col-span-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[#F99B0C] text-xl font-bold tracking-wide">Orders</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold px-5 py-2 rounded-xl text-xs tracking-wide shadow-lg shadow-[#F99B0C]/10 transition-all"
          >
            <Plus size={16} strokeWidth={3} />
            New order
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 auto-rows-max">
          {ordersList.map((order, index) => (
            <div key={index} className="bg-[#050505]/90 border border-white/5 rounded-2xl p-4 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F99B0C] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {order.id}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white">{order.customer}</span>
                      <span className="text-[9px] font-medium text-gray-500">{order.date}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border ${
                    order.status === 'Served' 
                      ? 'border-[#F99B0C]/20 text-[#F99B0C] bg-[#F99B0C]/5' 
                      : 'border-amber-600/20 text-amber-500 bg-amber-600/5'
                  }`}>
                    {order.status}
                  </span>
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
                  <button className="w-full bg-transparent border border-white/10 hover:border-white/30 text-white font-bold text-[10px] py-2 rounded-xl transition-all">
                    See details
                  </button>
                  <button className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold text-[10px] py-2 rounded-xl transition-all">
                    Pay bills
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
                strokeDasharray="72 100"
                strokeLinecap="square"
                stroke="currentColor"
                fill="transparent"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 bg-[#050505] rounded-full m-[16px]" />
          </div>

          <div className="w-full space-y-6 pt-2">
            <div className="flex flex-col space-y-3 px-2">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F99B0C]" />
                <span className="text-[11px] font-bold text-[#F99B0C] tracking-wide">Served Orders</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span className="text-[11px] font-bold text-white tracking-wide">Pending Orders</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3 text-xs font-bold px-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-semibold">Total Orders:</span>
                <span className="text-white text-sm font-extrabold">{totalOrdersCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-semibold">Payed :</span>
                <span className="text-white text-sm font-extrabold">{paidOrdersCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-semibold">Unpayed:</span>
                <span className="text-white text-sm font-extrabold">{unpaidOrdersCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddOrder 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleCreateOrder}
      />
    </div>
  );
};

export default Orders;