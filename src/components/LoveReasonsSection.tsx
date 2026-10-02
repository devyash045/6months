import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, CheckCheck } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import type { ReasonItem } from '../data/relationshipData';

export const LoveReasonsSection: React.FC = () => {
  const reasons = relationshipData.reasons;
  const [unlockedIds, setUnlockedIds] = useState<number[]>([1, 2, 3]); // First 3 already unlocked for preview
  const [selectedReason, setSelectedReason] = useState<ReasonItem | null>(null);

  const handleHeartClick = (item: ReasonItem) => {
    if (!unlockedIds.includes(item.id)) {
      setUnlockedIds((prev) => [...prev, item.id]);
    }
    setSelectedReason(item);
  };

  const handleUnlockAll = () => {
    setUnlockedIds(reasons.map((r) => r.id));
  };

  return (
    <section id="reasons" className="relative py-20 sm:py-28 px-3.5 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-rose-300 text-xs uppercase tracking-widest font-medium mb-3"
        >
          <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
          <span>Infinite Reasons</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-3 text-glow-rose"
        >
          30 Little Reasons I Love You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-purple-200/80 text-sm sm:text-lg max-w-md mx-auto font-light px-2"
        >
          Tap any glowing heart to unlock a secret reason why you mean the entire world to me.
        </motion.p>

        {/* Progress Tracker */}
        <div className="mt-6 sm:mt-8 max-w-xs mx-auto px-2">
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2 font-medium">
            <span>{unlockedIds.length} / {reasons.length} unlocked ❤️</span>
            {unlockedIds.length < reasons.length ? (
              <button
                onClick={handleUnlockAll}
                className="text-[11px] text-purple-300 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Reveal all
              </button>
            ) : (
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCheck className="w-3.5 h-3.5" /> All discovered!
              </span>
            )}
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-purple-950/60 overflow-hidden border border-purple-800/40">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-rose-400 shadow-[0_0_10px_#FB7185]"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedIds.length / reasons.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* 30 Hearts Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 sm:gap-3.5 justify-items-center">
        {reasons.map((item, index) => {
          const isUnlocked = unlockedIds.includes(item.id);

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.02 }}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleHeartClick(item)}
              className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                isUnlocked
                  ? 'bg-rose-500/25 border border-rose-400/60 shadow-[0_0_15px_rgba(251,113,133,0.35)] text-rose-300'
                  : 'bg-purple-950/40 border border-purple-700/30 text-purple-400 hover:border-rose-400/40 hover:text-rose-300'
              }`}
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                  isUnlocked
                    ? 'fill-rose-400 text-rose-400 scale-110 animate-pulse'
                    : 'text-purple-400'
                }`}
              />
              <span className="text-[9px] sm:text-[10px] font-mono mt-0.5 font-semibold">
                #{item.id}
              </span>

              {isUnlocked && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-400 shadow-[0_0_6px_#FB7185]" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Reason Reveal Modal */}
      <AnimatePresence>
        {selectedReason && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl sm:rounded-3xl glass-panel-glow border border-rose-400/40 bg-[#171329]/95 p-5 sm:p-9 text-center shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReason(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-purple-950/60 hover:bg-rose-500/20 text-purple-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Heart Badge */}
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mx-auto mb-5 shadow-[0_0_25px_rgba(251,113,133,0.3)]">
                <Heart className="w-8 h-8 fill-rose-500 text-rose-400 animate-pulse" />
              </div>

              <span className="inline-block text-xs font-mono uppercase tracking-widest text-rose-300 font-semibold mb-2">
                Reason #{selectedReason.id}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-4 leading-snug">
                "{selectedReason.reason}"
              </h3>

              {selectedReason.detail && (
                <p className="text-sm text-purple-200/80 font-light leading-relaxed pt-3 border-t border-purple-800/40">
                  {selectedReason.detail}
                </p>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setSelectedReason(null)}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white text-xs font-medium uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  Close &amp; Keep Exploring
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
