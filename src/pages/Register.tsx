import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Key, Eye, EyeOff, ShieldCheck, HeartPulse } from 'lucide-react';
import { TopStatusBar } from '../components/TopStatusBar';
import { BrandLogo } from '../components/BrandLogo';
import { useAuth } from '../context/AuthContext';

interface RegisterProps {
  onNavigateLogin: () => void;
  onRegisterSuccess: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigateLogin, onRegisterSuccess }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Harap setujui Syarat & Ketentuan.');
      return;
    }

    setIsLoading(true);
    try {
      await register(name || 'Pengguna Baru', email, password);
      onRegisterSuccess();
    } catch {
      setErrorMsg('Pendaftaran gagal. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 select-none">
      <TopStatusBar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
          {/* Left Hero Column on Desktop */}
          <div className="bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-white p-6 sm:p-8 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-slate-100">
            <div>
              <BrandLogo size="md" showTagline={false} />
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-3">
                Mulai Pola Makan Sehatmu
              </h2>
              <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto mt-1">
                Lacak asupan kalori dan nutrisi mikro-makro dengan mudah setiap hari.
              </p>
            </div>

            {/* Bottom food illustration */}
            <div className="my-6 relative w-48 sm:w-56 h-32 flex items-center justify-center">
              <svg viewBox="0 0 240 70" className="w-full h-full drop-shadow-md">
                <path d="M0 45 Q 60 25, 120 40 T 240 35 L 240 70 L 0 70 Z" fill="#E0F2FE" />
                <g transform="translate(45, 10)">
                  <ellipse cx="20" cy="28" rx="14" ry="20" fill="#65A30D" />
                  <ellipse cx="20" cy="28" rx="11" ry="16" fill="#A3E635" />
                  <circle cx="20" cy="30" r="7" fill="#3F6212" />
                </g>
                <g transform="translate(80, 15)">
                  <ellipse cx="30" cy="32" rx="24" ry="12" fill="#E2E8F0" />
                  <circle cx="20" cy="24" r="9" fill="#EF4444" />
                  <circle cx="36" cy="22" r="8" fill="#DC2626" />
                  <circle cx="30" cy="29" r="7" fill="#F87171" />
                </g>
                <g transform="translate(136, 12)">
                  <ellipse cx="20" cy="26" rx="14" ry="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                  <circle cx="20" cy="26" r="9" fill="#F59E0B" />
                  <circle cx="19" cy="25" r="7" fill="#FBBF24" />
                </g>
              </svg>
            </div>

            <div className="hidden md:flex flex-col items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Data pribadi dan riwayat makanan tersimpan aman
              </span>
              <span className="flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-blue-600" />
                Target nutrisi fleksibel sesuai berat & tinggi badan
              </span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            {/* Back button */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={onNavigateLogin}
                aria-label="Kembali ke masuk"
                className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Daftar Akun</h1>
            </div>

            {errorMsg && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold text-center">
                {errorMsg}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Nama Lengkap */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>

              {/* Kata Sandi */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kata Sandi"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
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

              {/* Konfirmasi Kata Sandi */}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <Key className="w-4 h-4" />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi Kata Sandi"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight">
                  Saya setuju dengan{' '}
                  <button type="button" className="text-blue-600 font-semibold hover:underline">
                    Syarat & Ketentuan
                  </button>{' '}
                  dan{' '}
                  <button type="button" className="text-blue-600 font-semibold hover:underline">
                    Kebijakan Privasi
                  </button>{' '}
                  KaloriKu.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all disabled:opacity-70"
                >
                  {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                </button>
              </div>
            </form>

            <div className="text-center pt-3 text-xs text-slate-500">
              Sudah punya akun?{' '}
              <button
                onClick={onNavigateLogin}
                className="font-bold text-blue-600 hover:text-blue-700 ml-1"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
