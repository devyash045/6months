import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MessageCircleHeart, 
  PhoneCall, 
  Compass, 
  Camera, 
  Heart, 
  Infinity as InfinityIcon,
  X,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import type { TimelineEvent } from '../data/relationshipData';

// Map icon string to Lucide component
const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  MessageCircleHeart,
  PhoneCall,
  Compass,
  Camera,
  Heart,
  Infinity: InfinityIcon,
};

export const TimelineSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineEvent | null>(null);

  return (
    <section id="story" className="relative py-20 sm:py-28 px-3.5 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-rose-300 text-xs uppercase tracking-widest font-medium mb-3"
        >
          <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
          <span>Chapter by Chapter</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-3 text-glow-rose"
        >
          Our Little Story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-purple-200/80 text-sm sm:text-lg max-w-md mx-auto font-light px-2"
        >
          Six months, one thousand little moments. Click each milestone to relive the memory.
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central glowing vertical timeline line */}
        <div className="absolute left-5 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />
        <div className="absolute left-5 sm:left-1/2 top-10 bottom-10 w-[1px] -translate-x-1/2 bg-gradient-to-b from-rose-500/20 via-rose-400/60 to-purple-500/20 shadow-[0_0_10px_rgba(251,113,133,0.4)]" />

        {/* Timeline Items */}
        <div className="space-y-8 sm:space-y-16">
          {relationshipData.timeline.map((item, index) => {
            const Icon = iconMap[item.iconName] || Heart;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } flex-row pl-11 sm:pl-0`}
              >
                {/* Center Node / Dot with Pulse */}
                <div 
                  onClick={() => setSelectedMilestone(item)}
                  className="absolute left-5 sm:left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full glass-panel border border-rose-400/40 flex items-center justify-center bg-[#171329] group-hover:scale-115 group-hover:border-rose-300 transition-all duration-300 shadow-[0_0_20px_rgba(251,113,133,0.3)]">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-rose-300 group-hover:text-white transition-colors" />
                  </div>
                  {/* Subtle radiating ping */}
                  <span className="absolute inset-0 rounded-full bg-rose-400/20 animate-ping pointer-events-none group-hover:bg-rose-400/40" />
                </div>

                {/* Content Card (Half Width on desktop) */}
                <div className={`w-full sm:w-[45%] ${isEven ? 'sm:pr-10' : 'sm:pl-10'}`}>
                  <div
                    onClick={() => setSelectedMilestone(item)}
                    className="group relative p-4 sm:p-6 rounded-2xl glass-panel hover:glass-panel-glow border border-purple-500/20 hover:border-rose-400/40 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
                  >
                    {/* Top ambient highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-400/40 to-transparent" />

                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                      <span className="text-[11px] sm:text-xs font-medium text-rose-300 tracking-wide">
                        {item.date}
                      </span>
                      <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-700/30">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-2xl text-white font-medium group-hover:text-rose-200 transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-purple-300/80 mb-2 sm:mb-3 italic">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-purple-100/70 font-light line-clamp-3 sm:line-clamp-2 leading-relaxed">
                      {item.story}
                    </p>

                    <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-purple-500/15 flex items-center justify-between text-[11px] sm:text-xs text-rose-300/80 group-hover:text-rose-200 font-medium">
                      <span>Click to read full memory</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Glassmorphism Memory Card Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto glass-panel-glow rounded-2xl sm:rounded-3xl border border-rose-400/30 bg-[#171329]/95 p-5 sm:p-8 shadow-2xl text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-purple-950/60 hover:bg-rose-500/20 text-purple-200 hover:text-white border border-purple-500/30 transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Banner */}
              <div className="relative w-full h-44 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-purple-500/20 shadow-inner group">
                <img
                  src={selectedMilestone.photoUrl}
                  alt={selectedMilestone.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171329] via-transparent to-black/30" />

                {/* Floating Heart Sticker */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-rose-500/80 backdrop-blur-md shadow-lg"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                </motion.div>
              </div>

              {/* Memory Details */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-rose-300">
                  <span className="flex items-center gap-1 bg-purple-900/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-purple-700/40">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {selectedMilestone.date}
                  </span>
                  {selectedMilestone.location && (
                    <span className="flex items-center gap-1 bg-purple-900/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-purple-700/40">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                      {selectedMilestone.location}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl text-white font-medium">
                  {selectedMilestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-300 font-sans italic">
                  "{selectedMilestone.subtitle}"
                </p>

                <p className="text-sm sm:text-base text-purple-100/90 font-light leading-relaxed pt-2 border-t border-purple-800/40">
                  {selectedMilestone.story}
                </p>
              </div>

              {/* Bottom Love Note */}
              <div className="mt-5 sm:mt-6 pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-purple-300/70">
                <span className="font-handwriting text-base sm:text-lg text-rose-300">
                  A cherished memory forever engraved in our hearts ✨
                </span>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 hover:bg-rose-500/30 transition-colors self-end sm:self-auto cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
