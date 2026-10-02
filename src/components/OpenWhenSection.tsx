import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Heart, Feather } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import type { OpenWhenEnvelope } from '../data/relationshipData';

export const OpenWhenSection: React.FC = () => {
  const [activeEnvelope, setActiveEnvelope] = useState<OpenWhenEnvelope | null>(null);

  return (
    <section id="open-when" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-rose-300 text-xs uppercase tracking-widest font-medium mb-3"
        >
          <Mail className="w-3 h-3 text-rose-400" />
          <span>Little Envelopes of Love</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3 text-glow-rose"
        >
          Open When...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-purple-200/80 text-base sm:text-lg max-w-md mx-auto font-light"
        >
          Words written for the exact moment your heart needs to hear them most.
        </motion.p>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
        {relationshipData.openWhen.map((env, index) => {
          return (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setActiveEnvelope(env)}
              className="relative w-full max-w-[340px] cursor-pointer group"
            >
              {/* Envelope Body */}
              <div className="relative w-full h-[220px] rounded-2xl bg-gradient-to-br from-[#20183A] via-[#171329] to-[#0E0C1C] border border-purple-500/25 p-5 flex flex-col justify-between overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] group-hover:border-rose-400/40 group-hover:shadow-[0_20px_45px_rgba(251,113,133,0.2)] transition-all duration-300">
                {/* Envelope Top Triangular Flap Graphic */}
                <div 
                  className="absolute top-0 left-0 right-0 h-28 pointer-events-none transition-transform duration-500 origin-top group-hover:-rotate-x-12"
                  style={{
                    background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.12) 0%, rgba(251, 113, 133, 0.08) 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 50% 68%)',
                    borderBottom: '1px solid rgba(251, 113, 133, 0.25)',
                  }}
                />

                {/* Wax Seal / Stamp Button in center */}
                <div className="absolute top-[36%] left-1/2 -translate-x-1/2 z-20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-700 via-rose-500 to-pink-400 p-[2px] shadow-[0_4px_15px_rgba(251,113,133,0.5)] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(251,113,133,0.7)] transition-all duration-300 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-rose-600 border border-rose-300/40 flex items-center justify-center text-lg">
                      {env.icon}
                    </div>
                  </div>
                </div>

                {/* Top Label */}
                <div className="flex items-center justify-between text-xs text-purple-300/70 z-10">
                  <span className="font-mono text-[10px] tracking-widest uppercase">AIR MAIL • DEAR WIFE JII</span>
                  <Heart className="w-3.5 h-3.5 text-rose-400/80" />
                </div>

                {/* Bottom Content / Envelope Title */}
                <div className="z-10 pt-10 text-center">
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-rose-200 transition-colors">
                    {env.title}
                  </h3>
                  <p className="text-xs text-purple-200/60 line-clamp-1 mt-1 font-light italic">
                    "{env.teaser}"
                  </p>
                </div>

                {/* Bottom interactive hint */}
                <div className="z-10 text-center text-[11px] text-rose-300/80 group-hover:text-rose-200 font-medium tracking-wide">
                  Click to unseal &amp; open ✉️
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Realistic Opened Letter Modal */}
      <AnimatePresence>
        {activeEnvelope && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            {/* Floating Hearts Animation upon opening */}
            <div className="fixed inset-0 pointer-events-none z-60 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 1, 
                    y: '60vh', 
                    x: `${45 + (Math.random() - 0.5) * 40}vw`,
                    scale: 0.5 
                  }}
                  animate={{ 
                    opacity: 0, 
                    y: '-10vh', 
                    scale: Math.random() * 0.8 + 0.8,
                    rotate: (Math.random() - 0.5) * 60 
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 1.5, 
                    ease: 'easeOut',
                    delay: i * 0.08 
                  }}
                  className="absolute text-rose-400 text-xl"
                >
                  ❤️
                </motion.div>
              ))}
            </div>

            {/* Letter Paper Container */}
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#FFFDF9] text-neutral-900 p-8 sm:p-12 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-amber-200/60"
              style={{
                backgroundImage: 'radial-gradient(#e5e0d8 0.75px, transparent 0.75px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveEnvelope(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-rose-100 text-neutral-600 hover:text-rose-700 transition-colors cursor-pointer"
                title="Seal envelope & close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Top Stamp & Header */}
              <div className="flex items-center justify-between border-b border-amber-300/40 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeEnvelope.icon}</span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                      {activeEnvelope.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-sans">
                      A personal note from my heart to yours
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-serif">
                  <Feather className="w-3.5 h-3.5" />
                  <span>Sealed With Love</span>
                </div>
              </div>

              {/* Letter Body (Handwritten feel) */}
              <div className="my-6">
                <p className="font-handwriting text-2xl sm:text-3xl text-neutral-800 leading-relaxed whitespace-pre-line">
                  {activeEnvelope.letter}
                </p>
              </div>

              {/* Signoff */}
              <div className="mt-8 pt-6 border-t border-amber-300/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-serif italic text-base text-neutral-600">
                    {activeEnvelope.signoff}
                  </p>
                  <p className="font-handwriting text-3xl text-rose-600 font-bold mt-1">
                    {relationshipData.names.person1} ❤️
                  </p>
                </div>

                <button
                  onClick={() => setActiveEnvelope(null)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
                >
                  Keep Safe in My Heart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
