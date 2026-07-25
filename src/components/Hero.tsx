import React, { useState, useEffect } from 'react';
import ScratchCard from './ScratchCard';

export default function Hero({ opened }: { opened: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

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
      <span className="font-hindi text-2xl text-marigold-light block mb-4">शुभ विवाह</span>
      
      <svg className={`w-[90px] h-[90px] mx-auto mb-6 text-marigold-light transition-all duration-1000 ${opened ? 'opacity-90 scale-100' : 'opacity-0 scale-90'}`} viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 35 35 L 50 15 L 65 35" />
        <path d="M 30 45 L 50 25 L 70 45" />
        <path d="M 35 55 C 10 50, 10 80, 40 75" />
        <path d="M 65 55 C 90 50, 90 80, 60 75" />
        <path d="M 50 55 C 50 75, 40 95, 45 110 C 50 125, 75 115, 65 100 C 60 90, 50 95, 50 95" />
        <path d="M 40 60 Q 43 63 46 60" strokeWidth="1.5" />
        <path d="M 60 60 Q 57 63 54 60" strokeWidth="1.5" />
        <path d="M 50 40 L 50 48" strokeWidth="1.5" />
        <path d="M 47 44 L 53 44" strokeWidth="1.5" />
      </svg>
      
      <h1 className="font-sans text-[clamp(3.2rem,10vw,5.8rem)] text-gold-light m-0 mt-2 leading-[1.1] text-shadow-[0_2px_26px_rgba(226,134,28,0.22)]">
        Sheetal
        <span className="block text-[0.42em] text-marigold m-0">✦</span>
        Prakash Ji
      </h1>
      
      <p className="italic text-lg md:text-xl text-gold-light opacity-85 mt-4 mb-0">
        request the pleasure of your company on their wedding day
      </p>

      <div className="mt-10 mx-auto w-fit flex flex-col items-center">
        <ScratchCard width={300} height={140}>
          <div className="w-full h-full bg-maroon border-[1.5px] border-marigold rounded-[10px] flex flex-col items-center justify-center relative before:content-[''] before:absolute before:inset-[6px] before:border before:border-dashed before:border-gold/40 before:rounded-[4px]">
            <span className="text-4xl text-marigold-light font-semibold leading-none">05</span>
            <span className="text-[0.75rem] tracking-[0.16em] uppercase text-gold-light mt-2">December</span>
            <span className="text-[0.95rem] text-gold-light opacity-80 mt-0.5">2026</span>
          </div>
        </ScratchCard>
        <span className="text-[0.6rem] md:text-[0.7rem] tracking-[0.2em] uppercase text-gold/70 mt-4 block">
          Scratch the golden card to reveal our date
        </span>
      </div>

      <div className="mt-12 flex items-center justify-center gap-6 md:gap-10">
        <div className="flex flex-col items-center">
          <span className="font-sans italic text-3xl md:text-4xl text-marigold-light font-medium">{timeLeft.days}</span>
          <span className="font-cinzel text-[0.6rem] md:text-xs tracking-[0.2em] uppercase text-gold/70 mt-2">Days</span>
        </div>
        <div className="w-[1px] h-8 bg-gold/30"></div>
        <div className="flex flex-col items-center">
          <span className="font-sans italic text-3xl md:text-4xl text-marigold-light font-medium">{timeLeft.hours}</span>
          <span className="font-cinzel text-[0.6rem] md:text-xs tracking-[0.2em] uppercase text-gold/70 mt-2">Hours</span>
        </div>
        <div className="w-[1px] h-8 bg-gold/30"></div>
        <div className="flex flex-col items-center">
          <span className="font-sans italic text-3xl md:text-4xl text-marigold-light font-medium">{timeLeft.minutes}</span>
          <span className="font-cinzel text-[0.6rem] md:text-xs tracking-[0.2em] uppercase text-gold/70 mt-2">Mins</span>
        </div>
      </div>
    </section>
  );
}
