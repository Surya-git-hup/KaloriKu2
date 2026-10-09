import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { TopStatusBar } from '../components/TopStatusBar';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onNavigateRegister: () => void;
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigateRegister, onLoginSuccess }) => {
  const { login, loginWithGoogle } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('surya@email.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      await login(emailOrPhone, password);
      onLoginSuccess();
    } catch {
      setErrorMsg('Gagal masuk. Silakan periksa kembali email dan sandi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      onLoginSuccess();
    } catch {
      setErrorMsg('Gagal masuk dengan Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 select-none">
      <TopStatusBar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
          {/* Left Column (Brand Hero Graphic for Desktop, Top Graphic on Mobile) */}
          <div className="bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-white p-6 sm:p-8 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-slate-100">
            <div>
              <BrandLogo size="md" showTagline={true} />
            </div>

            {/* Illustration */}
            <div className="my-6 relative w-48 sm:w-56 h-36 sm:h-44 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-2xl -z-10" />
              <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-md">
                <ellipse cx="100" cy="115" rx="80" ry="24" fill="#EBF4FF" />
                <g transform="translate(142, 60)">
                  <path d="M5 10 L10 55 C10 58 13 60 17 60 L27 60 C31 60 34 58 34 55 L39 10 Z" fill="#93C5FD" fillOpacity="0.4" stroke="#60A5FA" strokeWidth="1.5" />
                  <path d="M7 25 L10 52 C10 55 13 57 16 57 L28 57 C31 57 34 55 34 52 L37 25 Z" fill="#DBEAFE" />
                  <ellipse cx="22" cy="10" rx="17" ry="4" fill="#BFDBFE" stroke="#60A5FA" strokeWidth="1.5" />
                  <path d="M26 4 L28 35" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                </g>
                <g transform="translate(42, 50)">
                  <ellipse cx="50" cy="65" rx="50" ry="22" fill="#E2E8F0" />
                  <ellipse cx="50" cy="56" rx="48" ry="18" fill="#F8FAFC" />
                  <circle cx="28" cy="40" r="14" fill="#4ADE80" />
                  <circle cx="22" cy="48" r="12" fill="#22C55E" />
                  <circle cx="36" cy="48" r="13" fill="#16A34A" />
                  <circle cx="48" cy="38" r="12" fill="#86EFAC" />
                  <rect x="54" y="38" width="16" height="12" rx="4" fill="#D97706" />
                  <rect x="66" y="44" width="14" height="10" rx="3" fill="#B45309" />
                  <path d="M30 52 Q40 40 50 52 Q42 62 30 52 Z" fill="#65A30D" />
                  <circle cx="40" cy="52" r="4" fill="#365314" />
                  <ellipse cx="52" cy="50" rx="14" ry="17" fill="#FFFFFF" stroke="#F3F4F6" strokeWidth="1" />
                  <circle cx="52" cy="50" r="8" fill="#F59E0B" />
                  <circle cx="51" cy="49" r="6" fill="#FBBF24" />
                  <circle cx="68" cy="34" r="7" fill="#EF4444" />
                  <circle cx="66" cy="33" r="2" fill="#FCA5A5" />
                  <circle cx="42" cy="30" r="6" fill="#DC2626" />
                </g>
              </svg>
            </div>

            {/* Feature highlights visible on desktop */}
            <div className="hidden md:flex flex-col items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Pindai makanan otomatis dengan kamera AI
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Pantau target kalori, protein, & karbohidrat
              </span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Selamat Datang
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Masuk ke akun KaloriKu Anda untuk melanjutkan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold text-center">
                  {errorMsg}
                </div>
              )}

              {/* Email / Phone Field */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="Email atau Nomor Telepon"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kata Sandi"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all disabled:opacity-70"
              >
                {isLoading ? 'Memuat...' : 'Masuk'}
              </button>

              {/* Lupa kata sandi */}
              <div className="text-center pt-0.5">
                <button
                  type="button"
                  onClick={() => alert('Fitur pemulihan sandi telah dikirim ke email Anda.')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Lupa kata sandi?
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink mx-3 text-xs text-slate-400 font-medium">atau</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-semibold text-xs flex items-center justify-center gap-2.5 shadow-2xs transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Masuk dengan Google
              </button>
            </form>

            {/* Footer Link */}
            <div className="text-center pt-4 text-xs text-slate-500">
              Belum punya akun?{' '}
              <button
                onClick={onNavigateRegister}
                className="font-bold text-blue-600 hover:text-blue-700 ml-1"
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
