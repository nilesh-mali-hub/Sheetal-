import React from 'react';
import { Camera } from 'lucide-react';

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section id="gallery" className="pt-[70px] px-6 pb-[100px] max-w-[940px] mx-auto text-center relative z-10">
      <p className="font-cinzel text-[0.7rem] tracking-[0.32em] uppercase text-marigold m-0 mb-[10px]">A Few Moments</p>
      <h2 className="text-[clamp(2.1rem,5vw,3rem)] text-ivory m-0 font-sans">Our Gallery</h2>
      
      <div className="w-full h-[2px] mt-[60px] opacity-60 bg-[repeating-linear-gradient(90deg,var(--color-gold)_0_10px,transparent_10px_18px)]" aria-hidden="true"></div>
      
      <div className="mt-0 flex flex-wrap justify-center gap-y-[6px] gap-x-[34px] pt-[6px]">
        {images.map((src, idx) => {
          let transformClass = '';
          let mtClass = 'mt-[26px]';
          if (idx === 0) transformClass = '-rotate-4';
          if (idx === 1) { transformClass = 'rotate-3'; mtClass = 'mt-[6px]'; }
          if (idx === 2) { transformClass = '-rotate-2'; mtClass = 'mt-[34px]'; }
          if (idx === 3) { transformClass = 'rotate-4'; mtClass = 'mt-[14px]'; }

          return (
            <div 
              key={idx}
              className={`w-[42%] sm:w-[170px] aspect-[4/5] ${mtClass} ${transformClass} bg-[linear-gradient(160deg,rgba(226,134,28,0.1),rgba(107,19,27,0.3))] border border-gold rounded-[2px] flex flex-col items-center justify-center gap-[10px] text-gold-light relative shadow-[0_12px_24px_rgba(0,0,0,0.3)] overflow-hidden before:content-[''] before:absolute before:top-[-14px] before:left-1/2 before:-translate-x-1/2 before:w-[3px] before:h-[16px] before:bg-gold`}
            >
              <img src={src} alt="Gallery" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
