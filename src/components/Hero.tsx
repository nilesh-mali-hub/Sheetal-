import React, { useState, useEffect } from 'react';
import ScratchCard from './ScratchCard';

export default function Hero({ opened }: { opened: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    const handleResize = () => setCardWidth(Math.min(300, window.innerWidth - 80));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2026-12-05T18:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 60000); // Update every minute is enough since we don't show seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="pt-5 px-6 pb-24 max-w-[940px] mx-auto text-center relative z-10">
      <span className="font-hindi text-3xl sm:text-4xl text-marigold-light block mb-4">शुभ विवाह</span>
      
      <img 
        src="https://png.pngtree.com/png-vector/20250121/ourmid/pngtree-ganesha-the-embodiment-of-prosperity-and-joy-png-image_15287837.png" 
        alt="Shree Ganeshay Namah"
        referrerPolicy="no-referrer"
        className={`w-[120px] h-[120px] mx-auto mb-6 object-contain drop-shadow-[0_4px_12px_rgba(226,134,28,0.3)] transition-all duration-1000 ${opened ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`}
      />
      
      <h1 className="font-sans text-[clamp(4.2rem,15vw,5.8rem)] text-gold-light m-0 mt-2 leading-[1.1] text-shadow-[0_2px_26px_rgba(226,134,28,0.22)]">
        Sheetal
        <span className="block text-[0.42em] text-marigold m-0">✦</span>
        Prakash Ji
      </h1>
      
      <p className="italic text-xl sm:text-2xl text-gold-light opacity-85 mt-4 mb-0 leading-relaxed">
        request the pleasure of your company on their wedding day
      </p>

      <div className="mt-10 mx-auto w-fit flex flex-col items-center">
        <ScratchCard width={cardWidth} height={150}>
          <div className="w-full h-full bg-maroon border-[1.5px] border-marigold rounded-[10px] flex flex-col items-center justify-center relative before:content-[''] before:absolute before:inset-[6px] before:border before:border-dashed before:border-gold/40 before:rounded-[4px]">
            <span className="text-5xl text-marigold-light font-semibold leading-none">05</span>
            <span className="text-[0.95rem] tracking-[0.16em] uppercase text-gold-light mt-2">December</span>
            <span className="text-[1.1rem] text-gold-light opacity-80 mt-0.5">2026</span>
          </div>
        </ScratchCard>
        <span className="text-[0.7rem] sm:text-[0.8rem] tracking-[0.2em] uppercase text-gold/70 mt-4 block">
          Scratch the golden card to reveal our date
        </span>
      </div>

      <div className="mt-12 flex items-center justify-center gap-6 md:gap-10">
        <div className="flex flex-col items-center">
          <span className="font-sans italic text-4xl sm:text-5xl text-marigold-light font-medium">{timeLeft.days}</span>
          <span className="font-cinzel text-[0.75rem] sm:text-[0.9rem] tracking-[0.2em] uppercase text-gold/70 mt-2">Days</span>
        </div>
        <div className="w-[1px] h-10 bg-gold/30"></div>
        <div className="flex flex-col items-center">
          <span className="font-sans italic text-4xl sm:text-5xl text-marigold-light font-medium">{timeLeft.hours}</span>
          <span className="font-cinzel text-[0.75rem] sm:text-[0.9rem] tracking-[0.2em] uppercase text-gold/70 mt-2">Hours</span>
        </div>
        <div className="w-[1px] h-10 bg-gold/30"></div>
        <div className="flex flex-col items-center">
          <span className="font-sans italic text-4xl sm:text-5xl text-marigold-light font-medium">{timeLeft.minutes}</span>
          <span className="font-cinzel text-[0.75rem] sm:text-[0.9rem] tracking-[0.2em] uppercase text-gold/70 mt-2">Mins</span>
        </div>
      </div>
    </section>
  );
}
