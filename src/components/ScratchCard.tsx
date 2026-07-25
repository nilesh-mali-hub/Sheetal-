import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ScratchCardProps {
  width: number;
  height: number;
  children: React.ReactNode;
}

export default function ScratchCard({ width, height, children }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const hasRevealed = useRef(false);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with gold gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#E9C36F');
    gradient.addColorStop(0.5, '#F3D58B');
    gradient.addColorStop(1, '#C9A24B');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some sparkle stars
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text
    ctx.fillStyle = '#3A1D0B';
    ctx.font = 'italic 17px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch to reveal ✨', width / 2, height / 2);

  }, [width, height]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkScratched();
  };

  const checkScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = pixels.length / 4;
    const percentScratched = (transparentPixels / totalPixels) * 100;

    if (percentScratched > 50 && !hasRevealed.current) {
      hasRevealed.current = true;
      setIsScratched(true);
      
      const rect = canvas.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { x, y },
        colors: ['#E9C36F', '#F3D58B', '#C9A24B', '#ffffff']
      });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isScratched) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    scratch(x, y);
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    scratch(x, y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="relative inline-block" style={{ width, height }}>
      {/* Base layer (the content to reveal) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
      
      {/* Scratchable canvas layer */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`absolute inset-0 z-10 touch-none cursor-crosshair rounded-[10px] transition-opacity duration-1000 ${isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}
