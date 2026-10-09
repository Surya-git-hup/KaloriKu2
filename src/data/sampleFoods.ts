import { FoodItem, AnalysisData } from '../types';

// Helper to generate food SVG icons as data URLs
export function getFoodSvg(type: 'ayam_geprek' | 'telur' | 'pisang' | 'oatmeal' | 'salad' | 'nasgor' | 'gadogado'): string {
  const svgs: Record<string, string> = {
    ayam_geprek: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="%23FFF5EB"/>
      <circle cx="50" cy="50" r="42" fill="%23F4E0C8"/>
      <!-- Rice -->
      <circle cx="36" cy="38" r="22" fill="%23FFFFFF"/>
      <circle cx="34" cy="36" r="2" fill="%23E2E8F0"/>
      <circle cx="40" cy="42" r="1.5" fill="%23E2E8F0"/>
      <!-- Crispy Fried Chicken -->
      <path d="M42 44 Q56 32 72 46 Q78 64 62 76 Q44 78 38 64 Z" fill="%23C25E00"/>
      <path d="M46 48 Q58 38 68 50 Q72 64 58 72 Q46 72 42 60 Z" fill="%23E67E22"/>
      <!-- Sambal Red Chili -->
      <circle cx="54" cy="54" r="5" fill="%23E02424"/>
      <circle cx="62" cy="58" r="4" fill="%23C81E1E"/>
      <circle cx="48" cy="62" r="3.5" fill="%23E02424"/>
      <!-- Cucumber Slice -->
      <circle cx="74" cy="40" r="10" fill="%2348BB78"/>
      <circle cx="74" cy="40" r="7" fill="%239AE6B4"/>
      <circle cx="74" cy="40" r="3" fill="%23C6F6D5"/>
      <!-- Lettuce Leaves -->
      <path d="M64 22 Q72 16 80 24 Q82 32 74 36 Z" fill="%2338A169"/>
      <path d="M50 18 Q60 14 66 22 Q64 30 54 28 Z" fill="%2348BB78"/>
    </svg>`,

    telur: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="%23FFFBEB"/>
      <circle cx="50" cy="50" r="42" fill="%23FEF3C7"/>
      <!-- Plate -->
      <ellipse cx="50" cy="52" rx="36" ry="32" fill="%23FFFFFF"/>
      <!-- Hard Boiled Egg 1 -->
      <ellipse cx="38" cy="48" rx="20" ry="24" fill="%23F3F4F6"/>
      <circle cx="40" cy="48" r="13" fill="%23F59E0B"/>
      <circle cx="42" cy="46" r="10" fill="%23FBBF24"/>
      <!-- Hard Boiled Egg 2 -->
      <ellipse cx="62" cy="56" rx="18" ry="22" fill="%23E5E7EB"/>
      <circle cx="60" cy="56" r="11" fill="%23D97706"/>
      <circle cx="59" cy="54" r="8" fill="%23F59E0B"/>
    </svg>`,

    pisang: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="%23FEFCE8"/>
      <circle cx="50" cy="50" r="42" fill="%23FEF08A"/>
      <!-- Bananas bunch -->
      <path d="M22 68 C 24 35, 55 24, 76 34 C 74 38, 52 32, 34 68 C 30 74, 20 74, 22 68 Z" fill="%23FACC15"/>
      <path d="M28 74 C 32 44, 62 36, 82 46 C 79 50, 58 44, 40 76 C 36 80, 26 80, 28 74 Z" fill="%23EAB308"/>
      <!-- Tips -->
      <path d="M22 68 Q20 72 24 76 Q26 74 24 70 Z" fill="%23713F12"/>
      <path d="M76 34 Q80 32 82 36 Q78 38 76 34 Z" fill="%23854D0E"/>
    </svg>`,

    oatmeal: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="%23FDF4FF"/>
      <circle cx="50" cy="50" r="40" fill="%23E0E7FF"/>
      <!-- Bowl -->
      <circle cx="50" cy="50" r="34" fill="%234338CA"/>
      <circle cx="50" cy="50" r="30" fill="%23EDE9FE"/>
      <!-- Oats texture -->
      <circle cx="50" cy="50" r="26" fill="%23D8B4FE"/>
      <circle cx="44" cy="46" r="4" fill="%23E11D48"/>
      <circle cx="56" cy="44" r="3.5" fill="%233B82F6"/>
      <circle cx="52" cy="56" r="3.5" fill="%238B5CF6"/>
      <circle cx="42" cy="58" r="3" fill="%233B82F6"/>
    </svg>`,

    salad: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="%23F0FDF4"/>
      <!-- Bowl -->
      <circle cx="50" cy="50" r="42" fill="%23DCFCE7"/>
      <circle cx="50" cy="50" r="36" fill="%2322C55E"/>
      <circle cx="50" cy="50" r="32" fill="%2316A34A"/>
      <!-- Green Leaves -->
      <path d="M28 42 Q40 26 56 36 Q42 54 28 42 Z" fill="%2386EFAC"/>
      <path d="M46 64 Q64 52 72 68 Q52 78 46 64 Z" fill="%234ADE80"/>
      <!-- Grilled chicken strips -->
      <path d="M36 48 L64 42" stroke="%23B45309" stroke-width="5" stroke-linecap="round"/>
      <path d="M38 58 L66 52" stroke="%23D97706" stroke-width="5" stroke-linecap="round"/>
      <!-- Cherry tomatoes -->
      <circle cx="40" cy="38" r="5" fill="%23EF4444"/>
      <circle cx="62" cy="62" r="5.5" fill="%23DC2626"/>
    </svg>`,

    nasgor: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="%23FFFBEB"/>
      <!-- Plate -->
      <circle cx="50" cy="50" r="42" fill="%23F3F4F6"/>
      <circle cx="50" cy="50" r="36" fill="%23D97706"/>
      <!-- Rice dome -->
      <ellipse cx="50" cy="52" rx="30" ry="26" fill="%23B45309"/>
      <!-- Sunny side egg -->
      <circle cx="50" cy="46" r="14" fill="%23FFFFFF"/>
      <circle cx="50" cy="46" r="7" fill="%23F59E0B"/>
      <!-- Scallions -->
      <circle cx="36" cy="58" r="2" fill="%2322C55E"/>
      <circle cx="64" cy="56" r="2" fill="%2316A34A"/>
      <!-- Cucumber & tomato slice -->
      <circle cx="70" cy="36" r="7" fill="%2348BB78"/>
      <circle cx="30" cy="36" r="6" fill="%23EF4444"/>
    </svg>`,

    gadogado: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="%23FEFCE8"/>
      <!-- Plate -->
      <circle cx="50" cy="50" r="42" fill="%23E2E8F0"/>
      <!-- Peanut Sauce Base -->
      <circle cx="50" cy="50" r="32" fill="%2392400E"/>
      <!-- Tofu & Tempe cubes -->
      <rect x="36" y="34" width="10" height="10" rx="2" fill="%23FBBF24"/>
      <rect x="52" y="36" width="10" height="10" rx="2" fill="%23D97706"/>
      <rect x="42" y="52" width="10" height="10" rx="2" fill="%23F59E0B"/>
      <!-- Egg slice -->
      <ellipse cx="60" cy="56" rx="8" ry="10" fill="%23FFFFFF"/>
      <circle cx="60" cy="56" r="4" fill="%23F59E0B"/>
      <!-- Greens -->
      <circle cx="34" cy="54" r="5" fill="%2316A34A"/>
    </svg>`,
  };

  return svgs[type] || svgs.ayam_geprek;
}

// Initial food items exactly matching UI in image_0.png
export const INITIAL_MEALS: FoodItem[] = [
  {
    id: 'meal_1',
    name: 'Nasi Ayam Geprek',
    portion: '1 porsi (250 g)',
    calories: 420,
    protein: 28,
    carbs: 55,
    fat: 12,
    fiber: 4,
    sugar: 6,
    sodium: 320,
    imageUrl: getFoodSvg('ayam_geprek'),
    timestamp: '2 jam lalu',
    date: '2026-10-09',
    aiAnalyzed: true,
  },
  {
    id: 'meal_2',
    name: 'Telur Rebus',
    portion: '1 butir (50 g)',
    calories: 78,
    protein: 6,
    carbs: 1,
    fat: 5,
    fiber: 0,
    sugar: 0.6,
    sodium: 62,
    imageUrl: getFoodSvg('telur'),
    timestamp: '5 jam lalu',
    date: '2026-10-09',
    aiAnalyzed: false,
  },
  {
    id: 'meal_3',
    name: 'Pisang',
    portion: '1 buah sedang (118 g)',
    calories: 105,
    protein: 1,
    carbs: 27,
    fat: 0.3,
    fiber: 3,
    sugar: 14,
    sodium: 1,
    imageUrl: getFoodSvg('pisang'),
    timestamp: '7 jam lalu',
    date: '2026-10-09',
    aiAnalyzed: false,
  },
  {
    id: 'meal_4',
    name: 'Oatmeal',
    portion: '1 mangkok (240 g)',
    calories: 310,
    protein: 12,
    carbs: 54,
    fat: 5,
    fiber: 8,
    sugar: 2,
    sodium: 120,
    imageUrl: getFoodSvg('oatmeal'),
    timestamp: 'Kemarin',
    date: '2026-10-08',
    aiAnalyzed: false,
  },
  {
    id: 'meal_5',
    name: 'Salad Ayam',
    portion: '1 porsi (220 g)',
    calories: 280,
    protein: 25,
    carbs: 18,
    fat: 9,
    fiber: 5,
    sugar: 3,
    sodium: 240,
    imageUrl: getFoodSvg('salad'),
    timestamp: 'Kemarin',
    date: '2026-10-08',
    aiAnalyzed: true,
  },
];

// Presets for camera simulation / analysis options
export const FOOD_PRESETS: AnalysisData[] = [
  {
    name: 'Nasi Ayam Geprek',
    portion: '1 porsi (250 g)',
    calories: 420,
    protein: 28,
    carbs: 55,
    fat: 12,
    fiber: 4,
    sugar: 6,
    sodium: 320,
    imageUrl: getFoodSvg('ayam_geprek'),
    confidence: 0.98,
  },
  {
    name: 'Salad Dada Ayam',
    portion: '1 porsi (220 g)',
    calories: 280,
    protein: 25,
    carbs: 18,
    fat: 9,
    fiber: 5,
    sugar: 3,
    sodium: 240,
    imageUrl: getFoodSvg('salad'),
    confidence: 0.95,
  },
  {
    name: 'Nasi Goreng Telur',
    portion: '1 piring (280 g)',
    calories: 485,
    protein: 16,
    carbs: 64,
    fat: 17,
    fiber: 2,
    sugar: 4,
    sodium: 520,
    imageUrl: getFoodSvg('nasgor'),
    confidence: 0.94,
  },
  {
    name: 'Gado-Gado Spesial',
    portion: '1 porsi (260 g)',
    calories: 380,
    protein: 16,
    carbs: 42,
    fat: 15,
    fiber: 7,
    sugar: 8,
    sodium: 340,
    imageUrl: getFoodSvg('gadogado'),
    confidence: 0.97,
  },
  {
    name: 'Telur Rebus (2 Butir)',
    portion: '2 butir (100 g)',
    calories: 156,
    protein: 12,
    carbs: 2,
    fat: 10,
    fiber: 0,
    sugar: 1,
    sodium: 124,
    imageUrl: getFoodSvg('telur'),
    confidence: 0.99,
  },
];
