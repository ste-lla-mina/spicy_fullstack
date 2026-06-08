import React, { useState } from 'react';
import { X, ShoppingBasket, Utensils, GlassWater, Layers } from 'lucide-react';

const AddOrder = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [modifiers, setModifiers] = useState('');
  const [notesForKitchen, setNotesForKitchen] = useState('');
  const [sendTo, setSendTo] = useState('Kitchen');
  const [timing, setTiming] = useState('Send now');

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item || !unitPrice) return;

    onSave({
      item,
      quantity,
      unitPrice: parseFloat(unitPrice) || 0,
      specialInstructions,
      modifiers,
      notesForKitchen,
      sendTo,
      timing
    });
    setItem('');
    setQuantity(1);
    setUnitPrice('');
    setSpecialInstructions('');
    setModifiers('');
    setNotesForKitchen('');
    setSendTo('Kitchen');
    setTiming('Send now');
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#050505] border border-white/10 rounded-2xl shadow-2xl p-6 relative overflow-hidden font-sans">
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#F99B0C] flex items-center justify-center text-[#F99B0C]">
              <ShoppingBasket size={14} />
            </div>
            <h2 className="text-sm font-bold tracking-wider text-white uppercase">Add To Order</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Item <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></span>
              <input 
                type="text" 
                required
                placeholder="Item Name"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Quantity <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl px-2 py-1 h-[38px]">
                <button 
                  type="button" 
                  onClick={decrementQty}
                  className="w-7 h-7 rounded-lg border border-[#F99B0C]/40 text-[#F99B0C] font-bold flex items-center justify-center hover:bg-[#F99B0C]/10 transition-colors"
                >
                  —
                </button>
                <span className="text-xs text-white font-bold">{quantity}</span>
                <button 
                  type="button" 
                  onClick={incrementQty}
                  className="w-7 h-7 rounded-lg border border-[#F99B0C]/40 text-[#F99B0C] font-bold flex items-center justify-center hover:bg-[#F99B0C]/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Unit Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                <input 
                  type="number" 
                  required
                  placeholder="0.00"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C] transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Special Instructions (Optional)</label>
            <textarea 
              rows="2"
              placeholder="Add any special instructions..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C] transition-all resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Modifiers / Add-ons (Optional)</label>
            <select
              value={modifiers}
              onChange={(e) => setModifiers(e.target.value)}
              className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#F99B0C] transition-all"
            >
              <option value="">Select modifiers or add-ons</option>
              <option value="Extra Cheese">Extra Cheese</option>
              <option value="Spicy Sauce">Spicy Sauce</option>
              <option value="No Onions">No Onions</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Notes For Kitchen (Optional)</label>
            <textarea 
              rows="2"
              placeholder="Any additional notes for the kitchen..."
              value={notesForKitchen}
              onChange={(e) => setNotesForKitchen(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C] transition-all resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
              Send To <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Kitchen', icon: Utensils },
                { id: 'Bar', icon: GlassWater },
                { id: 'Both', icon: Layers }
              ].map((dest) => {
                const Icon = dest.icon;
                const isSelected = sendTo === dest.id;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setSendTo(dest.id)}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[11px] font-bold transition-all ${
                      isSelected 
                        ? 'border-[#F99B0C] bg-[#F99B0C]/5 text-white' 
                        : 'border-white/10 bg-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon size={14} className={isSelected ? 'text-[#F99B0C]' : 'text-gray-400'} />
                    {dest.id}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Timing</label>
            <select
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F99B0C] transition-all"
            >
              <option value="Send now">Send now</option>
              <option value="Hold 15 mins">Hold 15 mins</option>
              <option value="With Dessert">With Dessert</option>
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
              className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] rounded-xl py-3 text-xs font-bold text-black uppercase tracking-wider shadow-lg shadow-[#F99B0C]/10 transition-all"
            >
              Add To Order
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddOrder;