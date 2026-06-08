import React, { useEffect, useState } from 'react';
import { CupSoda, ChefHat, CakeSlice, Cookie } from 'lucide-react';
import { menuApi, resolveImage } from '../../api/client';

const Menu = ({ onAddToOrder }) => {
  const [activeCategory, setActiveCategory] = useState('drinks');
  const [sortBy, setSortBy] = useState('recommended');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'drinks', label: 'DRINKS', icon: <CupSoda className="w-5 h-5" /> },
    { id: 'food', label: 'FOOD', icon: <ChefHat className="w-5 h-5" /> },
    { id: 'dessert', label: 'DESSERT', icon: <CakeSlice className="w-5 h-5" /> },
    { id: 'appetizer', label: 'APPETIZER', icon: <Cookie className="w-5 h-5" /> }
  ];

  useEffect(() => {
    menuApi.getItems({ view: 'client', category: activeCategory, sort: sortBy })
      .then(({ data }) => setItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory, sortBy]);

  const filteredItems = items.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-cover bg-center text-white p-8 space-y-6 relative select-none font-sans bg-zinc-950/70 rounded-2xl">
      <div className="absolute inset-0 pointer-events-none z-0" />
      <div className="relative z-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-[#FF9F0D]">Menu</h1>
          <p className="text-zinc-400 text-xs mt-1">Select items to populate your order board instantly.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl border text-sm font-semibold transition-all duration-200 uppercase tracking-wider ${activeCategory === cat.id ? 'border-[#FF9F0D] bg-[#FF9F0D]/10 text-[#FF9F0D] shadow-lg shadow-[#FF9F0D]/5' : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white'}`}>
              {cat.icon}{cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 pt-2">
          <div className="text-sm text-zinc-400">Showing: <span className="text-[#FF9F0D] capitalize font-medium">{activeCategory}</span></div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-500">Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-zinc-900/90 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-300 focus:outline-none focus:border-[#FF9F0D] cursor-pointer text-xs">
              <option value="recommended">Recommended</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-zinc-500">Loading menu...</div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id || item._id} className="bg-zinc-950/70 border border-zinc-900/80 rounded-2xl p-4 flex gap-4 hover:border-zinc-800 transition-all group relative backdrop-blur-sm">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800/60">
                  <img src={resolveImage(item.img || item.imageUrl)} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold text-base text-zinc-100 group-hover:text-white transition-colors">{item.name}</h3>
                      <span className="text-[#FF9F0D] font-bold text-base shrink-0">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button onClick={() => onAddToOrder && onAddToOrder(item)} className="text-xs bg-zinc-900/60 border border-zinc-800 hover:border-[#FF9F0D] hover:text-[#FF9F0D] text-zinc-300 font-medium py-1.5 px-4 rounded-lg transition-all">Select Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
