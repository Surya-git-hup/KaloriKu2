import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Clock,
  Sun,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Flame,
  Dumbbell,
  Wheat,
  Droplet,
} from 'lucide-react';
import { TopStatusBar } from '../components/TopStatusBar';
import { EditTargetModal } from '../components/EditTargetModal';
import { useAuth } from '../context/AuthContext';
import { useNutrition } from '../context/NutritionContext';
import { MacroTargets } from '../types';

interface ProfileProps {
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const { targets, updateTargets } = useNutrition();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Settings interactive states
  const [mealReminder, setMealReminder] = useState('3x sehari');
  const [notificationStatus, setNotificationStatus] = useState('Aktif');
  const [themeMode, setThemeMode] = useState('Terang');
  const [language, setLanguage] = useState('Indonesia');

  const handleSaveTargets = (newTargets: MacroTargets) => {
    updateTargets(newTargets);
  };

  const toggleReminder = () => {
    const options = ['3x sehari', '2x sehari', '4x sehari', 'Nonaktif'];
    const idx = options.indexOf(mealReminder);
    setMealReminder(options[(idx + 1) % options.length]);
  };

  const toggleNotification = () => {
    setNotificationStatus((prev) => (prev === 'Aktif' ? 'Mati' : 'Aktif'));
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'Terang' ? 'Gelap' : 'Terang'));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'Indonesia' ? 'English' : 'Indonesia'));
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 select-none pb-24 md:pb-12">
      <TopStatusBar />

      {/* Header bar */}
      <div className="bg-white border-b border-slate-200/60 px-5 sm:px-8 py-3.5 flex items-center justify-between">
        <h1 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
          Profil & Pengaturan
        </h1>
        <button
          onClick={() => setIsEditModalOpen(true)}
          aria-label="Pengaturan Target"
          title="Ubah Target"
          className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
          {/* Left Column: User Profile Card & Target Nutrisi */}
          <div className="md:col-span-5 space-y-5">
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
              {/* Avatar */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-blue-100 border-2 border-white shadow-md shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="50" fill="#E0F2FE" />
                  <circle cx="50" cy="38" r="24" fill="#1E293B" />
                  <circle cx="50" cy="42" r="18" fill="#FCD34D" />
                  <circle cx="43" cy="40" r="2.5" fill="#1E293B" />
                  <circle cx="57" cy="40" r="2.5" fill="#1E293B" />
                  <path d="M45 48 Q50 53 55 48" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M22 92 C26 70, 74 70, 78 92 Z" fill="#2563EB" />
                  <path d="M42 70 Q50 78 58 70 Z" fill="#FCD34D" />
                </svg>
              </div>

              {/* Name & Email */}
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold text-slate-800 tracking-tight truncate">
                  {user?.name || 'Surya'}
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                  {user?.email || 'surya@email.com'}
                </p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">
                  Member KaloriKu
                </span>
              </div>
            </div>

            {/* Target Nutrisi Harian Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Target Nutrisi Harian
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Edit Target
                </button>
              </div>

              {/* 4 Nutrient Columns (matching Screen 7) */}
              <div className="grid grid-cols-4 gap-2 pt-3">
                {/* Kalori */}
                <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-orange-50/40">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-1.5 shadow-2xs">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                    {targets.calories.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">kkal</span>
                </div>

                {/* Protein */}
                <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-blue-50/40">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1.5 shadow-2xs">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                    {targets.protein} g
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">Protein</span>
                </div>

                {/* Karbohidrat */}
                <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-emerald-50/40">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-1.5 shadow-2xs">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                    {targets.carbs} g
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">Karbo</span>
                </div>

                {/* Lemak */}
                <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-amber-50/40">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mb-1.5 shadow-2xs">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                    {targets.fat} g
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">Lemak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings Navigation List */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-3xl divide-y divide-slate-100 border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Pengaturan Pengingat Makan */}
              <button
                onClick={toggleReminder}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    Pengaturan Pengingat Makan
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">{mealReminder}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </button>

              {/* Notifikasi */}
              <button
                onClick={toggleNotification}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">Notifikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">{notificationStatus}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </button>

              {/* Tema */}
              <button
                onClick={toggleTheme}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                    <Sun className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">Tema</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">{themeMode}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </button>

              {/* Bahasa */}
              <button
                onClick={toggleLanguage}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">Bahasa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">{language}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </button>

              {/* Bantuan & Pusat Dukungan */}
              <button
                onClick={() => alert('Pusat Bantuan: Hubungi support@kaloriku.id untuk panduan')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    Bantuan & Pusat Dukungan
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>

              {/* Tentang KaloriKu */}
              <button
                onClick={() => alert('KaloriKu v1.0.0 - Aplikasi Pemantau Kalori & Nutrisi Berbasis AI.')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">Tentang KaloriKu</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>

              {/* Keluar */}
              <button
                onClick={onLogout}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-red-50/50 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-red-600">Keluar</span>
                </div>
                <ChevronRight className="w-4 h-4 text-red-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Target Modal */}
      <EditTargetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentTargets={targets}
        onSave={handleSaveTargets}
      />
    </div>
  );
};
