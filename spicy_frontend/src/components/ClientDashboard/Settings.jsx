import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield, Bell, Save } from 'lucide-react';
import { authApi, userApi } from '../../api/client';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [notifications, setNotifications] = useState({
    orderStatus: true,
    discounts: false,
    tableReady: true,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    authApi.getMe()
      .then(({ data }) => {
        setProfile({ name: data.name, email: data.email, phone: data.phone });
        if (data.notifications) setNotifications(data.notifications);
      })
      .catch(console.error);
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userApi.updateProfile(profile);
      alert(data.message || 'Profile updated');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    try {
      const { data } = await userApi.updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      alert(data.message || 'Password updated');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update password');
    }
  };

  const saveNotifications = async (next) => {
    setNotifications(next);
    try {
      await userApi.updateNotifications(next);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center text-white p-6 relative font-sans select-none flex flex-col items-center"
      style={{ backgroundImage: `url('/src/assets/bg.png')` }}
    >
      <div className="absolute inset-0 bg-black/95 pointer-events-none z-0" />

      <div className="w-full max-w-4xl relative z-10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#FF9F0D]">Settings</h2>
          <p className="text-xs text-zinc-400 mt-1">Manage your account credentials, security access, and notification alerts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="bg-[#0c0c0e]/60 border border-zinc-900 rounded-2xl p-5 backdrop-blur-md text-center space-y-4">
            <div className="w-20 h-20 bg-[#FF9F0D]/10 border border-[#FF9F0D]/20 rounded-full flex items-center justify-center text-[#FF9F0D] mx-auto text-2xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-zinc-200 text-sm">{profile.name}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">Premium Client Profile</p>
            </div>
            <div className="pt-2 border-t border-zinc-900/60 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Shield className="w-3.5 h-3.5 text-[#FF9F0D]" />
                <span>Account Status: Verified</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0c0c0e]/60 border border-zinc-900 rounded-2xl p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-900/60">
                <User className="w-4 h-4 text-[#FF9F0D]" />
                <h4 className="font-bold text-sm text-zinc-200">Personal Information</h4>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Full Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 font-medium focus:border-[#FF9F0D]/60 focus:outline-none transition-all"
                      />
                      <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Phone Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 font-medium focus:border-[#FF9F0D]/60 focus:outline-none transition-all"
                      />
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 font-medium focus:border-[#FF9F0D]/60 focus:outline-none transition-all"
                    />
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="inline-flex items-center gap-2 bg-[#FF9F0D] hover:bg-[#e08b0b] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
                    <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-[#0c0c0e]/60 border border-zinc-900 rounded-2xl p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-900/60">
                <Lock className="w-4 h-4 text-[#FF9F0D]" />
                <h4 className="font-bold text-sm text-zinc-200">Security & Password</h4>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showCurrent ? "text" : "password"} 
                      name="current"
                      value={passwords.current}
                      onChange={handlePasswordChange}
                      required
                      className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl pl-10 pr-10 py-2.5 text-xs text-zinc-200 font-medium focus:border-[#FF9F0D]/60 focus:outline-none transition-all"
                    />
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300">
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">New Password</label>
                    <div className="relative">
                      <input 
                        type={showNew ? "text" : "password"} 
                        name="new"
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        required
                        className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl pl-10 pr-10 py-2.5 text-xs text-zinc-200 font-medium focus:border-[#FF9F0D]/60 focus:outline-none transition-all"
                      />
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300">
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Confirm Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        name="confirm"
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                        required
                        className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 font-medium focus:border-[#FF9F0D]/60 focus:outline-none transition-all"
                      />
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className="inline-flex items-center gap-2 bg-[#FF9F0D] hover:bg-[#e08b0b] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-[#0c0c0e]/60 border border-zinc-900 rounded-2xl p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-900/60">
                <Bell className="w-4 h-4 text-[#FF9F0D]" />
                <h4 className="font-bold text-sm text-zinc-200">System Notifications</h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-950/40 rounded-xl border border-zinc-900/60">
                  <div>
                    <h5 className="text-xs font-bold text-zinc-200">Order Updates</h5>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Receive immediate notifications when your dishes change status.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications.orderStatus}
                    onChange={(e) => saveNotifications({ ...notifications, orderStatus: e.target.checked })}
                    className="w-4 h-4 rounded border-zinc-900 bg-zinc-950 text-[#FF9F0D] focus:ring-0 focus:ring-offset-0 accent-[#FF9F0D]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-950/40 rounded-xl border border-zinc-900/60">
                  <div>
                    <h5 className="text-xs font-bold text-zinc-200">Exclusive Offers</h5>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Stay informed about upcoming special deals and happy hour campaigns.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications.discounts}
                    onChange={(e) => saveNotifications({ ...notifications, discounts: e.target.checked })}
                    className="w-4 h-4 rounded border-zinc-900 bg-zinc-950 text-[#FF9F0D] focus:ring-0 focus:ring-offset-0 accent-[#FF9F0D]"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;