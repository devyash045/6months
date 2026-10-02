import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { relationshipData } from '../data/relationshipData';

export const FlashCardsSection: React.FC = () => {
  const cards = relationshipData.flashCards;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<Record<string, boolean>>({});
  const [showSparkleEffect, setShowSparkleEffect] = useState(false);

  const currentCard = cards[currentIndex];

  const handleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);

    // If flipped to back for the first time, mark completed and show sparkle
    if (nextFlipped && !completedCards[currentCard.id]) {
      setCompletedCards((prev) => ({ ...prev, [currentCard.id]: true }));
      setShowSparkleEffect(true);
      setTimeout(() => setShowSparkleEffect(false), 1200);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section id="cards" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 overflow-hidden">
      {/* Background soft ambient halo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentCard.accentColor }}
      />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-rose-300 text-xs uppercase tracking-widest font-medium mb-3"
        >
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>Interactive Memory Deck</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3 text-glow-rose"
        >
          Flash Cards of Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-purple-200/80 text-base sm:text-lg max-w-md mx-auto font-light"
        >
          Tap the card to flip and uncover the hidden memory. Swipe or use arrows to navigate.
        </motion.p>
      </div>

      {/* 3D Card Stack Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[440px] sm:min-h-[480px]">
        {/* Sparkle burst on memory revealed */}
        <AnimatePresence>
          {showSparkleEffect && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute -top-12 z-40 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/80 to-purple-600/80 text-white text-xs font-medium shadow-lg backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Memory Unlocked! ✨</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stack Background Cards for 3D depth */}
        <div className="absolute w-[90%] sm:w-[480px] h-[360px] sm:h-[400px] rounded-3xl bg-[#171329]/40 border border-purple-500/10 transform translate-y-6 scale-90 -z-20 pointer-events-none" />
        <div className="absolute w-[95%] sm:w-[495px] h-[370px] sm:h-[410px] rounded-3xl bg-[#171329]/60 border border-purple-500/15 transform translate-y-3 scale-95 -z-10 pointer-events-none" />

        {/* The Active 3D Flippable Card */}
        <div className="perspective-1500 w-full max-w-[510px] h-[390px] sm:h-[420px] px-2 sm:px-0">
          <motion.div
            key={currentCard.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={handleDragEnd}
            onClick={handleFlip}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateY: isFlipped ? 180 : 0
            }}
            transition={{
              rotateY: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="w-full h-full relative preserve-3d cursor-pointer select-none rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] group"
          >
            {/* FRONT OF CARD */}
            <div 
              className="absolute inset-0 backface-hidden rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-rose-400/30 glass-panel-glow bg-[#171329]/90 overflow-hidden"
              style={{
                boxShadow: `0 0 35px ${currentCard.accentColor}25, 0 20px 50px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Background gentle gradient & pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentCard.gradient} opacity-80 pointer-events-none`} />
              
              {/* Top Row */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentCard.icon}</span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-rose-300">
                    Card {currentIndex + 1} of {cards.length}
                  </span>
                </div>
                {completedCards[currentCard.id] && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Read
                  </span>
                )}
              </div>

              {/* Center Content */}
              <div className="relative z-10 my-auto text-center space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-tight">
                  {currentCard.title}
                </h3>
                <div className="w-12 h-[2px] bg-rose-400/40 mx-auto" />
                <p className="font-serif italic text-lg sm:text-xl text-purple-200/90 leading-relaxed px-4">
                  "{currentCard.frontPrompt}"
                </p>
              </div>

              {/* Bottom Instructions & Flip Hint */}
              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-purple-500/20 text-xs text-purple-300/80">
                {currentCard.dateOrPlace && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    {currentCard.dateOrPlace}
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-rose-300 group-hover:text-white font-medium ml-auto">
                  <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Tap to flip</span>
                </div>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div 
              className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-rose-400/40 glass-panel-glow bg-[#1A1430]/95 overflow-hidden"
              style={{
                boxShadow: `0 0 40px ${currentCard.accentColor}35, 0 20px 50px rgba(0,0,0,0.6)`,
              }}
            >
              {/* Back subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-rose-900/20 pointer-events-none" />

              {/* Top back title */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-purple-500/20">
                <span className="font-serif text-lg text-rose-300 font-medium">
                  {currentCard.title}
                </span>
                <span className="text-xs text-purple-300/70 font-mono">
                  The Heart Memory
                </span>
              </div>

              {/* Memory Text */}
              <div className="relative z-10 my-auto py-2">
                <p className="font-handwriting text-2xl sm:text-3xl text-rose-100 leading-relaxed tracking-wide selection:bg-rose-500/40">
                  {currentCard.memory}
                </p>
              </div>

              {/* Bottom Back Controls */}
              <div className="relative z-10 flex items-center justify-between pt-3 border-t border-purple-500/20 text-xs text-purple-300/80">
                <span className="text-rose-400 flex items-center gap-1 font-medium">
                  <Heart className="w-3.5 h-3.5 fill-rose-400" />
                  Always in my heart
                </span>
                <div className="flex items-center gap-1 text-purple-300 hover:text-white">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip back</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Controls & Progress Dots */}
        <div className="mt-8 flex flex-col items-center gap-5 w-full max-w-[500px]">
          <div className="flex items-center justify-between w-full px-6">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel hover:glass-panel-glow text-purple-200 hover:text-white border border-purple-500/30 hover:border-rose-400/40 transition-all text-xs font-medium cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 text-rose-400" />
              <span>Previous</span>
            </button>

            {/* Progress Dots */}
            <div className="flex items-center gap-2">
              {cards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex(idx);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? 'w-6 h-2 bg-gradient-to-r from-rose-400 to-pink-400 shadow-[0_0_10px_#FB7185]'
                      : completedCards[card.id]
                      ? 'w-2 h-2 bg-rose-400/50'
                      : 'w-2 h-2 bg-purple-700/50 hover:bg-purple-500'
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel hover:glass-panel-glow text-purple-200 hover:text-white border border-purple-500/30 hover:border-rose-400/40 transition-all text-xs font-medium cursor-pointer active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 text-rose-400" />
            </button>
          </div>

          <p className="text-[11px] text-purple-300/60 font-light text-center">
            Tip: You can also swipe left or right on mobile to change cards!
          </p>
        </div>
      </div>
    </section>
  );
};
