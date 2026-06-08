import React, { useEffect, useState } from 'react';
import {
  UtensilsCrossed, Users, Compass, Trash2, Plus, Minus,
  Sparkles, Flame, Leaf, HelpCircle, Wine, Layers
} from 'lucide-react';
import { menuApi, orderApi, resolveImage } from '../../api/client';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Recommended');
  const [guestCount, setGuestCount] = useState(4);
  const [tableNumber] = useState('11');
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  const filterCategories = [
    { label: 'Recommended', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: "Chef's Special", icon: <Flame className="w-3.5 h-3.5" /> },
    { label: 'Starters', icon: <Leaf className="w-3.5 h-3.5" /> },
    { label: 'Main Course', icon: <Compass className="w-3.5 h-3.5" /> },
    { label: 'Beverages', icon: <Wine className="w-3.5 h-3.5" /> },
    { label: 'Desserts', icon: <Layers className="w-3.5 h-3.5" /> }
  ];

  useEffect(() => {
    menuApi.getItems({ view: 'orders' })
      .then(({ data }) => setMenuItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = menuItems.filter((item) => {
    if (activeTab === 'Recommended') return true;
    if (activeTab === "Chef's Special") return item.tags?.includes("Chef's Special") || item.price > 25;
    return item.category?.toLowerCase() === activeTab.toLowerCase();
  });

  const handleAddToCart = (item) => {
    const id = item.id || item._id;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, name: item.name, price: item.price, qty: 1, img: item.img || item.imageUrl }];
    });
  };

  const updateQty = (id, change) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter((item) => item.qty > 0));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const tax = subtotal * 0.10;
  const serviceCharge = subtotal * 0.05;
  const grandTotal = subtotal + tax + serviceCharge;

  const placeOrder = async () => {
    if (cart.length === 0) return;
    setPlacing(true);
    try {
      await orderApi.create({
        tableNo: tableNumber,
        guestCount,
        orderType: 'Dine In',
        items: cart.map((item) => ({ menuItemId: item.id, qty: item.qty, price: item.price }))
      });
      alert(`Order submitted successfully for Table #${tableNumber}!`);
      setCart([]);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <div className="p-8 text-zinc-400">Loading menu...</div>;

  return (
    <div className="w-full min-h-screen bg-cover bg-center text-white p-6 relative font-sans select-none flex gap-6" style={{ backgroundImage: `url('/src/assets/bg.png')` }}>
      <div className="absolute inset-0 bg-zinc-950/70 pointer-events-none z-0 rounded-2xl" />

      <div className="flex-1 relative z-10 flex flex-col space-y-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950/40 border border-zinc-900 rounded-xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-10 rounded-lg bg-[#FF9F0D]/10 border border-[#FF9F0D]/20 flex items-center justify-center text-[#FF9F0D]"><UtensilsCrossed className="w-7 h-7" /></div>
            <div><h4 className="text-sm font-bold text-zinc-200">Table #{tableNumber} <span className="text-xs text-[#FF9F0D] bg-[#FF9F0D]/10 px-1.5 py-0.5 rounded ml-1 font-normal">VIP</span></h4></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400"><Users className="w-5 h-5" /></div>
            <div className="flex items-center gap-2 mt-0.5">
              <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="text-zinc-400 hover:text-white transition"><Minus className="w-3 h-3" /></button>
              <span className="text-sm font-bold text-zinc-200">{guestCount}</span>
              <button onClick={() => setGuestCount(guestCount + 1)} className="text-zinc-400 hover:text-white transition"><Plus className="w-3 h-3" /></button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 border-b border-zinc-900 pb-3">
          {filterCategories.map((cat) => (
            <button key={cat.label} onClick={() => setActiveTab(cat.label)} className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-tight transition-all truncate text-center ${activeTab === cat.label ? 'border-[#FF9F0D] bg-[#FF9F0D]/10 text-[#FF9F0D]' : 'border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:border-zinc-800 hover:text-white'}`}>
              <span className="shrink-0">{cat.icon}</span><span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[calc(100vh-250px)] scrollbar-thin">
          {filteredItems.map((item) => (
            <div key={item.id || item._id} className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-zinc-800 transition-all group backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 relative">
                  <img src={resolveImage(item.img || item.imageUrl)} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                </div>
                <div className="space-y-1 max-w-md">
                  <h4 className="font-bold text-sm text-zinc-100 group-hover:text-white transition-colors">{item.name}</h4>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <span className="text-[#FF9F0D] font-extrabold text-base">${item.price.toFixed(2)}</span>
                <button onClick={() => handleAddToCart(item)} className="w-10 h-10 rounded-xl bg-[#FF9F0D] text-black hover:bg-[#e08b0b] flex items-center justify-center font-bold transition-all shadow-md active:scale-95"><Plus className="w-5 h-5 stroke-[2.5]" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-96 bg-zinc-950/70 border border-zinc-900 rounded-2xl p-5 relative z-10 flex flex-col justify-between backdrop-blur-md max-h-[screen-40px]">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-2"><span className="text-base">🛍️</span><h3 className="font-bold text-zinc-200">Your Order</h3></div>
            {cart.length > 0 && <button onClick={() => setCart([])} className="text-[11px] font-semibold text-zinc-500 hover:text-red-400 transition uppercase tracking-wider">Empty Cart</button>}
          </div>
          <div className="text-[11px] text-zinc-400 bg-zinc-900/40 border border-zinc-900 px-3 py-2 rounded-xl flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF9F0D] shrink-0" />
            <span>Your items will be transmitted instantly to <strong className="text-zinc-200">Table #{tableNumber}</strong>.</span>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-420px)] pr-1 scrollbar-thin">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs space-y-2"><p>Your order board is empty.</p><p className="text-[10px] text-zinc-600">Select products on the left menu grid to add.</p></div>
            ) : cart.map((item) => (
              <div key={item.id} className="bg-zinc-900/30 border border-zinc-900/60 rounded-xl p-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 overflow-hidden">
                  <img src={resolveImage(item.img)} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-zinc-800 shrink-0" />
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-bold text-zinc-200 truncate">{item.name}</h5>
                    <span className="text-[11px] text-[#FF9F0D] font-bold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-900">
                  <button onClick={() => updateQty(item.id, -1)} className="text-zinc-400 hover:text-white transition"><Minus className="w-3 h-3" /></button>
                  <span className="text-xs font-bold text-zinc-200 w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="text-zinc-400 hover:text-white transition"><Plus className="w-3 h-3" /></button>
                  <span className="w-px h-3 bg-zinc-800 mx-0.5" />
                  <button onClick={() => removeFromCart(item.id)} className="text-zinc-500 hover:text-red-400 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-4 mt-4 space-y-3">
          <div className="space-y-1.5 text-xs text-zinc-400">
            <div className="flex justify-between"><span>Subtotal</span><span className="text-zinc-200 font-medium">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (10%)</span><span className="text-zinc-200 font-medium">${tax.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Service Charge (5%)</span><span className="text-zinc-200 font-medium">${serviceCharge.toFixed(2)}</span></div>
          </div>
          <div className="border-t border-zinc-900/60 pt-3 flex items-baseline justify-between">
            <span className="text-sm font-bold text-zinc-200">Total</span>
            <span className="text-xl font-extrabold text-[#FF9F0D]">${grandTotal.toFixed(2)}</span>
          </div>
          <button disabled={cart.length === 0 || placing} onClick={placeOrder} className="w-full mt-2 bg-[#FF9F0D] disabled:bg-zinc-900 disabled:border-zinc-800 disabled:text-zinc-600 border border-transparent text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg hover:bg-[#e08b0b] active:scale-[0.99] flex items-center justify-center gap-2">
            <span>{placing ? 'Placing...' : 'Place Order'}</span><span className="text-base">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
