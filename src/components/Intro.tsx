import React, { useState } from 'react';

interface IntroProps {
  opened: boolean;
  onOpen: () => void;
  onLight: () => void;
}

export default function Intro({ opened, onOpen, onLight }: IntroProps) {
  const [lit, setLit] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClick = () => {
    if (opened || lit) return;
    setLit(true);
    onLight();
    
    setTimeout(() => {
      onOpen();
    }, 550);

    setTimeout(() => {
      setHidden(true);
    }, 1850);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center cover-clip bg-[radial-gradient(1000px_700px_at_50%_20%,var(--color-maroon-warm),var(--color-maroon-deep)_65%)] ${opened ? 'opened' : ''} ${hidden ? 'hidden' : ''}`}
    >
      <div className="absolute inset-[18px] border border-gold/50 pointer-events-none after:content-[''] after:absolute after:w-[60px] after:h-[60px] after:border after:border-gold after:bottom-[-1px] after:right-[-1px] after:border-l-0 after:border-t-0 before:content-[''] before:absolute before:w-[60px] before:h-[60px] before:border before:border-gold before:top-[-1px] before:left-[-1px] before:border-r-0 before:border-b-0" />
      
      <div className="text-center p-10 md:p-7 max-w-[480px]">
        <span className="font-hindi text-2xl md:text-3xl text-marigold-light block mb-2">शुभ विवाह</span>
        <p className="text-xs md:text-sm text-gold-light m-0 mb-8 italic">With the blessings of our families</p>

        <button 
          className={`w-[150px] mx-auto mb-6 cursor-pointer bg-none border-none p-0 outline-none ${lit ? 'lit' : ''}`}
          onClick={handleClick}
          aria-label="Light the diya to open your invitation"
        >
          <svg viewBox="0 0 120 100" className="w-full h-auto overflow-visible">
            <ellipse cx="60" cy="72" rx="44" ry="10" fill="#3D1206" opacity="0.5"/>
            <path d="M18 62 Q60 92 102 62 Q98 78 60 78 Q22 78 18 62 Z" fill="#B4762B"/>
            <path d="M14 58 Q60 82 106 58 Q60 68 14 58 Z" fill="#E2861C"/>
            <ellipse cx="60" cy="58" rx="46" ry="9" fill="#F3B23F"/>
            <circle className="flame-glow" cx="60" cy="42" r="26" fill="#F3B23F" opacity="0.25" style={{ filter: 'blur(10px)' }}/>
            <path className="flame" d="M60 20c6 8 10 14 10 21a10 10 0 0 1-20 0c0-7 4-13 10-21z" fill="#F3B23F"/>
            <path className="flame opacity-85" d="M60 30c3 5 5 8 5 12a5 5 0 0 1-10 0c0-4 2-7 5-12z" fill="#8A2430" />
          </svg>
        </button>
        <p className="text-[0.72rem] tracking-[0.2em] uppercase text-marigold-light opacity-85 animate-[pulse_2.2s_ease-in-out_infinite]">Tap to light the diya</p>
      </div>
    </div>
  );
}
