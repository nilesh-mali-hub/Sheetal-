import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion } from 'motion/react';
import Intro from './components/Intro';
import Hero from './components/Hero';
import Events from './components/Events';
import Venue from './components/Venue';
import Gallery from './components/Gallery';
import Wishes from './components/Wishes';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import FloatingIcons from './components/FloatingIcons';

const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    className="relative"
  >
    {children}
  </motion.div>
);

const HeartDivider = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="flex justify-center items-center py-8"
  >
    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
    <svg className="w-5 h-5 mx-4 text-marigold-light animate-pulse" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
  </motion.div>
);

export default function App() {
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const handleLight = () => {
    // Left for backward compatibility with Intro props, but play is handled in handleOpen
  };

  const handleOpen = () => {
    setOpened(true);
    
    // Play music when opened
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio autoplay failed:", err);
      });
    }

    // Spawn petals
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDuration = (6 + Math.random() * 6) + 's';
      p.style.animationDelay = (Math.random() * 6) + 's';
      p.style.opacity = String(0.3 + Math.random() * 0.4);
      p.style.width = p.style.height = (6 + Math.random() * 8) + 'px';
      document.body.appendChild(p);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen text-ivory selection:bg-marigold/30">
      <Background3D />
      <FloatingIcons />
      <div className="bg-motif"></div>

      <Intro opened={opened} onOpen={handleOpen} onLight={handleLight} />

      <main className={`relative z-10 transition-opacity duration-1000 delay-300 ${opened ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative h-16 overflow-hidden -mb-2">
          <svg viewBox="0 0 900 64" preserveAspectRatio="none" className="w-full h-full block">
            <path d="M0 6 Q450 60 900 6" fill="none" stroke="#C9A24B" strokeWidth="1.5" opacity="0.6"/>
          </svg>
        </div>

        <SectionWrapper>
          <Hero opened={opened} />
        </SectionWrapper>
        <HeartDivider />
        
        <SectionWrapper>
          <Events />
        </SectionWrapper>
        <HeartDivider />
        
        <SectionWrapper>
          <Venue />
        </SectionWrapper>
        <HeartDivider />
        
        <SectionWrapper>
          <Gallery />
        </SectionWrapper>
        <HeartDivider />
        
        <SectionWrapper>
          <Wishes />
        </SectionWrapper>
        <HeartDivider />
        
        <SectionWrapper>
          <Footer />
        </SectionWrapper>
      </main>

      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-maroon border border-marigold text-gold-light flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 transition-transform"
        aria-label="Toggle Music"
      >
        <div className="flex items-end h-4">
          <span className="w-0.5 bg-marigold-light mx-0.5 rounded-sm animate-pulse" style={{ height: isPlaying ? '6px' : '2px' }}></span>
          <span className="w-0.5 bg-marigold-light mx-0.5 rounded-sm animate-pulse" style={{ height: isPlaying ? '10px' : '2px', animationDelay: '0.15s' }}></span>
          <span className="w-0.5 bg-marigold-light mx-0.5 rounded-sm animate-pulse" style={{ height: isPlaying ? '14px' : '2px', animationDelay: '0.3s' }}></span>
        </div>
      </button>

      <audio ref={audioRef} loop preload="none">
        <source src="https://assets.mixkit.co/music/preview/mixkit-indian-meditation-ambient-flute-114.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
