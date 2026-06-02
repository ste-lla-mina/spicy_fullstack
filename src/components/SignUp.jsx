import React, { useState } from 'react';
import { Eye, EyeOff, User, Store } from 'lucide-react';
import signBg from '../assets/sign.png';
import logoImg from '../assets/logo.png';
import Owner from './Owner';

const SignUp = ({onNavigate}) => {
  const [role, setRole] = useState('client'); 
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (role === 'owner' && isSubmitted) {
    return <Owner initialData={formData} />;
  }

  if (role === 'client' && isSubmitted) {
    return <ClientVerification email={formData.email} />;
  }

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-12 select-none text-white relative"
      style={{ backgroundImage: `url(${signBg})` }}
    >
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-3xl p-8 lg:p-12 border border-white/5 ">
        
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Spicy Logo" className="h-12 object-contain" />
            <span className="text-[#F99B0C] text-4xl font-black tracking-wide font-sans">
              Spicy
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 w-full max-w-md mx-auto bg-[#000000] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold tracking-wide">Sign Up.</h2>
            <p className="text-gray-400 text-xs font-semibold">Choose account type to get started</p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-1.5 bg-black/40 rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => setRole('client')}
              className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold tracking-wide transition-all ${
                role === 'client'
                  ? 'bg-[#F99B0C] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white bg-transparent'
              }`}
            >
              <User size={16} /> Client
            </button>
            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`flex items-center justify-center gap-2 py-1 rounded-lg text-sm font-bold tracking-wide transition-all ${
                role === 'owner'
                  ? 'bg-[#F99B0C] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white bg-transparent'
              }`}
            >
              <Store size={16} /> Owner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest pl-1">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C]/50 transition-all"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest pl-1">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+250 788 123 456" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C]/50 transition-all"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest pl-1">Email</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C]/50 transition-all"
              />
            </div>

            <div className="flex flex-col space-y-1.5 relative">
              <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest pl-1">Password</label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a strong password" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 pr-11 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold py-3 rounded-xl shadow-[0_5px_20px_rgba(249,155,12,0.25)] text-sm tracking-wide transition-all pt-3.5 mt-2"
            >
              Sign Up.
            </button>
          </form>
             <div className="text-center pt-2">
            <p className="text-xs text-gray-400">
              Already have account?{' '}
              <button 
          type="button"
          onClick={() => onNavigate('login')} 
          className="text-[#F99B0C] hover:underline font-semibold bg-transparent border-none cursor-pointer p-0 align-baseline"
        >
          Login
        </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

const ClientVerification = ({ email }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 overflow-hidden select-none text-white"
      style={{ backgroundImage: `url(/src/assets/frying.jpg)` }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md pointer-events-none" />
      <div className="relative z-10 w-full max-w-md bg-[#111111]/95 border border-white/10 rounded-2xl p-10 flex flex-col items-center text-center space-y-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
        <div className="space-y-2">
          <h2 className="text-[#F99B0C] text-2xl font-black tracking-wide">Verify your email.</h2>
          <p className="text-gray-300 text-sm font-medium px-4">Enter the 6-digit code we sent to {email || 'your email'}.</p>
        </div>

        <div className="flex items-center gap-2.5 justify-center">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-14 bg-transparent border border-white/20 rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:border-[#F99B0C] focus:ring-1 focus:ring-[#F99B0C]/40 transition-all"
            />
          ))}
        </div>

        <button className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-98 text-sm tracking-wide">
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignUp;