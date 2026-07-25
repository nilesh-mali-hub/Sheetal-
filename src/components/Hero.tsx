import React from 'react';

export default function Hero({ opened }: { opened: boolean }) {
  return (
    <section id="hero" className="pt-5 px-6 pb-24 max-w-[940px] mx-auto text-center relative z-10">
      <span className="font-hindi text-2xl text-marigold-light block mb-4">शुभ विवाह</span>
      
      <svg className={`paisley w-[220px] mx-auto mb-2 opacity-90 ${opened ? 'show-paisley' : ''}`} viewBox="0 0 200 90">
        <path d="M20 45c0-18 14-32 32-32s32 14 32 8-10-8-6-18 20-8 24 4 -4 20-16 22c14 4 24 16 24 30 0 18-16 30-34 26" />
      </svg>
      
      <h1 className="font-sans text-[clamp(3.2rem,10vw,5.8rem)] text-gold-light m-0 mt-2 leading-[1.1] text-shadow-[0_2px_26px_rgba(226,134,28,0.22)]">
        Sheetal
        <span className="block text-[0.42em] text-marigold m-0">✦</span>
        Prakash
      </h1>
      
      <p className="italic text-lg md:text-xl text-gold-light opacity-85 mt-4 mb-0">
        request the pleasure of your company on their wedding day
      </p>

      <div className="w-[118px] h-[118px] mt-10 mx-auto border-[1.5px] border-marigold rounded-full flex flex-col items-center justify-center relative bg-[radial-gradient(circle_at_35%_30%,rgba(226,134,28,0.14),transparent_70%)] before:content-[''] before:absolute before:inset-[8px] before:border before:border-dashed before:border-gold/55 before:rounded-full">
        <span className="text-3xl text-marigold-light font-semibold leading-none">05</span>
        <span className="text-[0.68rem] tracking-[0.16em] uppercase text-gold-light mt-1">December</span>
        <span className="text-[0.9rem] text-gold-light opacity-80">2026</span>
      </div>
    </section>
  );
}
