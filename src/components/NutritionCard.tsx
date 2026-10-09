import React from 'react';
import { Flame, Dumbbell, Wheat, Droplet } from 'lucide-react';

interface NutritionCardProps {
  type: 'calories' | 'protein' | 'carbs' | 'fat';
  value: number;
  target?: number;
  unit?: string;
  variant?: 'home' | 'profile';
}

export const NutritionCard: React.FC<NutritionCardProps> = ({
  type,
  value,
  target,
  unit,
  variant = 'home',
}) => {
  const configs = {
    calories: {
      label: 'Kalori',
      unit: unit || 'kkal',
      icon: Flame,
      iconBg: 'bg-orange-100 text-orange-500',
    },
    protein: {
      label: 'Protein',
      unit: unit || 'g',
      icon: Dumbbell,
      iconBg: 'bg-blue-100 text-blue-600',
    },
    carbs: {
      label: 'Karbohidrat',
      unit: unit || 'g',
      icon: Wheat,
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    fat: {
      label: 'Lemak',
      unit: unit || 'g',
      icon: Droplet,
      iconBg: 'bg-amber-100 text-amber-500',
    },
  };

  const item = configs[type];
  const Icon = item.icon;

  if (variant === 'profile') {
    return (
      <div className="flex flex-col items-center text-center p-2.5 rounded-2xl bg-slate-50/70 border border-slate-100">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${item.iconBg} mb-1.5 shadow-xs`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-bold text-slate-800 leading-tight">
          {value.toLocaleString('id-ID')}
          <span className="text-[11px] font-medium text-slate-500 ml-0.5">{item.unit}</span>
        </span>
        <span className="text-[11px] font-medium text-slate-400 mt-0.5">{item.label}</span>
      </div>
    );
  }

  // Home 3-card variant
  return (
    <div className="flex-1 min-w-0 bg-white rounded-2xl p-3 shadow-xs border border-slate-100/80 flex flex-col justify-between">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.iconBg} mb-2 shadow-xs`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <span className="text-[11px] font-medium text-slate-400 block truncate">{item.label}</span>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-base font-bold text-slate-800 tracking-tight">
            {value.toLocaleString('id-ID')}
          </span>
        </div>
        {target !== undefined && (
          <span className="text-[10px] text-slate-400 font-medium block truncate">
            / {target.toLocaleString('id-ID')} {item.unit}
          </span>
        )}
      </div>
    </div>
  );
};
