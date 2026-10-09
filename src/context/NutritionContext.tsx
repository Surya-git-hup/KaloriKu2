import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, AnalysisData, MacroTargets } from '../types';
import { INITIAL_MEALS } from '../data/sampleFoods';

interface NutritionContextType {
  meals: FoodItem[];
  targets: MacroTargets;
  currentAnalysis: AnalysisData | null;
  setCurrentAnalysis: (data: AnalysisData | null) => void;
  addMeal: (meal: Omit<FoodItem, 'id' | 'timestamp' | 'date'>) => FoodItem;
  removeMeal: (id: string) => void;
  updateTargets: (targets: Partial<MacroTargets>) => void;
  todayStats: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    percentage: number;
  };
}

const DEFAULT_TARGETS: MacroTargets = {
  calories: 2000,
  protein: 120,
  carbs: 300,
  fat: 70,
};

// Initial meals that make today's intake match screen 3:
// 1240 kkal, 68g Protein, 150g Carbs, 42g Fat
const SEEDED_MEALS: FoodItem[] = [
  ...INITIAL_MEALS,
  {
    id: 'meal_breakfast_init',
    name: 'Sarapan Bubur Sehat & Susu',
    portion: '1 porsi (300 g)',
    calories: 637,
    protein: 33,
    carbs: 67,
    fat: 25,
    fiber: 4,
    sugar: 8,
    sodium: 410,
    timestamp: '10 jam lalu',
    date: '2026-10-09',
    aiAnalyzed: true,
  },
];

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targets, setTargets] = useState<MacroTargets>(() => {
    const saved = localStorage.getItem('kaloriku_targets');
    return saved ? JSON.parse(saved) : DEFAULT_TARGETS;
  });

  const [meals, setMeals] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('kaloriku_meals');
    return saved ? JSON.parse(saved) : SEEDED_MEALS;
  });

  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisData | null>(null);

  useEffect(() => {
    localStorage.setItem('kaloriku_targets', JSON.stringify(targets));
  }, [targets]);

  useEffect(() => {
    localStorage.setItem('kaloriku_meals', JSON.stringify(meals));
  }, [meals]);

  const updateTargets = (newTargets: Partial<MacroTargets>) => {
    setTargets((prev) => ({ ...prev, ...newTargets }));
  };

  const addMeal = (mealData: Omit<FoodItem, 'id' | 'timestamp' | 'date'>): FoodItem => {
    const newMeal: FoodItem = {
      ...mealData,
      id: 'meal_' + Date.now(),
      timestamp: 'Baru saja',
      date: new Date().toISOString().split('T')[0],
      aiAnalyzed: mealData.aiAnalyzed ?? true,
    };

    setMeals((prev) => [newMeal, ...prev]);
    return newMeal;
  };

  const removeMeal = (id: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  // Calculate today's stats based on meals with date === today's date or recent
  const todayMeals = meals.filter(
    (m) => m.date === '2026-10-09' || m.timestamp.includes('jam') || m.timestamp === 'Baru saja'
  );

  const totalCalories = todayMeals.reduce((acc, m) => acc + (m.calories || 0), 0);
  const totalProtein = todayMeals.reduce((acc, m) => acc + (m.protein || 0), 0);
  const totalCarbs = todayMeals.reduce((acc, m) => acc + (m.carbs || 0), 0);
  const totalFat = todayMeals.reduce((acc, m) => acc + (m.fat || 0), 0);

  const percentage = Math.min(100, Math.round((totalCalories / (targets.calories || 2000)) * 100));

  return (
    <NutritionContext.Provider
      value={{
        meals,
        targets,
        currentAnalysis,
        setCurrentAnalysis,
        addMeal,
        removeMeal,
        updateTargets,
        todayStats: {
          calories: totalCalories,
          protein: totalProtein,
          carbs: totalCarbs,
          fat: totalFat,
          percentage,
        },
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
