import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-2.5">
        <div
          className={`${iconSizes[size]} bg-blue-600 rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/20 text-white`}
        >
          {/* KaloriKu Fork and Spoon Icon */}
          <svg
            className="w-3/5 h-3/5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Fork */}
            <path d="M5 2v6a3 3 0 0 0 3 3v11" />
            <path d="M5 2v4" />
            <path d="M8 2v4" />
            <path d="M2 2v4" />
            {/* Spoon */}
            <path d="M19 2a3 3 0 0 0-3 3c0 2 1.5 3 2 4v13" />
          </svg>
        </div>
        <span className={`${textSizes[size]} font-extrabold tracking-tight text-blue-600`}>
          Kalori<span className="text-blue-700">Ku</span>
        </span>
      </div>
      {showTagline && (
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-[260px] font-medium leading-relaxed">
          Hitung Kalori, Jaga Pola Makan,
          <br />
          Raih Versi Terbaik Dirimu
        </p>
      )}
    </div>
  );
};
