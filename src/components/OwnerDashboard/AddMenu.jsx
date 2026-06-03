import React, { useState } from 'react';
import { X, Upload, UtensilsCrossed } from 'lucide-react';

const AddMenu = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('Active');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !price) return;

    const newItem = {
      name: itemName,
      price: parseFloat(price) || 0,
      type: category || 'main',
      image: imagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
      actionable: true
    };

    onSave(newItem);
    setItemName('');
    setCategory('');
    setDescription('');
    setPrice('');
    setCost('');
    setStatus('Active');
    setImagePreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#050505] border border-white/10 rounded-2xl shadow-2xl p-6 relative overflow-hidden font-sans">
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#F99B0C] flex items-center justify-center text-[#F99B0C]">
              <UtensilsCrossed size={14} />
            </div>
            <h2 className="text-sm font-bold tracking-wider text-white uppercase">Add To Menu</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              required
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C] transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#F99B0C] transition-all"
            >
              <option value="">Select category</option>
              <option value="main">Main Dishes</option>
              <option value="drinks">Drinks</option>
              <option value="special">Specials</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Description</label>
            <textarea 
              rows="2"
              placeholder="Enter item description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C] transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                <input 
                  type="number" 
                  required
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Cost (Optional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C] transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Image (Optional)</label>
            <label className="w-full h-24 border border-dashed border-[#F99B0C]/40 hover:border-[#F99B0C] bg-black/20 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all p-2 overflow-hidden">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              {imagePreview ? (
                <img src={imagePreview} alt="Upload preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-center flex flex-col items-center space-y-1">
                  <Upload size={18} className="text-[#F99B0C]" />
                  <span className="text-[11px] font-bold text-white">Click to upload image</span>
                  <span className="text-[9px] text-gray-500">PNG, JPG up to 5MB</span>
                </div>
              )}
            </label>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#F99B0C] transition-all"
            >
              <option value="Active">🟢 Active</option>
              <option value="Inactive">🔴 Inactive</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-[#F99B0C] hover:bg-[#F99B0C]/5 rounded-xl py-3 text-xs font-bold text-[#F99B0C] uppercase tracking-wider transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] rounded-xl py-3 text-xs font-bold text-white uppercase tracking-wider shadow-lg shadow-[#F99B0C]/10 transition-all"
            >
              Add To Menu
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMenu;