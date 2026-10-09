import React, { useState } from 'react';
import { ArrowLeft, Search, RotateCcw, ChevronRight, Trash2 } from 'lucide-react';
import { TopStatusBar } from '../components/TopStatusBar';
import { useNutrition } from '../context/NutritionContext';
import { FoodItem } from '../types';

interface HistoryProps {
  onBack: () => void;
  onSelectMeal?: (meal: FoodItem) => void;
}

export const History: React.FC<HistoryProps> = ({ onBack, onSelectMeal }) => {
  const { meals, removeMeal } = useNutrition();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Semua' | '7 Hari' | '30 Hari' | 'Custom'>('Semua');

  // Filtered meals based on search and selected filter
  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === '7 Hari') {
      return meal.timestamp.includes('jam') || meal.timestamp.includes('Kemarin') || meal.timestamp.includes('hari');
    }
    if (activeFilter === '30 Hari') {
      return true;
    }
    return true;
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Hapus makanan ini dari riwayat?')) {
      removeMeal(id);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 select-none pb-24 md:pb-12">
      <TopStatusBar />

      {/* Header */}
      <div className="bg-white border-b border-slate-200/60 px-5 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Kembali"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
            Riwayat Makanan
          </h1>
        </div>

        <button
          onClick={() => setSearchQuery('')}
          aria-label="Segarkan Riwayat"
          title="Reset Pencarian"
          className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 py-5 space-y-4">
        {/* Search & Filter Header Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-3 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari makanan yang sudah dikonsumsi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {(['Semua', '7 Hari', '30 Hari', 'Custom'] as const).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Meal Grid: 1 col on mobile, 2 cols on md/lg */}
        <div className="pt-2">
          {filteredMeals.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
              <span className="text-4xl block mb-3">🍽️</span>
              <p className="text-sm font-bold text-slate-700">Tidak ada riwayat makanan</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Makanan yang Anda pindai dari kamera atau tambahkan secara manual akan tersimpan di sini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => onSelectMeal?.(meal)}
                  className="bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-between border border-slate-200/80 shadow-2xs hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Thumbnail */}
                    <div className="w-13 h-13 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100 shadow-2xs p-0.5">
                      {meal.imageUrl ? (
                        <img
                          src={meal.imageUrl}
                          alt={meal.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="text-lg">🍴</div>
                      )}
                    </div>

                    {/* Meal info */}
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {meal.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">
                        <strong className="text-slate-700">{meal.calories} kkal</strong> · P {meal.protein}g · K {meal.carbs}g · L {meal.fat || 12}g
                      </p>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {meal.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <button
                      onClick={(e) => handleDelete(meal.id, e)}
                      aria-label={`Hapus ${meal.name}`}
                      title="Hapus dari riwayat"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
