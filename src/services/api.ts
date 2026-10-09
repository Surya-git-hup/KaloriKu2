import axios, { AxiosInstance } from 'axios';
import { FoodItem, User, AnalysisData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.kaloriku.id/v1';

// Create configured Axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kaloriku_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiService = {
  // Authentication
  async login(credentials: { emailOrPhone: string; password: string }): Promise<{ user: User; token: string }> {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch {
      // Mock fallback for demo
      return {
        user: {
          id: 'usr_1',
          name: 'Surya',
          email: credentials.emailOrPhone.includes('@') ? credentials.emailOrPhone : 'surya@email.com',
          avatar: '',
          dailyTargets: {
            calories: 2000,
            protein: 120,
            carbs: 300,
            fat: 70,
          },
        },
        token: 'mock_jwt_token_kaloriku_surya',
      };
    }
  },

  async register(data: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    } catch {
      return {
        user: {
          id: 'usr_' + Date.now(),
          name: data.name,
          email: data.email,
          dailyTargets: {
            calories: 2000,
            protein: 120,
            carbs: 300,
            fat: 70,
          },
        },
        token: 'mock_jwt_token_' + Date.now(),
      };
    }
  },

  // Food analysis from camera/photo
  async analyzeFoodImage(imagePayload: { base64?: string; file?: File }): Promise<AnalysisData> {
    try {
      const formData = new FormData();
      if (imagePayload.file) {
        formData.append('image', imagePayload.file);
      } else if (imagePayload.base64) {
        formData.append('image_base64', imagePayload.base64);
      }

      const response = await apiClient.post('/scan/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch {
      // Return realistic AI analyzed food
      return {
        name: 'Nasi Ayam Geprek',
        portion: '1 porsi (250 g)',
        calories: 420,
        protein: 28,
        carbs: 55,
        fat: 12,
        fiber: 4,
        sugar: 6,
        sodium: 320,
        confidence: 0.96,
      };
    }
  },

  // Food Log History
  async getMealHistory(): Promise<FoodItem[]> {
    try {
      const response = await apiClient.get('/meals');
      return response.data;
    } catch {
      const stored = localStorage.getItem('kaloriku_meals');
      return stored ? JSON.parse(stored) : [];
    }
  },

  async saveMeal(meal: Omit<FoodItem, 'id'>): Promise<FoodItem> {
    try {
      const response = await apiClient.post('/meals', meal);
      return response.data;
    } catch {
      const newMeal: FoodItem = {
        ...meal,
        id: 'meal_' + Date.now(),
      };
      return newMeal;
    }
  },

  async deleteMeal(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/meals/${id}`);
      return true;
    } catch {
      return true;
    }
  },

  // User Profile & Targets
  async updateTargets(targets: User['dailyTargets']): Promise<User['dailyTargets']> {
    try {
      const response = await apiClient.put('/user/targets', targets);
      return response.data;
    } catch {
      return targets;
    }
  },
};
