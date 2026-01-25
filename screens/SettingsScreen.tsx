import React from 'react';
import { BarChart2, Cloud, ChevronRight, Speaker, Palette, Share, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SettingsScreen: React.FC = () => {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();

  // 生成基于昵称的默认头像 URL
  const avatarUrl = profile?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.nickname || 'User')}&background=random&size=128`;

  const handleSignOut = async () => {
    try {
      await signOut();
      // 登出后 AuthGuard 会自动显示登录页
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 font-sans">
      <header className="px-5 pt-14 pb-2">
        <h1 className="text-[34px] font-bold tracking-tight leading-tight font-serif">Settings</h1>
      </header>

      {/* Profile Card */}
      <div className="px-4 mb-8 mt-2">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-soft border border-gray-100">
          <div className="relative shrink-0">
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover border border-gray-100 shadow-sm"
            />
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <p className="text-xl font-bold leading-tight tracking-tight font-serif truncate">
              {profile?.nickname || 'User'}
            </p>
            <p className="text-textSub text-sm font-medium mt-1 truncate">
              {user?.email || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Storage Section */}
      <div className="px-4 mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2">Storage</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 divide-y divide-gray-100">
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="bg-oldGold/10 text-oldGold flex items-center justify-center rounded-lg shrink-0 size-8 group-hover:bg-oldGold/20 transition-colors">
              <BarChart2 size={20} />
            </div>
            <p className="text-lg font-medium flex-1 text-textMain">Library Usage</p>
            <ChevronRight className="text-gray-300" size={20} />
          </div>

          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors">
            <div className="bg-oldGold/10 text-oldGold flex items-center justify-center rounded-lg shrink-0 size-8">
              <Cloud size={20} />
            </div>
            <p className="text-lg font-medium flex-1 text-textMain">Cloud Sync</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-oldGold peer-checked:after:border-transparent"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="px-4 mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2">Preferences</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 divide-y divide-gray-100">
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="bg-oldGold/10 text-oldGold flex items-center justify-center rounded-lg shrink-0 size-8 group-hover:bg-oldGold/20 transition-colors">
              <Speaker size={20} />
            </div>
            <p className="text-lg font-medium flex-1 text-textMain">Audio Quality</p>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-base font-normal">High</span>
              <ChevronRight size={20} className="opacity-60" />
            </div>
          </div>

          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="bg-oldGold/10 text-oldGold flex items-center justify-center rounded-lg shrink-0 size-8 group-hover:bg-oldGold/20 transition-colors">
              <Palette size={20} />
            </div>
            <p className="text-lg font-medium flex-1 text-textMain">Appearance</p>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-base font-normal">Light</span>
              <ChevronRight size={20} className="opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Section */}
      <div className="px-4 mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2">Data</h2>
        <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 divide-y divide-gray-100">
          <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="bg-oldGold/10 text-oldGold flex items-center justify-center rounded-lg shrink-0 size-8 group-hover:bg-oldGold/20 transition-colors">
              <Share size={20} />
            </div>
            <p className="text-lg font-medium flex-1 text-textMain">Export Metadata</p>
            <ChevronRight className="text-gray-300" size={20} />
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center px-4 py-3.5 hover:bg-red-50 transition-colors active:bg-red-100"
          >
            <p className="text-lg font-medium text-red-600 flex items-center gap-2">
              <LogOut size={18} />
              Sign Out
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};