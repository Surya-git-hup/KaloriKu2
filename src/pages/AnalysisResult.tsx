import React, { useState } from 'react';
import { ArrowLeft, Bookmark, CheckCircle2, Clock } from 'lucide-react';
import { TopStatusBar } from '../components/TopStatusBar';
import { MacroDonutChart } from '../components/DonutChart';
import { AnalysisData } from '../types';
import { useNutrition } from '../context/NutritionContext';

interface AnalysisResultProps {
  analysis: AnalysisData;
  onBack: () => void;
  onSaveSuccess: () => void;
  onScanAnother: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  analysis,
  onBack,
  onSaveSuccess,
  onScanAnother,
}) => {
  const { addMeal } = useNutrition();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    addMeal({
      name: analysis.name,
      portion: analysis.portion,
      calories: analysis.calories,
      protein: analysis.protein,
      carbs: analysis.carbs,
      fat: analysis.fat,
      fiber: analysis.fiber,
      sugar: analysis.sugar,
      sodium: analysis.sodium,
      imageUrl: analysis.imageUrl,
      aiAnalyzed: true,
    });
    setIsSaved(true);
    setTimeout(() => {
      onSaveSuccess();
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 select-none pb-12">
      <TopStatusBar />

      {/* Header */}
      <div className="px-5 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-200/60 bg-white">
        <button
          onClick={onBack}
          aria-label="Kembali"
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h1 className="text-base font-bold text-slate-800 tracking-tight">Hasil Analisis</h1>

        <button
          onClick={handleSave}
          aria-label="Simpan Makanan"
          className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-600' : ''}`} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
          {/* Left Column: Food preview card & CTAs */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 shadow-2xs">
                  {analysis.imageUrl ? (
                    <img
                      src={analysis.imageUrl}
                      alt={analysis.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl bg-blue-50">
                      🥗
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-800 truncate">
                    {analysis.name}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{analysis.portion}</span>
                  </div>

                  {/* AI Verified Badge */}
                  <div className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-100/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    <span>Dianalisis dengan AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleSave}
                disabled={isSaved}
                className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:bg-emerald-600"
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span>{isSaved ? 'Tersimpan ke Riwayat!' : 'Simpan ke Riwayat'}</span>
              </button>

              <button
                onClick={onScanAnother}
                className="w-full py-3 px-4 rounded-2xl bg-white border border-blue-200 text-blue-600 hover:bg-blue-50/50 active:scale-[0.99] font-bold text-xs transition-all"
              >
                Coba Makanan Lain
              </button>
            </div>
          </div>

          {/* Right Column: Donut chart & Rincian Gizi */}
          <div className="md:col-span-7 space-y-4">
            {/* Donut Chart & Macronutrient Breakdown Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                {/* Donut Chart */}
                <div className="shrink-0">
                  <MacroDonutChart
                    calories={analysis.calories}
                    protein={analysis.protein}
                    carbs={analysis.carbs}
                    fat={analysis.fat}
                    size={140}
                  />
                </div>

                {/* Macro Legend */}
                <div className="w-full sm:w-auto flex-1 space-y-3.5 pl-0 sm:pl-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="font-semibold text-slate-700">Protein</span>
                    </div>
                    <span className="font-bold text-slate-800 tabular-nums">
                      {analysis.protein} g
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-slate-700">Karbohidrat</span>
                    </div>
                    <span className="font-bold text-slate-800 tabular-nums">
                      {analysis.carbs} g
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="font-semibold text-slate-700">Lemak</span>
                    </div>
                    <span className="font-bold text-slate-800 tabular-nums">
                      {analysis.fat} g
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rincian Gizi Section */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Rincian Gizi
              </h3>

              <div className="space-y-2.5 divide-y divide-slate-100">
                <div className="flex items-center justify-between pt-1 text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">Serat</span>
                  <span className="font-bold text-slate-800 tabular-nums">{analysis.fiber} g</span>
                </div>
                <div className="flex items-center justify-between pt-2.5 text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">Gula</span>
                  <span className="font-bold text-slate-800 tabular-nums">{analysis.sugar} g</span>
                </div>
                <div className="flex items-center justify-between pt-2.5 text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">Natrium</span>
                  <span className="font-bold text-slate-800 tabular-nums">{analysis.sodium} mg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
