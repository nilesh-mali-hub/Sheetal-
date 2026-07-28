import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = [
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800"
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
  };

  return (
    <section id="gallery" className="pt-[70px] px-6 pb-[100px] max-w-[940px] mx-auto text-center relative z-10">
      <p className="font-cinzel text-[0.85rem] sm:text-[1rem] tracking-[0.32em] uppercase text-marigold m-0 mb-[10px]">A Few Moments</p>
      <h2 className="text-[clamp(2.8rem,8vw,3.5rem)] text-ivory m-0 font-sans">Our Gallery</h2>
      
      <div className="w-full h-[2px] mt-[60px] opacity-60 bg-[repeating-linear-gradient(90deg,var(--color-gold)_0_10px,transparent_10px_18px)]" aria-hidden="true"></div>
      
      <div className="mt-0 flex flex-wrap justify-center gap-y-[6px] gap-x-[34px] pt-[6px]">
        {images.map((src, idx) => {
          let transformClass = '';
          let mtClass = 'mt-[26px]';
          if (idx === 0) transformClass = '-rotate-4 hover:-rotate-2 hover:scale-105';
          if (idx === 1) { transformClass = 'rotate-3 hover:rotate-1 hover:scale-105'; mtClass = 'mt-[6px]'; }
          if (idx === 2) { transformClass = '-rotate-2 hover:-rotate-1 hover:scale-105'; mtClass = 'mt-[34px]'; }
          if (idx === 3) { transformClass = 'rotate-4 hover:rotate-2 hover:scale-105'; mtClass = 'mt-[14px]'; }

          return (
            <div 
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`w-[42%] sm:w-[170px] aspect-[4/5] ${mtClass} ${transformClass} bg-[linear-gradient(160deg,rgba(226,134,28,0.1),rgba(107,19,27,0.3))] border border-gold rounded-[2px] flex flex-col items-center justify-center gap-[10px] text-gold-light relative shadow-[0_12px_24px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer transition-all duration-300 before:content-[''] before:absolute before:top-[-14px] before:left-1/2 before:-translate-x-1/2 before:w-[3px] before:h-[16px] before:bg-gold`}
            >
              <img src={src} alt={`Gallery ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 transition-colors cursor-pointer"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-2 sm:left-10 text-white/70 hover:text-white p-2 z-50 transition-colors cursor-pointer"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={images[selectedIndex].replace('w=800', 'w=1600')}
              alt={`Gallery Fullscreen ${selectedIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain select-none shadow-2xl rounded-sm border border-gold/30"
              onClick={(e) => e.stopPropagation()}
            />
            
            <button 
              className="absolute right-2 sm:right-10 text-white/70 hover:text-white p-2 z-50 transition-colors cursor-pointer"
              onClick={handleNext}
            >
              <ChevronRight size={48} />
            </button>
            
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/60 font-cinzel text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
