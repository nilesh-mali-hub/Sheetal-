import React from 'react';
import { motion } from 'motion/react';

export default function FloatingIcons() {
  const icons = ['❤️'];
  
  // Generate random positions, delays, and durations for a more organic feel
  const floatingElements = Array.from({ length: 20 }).map((_, i) => {
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const leftPos = Math.random() * 100; // 0 to 100vw
    const duration = 15 + Math.random() * 20; // 15 to 35s
    const delay = Math.random() * -30; // Random negative delay to start midway
    const size = 1 + Math.random() * 1.5; // Random size multiplier
    
    return (
      <motion.div
        key={i}
        className="fixed z-0 pointer-events-none opacity-20"
        style={{
          left: `${leftPos}vw`,
          bottom: '-10vh',
          fontSize: `${size}rem`,
        }}
        animate={{
          y: ['0vh', '-120vh'],
          x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
          rotate: [0, 180, 360],
          opacity: [0, 0.25, 0.25, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: "linear",
        }}
      >
        {randomIcon}
      </motion.div>
    );
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {floatingElements}
    </div>
  );
}
