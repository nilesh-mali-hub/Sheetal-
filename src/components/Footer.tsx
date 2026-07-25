import React from 'react';

export default function Footer() {
  return (
    <footer className="pt-[70px] px-6 pb-[54px] text-center text-gold-light relative z-10">
      <div className="w-[78px] h-[78px] mx-auto mb-4 border border-marigold rounded-full flex items-center justify-center font-sans text-[1.3rem] text-marigold-light">
        S&nbsp;P
      </div>
      <p className="text-[0.85rem] opacity-65 m-0 italic font-sans mb-8">
        With love and gratitude — 5th December 2026
      </p>
      <div className="mt-8 pt-6 border-t border-gold/20 flex flex-col items-center justify-center">
        <p className="text-[0.75rem] font-sans tracking-wide text-ivory/60 flex items-center gap-1.5">
          Crafted with <span className="text-[#E2861C] animate-pulse">❤️</span> by 
          <a href="https://nileshmali2026.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#F3B23F] relative inline-block cursor-pointer group">
            Nilesh Mali
            <svg className="absolute -bottom-1.5 left-0 w-full h-[8px] text-[#C9A24B] opacity-80" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0 8 Q 20 2, 40 6 T 100 6" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-[#F3B23F]" strokeLinecap="round" />
            </svg>
          </a>
        </p>
      </div>
    </footer>
  );
}
