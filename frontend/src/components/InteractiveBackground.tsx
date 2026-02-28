import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function InteractiveBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--bg-color)] transition-colors duration-500">
      {/* Animated Background Blobs with Mouse Parallax */}
      <motion.div 
        animate={{ 
          x: mousePos.x * -50, 
          y: mousePos.y * -50 
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/40 dark:bg-cyan-900/20 filter blur-[100px] animate-blob"
        style={{ mixBlendMode: 'var(--blob-mix-blend)' as any }}
      />
      <motion.div 
        animate={{ 
          x: mousePos.x * 40, 
          y: mousePos.y * 40 
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/40 dark:bg-blue-900/20 filter blur-[120px] animate-blob animation-delay-2000"
        style={{ mixBlendMode: 'var(--blob-mix-blend)' as any }}
      />
      <motion.div 
        animate={{ 
          x: mousePos.x * -30, 
          y: mousePos.y * -30 
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-400/40 dark:bg-indigo-900/20 filter blur-[150px] animate-blob animation-delay-4000"
        style={{ mixBlendMode: 'var(--blob-mix-blend)' as any }}
      />
      
      {/* Heartbeat / Medical Wave Animation */}
      <div className="absolute top-1/2 left-0 w-[200%] h-64 -translate-y-1/2 opacity-30 dark:opacity-20 flex animate-heartbeat-scroll text-cyan-500 dark:text-cyan-400">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2000 200" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M 0 100 L 200 100 L 220 70 L 250 150 L 280 40 L 310 130 L 330 100 L 800 100 L 820 70 L 850 150 L 880 40 L 910 130 L 930 100 L 1000 100 M 1000 100 L 1200 100 L 1220 70 L 1250 150 L 1280 40 L 1310 130 L 1330 100 L 1800 100 L 1820 70 L 1850 150 L 1880 40 L 1910 130 L 1930 100 L 2000 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-40 dark:opacity-50"
        style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xNSkiLz48L3N2Zz4=')` }}
      ></div>
    </div>
  );
}
