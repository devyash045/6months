import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';

interface HeroSectionProps {
  onEnter: () => void;
  hasEntered: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnter, hasEntered }) => {
  const [isSparkling, setIsSparkling] = useState(false);

  const handleEnterClick = () => {
    setIsSparkling(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10"
    >
      {/* Center atmospheric spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[650px] h-[70vw] max-h-[650px] rounded-full bg-gradient-to-tr from-rose-500/15 via-purple-600/15 to-transparent blur-[100px] pointer-events-none" />

      {/* Subtle floating heart icons in background */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] left-[12%] text-rose-400/25 pointer-events-none hidden sm:block"
      >
        <Heart className="w-10 h-10 fill-rose-500/20" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[22%] right-[14%] text-purple-400/25 pointer-events-none hidden sm:block"
      >
        <Heart className="w-12 h-12 fill-purple-500/20" />
      </motion.div>

      {/* Main Hero Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center max-w-2xl mx-auto"
      >
        {/* Top subtle badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-panel border border-rose-400/30 text-rose-300 text-[11px] sm:text-xs tracking-wider uppercase font-medium mb-5 sm:mb-6 shadow-[0_0_20px_rgba(251,113,133,0.15)] text-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse shrink-0" />
          <span>{relationshipData.names.person1} &amp; {relationshipData.names.person2}</span>
          <span className="text-purple-400/60 hidden xs:inline">•</span>
          <span className="text-purple-200/90 font-serif lowercase italic">half a year together</span>
        </motion.div>

        {/* Major Cinematic Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white mb-3 sm:mb-4 text-glow-rose selection:bg-rose-500/40 leading-none"
        >
          {relationshipData.anniversary}.
        </motion.h1>

        {/* Poetic Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-10 px-2"
        >
          <p className="text-base sm:text-xl md:text-2xl font-light text-purple-200/90 tracking-wide font-sans">
            {relationshipData.tagline}
          </p>
          <p className="font-handwriting text-lg sm:text-2xl text-rose-300/90 tracking-wide">
            {relationshipData.introSubtitle}
          </p>
        </motion.div>

        {/* Glowing Interactive CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="relative group w-auto"
        >
          {/* Button Outer Ambient Glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-rose-400 opacity-60 blur-lg group-hover:opacity-100 group-hover:blur-xl transition duration-500 group-hover:duration-200 animate-pulse" />

          <button
            onClick={handleEnterClick}
            disabled={isSparkling}
            className="relative flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#171329] via-[#24183E] to-[#171329] border border-rose-400/40 text-rose-100 font-medium text-sm sm:text-lg tracking-wide shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden whitespace-nowrap"
          >
            {/* Shimmer sweep effect across button */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            <span className="relative z-10 flex items-center gap-2">
              Enter Our Little World
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                ❤️
              </motion.span>
            </span>
          </button>
        </motion.div>

        {/* Scroll Cue if already entered */}
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-14 flex flex-col items-center gap-2 text-purple-300/60 text-xs tracking-widest uppercase cursor-pointer hover:text-rose-300 transition-colors"
            onClick={onEnter}
          >
            <span>Scroll to explore our journey</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-rose-400" />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
