import React, { useState } from 'react';

interface IntroProps {
  opened: boolean;
  onOpen: () => void;
  onLight: () => void;
}

export default function Intro({ opened, onOpen, onLight }: IntroProps) {
  const [hidden, setHidden] = useState(false);

  const handleClick = () => {
    if (opened) return;
    onLight(); // trigger any background music if needed
    onOpen();

    setTimeout(() => {
      setHidden(true);
    }, 2000);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${hidden ? 'hidden' : ''}`}
      style={{ perspective: '1200px' }}
    >
      {/* Left Door */}
      <div 
        className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-left origin-left transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-auto shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dfknctbhw/image/upload/v1784968831/2fdde36e-b033-4565-8985-e1f6c97e9623_ny5ytc.png')`,
          backgroundSize: '200% 100%',
          transform: opened ? 'rotateY(-110deg)' : 'rotateY(0)'
        }}
      />
      {/* Right Door */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-right origin-right transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-auto shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dfknctbhw/image/upload/v1784968831/2fdde36e-b033-4565-8985-e1f6c97e9623_ny5ytc.png')`,
          backgroundSize: '200% 100%',
          transform: opened ? 'rotateY(110deg)' : 'rotateY(0)'
        }}
      />
      
      {/* Split Line */}
      <div className={`absolute top-0 bottom-0 left-1/2 w-[2px] bg-black/40 -translate-x-1/2 transition-opacity duration-300 pointer-events-none ${opened ? 'opacity-0' : 'opacity-100'}`} />

      {/* Button */}
      <div className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 transition-opacity duration-500 pointer-events-auto ${opened ? 'opacity-0' : 'opacity-100'}`}>
        <button 
          onClick={handleClick}
          className="bg-[#E9C36F] text-[#3A1D0B] font-serif tracking-[0.2em] uppercase text-sm md:text-base px-8 md:px-12 py-4 rounded-[2px] shadow-2xl transition-all hover:scale-105 hover:bg-[#F3D58B] hover:shadow-[0_0_20px_rgba(233,195,111,0.4)] active:scale-95 cursor-pointer border border-[#C9A24B]"
        >
          Open Invitation
        </button>
      </div>
    </div>
  );
}
