import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface TopStatusBarProps {
  darkTheme?: boolean;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({ darkTheme = false }) => {
  return (
    <div
      className={`md:hidden w-full flex items-center justify-between px-6 py-2.5 text-xs font-semibold select-none z-30 ${
        darkTheme ? 'text-white' : 'text-slate-800'
      }`}
    >
      <span className="tracking-tight text-[13px] font-bold">9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <div className="flex items-end gap-0.5 h-3">
          <span className={`w-0.5 h-1.5 rounded-full ${darkTheme ? 'bg-white' : 'bg-slate-700'}`}></span>
          <span className={`w-0.5 h-2 rounded-full ${darkTheme ? 'bg-white' : 'bg-slate-700'}`}></span>
          <span className={`w-0.5 h-2.5 rounded-full ${darkTheme ? 'bg-white' : 'bg-slate-700'}`}></span>
          <span className={`w-0.5 h-3 rounded-full ${darkTheme ? 'bg-white' : 'bg-slate-700'}`}></span>
        </div>
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4 fill-current" />
      </div>
    </div>
  );
};
