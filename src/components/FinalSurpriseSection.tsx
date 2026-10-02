import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { relationshipData } from '../data/relationshipData';

export const FinalSurpriseSection: React.FC = () => {
  // Stages: 'idle' | 'tease' | 'countdown' | 'revealed'
  const [stage, setStage] = useState<'idle' | 'tease' | 'countdown' | 'revealed'>('idle');
  const [countdown, setCountdown] = useState(3);

  const startSurpriseFlow = () => {
    setStage('tease');
    setTimeout(() => {
      setStage('countdown');
      setCountdown(3);
    }, 2200);
  };

  useEffect(() => {
    if (stage === 'countdown') {
      if (countdown > 1) {
        const timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setStage('revealed');
          triggerCelebrationConfetti();
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [stage, countdown]);

  const triggerCelebrationConfetti = () => {
    // Initial big burst
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#FB7185', '#FDA4AF', '#A78BFA', '#FFF7ED', '#F43F5E'],
    });

    // Fireworks rhythm
    const end = Date.now() + 3.5 * 1000;
    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.5 + 0.1 },
        colors: ['#FB7185', '#FDA4AF', '#A78BFA', '#FFF7ED'],
      });
    }, 350);
  };

  const handleReset = () => {
    setStage('idle');
    setCountdown(3);
  };

  return (
    <section id="surprise" className="relative py-20 sm:py-28 px-3.5 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 min-h-[500px] sm:min-h-[600px] flex flex-col items-center justify-center text-center">
      {/* Stage: Idle - Button to trigger */}
      {stage === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-5 sm:space-y-6"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px] mx-auto shadow-[0_0_35px_rgba(251,113,133,0.4)]">
            <div className="w-full h-full rounded-full bg-[#171329] flex items-center justify-center">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400 animate-bounce" />
            </div>
          </div>

          <div className="space-y-2 px-2">
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-medium">
              One Last Thing Before You Go...
            </h2>
            <p className="text-purple-200/80 text-xs sm:text-base font-light max-w-md mx-auto">
              There is a special surprise wrapped at the very end of our journal.
            </p>
          </div>

          <div>
            <button
              onClick={startSurpriseFlow}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white font-medium text-xs sm:text-base tracking-wider uppercase shadow-[0_0_30px_rgba(251,113,133,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 sm:gap-2.5 mx-auto"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              <span>Reveal Final Surprise</span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Stage: Tease ("Wait..." -> "There's one more thing.") */}
      {stage === 'tease' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-3 sm:space-y-4 px-2"
        >
          <p className="font-serif text-2xl sm:text-4xl text-purple-300 italic font-light">
            Wait...
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium text-glow-rose">
            There's one more thing.
          </h2>
        </motion.div>
      )}

      {/* Stage: Countdown (3... 2... 1...) */}
      {stage === 'countdown' && (
        <motion.div
          key={countdown}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center space-y-3 sm:space-y-4"
        >
          <span className="font-serif text-7xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-rose-400 via-pink-300 to-white text-glow-rose drop-shadow-[0_0_35px_#FB7185]">
            {countdown}
          </span>
          <span className="text-rose-300/80 font-handwriting text-xl sm:text-2xl tracking-widest">
            get ready ❤️
          </span>
        </motion.div>
      )}

      {/* Stage: Revealed - Fullscreen Cinematic Finale Scene */}
      {stage === 'revealed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl glass-panel-glow border border-rose-400/50 bg-[#171329]/95 p-5 sm:p-14 shadow-[0_0_80px_rgba(251,113,133,0.3)] overflow-hidden"
        >
          {/* Ambient Glowing Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-purple-600/20 to-pink-500/20 pointer-events-none" />

          {/* Center Grand Message */}
          <div className="relative z-10 space-y-4 sm:space-y-6">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 sm:gap-3 text-rose-400"
            >
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-rose-500 text-rose-400" />
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-rose-500 text-rose-400" />
            </motion.div>

            <h2 className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white text-glow-rose leading-tight">
              ❤️ I LOVE YOU ❤️
            </h2>

            <div className="space-y-2 sm:space-y-3 max-w-xl mx-auto py-1 sm:py-2 px-2">
              <p className="text-base sm:text-2xl font-light text-purple-100/90 font-serif italic">
                "{relationshipData.finalSurprise.quote1}"
              </p>
              <p className="text-lg sm:text-3xl font-medium text-rose-300 font-serif">
                "{relationshipData.finalSurprise.quote2}"
              </p>
            </div>

            {/* Bottom Milestone Ribbon */}
            <div className="pt-4 sm:pt-6 border-t border-purple-500/25 space-y-1.5 sm:space-y-2">
              <p className="font-serif text-2xl sm:text-4xl text-white font-medium">
                Happy 6 Months ❤️
              </p>
              <p className="font-handwriting text-xl sm:text-3xl text-rose-300">
                {relationshipData.finalSurprise.closingNote}
              </p>
            </div>

            {/* Replay Option */}
            <div className="pt-4 sm:pt-6 flex justify-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-panel hover:glass-panel-glow border border-purple-500/30 text-purple-200 hover:text-white text-[11px] sm:text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                <span>Experience Again</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
