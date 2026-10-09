import React from 'react';
import { Bell, ChevronRight, Camera, Sparkles, TrendingUp } from 'lucide-react';
import { TopStatusBar } from '../components/TopStatusBar';
import { CalorieProgressRing } from '../components/DonutChart';
import { NutritionCard } from '../components/NutritionCard';
import { useAuth } from '../context/AuthContext';
import { useNutrition } from '../context/NutritionContext';
import { FoodItem } from '../types';

interface HomeProps {
  onOpenScan: () => void;
  onNavigateHistory: () => void;
  onSelectMealDetail?: (meal: FoodItem) => void;
}

export const Home: React.FC<HomeProps> = ({
  onOpenScan,
  onNavigateHistory,
  onSelectMealDetail,
}) => {
  const { user } = useAuth();
  const { targets, meals, todayStats } = useNutrition();

  const recentMeals = meals.slice(0, 4);
  const remainingCalories = Math.max(0, targets.calories - todayStats.calories);

  return (
    <div className="flex flex-col min-h-full bg-slate-50 select-none pb-24 md:pb-12">
      <TopStatusBar />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 py-3 md:py-6 space-y-6">
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
              Halo, {user?.name || 'Surya'} 👋
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Semangat jaga pola makanmu!
            </p>
          </div>
          <button
            onClick={() => alert('Tidak ada notifikasi baru')}
            aria-label="Lihat Notifikasi"
            className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-slate-50 shadow-2xs relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
          </button>
        </div>

        {/* Desktop Welcome Strip */}
        <div className="hidden md:flex items-center justify-between pb-2 border-b border-slate-200/60">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Dashboard Nutrisi Harian
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              Selamat datang kembali, <strong className="text-slate-800">{user?.name || 'Surya'}</strong>. Tetap konsisten menuju target kebugaranmu!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              Target Harian: {targets.calories} kkal
            </span>
          </div>
        </div>

        {/* Responsive Grid Layout: 1 col on mobile, 12 cols on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Main Left Section */}
          <div className="lg:col-span-7 space-y-5">
            {/* Progress Card (Blue royal banner) */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                {/* Left Circular Ring */}
                <div className="shrink-0 mr-4 sm:mr-6">
                  <CalorieProgressRing percentage={todayStats.percentage} size={84} strokeWidth={9} />
                </div>

                {/* Information */}
                <div className="flex-1">
                  <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider block">
                    Total Hari Ini
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-white tabular-nums">
                      {todayStats.calories.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-blue-200 font-semibold">kkal</span>
                  </div>
                  <p className="text-xs text-blue-100 font-medium mt-1">
                    dari {targets.calories.toLocaleString('id-ID')} kkal{' '}
                    <span className="opacity-80">({remainingCalories > 0 ? `sisa ${remainingCalories} kkal` : 'target tercapai!'})</span>
                  </p>
                </div>

                {/* Action button */}
                <button
                  onClick={onNavigateHistory}
                  aria-label="Buka Rincian Nutrisi"
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors shrink-0 ml-2"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3 Nutrient Summary Cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              <NutritionCard
                type="calories"
                value={todayStats.calories}
                target={targets.calories}
                unit="kkal"
              />
              <NutritionCard
                type="protein"
                value={todayStats.protein}
                target={targets.protein}
                unit="g"
              />
              <NutritionCard
                type="carbs"
                value={todayStats.carbs}
                target={targets.carbs}
                unit="g"
              />
            </div>

            {/* Desktop Quick Action Banner */}
            <div className="hidden md:flex items-center justify-between p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Camera className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Pindai Makanan dengan Kamera AI
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Arahkan kamera ke hidangan makananmu untuk estimasi kalori & gizi instan.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenScan}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-500/20 whitespace-nowrap transition-all"
              >
                Mulai Pindai
              </button>
            </div>
          </div>

          {/* Right Column (Riwayat Terbaru & Macro Breakdown) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Riwayat Terbaru Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Riwayat Terbaru
                </h2>
                <button
                  onClick={onNavigateHistory}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Lihat Semua
                </button>
              </div>

              {/* Meal List */}
              <div className="space-y-2.5">
                {recentMeals.map((meal) => (
                  <div
                    key={meal.id}
                    onClick={() => onSelectMealDetail?.(meal)}
                    className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/70 hover:bg-blue-50/40 border border-slate-100 flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Thumbnail */}
                      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 border border-slate-100 shadow-2xs">
                        {meal.imageUrl ? (
                          <img
                            src={meal.imageUrl}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-base">🍴</div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                          {meal.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                          {meal.calories} kkal • P {meal.protein}g • K {meal.carbs}g
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-medium text-slate-400 shrink-0 ml-2">
                      {meal.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Macro Distribution Overview */}
            <div className="hidden lg:block bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Distribusi Makronutrisi Hari Ini
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-blue-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Protein ({todayStats.protein}g / {targets.protein}g)
                    </span>
                    <span className="text-slate-500">
                      {Math.round((todayStats.protein / targets.protein) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.min(100, (todayStats.protein / targets.protein) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Karbohidrat ({todayStats.carbs}g / {targets.carbs}g)
                    </span>
                    <span className="text-slate-500">
                      {Math.round((todayStats.carbs / targets.carbs) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(100, (todayStats.carbs / targets.carbs) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-orange-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Lemak ({todayStats.fat}g / {targets.fat}g)
                    </span>
                    <span className="text-slate-500">
                      {Math.round((todayStats.fat / targets.fat) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${Math.min(100, (todayStats.fat / targets.fat) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
