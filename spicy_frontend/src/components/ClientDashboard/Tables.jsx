import React, { useState } from 'react';
import { Calendar, Clock, Users, X, ChevronLeft, ChevronRight, Filter, SlidersHorizontal, MessageSquare, AlertCircle } from 'lucide-react';

const Tables = () => {
  const [tables] = useState([
    { id: 1, capacity: 2, location: 'Window', features: ['WiFi', 'Quiet'], available: true, reserved: false },
    { id: 2, capacity: 4, location: 'Near Bar', features: ['WiFi', 'Heating'], available: true, reserved: false },
    { id: 3, capacity: 4, location: 'Center', features: ['WiFi', 'AC', 'Quiet'], available: false, reserved: true },
    { id: 4, capacity: 6, location: 'Corner', features: ['Heating', 'WiFi'], available: true, reserved: false },
    { id: 5, capacity: 2, location: 'Bar Side', features: ['WiFi', 'Bar View'], available: true, reserved: false },
    { id: 6, capacity: 8, location: 'Private Area', features: ['WiFi', 'Quiet', 'Heating'], available: true, reserved: false },
    { id: 7, capacity: 2, location: 'Window', features: ['WiFi', 'AC'], available: true, reserved: false },
    { id: 8, capacity: 4, location: 'Center', features: ['WiFi', 'Quiet', 'Bar View'], available: false, reserved: true },
    { id: 9, capacity: 4, location: 'Near Bar', features: ['Heating', 'AC'], available: true, reserved: false },
    { id: 10, capacity: 2, location: 'Corner', features: ['WiFi', 'Quiet'], available: true, reserved: false },
    { id: 11, capacity: 6, location: 'Near Window', features: ['WiFi', 'Heating', 'Bar View'], available: true, reserved: false },
    { id: 12, capacity: 4, location: 'Center Stage', features: ['WiFi', 'Quiet', 'Heating'], available: true, reserved: false },
  ]);

  const [selectedDate, setSelectedDate] = useState('24 Aug 2025');
  const [selectedTime, setSelectedTime] = useState('8:00 PM');
  const [partySize, setPartySize] = useState(4);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');
  const [reservations, setReservations] = useState([]);

  const amenities = [
    { id: 'wifi', label: 'WiFi Available', icon: '📶' },
    { id: 'heating', label: 'Heating', icon: '🔥' },
    { id: 'ac', label: 'Air Conditioned', icon: '❄️' },
    { id: 'quiet', label: 'Quiet Zone', icon: '🔇' },
    { id: 'bar', label: 'Bar View', icon: '🍹' },
  ];

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId) ? prev.filter(a => a !== amenityId) : [...prev, amenityId]
    );
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setSpecialNotes(''); 
    setShowReservationModal(true);
  };

  const handleReserveTable = () => {
    if (selectedTable) {
      const reservation = {
        id: Date.now(),
        tableId: selectedTable.id,
        date: selectedDate,
        time: selectedTime,
        partySize: partySize,
        notes: specialNotes,
        tableName: `Table #${selectedTable.id}`,
        capacity: selectedTable.capacity,
        location: selectedTable.location,
      };
      setReservations(prev => [...prev, reservation]);
      setShowReservationModal(false);
      setSelectedTable(null);
    }
  };

  const filteredTables = tables.filter(table => {
    const capacityMatch = table.capacity >= partySize;
    const amenitiesMatch = selectedAmenities.length === 0 || 
      selectedAmenities.some(amenity => 
        table.features.some(feature => feature.toLowerCase().includes(amenity))
      );
    return capacityMatch && amenitiesMatch && table.available;
  });

  return (
    <div 
      className="w-full min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 relative font-sans antialiased selection:bg-[#FF9F0D]/30 selection:text-white"
      style={{ 
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(255, 159, 13, 0.15) 0%, transparent 50%), url('/src/assets/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        <div className="pb-6 border-b border-zinc-800/60">
          <h1 className="text-4xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-[#f99b0c]">
            Tables.
          </h1>
          <p className="text-sm text-zinc-400 mt-1">Select your preferred seating layout and coordinate your dining experience.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm uppercase tracking-wider pb-3 border-b border-zinc-800/50">
              <SlidersHorizontal className="w-4 h-4 text-[#FF9F0D]" />
              <span>Booking Preferences</span>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#FF9F0D]" /> Select Date
              </label>
              <input 
                type="text" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF9F0D] focus:ring-1 focus:ring-[#FF9F0D] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF9F0D]" /> Select Time
              </label>
              <div className="relative">
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF9F0D] focus:ring-1 focus:ring-[#FF9F0D] appearance-none transition-all cursor-pointer"
                >
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                  <option>9:00 PM</option>
                  <option>10:00 PM</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500 text-xs">▼</div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#FF9F0D]" /> Party Size
              </label>
              <div className="flex items-center justify-between bg-zinc-950/60 border border-zinc-800 rounded-xl p-1.5">
                <button 
                  onClick={() => setPartySize(Math.max(1, partySize - 1))}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 p-2.5 rounded-lg transition-all active:scale-90"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-md font-black text-white tracking-wide">{partySize} Guests</span>
                <button 
                  onClick={() => setPartySize(Math.min(12, partySize + 1))}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 p-2.5 rounded-lg transition-all active:scale-90"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-400 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#FF9F0D]" /> Ambience & Amenities
              </label>
              <div className="grid grid-cols-1 gap-2">
                {amenities.map(amenity => {
                  const isSelected = selectedAmenities.includes(amenity.id);
                  return (
                    <button
                      key={amenity.id}
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FF9F0D]/20 to-[#FF9F0D]/5 border-[#FF9F0D] text-[#FF9F0D] shadow-[0_0_15px_rgba(255,159,13,0.1)]'
                          : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base leading-none">{amenity.icon}</span>
                        <span>{amenity.label}</span>
                      </div>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F0D]" />}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-2.5 text-xs text-zinc-400">
              <AlertCircle className="w-4 h-4 text-[#FF9F0D] shrink-0 mt-0.5" />
              <p>
                <strong className="text-zinc-300 font-semibold">Peak Hours:</strong> Tables are held for a maximum of 15 minutes past the reservation window.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-900/20 border border-zinc-800/60 rounded-3xl p-8 backdrop-blur-md relative min-h-[460px] flex flex-col justify-between shadow-inner">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredTables.map(table => (
                  <button
                    key={table.id}
                    onClick={() => handleTableSelect(table)}
                    className={`relative group transition-all duration-300 outline-none ${
                      table.reserved ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    disabled={table.reserved}
                  >
                    <div className={`aspect-square w-full mx-auto max-w-[110px] flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                      table.reserved
                        ? 'bg-zinc-950/80 border-zinc-800 text-zinc-600'
                        : 'bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border-zinc-800 text-zinc-300 group-hover:border-[#FF9F0D] group-hover:text-[#FF9F0D] group-hover:scale-[1.06] group-hover:shadow-[0_10px_30px_rgba(255,159,13,0.15)]'
                    }`}>
                      <span className="text-xs font-semibold text-zinc-500 group-hover:text-[#FF9F0D]/70 transition-colors">Table</span>
                      <span className="text-3xl font-black tracking-tight">{table.id}</span>
                      <span className="text-[10px] font-medium text-zinc-500 mt-1 group-hover:text-zinc-400">{table.capacity} Seats</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 whitespace-nowrap text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20 text-zinc-300">
                      View Table #{table.id} Details
                    </div>
                  </button>
                ))}
              </div>
              {filteredTables.length === 0 && (
                <div className="text-center py-20 my-auto">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-zinc-400 font-medium text-sm">No floor space matches your parameters.</p>
                  <p className="text-xs text-zinc-600 mt-1">Try dropping a few filters or updating your guest count.</p>
                </div>
              )}
              <div className="flex gap-6 mt-12 justify-center pt-6 border-t border-zinc-900/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-md border border-zinc-700 bg-zinc-900" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-md bg-zinc-800 border border-transparent opacity-30" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Fully Booked</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showReservationModal && selectedTable && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md p-4">
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setShowReservationModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800/50 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF9F0D]/10 border border-[#FF9F0D]/30 rounded-xl flex items-center justify-center">
                <span className="text-xl">🥂</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Table Setup #{selectedTable.id}</h2>
                <p className="text-xs text-zinc-400">{selectedTable.location} Placement</p>
              </div>
            </div>
            <div className="space-y-3 bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/60">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-semibold">Accommodates</span>
                <span className="font-bold text-zinc-200">Up to {selectedTable.capacity} Guests</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-semibold">Atmosphere Features</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                  {selectedTable.features.map((feature, idx) => (
                    <span key={idx} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md text-[10px] font-bold">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/40 rounded-xl p-3.5 border border-zinc-800/60 text-xs text-zinc-300 space-y-1">
              <p><span className="text-zinc-500 font-medium">Timeline Slot:</span> {selectedDate} @ {selectedTime}</p>
              <p><span className="text-zinc-500 font-medium">Arrangement:</span> Table held for {partySize} Guests</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#FF9F0D]" /> Seating Notes / Special Requests
              </label>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="High chairs, dietary accommodations, celebrations..."
                rows={2}
                className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF9F0D] focus:ring-1 focus:ring-[#FF9F0D] transition-all resize-none"
              />
            </div>
            <div className="space-y-3 pt-1">
              <button
                onClick={handleReserveTable}
                className="w-full bg-[#FF9F0D] text-black font-black text-md py-3.5 rounded-xl hover:bg-[#FFB84D] transition-all shadow-lg shadow-[#FF9F0D]/10 flex items-center justify-center gap-2"
              >
                <span className="text-white">Confirm Selection</span>
              </button>
              <p className="text-[10px] text-center text-zinc-500">
                Modifications are adjustable through your main booking voucher.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;