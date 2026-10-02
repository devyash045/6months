import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 280, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports touch or is a mobile screen
    const checkTouch = () => {
      if (
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        window.innerWidth < 768
      ) {
        setIsTouch(true);
      }
    };
    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button, a, input, [role="button"], .cursor-pointer, .interactive')
        );
        setIsPointer(isClickable);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn 3-5 tiny floating heart particles on click
      const newParticles: Particle[] = Array.from({ length: 4 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 8,
        color: ['#FB7185', '#FDA4AF', '#A78BFA', '#FFF7ED'][Math.floor(Math.random() * 4)],
      }));

      setParticles((prev) => [...prev.slice(-15), ...newParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseX, mouseY]);

  // Clean up particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [particles]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle glow ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-rose-400/40 mix-blend-screen pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 44 : 28,
          height: isPointer ? 44 : 28,
          backgroundColor: isPointer ? 'rgba(251, 113, 133, 0.15)' : 'rgba(167, 139, 250, 0.08)',
          boxShadow: isPointer ? '0 0 20px rgba(251, 113, 133, 0.4)' : 'none',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Center core dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-300 pointer-events-none shadow-[0_0_10px_#FB7185]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 8 : 5,
          height: isPointer ? 8 : 5,
        }}
      />

      {/* Floating click hearts */}
      {particles.map((p, idx) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 0.6, x: p.x, y: p.y }}
          animate={{
            opacity: 0,
            scale: 1.4,
            x: p.x + (idx % 2 === 0 ? 1 : -1) * (15 + Math.random() * 25),
            y: p.y - (30 + Math.random() * 40),
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed pointer-events-none text-rose-400 select-none text-xs"
          style={{ fontSize: `${p.size}px` }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
