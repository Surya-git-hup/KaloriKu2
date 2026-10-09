import React from 'react';
import { Home, History, User, Camera, Bell, LogOut } from 'lucide-react';
import { ActiveTab } from '../types';
import { useAuth } from '../context/AuthContext';

interface DesktopHeaderProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenScan: () => void;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenScan,
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'history', label: 'Riwayat', icon: History },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <header className="hidden md:flex sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 items-center justify-between shadow-2xs">
      {/* Brand */}
      <div className="flex items-center gap-8">
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 2v6a3 3 0 0 0 3 3v11" />
              <path d="M5 2v4" />
              <path d="M8 2v4" />
              <path d="M2 2v4" />
              <path d="M19 2a3 3 0 0 0-3 3c0 2 1.5 3 2 4v13" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-blue-600">
              Kalori<span className="text-blue-700">Ku</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-medium -mt-1">
              Pelacak Nutrisi AI
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        {isAuthenticated && (
          <nav className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Right Desktop Actions */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            {/* CTA Button: Scan Makanan */}
            <button
              onClick={onOpenScan}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              <Camera className="w-4 h-4 stroke-[2.2]" />
              <span>Scan Makanan</span>
            </button>

            {/* Notification button */}
            <button
              onClick={() => alert('Tidak ada notifikasi baru')}
              aria-label="Notifikasi"
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
            </button>

            {/* User Quick Info */}
            <div
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2.5 pl-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold group-hover:ring-2 group-hover:ring-blue-400 transition-all">
                {user?.name?.charAt(0) || 'S'}
              </div>
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-slate-800 block leading-tight">
                  {user?.name || 'Surya'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {user?.email || 'surya@email.com'}
                </span>
              </div>
            </div>

            {/* Logout shortcut */}
            <button
              onClick={() => {
                logout();
                onSelectTab('login');
              }}
              aria-label="Keluar"
              title="Keluar"
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('login')}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Masuk
            </button>
            <button
              onClick={() => onSelectTab('register')}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-xs"
            >
              Daftar Gratis
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
