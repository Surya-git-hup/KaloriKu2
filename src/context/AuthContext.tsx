import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const DEFAULT_USER: User = {
  id: 'usr_surya',
  name: 'Surya',
  email: 'surya@email.com',
  dailyTargets: {
    calories: 2000,
    protein: 120,
    carbs: 300,
    fat: 70,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kaloriku_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    // Default logged in to Surya so the user can immediately experience the Home/Dashboard from image
    return DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('kaloriku_auth') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kaloriku_user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (emailOrPhone: string, pass: string): Promise<boolean> => {
    const res = await apiService.login({ emailOrPhone, password: pass });
    setUser(res.user);
    setIsAuthenticated(true);
    localStorage.setItem('kaloriku_auth', 'true');
    localStorage.setItem('kaloriku_token', res.token);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    const mockUser: User = {
      id: 'usr_google_surya',
      name: 'Surya Google',
      email: 'surya@gmail.com',
      dailyTargets: {
        calories: 2000,
        protein: 120,
        carbs: 300,
        fat: 70,
      },
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('kaloriku_auth', 'true');
    localStorage.setItem('kaloriku_token', 'google_mock_token');
    return true;
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    const res = await apiService.register({ name, email, password: pass });
    setUser(res.user);
    setIsAuthenticated(true);
    localStorage.setItem('kaloriku_auth', 'true');
    localStorage.setItem('kaloriku_token', res.token);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('kaloriku_auth', 'false');
    localStorage.removeItem('kaloriku_token');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginWithGoogle,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
