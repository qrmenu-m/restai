import React from 'react';

interface Props {
  className?: string;
  variant?: 'gold' | 'copper' | 'subtle';
}

export const KazakhOrnamentDivider: React.FC<Props> = ({ className = '', variant = 'gold' }) => {
  const strokeColor = variant === 'copper' 
    ? '#B8794A' 
    : variant === 'subtle' 
      ? 'rgba(201, 161, 90, 0.2)' 
      : '#C9A15A';

  return (
    <div className={`w-full flex items-center justify-center my-8 md:my-14 overflow-hidden select-none pointer-events-none ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A15A]/30 to-[#C9A15A]/60 max-w-xs md:max-w-md"></div>
      
      {/* Refined geometric Kazakh ram horn / luxury steppe motif in clean tech-vector style */}
      <div className="mx-3 md:mx-6 flex items-center gap-2">
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
          {/* Central horn diamond */}
          <path d="M24 2L29 12L24 22L19 12L24 2Z" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <circle cx="24" cy="12" r="2.5" fill={strokeColor} />
          
          {/* Left spiral curl */}
          <path d="M19 12C15 8 11 8 8 11C5 14 6 19 10 19C13 19 15 16 14 13" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Right spiral curl */}
          <path d="M29 12C33 8 37 8 40 11C43 14 42 19 38 19C35 19 33 16 34 13" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Decorative outer dots */}
          <circle cx="3" cy="12" r="1.5" fill={strokeColor} opacity="0.6" />
          <circle cx="45" cy="12" r="1.5" fill={strokeColor} opacity="0.6" />
        </svg>
      </div>

      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9A15A]/30 to-[#C9A15A]/60 max-w-xs md:max-w-md"></div>
    </div>
  );
};
