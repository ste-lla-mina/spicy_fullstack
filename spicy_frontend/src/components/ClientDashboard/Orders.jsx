import React, { useState } from 'react';
import { 
  UtensilsCrossed, Users, Compass, Bell, Trash2, Plus, Minus, 
  Sparkles, Flame, Leaf, HelpCircle, Wine, Layers
} from 'lucide-react';

const MENU_ITEMS_DATA = [
  { id: 1, name: 'Classic Mojito', category: 'Beverages', price: 7.50, desc: 'White rum, fresh mint leaves, lime juice, and sparkling soda water.', img: 'mojito.jpg' },
  { id: 2, name: 'Mango Cooler', category: 'Beverages', price: 6.50, desc: 'Pureed ripe mangoes mixed with fresh orange juice and lime.', img: 'smoothie.jpg' },
  { id: 3, name: 'Berry Bliss', category: 'Beverages', price: 8.00, desc: 'Premium vodka infused with muddled sweet berries and lime.', img: 'berry.jpg' },
  { id: 4, name: 'Espresso Martini', category: 'Beverages', price: 9.00, desc: 'Rich espresso shot shaken with craft vodka and coffee liqueur.', img: 'espresso.jpg' },
  { id: 9, name: 'Garlic Fries', category: 'Main Course', price: 20.00, desc: 'Crispy golden fries tossed in aromatic roasted garlic butter and fresh herbs.', img: 'garlic.jpg', tags: ['Bestseller'] },
  { id: 10, name: 'Chicken Wings', category: 'Main Course', price: 30.00, desc: 'Spicy buffalo-glazed wings served with a side of cool ranch dip.', img: 'wingi.jpg', tags: ['Chef\'s Special'] },
  { id: 11, name: 'Beef Stew', category: 'Main Course', price: 40.00, desc: 'Slow-cooked, tender beef chuck chunks simmered with seasonal root vegetables.', img: 'stew.jpg' },
  { id: 12, name: 'Jollof Rice', category: 'Main Course', price: 45.00, desc: 'Classic spiced African rice cooked down in a flavorful savory tomato broth.', img: 'jollof.jpg' },
  { id: 17, name: 'Soft Pancakes', category: 'Desserts', price: 17.00, desc: 'Fluffy buttermilk pancakes stacked and drizzled with pure maple syrup.', img: 'cake.jpg' },
  { id: 18, name: 'Chocolate Soufflé', category: 'Desserts', price: 12.00, desc: 'Warm cake layer containing a molten dark chocolate core.', img: 'chocookie.jpg' },
  { id: 21, name: 'Samosa Platter', category: 'Starters', price: 10.00, desc: 'Crispy golden-fried pastries packed with heavily spiced garden vegetables.', img: 'mchito.jpg' },
  { id: 22, name: 'Roasted Meat Bits', category: 'Starters', price: 25.00, desc: 'Bite-sized charred premium cuts skewered and seasoned with house dry rub.', img: 'frie.jpg' }
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Recommended');
  const [orderType, setOrderType] = useState('Dine In');
  const [guestCount, setGuestCount] = useState(4);
  const [tableNumber] = useState('#11');
  const [cart, setCart] = useState([
    { id: 9, name: 'Garlic Fries', price: 20.00, qty: 1, img: 'garlic.jpg' },
    { id: 10, name: 'Chicken Wings', price: 30.00, qty: 1, img: 'wingi.jpg' }
  ]);

  const filterCategories = [
    { label: 'Recommended', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: "Chef's Special", icon: <Flame className="w-3.5 h-3.5" /> },
    { label: 'Starters', icon: <Leaf className="w-3.5 h-3.5" /> },
    { label: 'Main Course', icon: <Compass className="w-3.5 h-3.5" /> },
    { label: 'Beverages', icon: <Wine className="w-3.5 h-3.5" /> },
    { label: 'Desserts', icon: <Layers className="w-3.5 h-3.5" /> }
  ];

  const filteredItems = MENU_ITEMS_DATA.filter(item => {
    if (activeTab === 'Recommended') return true;
    if (activeTab === "Chef's Special") return item.tags?.includes("Chef's Special") || item.price > 25;
    return item.category.toLowerCase() === activeTab.toLowerCase();
  });

  const handleAddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, img: item.img }];
    });
  };

  const updateQty = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const tax = subtotal * 0.10;
  const serviceCharge = subtotal * 0.05;
  const grandTotal = subtotal + tax + serviceCharge;

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center text-white p-6 relative font-sans select-none flex gap-6"
      style={{ backgroundImage: `url('/src/assets/bg.png')` }}
    >
      <div className="absolute inset-0 bg-zinc-950/70 pointer-events-none z-0 rounded-2xl" />
      
      <div className="flex-1 relative z-10 flex flex-col space-y-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950/40 border border-zinc-900 rounded-xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className=" h-10 rounded-lg bg-[#FF9F0D]/10 border border-[#FF9F0D]/20 flex items-center justify-center text-[#FF9F0D]">
              <UtensilsCrossed className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-200">Table {tableNumber} <span className="text-xs text-[#FF9F0D] bg-[#FF9F0D]/10 px-1.5 py-0.5 rounded ml-1 font-normal">VIP</span></h4>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mt-0.5">
                <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="text-zinc-400 hover:text-white transition"><Minus className="w-3 h-3" /></button>
                <span className="text-sm font-bold text-zinc-200">{guestCount}</span>
                <button onClick={() => setGuestCount(guestCount + 1)} className="text-zinc-400 hover:text-white transition"><Plus className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 border-b border-zinc-900 pb-3">
          {filterCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(cat.label)}
              className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-tight transition-all truncate text-center
                ${activeTab === cat.label 
                  ? 'border-[#FF9F0D] bg-[#FF9F0D]/10 text-[#FF9F0D]' 
                  : 'border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:border-zinc-800 hover:text-white'
                }`}
              title={cat.label}
            >
              <span className="shrink-0">{cat.icon}</span>
              <span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[calc(100vh-250px)] scrollbar-thin">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-zinc-800 transition-all group backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 relative">
                  <img 
                    src={`/src/assets/${item.img}`} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150/18181b/ffffff?text=Food'; }}
                  />
                  {item.tags?.includes('Bestseller') && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-[8px] uppercase tracking-wide font-extrabold px-1.5 py-0.5 rounded text-black shadow-md">Best</span>
                  )}
                </div>
                <div className="space-y-1 max-w-md">
                  <h4 className="font-bold text-sm text-zinc-100 group-hover:text-white transition-colors flex items-center gap-2">
                    {item.name}
                  </h4>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <span className="text-[#FF9F0D] font-extrabold text-base">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-10 h-10 rounded-xl bg-[#FF9F0D] text-black hover:bg-[#e08b0b] flex items-center justify-center font-bold transition-all shadow-md active:scale-95"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-96 bg-zinc-950/70 border border-zinc-900 rounded-2xl p-5 relative z-10 flex flex-col justify-between backdrop-blur-md max-h-[screen-40px]">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🛍️</span>
              <h3 className="font-bold text-zinc-200">Your Order</h3>
            </div>
            {cart.length > 0 && (
              <button 
                onClick={() => setCart([])}
                className="text-[11px] font-semibold text-zinc-500 hover:text-red-400 transition uppercase tracking-wider"
              >
                Empty Cart
              </button>
            )}
          </div>
          
          <div className="text-[11px] text-zinc-400 bg-zinc-900/40 border border-zinc-900 px-3 py-2 rounded-xl flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF9F0D] shrink-0" />
            <span>Your items will be transmitted instantly to <strong className="text-zinc-200">Table {tableNumber}</strong>.</span>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-420px)] pr-1 scrollbar-thin">
            {cart.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs space-y-2">
                <p>Your order board is empty.</p>
                <p className="text-[10px] text-zinc-600">Select products on the left menu grid to add.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="bg-zinc-900/30 border border-zinc-900/60 rounded-xl p-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img 
                      src={`/src/assets/${item.img}`} 
                      alt={item.name} 
                      className="w-10 h-10 object-cover rounded-lg bg-zinc-800 shrink-0"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150/18181b/ffffff?text=Food'; }}
                    />
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
              ))
            )}
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-4 mt-4 space-y-3">
          <div className="space-y-1.5 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-zinc-200 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span className="text-zinc-200 font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Charge (5%)</span>
              <span className="text-zinc-200 font-medium">${serviceCharge.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-zinc-900/60 pt-3 flex items-baseline justify-between">
            <span className="text-sm font-bold text-zinc-200">Total</span>
            <span className="text-xl font-extrabold text-[#FF9F0D]">${grandTotal.toFixed(2)}</span>
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={() => alert(`Order submitted successfully for Table ${tableNumber}!`)}
            className="w-full mt-2 bg-[#FF9F0D] disabled:bg-zinc-900 disabled:border-zinc-800 disabled:text-zinc-600 border border-transparent text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg hover:bg-[#e08b0b] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Place Order</span>
            <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;