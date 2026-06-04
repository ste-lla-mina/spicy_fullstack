import React, { useState } from 'react';
import { CupSoda, ChefHat, CakeSlice, Cookie } from 'lucide-react';

const INITIAL_MENU_DATA = [
  { id: 1, name: 'Classic Mojito', category: 'drinks', price: 7.50, desc: 'White rum, fresh mint leaves, lime juice, and sparkling soda water.', img: 'mojito.jpg' },
  { id: 2, name: 'Mango Cooler', category: 'drinks', price: 6.50, desc: 'Pureed ripe mangoes mixed with fresh orange juice and lime.', img: 'smoothie.jpg' },
  { id: 3, name: 'Berry Bliss', category: 'drinks', price: 8.00, desc: 'Premium vodka infused with muddled sweet berries and lime.', img: 'berry.jpg' },
  { id: 4, name: 'Espresso Martini', category: 'drinks', price: 9.00, desc: 'Rich espresso shot shaken with craft vodka and coffee liqueur.', img: 'espresso.jpg' },
  { id: 5, name: 'Iced Latte', category: 'drinks', price: 4.50, desc: 'Chilled premium espresso poured over milk and ice cubes.', img: 'latte.jpg' },
  { id: 6, name: 'Chocolate Shake', category: 'drinks', price: 5.50, desc: 'Creamy chocolate ice cream blended with whole milk and rich syrup.', img: 'shake.jpg' },
  { id: 7, name: 'Sparkling Lemonade', category: 'drinks', price: 5.00, desc: 'Freshly squeezed lemon juice sweetened and topped with club soda.', img: 'grape.jpg' },
  { id: 8, name: 'Herbal Tea', category: 'drinks', price: 3.50, desc: 'A soothing hot blend of organic chamomile, wild mint, and lemongrass.', img: 'coffee.jpg' },

  { id: 9, name: 'Garlic Fries', category: 'food', price: 20.00, desc: 'Crispy golden fries tossed in aromatic roasted garlic butter and fresh herbs.', img: 'garlic.jpg' },
  { id: 10, name: 'Chicken Wings', category: 'food', price: 30.00, desc: 'Spicy buffalo-glazed wings served with a side of cool ranch dip.', img: 'wingi.jpg' },
  { id: 11, name: 'Beef Stew', category: 'food', price: 40.00, desc: 'Slow-cooked, tender beef chuck chunks simmered with seasonal root vegetables.', img: 'stew.jpg' },
  { id: 12, name: 'Jollof Rice', category: 'food', price: 45.00, desc: 'Classic spiced African rice cooked down in a flavorful savory tomato broth.', img: 'jollof.jpg' },
  { id: 13, name: 'Meat Balls', category: 'food', price: 20.00, desc: 'Seasoned ground beef spheres seared and simmered in a savory herb marinara.', img: 'balls.jpg' },
  { id: 14, name: 'Fruit salad', category: 'food', price: 30.00, desc: 'A refreshing medley of locally sourced sliced tropical fruits.', img: 'fruit.jpg' },
  { id: 15, name: 'Fried fish', category: 'food', price: 40.00, desc: 'Crispy batter-dipped white fish fillet seasoned with coastal spices.', img: 'fish.jpg' },
  { id: 16, name: 'Fried beef', category: 'food', price: 45.00, desc: 'Deep-fried marinated strips of premium flank steak served crisp.', img: 'meat.jpg' },

  { id: 17, name: 'Soft Pancakes', category: 'dessert', price: 17.00, desc: 'Fluffy buttermilk pancakes stacked and drizzled with pure maple syrup.', img: 'cake.jpg' },
  { id: 18, name: 'Chocolate Soufflé', category: 'dessert', price: 12.00, desc: 'Warm cake layer containing a molten dark chocolate core with vanilla bean accents.', img: 'chocookie.jpg' },

  { id: 21, name: 'Samosa Platter', category: 'appetizer', price: 10.00, desc: 'Crispy golden-fried pastries packed with heavily spiced garden vegetables.', img: 'mchito.jpg' },
  { id: 22, name: 'Roasted Meat Bits', category: 'appetizer', price: 25.00, desc: 'Bite-sized charred premium cuts skewered and seasoned with house dry rub.', img: 'frie.jpg' }
];

const Menu = ({ onAddToOrder }) => {
  const [activeCategory, setActiveCategory] = useState('drinks');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = [
    { id: 'drinks', label: 'DRINKS', icon: <CupSoda className="w-5 h-5" /> },
    { id: 'food', label: 'FOOD', icon: <ChefHat className="w-5 h-5" /> },
    { id: 'dessert', label: 'DESSERT', icon: <CakeSlice className="w-5 h-5" /> },
    { id: 'appetizer', label: 'APPETIZER', icon: <Cookie className="w-5 h-5" /> }
  ];

  const filteredItems = INITIAL_MENU_DATA.filter(item => item.category === activeCategory);
  
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'low-to-high') return a.price - b.price;
    if (sortBy === 'high-to-low') return b.price - a.price;
    return a.id - b.id; 
  });

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center text-white p-8 space-y-6 relative select-none font-sans bg-zinc-950/70 rounded-2xl"
    >
      <div className="absolute inset-0  pointer-events-none z-0" />
      <div className="relative z-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-[#FF9F0D]">Menu</h1>
          <p className="text-zinc-400 text-xs mt-1">Select items to populate your order board instantly.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl border text-sm font-semibold transition-all duration-200 uppercase tracking-wider
                  ${isActive 
                    ? 'border-[#FF9F0D] bg-[#FF9F0D]/10 text-[#FF9F0D] shadow-lg shadow-[#FF9F0D]/5' 
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 pt-2">
          <div className="text-sm text-zinc-400">
            Showing: <span className="text-[#FF9F0D] capitalize font-medium">{activeCategory}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-900/90 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-300 focus:outline-none focus:border-[#FF9F0D] cursor-pointer text-xs"
            >
              <option value="recommended">Recommended</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {sortedItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-zinc-950/70 border border-zinc-900/80 rounded-2xl p-4 flex gap-4 hover:border-zinc-800 transition-all group relative backdrop-blur-sm"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800/60">
                <img 
                  src={`/src/assets/${item.img}`} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150/18181b/ffffff?text=Meal';
                  }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-base text-zinc-100 group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[#FF9F0D] font-bold text-base shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => onAddToOrder && onAddToOrder(item)}
                    className="text-xs bg-zinc-900/60 border border-zinc-800 hover:border-[#FF9F0D] hover:text-[#FF9F0D] text-zinc-300 font-medium py-1.5 px-4 rounded-lg transition-all"
                  >
                    Select Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;