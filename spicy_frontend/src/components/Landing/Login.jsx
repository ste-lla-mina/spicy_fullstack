import React, { useState } from 'react';
import { Eye, EyeOff, User, Store, ArrowLeft } from 'lucide-react';
import signBg from '../../assets/sign.png'; 
import logoImg from '../../assets/logo.png';
import OwnerDashboard from '../OwnerDashboard/Ownerdashboard';
import ClientDashboard from '../ClientDashboard/Clientdashboard';

const Login = ({ onNavigate }) => {
  const [role, setRole] = useState('client'); 
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Forgot Password Flow States
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // Step 1: Email, Step 2: Code, Step 3: New Password
  
  const [forgotEmail, setForgotEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert(`A 6-digit verification code has been dispatched to: ${forgotEmail}`);
    setForgotStep(2); 
  };
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    alert("Code verified successfully! You can now set your new password.");
    setForgotStep(3);
  };
  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();
    alert("Your password has been reset successfully. Please log in with your new credentials.");
    setIsForgotPassword(false);
    setForgotStep(1);
    setForgotEmail('');
    setVerificationCode('');
    setNewPassword('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
  };

  if (isLoggedIn) {
    if (role === 'owner') {
      return <OwnerDashboard onLogout={handleLogout} credentials={loginData} />;
    }
    return <ClientDashboard onLogout={handleLogout} credentials={loginData} />;
  }

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-12 select-none text-white relative"
      style={{ backgroundImage: `url(${signBg})` }}
    >
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-3xl p-8 lg:p-12 border border-white/5">
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="flex items-center gap-2 bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
            <img src={logoImg} alt="Spicy Logo" className="h-12 object-contain" />
            <span className="text-[#F99B0C] text-2xl font-extrabold tracking-wide font-sans">
              Spicy
            </span>
          </div>
        </div>
        
        <div className="lg:col-span-5 w-full max-w-md mx-auto bg-[#000000]/90 border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col space-y-6">
          <button 
            onClick={() => {
              if (isForgotPassword) {
                if (forgotStep > 1) {
                  setForgotStep(forgotStep - 1); 
                } else {
                  setIsForgotPassword(false); 
                }
              } else {
                onNavigate('home');
              }
            }}
            className="flex items-center gap-2 text-sm text-[#f99b0c] hover:text-gray-400 transition-colors bg-transparent border-none cursor-pointer p-0 mb-4"
          >
            <ArrowLeft size={16} /> {isForgotPassword ? `Back to Step ${forgotStep - 1 || 'Login'}` : 'Back to Home'}
          </button>

          {isForgotPassword ? (
            <>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-extrabold tracking-wide">
                  {forgotStep === 1 && "Reset Password"}
                  {forgotStep === 2 && "Enter OTP Code"}
                  {forgotStep === 3 && "Create New Password"}
                </h2>
                <p className="text-gray-400 text-xs font-semibold">
                  {forgotStep === 1 && "Enter your email to receive a 6-digit recovery code."}
                  {forgotStep === 2 && `Type the 6-digit token code sent to ${forgotEmail}.`}
                  {forgotStep === 3 && "Secure your profile by typing a brand new password."}
                </p>
              </div>
              {forgotStep === 1 && (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest pl-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="john@example.com" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C]/50 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold py-3 rounded-xl shadow-[0_5px_20px_rgba(249,155,12,0.25)] text-sm tracking-wide transition-all pt-3.5 mt-4"
                  >
                    Send Code
                  </button>
                </form>
              )}
              {forgotStep === 2 && (
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest pl-1">6-Digit Verification Code</label>
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))} // Restricts inputs strictly to digits
                      placeholder="000000" 
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-center tracking-[8px] text-lg font-bold text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C]/50 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold py-3 rounded-xl shadow-[0_5px_20px_rgba(249,155,12,0.25)] text-sm tracking-wide transition-all pt-3.5 mt-4"
                  >
                    Verify Token Code
                  </button>
                </form>
              )}
              {forgotStep === 3 && (
                <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-1.5 relative">
                    <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest pl-1">New Password</label>
                    <div className="relative w-full">
                      <input 
                        type={showNewPassword ? "text" : "password"} 
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password" 
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 pr-11 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C]/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold py-3 rounded-xl shadow-[0_5px_20px_rgba(249,155,12,0.25)] text-sm tracking-wide transition-all pt-3.5 mt-4"
                  >
                    Update Password
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-extrabold tracking-wide">Welcome.</h2>
                <p className="text-gray-400 text-xs font-semibold">Login to SupaMenu.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 p-1.5 bg-black/40 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                    role === 'client'
                      ? 'bg-[#F99B0C] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white bg-transparent'
                  }`}
                >
                  <User size={14} /> Client Portal
                </button>
                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                    role === 'owner'
                      ? 'bg-[#F99B0C] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white bg-transparent'
                  }`}
                >
                  <Store size={14} /> Owner Portal
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest pl-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F99B0C]/50 transition-all"
                  />
                </div>

                <div className="flex flex-col space-y-1.5 relative">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">Password</label>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setForgotStep(1);
                      }}
                      className="text-xs text-[#F99B0C]/80 hover:text-[#F99B0C] transition-colors bg-transparent border-none cursor-pointer p-0"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative w-full">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      required
                      value={loginData.password}
                      onChange={handleChange}
                      placeholder="Enter your password" 
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
                  className="w-full bg-[#F99B0C] hover:bg-[#e08b0b] text-white font-bold py-3 rounded-xl shadow-[0_5px_20px_rgba(249,155,12,0.25)] text-sm tracking-wide transition-all pt-3.5 mt-4"
                >
                  Log In
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-gray-400">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => onNavigate('signup')} 
                    className="text-[#F99B0C] hover:underline font-semibold bg-transparent border-none cursor-pointer p-0 align-baseline"
                  >
                    SignUp
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;