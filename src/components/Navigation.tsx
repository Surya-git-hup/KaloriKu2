import React from 'react';
import { Home, History, User, Camera } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavigationProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenScan: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenScan,
}) => {
  return (
    <nav
      aria-label="Navigasi Utama"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
    >
      <div className="max-w-md mx-auto relative px-4 h-16 flex items-center justify-between">
        {/* Tab Beranda */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            currentTab === 'home' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-semibold mt-1 tracking-tight">Beranda</span>
        </button>

        {/* Tab Riwayat */}
        <button
          onClick={() => onSelectTab('history')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            currentTab === 'history' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <History className={`w-5 h-5 ${currentTab === 'history' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-semibold mt-1 tracking-tight">Riwayat</span>
        </button>

        {/* Center Raised FAB: Buka Kamera */}
        <div className="flex-1 flex flex-col items-center justify-center relative -top-4">
          <button
            onClick={onOpenScan}
            aria-label="Buka Kamera Pemindai Makanan"
            className="w-13 h-13 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 hover:bg-blue-700 active:scale-95 transition-transform"
          >
            <Camera className="w-6 h-6 stroke-2" />
          </button>
          <span className="text-[10px] font-semibold text-blue-600 mt-1 whitespace-nowrap">
            Buka Kamera
          </span>
        </div>

        {/* Tab Profil */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
            currentTab === 'profile' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className={`w-5 h-5 ${currentTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-semibold mt-1 tracking-tight">Profil</span>
        </button>
      </div>
    </nav>
  );
};
