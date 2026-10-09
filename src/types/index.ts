export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dailyTargets: MacroTargets;
}

export interface MacroTargets {
  calories: number; // in kkal
  protein: number;  // in g
  carbs: number;    // in g
  fat: number;      // in g
}

export interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  imageUrl?: string;
  timestamp: string; // e.g. "2 jam lalu" or ISO string
  date: string;      // YYYY-MM-DD
  aiAnalyzed?: boolean;
}

export interface AnalysisData {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  imageUrl?: string;
  confidence?: number;
}

export type ActiveTab = 'home' | 'history' | 'profile' | 'scan' | 'analysis' | 'login' | 'register';
