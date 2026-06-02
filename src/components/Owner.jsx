import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import fryingBg from '../assets/frying.jpg';

const Owner = ({ initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    ownerName: initialData?.fullName || '',
    emailAddress: initialData?.email || '',
    phoneNumber: initialData?.phoneNumber || '',
    restaurantName: '',
    location: '',
    plotNumber: '',
    workingEmail: '',
    restaurantLogo: null,
    businessCanvas: null,
    bankAccount: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOnboardingData({
      ...onboardingData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-12 select-none text-white relative"
      style={{ backgroundImage: `url(${fryingBg})` }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[6px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1100px] flex flex-col items-center space-y-6">
        <h1 className="text-[#F99B0C] text-2xl font-black tracking-wider uppercase drop-shadow-md">
          Finish the Set Up.
        </h1>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 bg-black/50 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-md">
          
          <div className="lg:col-span-5 bg-[#0a0a0a]/90 border border-white/10 rounded-2xl p-8 flex flex-col space-y-8 justify-center">
            <h2 className="text-white font-extrabold text-xl tracking-wide text-center lg:text-left mb-2">
              Register on SupaMenu.
            </h2>

            <div className="flex flex-col space-y-8 relative pl-2">
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= 1 ? 'bg-[#F99B0C] text-white shadow-md shadow-[#F99B0C]/20' : 'bg-neutral-800 text-gray-400'
                }`}>
                  {currentStep > 1 ? <Check size={16} strokeWidth={3} /> : "1"}
                </div>
                <span className={`text-sm font-bold tracking-wide transition-colors ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>
                  Fill your profile info.
                </span>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= 2 ? 'bg-[#F99B0C] text-white shadow-md shadow-[#F99B0C]/20' : 'bg-neutral-800 text-gray-400'
                }`}>
                  {currentStep > 2 ? <Check size={16} strokeWidth={3} /> : "2"}
                </div>
                <span className={`text-sm font-bold tracking-wide transition-colors ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
                  Add location and contact.
                </span>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep === 3 ? 'bg-[#F99B0C] text-white shadow-md' : 'bg-neutral-800 text-gray-400'
                }`}>
                  3
                </div>
                <span className={`text-sm font-bold tracking-wide transition-colors ${currentStep === 3 ? 'text-white' : 'text-gray-500'}`}>
                  Agree to terms of privacy.
                </span>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-7 bg-[#0f0f0f]/95 rounded-2xl p-8 border transition-all ${
            currentStep === 3 ? 'border-[#F99B0C]/40 shadow-[0_0_20px_rgba(249,155,12,0.1)]' : 'border-white/5 shadow-xl'
          }`}>
            
            {currentStep === 1 && (
              <div className="flex flex-col space-y-4">
                <h3 className="text-white text-lg font-bold tracking-wide border-b border-white/5 pb-2">Profile Info.</h3>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Owner Name</label>
                  <input type="text" name="ownerName" value={onboardingData.ownerName} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Email Address</label>
                  <input type="email" name="emailAddress" value={onboardingData.emailAddress} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Phone number</label>
                  <input type="tel" name="phoneNumber" value={onboardingData.phoneNumber} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Restaurant name</label>
                  <input type="text" name="restaurantName" value={onboardingData.restaurantName} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={nextStep} className="bg-[#F99B0C] hover:bg-[#e08b0b] p-3 rounded-full text-white shadow-md transition-transform active:scale-95">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col space-y-4">
                <h3 className="text-white text-lg font-bold tracking-wide border-b border-white/5 pb-2">Address Info.</h3>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Location</label>
                  <input type="text" name="location" value={onboardingData.location} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Plot Number</label>
                  <input type="text" name="plotNumber" value={onboardingData.plotNumber} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Phone number</label>
                  <input type="tel" name="phoneNumber" value={onboardingData.phoneNumber} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Working Email</label>
                  <input type="email" name="workingEmail" value={onboardingData.workingEmail} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={prevStep} className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-full text-white transition-transform active:scale-95">
                    <ArrowLeft size={18} />
                  </button>
                  <button onClick={nextStep} className="bg-[#F99B0C] hover:bg-[#e08b0b] p-3 rounded-full text-white shadow-md transition-transform active:scale-95">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col space-y-4">
                <h3 className="text-white text-lg font-bold tracking-wide border-b border-white/5 pb-2">Restaurant Info.</h3>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Restaurant Logo</label>
                  <input type="file" className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-sm focus:outline-none text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F99B0C]/20 file:text-[#F99B0C] hover:file:bg-[#F99B0C]/30" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Business Canvas</label>
                  <input type="file" className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-sm focus:outline-none text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F99B0C]/20 file:text-[#F99B0C] hover:file:bg-[#F99B0C]/30" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 text-xs font-semibold">Bank account</label>
                  <input type="text" name="bankAccount" value={onboardingData.bankAccount} onChange={handleInputChange} placeholder="Enter operational bank number" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#F99B0C]/40 text-white" />
                </div>

                <div className="flex items-center gap-3 pt-2 pl-1">
                  <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={onboardingData.agreeToTerms} onChange={handleInputChange} className="rounded border-white/20 accent-[#F99B0C] h-4 w-4 bg-transparent cursor-pointer" />
                  <label htmlFor="agreeToTerms" className="text-gray-300 text-xs font-medium cursor-pointer selection:bg-transparent">I agree to the security terms and privacy.</label>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={prevStep} className="bg-neutral-800 hover:bg-neutral-700 p-3 rounded-full text-white transition-transform active:scale-95">
                    <ArrowLeft size={18} />
                  </button>
                  <button className="bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold px-8 py-2.5 rounded-xl text-sm tracking-wide transition-all shadow-[0_4px_15px_rgba(249,155,12,0.3)] active:scale-95">
                    Submit
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Owner;