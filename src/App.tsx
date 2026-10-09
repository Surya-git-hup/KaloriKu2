import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NutritionProvider, useNutrition } from './context/NutritionContext';
import { ActiveTab, AnalysisData, FoodItem } from './types';
import { FOOD_PRESETS } from './data/sampleFoods';
import { DesktopHeader } from './components/DesktopHeader';
import { Navigation } from './components/Navigation';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { ScanCamera } from './pages/ScanCamera';
import { AnalysisResult } from './pages/AnalysisResult';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

function MainApp() {
  const { isAuthenticated, logout } = useAuth();
  const { currentAnalysis, setCurrentAnalysis } = useNutrition();

  // If not logged in, starts at 'login' (or 'register'). If logged in, starts at 'home'.
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Handle Scan Completed
  const handleAnalysisSuccess = (analysis: AnalysisData) => {
    setCurrentAnalysis(analysis);
    setActiveTab('analysis');
    showToast('Analisis makanan berhasil diselesaikan!');
  };

  // Handle Save from Analysis
  const handleSaveSuccess = () => {
    showToast('Makanan berhasil disimpan ke riwayat!');
    setActiveTab('history');
  };

  // If user clicks a meal in Home/History, open in Analysis view for detailed inspection
  const handleSelectMeal = (meal: FoodItem) => {
    setCurrentAnalysis({
      name: meal.name,
      portion: meal.portion,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      fiber: meal.fiber || 4,
      sugar: meal.sugar || 5,
      sodium: meal.sodium || 280,
      imageUrl: meal.imageUrl,
      confidence: 0.98,
    });
    setActiveTab('analysis');
  };

  // If user is not authenticated, show Login or Register page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
        {authView === 'login' ? (
          <Login
            onNavigateRegister={() => setAuthView('register')}
            onLoginSuccess={() => {
              showToast('Selamat datang di KaloriKu!');
              setActiveTab('home');
            }}
          />
        ) : (
          <Register
            onNavigateLogin={() => setAuthView('login')}
            onRegisterSuccess={() => {
              showToast('Akun berhasil dibuat!');
              setActiveTab('home');
            }}
          />
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-8 inset-x-0 z-50 flex justify-center animate-fade-in pointer-events-none px-4">
            <div className="bg-slate-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-2 border border-slate-700/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {toastMessage}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Authenticated Screens
  const renderScreen = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <ScanCamera
            onBack={() => setActiveTab('home')}
            onAnalysisSuccess={handleAnalysisSuccess}
          />
        );

      case 'analysis':
        return (
          <AnalysisResult
            analysis={currentAnalysis || FOOD_PRESETS[0]}
            onBack={() => setActiveTab('home')}
            onSaveSuccess={handleSaveSuccess}
            onScanAnother={() => setActiveTab('scan')}
          />
        );

      case 'history':
        return (
          <History
            onBack={() => setActiveTab('home')}
            onSelectMeal={handleSelectMeal}
          />
        );

      case 'profile':
        return (
          <Profile
            onLogout={() => {
              logout();
              showToast('Anda telah keluar.');
              setAuthView('login');
            }}
          />
        );

      case 'home':
      default:
        return (
          <Home
            onOpenScan={() => setActiveTab('scan')}
            onNavigateHistory={() => setActiveTab('history')}
            onSelectMealDetail={handleSelectMeal}
          />
        );
    }
  };

  const showBottomNav = activeTab === 'home' || activeTab === 'history' || activeTab === 'profile';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Desktop Top Header (Visible on tablet & desktop, hidden on mobile) */}
      <DesktopHeader
        currentTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenScan={() => setActiveTab('scan')}
      />

      {/* Main Responsive Canvas */}
      <main className="flex-1 flex flex-col w-full">
        {renderScreen()}
      </main>

      {/* Bottom Navigation for mobile phones */}
      {showBottomNav && (
        <Navigation
          currentTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenScan={() => setActiveTab('scan')}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 inset-x-0 z-50 flex justify-center animate-fade-in pointer-events-none px-4">
          <div className="bg-slate-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-2 border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NutritionProvider>
        <MainApp />
      </NutritionProvider>
    </AuthProvider>
  );
}
