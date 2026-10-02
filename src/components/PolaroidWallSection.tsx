import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Maximize2, MapPin, Calendar, Heart } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import type { PolaroidItem } from '../data/relationshipData';

export const PolaroidWallSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);

  return (
    <section id="memories" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-rose-300 text-xs uppercase tracking-widest font-medium mb-3"
        >
          <Camera className="w-3 h-3 text-rose-400" />
          <span>Our Scrapbook</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3 text-glow-rose"
        >
          Memory Polaroid Wall
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-purple-200/80 text-base sm:text-lg max-w-md mx-auto font-light"
        >
          Snapshots frozen in time. Click any photograph to view the memory up close.
        </motion.p>
      </div>

      {/* Polaroid Grid Scrapbook Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-center justify-items-center">
        {relationshipData.polaroids.map((photo, index) => {
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotate: photo.rotation 
              }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0, 
                zIndex: 30,
                transition: { duration: 0.3 } 
              }}
              onClick={() => setSelectedPhoto(photo)}
              className="relative w-full max-w-[320px] bg-[#FFF7ED] p-4 pb-7 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-pointer group transition-shadow hover:shadow-[0_25px_50px_rgba(251,113,133,0.35)]"
            >
              {/* Washi Tape / Pin Decor on Top Center */}
              <div 
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 opacity-85 z-20 pointer-events-none"
                style={{
                  background: 'rgba(251, 113, 133, 0.45)',
                  backdropFilter: 'blur(2px)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                  transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                }}
              />

              {/* Polaroid Image Box */}
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-900 rounded-[2px]">
                <img
                  src={photo.imageUrl}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Subtle vintage vignette & grain */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Handwritten Caption & Date */}
              <div className="mt-4 px-1 text-center">
                <p className="font-handwriting text-2xl text-neutral-800 leading-tight">
                  {photo.caption}
                </p>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-sans">
                  <span>{photo.date}</span>
                  {photo.location && (
                    <>
                      <span>•</span>
                      <span>{photo.location}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#FFF7ED] p-5 sm:p-7 pb-8 rounded-md shadow-2xl cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Close (ESC)"
              >
                <X className="w-7 h-7" />
              </button>

              {/* High-res Image */}
              <div className="relative w-full max-h-[65vh] overflow-hidden rounded-sm bg-neutral-900 flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.caption}
                  className="w-full h-auto max-h-[65vh] object-contain"
                />
              </div>

              {/* Lightbox Caption & Details */}
              <div className="mt-5 text-center px-4">
                <p className="font-handwriting text-3xl sm:text-4xl text-neutral-800 leading-snug">
                  {selectedPhoto.caption}
                </p>

                {selectedPhoto.note && (
                  <p className="mt-2 text-sm text-neutral-600 font-sans italic">
                    "{selectedPhoto.note}"
                  </p>
                )}

                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    {selectedPhoto.date}
                  </span>
                  {selectedPhoto.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {selectedPhoto.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-rose-600 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    Forever a favorite
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
