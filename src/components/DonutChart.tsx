import React from 'react';

interface CalorieProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export const CalorieProgressRing: React.FC<CalorieProgressRingProps> = ({
  percentage,
  size = 72,
  strokeWidth = 7,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const validPercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (validPercentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Active progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-sm font-extrabold tracking-tight leading-none">{validPercentage}%</span>
      </div>
    </div>
  );
};

interface MacroDonutChartProps {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  size?: number;
}

export const MacroDonutChart: React.FC<MacroDonutChartProps> = ({
  calories,
  protein,
  carbs,
  fat,
  size = 140,
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Approximate calories from each:
  // Protein = 4 kcal/g, Carbs = 4 kcal/g, Fat = 9 kcal/g
  const calProtein = protein * 4;
  const calCarbs = carbs * 4;
  const calFat = fat * 9;
  const totalCalCalculated = calProtein + calCarbs + calFat || 1;

  const proteinPct = calProtein / totalCalCalculated;
  const carbsPct = calCarbs / totalCalCalculated;
  const fatPct = calFat / totalCalCalculated;

  const proteinLength = proteinPct * circumference;
  const carbsLength = carbsPct * circumference;
  const fatLength = fatPct * circumference;

  // Offsets
  const proteinOffset = 0;
  const carbsOffset = -proteinLength;
  const fatOffset = -(proteinLength + carbsLength);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Protein segment (Blue) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${proteinLength} ${circumference}`}
            strokeDashoffset={proteinOffset}
            fill="none"
            className="transition-all duration-700 ease-out"
          />

          {/* Carbs segment (Green/Emerald) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10b981"
            strokeWidth={strokeWidth}
            strokeDasharray={`${carbsLength} ${circumference}`}
            strokeDashoffset={carbsOffset}
            fill="none"
            className="transition-all duration-700 ease-out"
          />

          {/* Fat segment (Orange/Amber) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f97316"
            strokeWidth={strokeWidth}
            strokeDasharray={`${fatLength} ${circumference}`}
            strokeDashoffset={fatOffset}
            fill="none"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">
            {calories}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
            kkal
          </span>
        </div>
      </div>
      <span className="text-xs font-semibold text-slate-500 mt-2">Total Kalori</span>
    </div>
  );
};
