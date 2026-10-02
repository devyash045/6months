import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Feather, X } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const letter = relationshipData.letter;

  return (
    <section id="letter" className="relative py-20 sm:py-28 px-3.5 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-rose-500/15 via-purple-600/15 to-transparent blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-rose-300 text-xs uppercase tracking-widest font-medium mb-3"
        >
          <Feather className="w-3 h-3 text-rose-400" />
          <span>From My Heart</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-3 text-glow-rose"
        >
          The Letter
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-purple-200/80 text-sm sm:text-lg max-w-md mx-auto font-light px-2"
        >
          There's something I've been keeping in my heart for you...
        </motion.p>
      </div>

      {/* Unopened Wax-Sealed Envelope State */}
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-lg mx-auto flex flex-col items-center"
        >
          {/* Glowing Envelope Box */}
          <div className="relative w-full h-72 sm:h-80 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#241B42] via-[#1B1433] to-[#120E24] border border-rose-400/30 p-5 sm:p-8 shadow-[0_20px_60px_rgba(251,113,133,0.25)] flex flex-col items-center justify-between text-center overflow-hidden">
            {/* Top Triangular Flap */}
            <div 
              className="absolute top-0 left-0 right-0 h-32 sm:h-36 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(251, 113, 133, 0.15) 0%, rgba(167, 139, 250, 0.08) 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 70%)',
                borderBottom: '1px solid rgba(251, 113, 133, 0.3)',
              }}
            />

            {/* Glowing Golden Wax Seal */}
            <div className="relative z-10 mt-10 sm:mt-14">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-rose-500 to-amber-300 p-[2px] shadow-[0_0_25px_rgba(251,113,133,0.6)] flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <div className="w-full h-full rounded-full bg-rose-700 border border-amber-300/60 flex items-center justify-center text-amber-200">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-rose-500 text-rose-300" />
                </div>
              </motion.div>
            </div>

            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <p className="font-serif text-xl sm:text-2xl text-white font-medium">
                There's something I want to tell you...
              </p>
              <p className="font-handwriting text-lg sm:text-xl text-rose-300">
                For {relationshipData.names.person2} • 6 Months of Us
              </p>
            </div>

            {/* Glowing Open Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative z-10 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-medium text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(251,113,133,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Open it</span>
              <Heart className="w-4 h-4 fill-white text-white" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Opened Romantic Letter Document */
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl mx-auto rounded-2xl sm:rounded-3xl bg-[#FFFDF8] text-neutral-900 p-5 sm:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.6)] border border-amber-200/80"
          style={{
            backgroundImage: 'radial-gradient(#d6cec3 0.8px, transparent 0.8px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Close/Fold Back Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full bg-neutral-100 hover:bg-rose-100 text-neutral-500 hover:text-rose-700 transition-colors cursor-pointer"
            title="Fold back into envelope"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Letter Heading */}
          <div className="border-b border-amber-300/40 pb-4 sm:pb-5 mb-5 sm:mb-8 pr-8 sm:pr-0">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400">
              Personal Letter • Anniversary Edition
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-800 mt-1 sm:mt-2">
              {letter.heading}
            </h3>
          </div>

          {/* Letter Paragraphs with Staggered Fade */}
          <div className="space-y-4 sm:space-y-6">
            {letter.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                className="font-handwriting text-xl sm:text-3xl text-neutral-800 leading-relaxed tracking-wide"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Letter Closing & Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-amber-300/40 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6"
          >
            <div>
              <p className="font-serif italic text-base sm:text-lg text-neutral-600">
                {letter.closing}
              </p>
              <p className="font-handwriting text-3xl sm:text-4xl text-rose-600 font-bold mt-1 sm:mt-2">
                {letter.signature}
              </p>
              <p className="font-serif italic text-xs sm:text-sm text-neutral-500 mt-1">
                Happy 6 months, my favourite person. ❤️
              </p>
            </div>

            {letter.postscript && (
              <div className="text-[11px] sm:text-xs font-mono text-neutral-500 max-w-xs sm:text-right">
                {letter.postscript}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
