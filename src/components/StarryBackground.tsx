import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const StarryBackground: React.FC = () => {
  // Generate random fixed stars
  const stars = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  // Ambient floating micro-hearts
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 15,
      size: Math.random() * 10 + 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B0A16]">
      {/* Soft atmospheric gradient glows */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full opacity-25 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(23, 19, 41, 0) 70%)',
        }}
      />
      <div 
        className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-[130px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251, 113, 133, 0.35) 0%, rgba(11, 10, 22, 0) 70%)',
        }}
      />
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full opacity-25 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(11, 10, 22, 0) 70%)',
        }}
      />

      {/* Tiny twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Occasional floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute select-none text-rose-400/20"
          style={{
            left: `${h.left}%`,
            bottom: '-5%',
            fontSize: `${h.size}px`,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, (h.id % 2 === 0 ? 25 : -25), 0],
            rotate: [0, (h.id % 2 === 0 ? 20 : -20), 0],
            opacity: [0, 0.3, 0.4, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear',
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Subtle vignette border */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,10,22,0.6)_100%)] pointer-events-none" />
    </div>
  );
};
