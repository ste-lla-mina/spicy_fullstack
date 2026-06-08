import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import AddMenu from './AddMenu';
import { menuApi, resolveImage } from '../../api/client';

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [topRatedItems, setTopRatedItems] = useState([]);
  const [specialMenuItems, setSpecialMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMenu = async () => {
    try {
      const [itemsRes, topRes, specialRes] = await Promise.all([
        menuApi.getItems(),
        menuApi.getTopRated(),
        menuApi.getSpecials()
      ]);
      setMenuItems(itemsRes.data);
      setTopRatedItems(topRes.data);
      setSpecialMenuItems(specialRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMenu(); }, []);

  const handleAddItem = async (newItem) => {
    try {
      if (newItem.file) {
        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('category', newItem.type || newItem.category);
        formData.append('description', newItem.description || '');
        formData.append('price', newItem.price);
        formData.append('cost', newItem.cost || 0);
        formData.append('status', newItem.status || 'Active');
        formData.append('isSpecial', newItem.isSpecial);
        formData.append('isTopRated', newItem.isTopRated);
        formData.append('specialTag', newItem.specialTag || '');
        formData.append('image', newItem.file);
        await menuApi.create(formData);
      } else {
        await menuApi.create({
          name: newItem.name,
          category: newItem.type || newItem.category,
          description: newItem.description,
          price: newItem.price,
          cost: newItem.cost,
          status: newItem.status || 'Active',
          isSpecial: newItem.isSpecial,
          isTopRated: newItem.isTopRated,
          specialTag: newItem.specialTag
        });
      }
      await loadMenu();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add menu item');
    }
  };

  const handleToggle = async (id) => {
    try {
      await menuApi.toggle(id);
      await loadMenu();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update item');
    }
  };

  if (loading) return <div className="p-8 text-gray-400">Loading menu...</div>;

  return (
    <div className="w-full p-8 font-sans select-none box-border grid grid-cols-12 gap-6 relative" style={{ backgroundImage: `url(/src/assets/bg.png)` }}>
      <div className="col-span-7 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[#F99B0C] text-xl font-bold tracking-wide">Menu</h1>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 border border-white/10 bg-black/40 hover:bg-white/5 transition-all px-4 py-2 rounded-xl text-xs font-semibold tracking-wide text-gray-300">
            Add to the menu
            <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center"><Plus size={14} className="text-white" /></span>
          </button>
        </div>

        <div className="bg-[#050505]/90 border border-white/5 rounded-2xl p-5 shadow-lg min-h-[calc(100vh-14rem)]">
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div key={item._id} className="border border-white/5 bg-black/40 rounded-xl p-3 flex flex-col items-center justify-between space-y-3">
                <div className="w-full h-24 rounded-lg overflow-hidden border border-white/5 bg-neutral-900">
                  <img src={resolveImage(item.image || item.imageUrl)} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center space-y-1 w-full">
                  <span className="text-[11px] font-bold text-white block truncate">{item.name}</span>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span className="text-[#F99B0C] text-xs font-bold">${item.price}</span>
                    {item.actionable && (
                      <button onClick={() => handleToggle(item._id)} className="bg-[#F99B0C] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm shadow-[#F99B0C]/20 hover:bg-[#e08b0b] transition-colors">
                        Sell
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-5 space-y-6">
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-white tracking-wide uppercase pl-1">Top rated menu</h2>
          <div className="grid grid-cols-2 gap-4">
            {topRatedItems.map((item) => (
              <div key={item._id} className="border border-white/5 bg-[#050505]/90 rounded-xl p-3 flex flex-col items-center space-y-2 shadow-md">
                <div className="w-full h-24 rounded-lg overflow-hidden border border-white/5 bg-neutral-900">
                  <img src={resolveImage(item.image)} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-white">{item.name}</span>
                <span className="text-[#F99B0C] text-xs font-bold">${item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold text-white tracking-wide uppercase pl-1">Special menu</h2>
          <div className="flex flex-col space-y-3">
            {specialMenuItems.map((item) => (
              <div key={item._id} className="border border-white/5 bg-[#050505]/90 rounded-xl p-3 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/5 bg-neutral-900 flex-shrink-0">
                    <img src={resolveImage(item.image)} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white">{item.name}</span>
                    <span className="text-[9px] font-medium text-[#F99B0C] tracking-wide">{item.tag}</span>
                  </div>
                </div>
                <span className="text-[#F99B0C] text-xs font-bold pr-2">${item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddMenu isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddItem} />
    </div>
  );
};

export default Menu;
