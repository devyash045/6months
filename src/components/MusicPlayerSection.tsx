import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react';
import { relationshipData } from '../data/relationshipData';
import { romanticAudio } from '../utils/audioSynth';

interface MusicPlayerSectionProps {
  isGlobalAudioPlaying: boolean;
  onToggleGlobalAudio: () => void;
}

export const MusicPlayerSection: React.FC<MusicPlayerSectionProps> = ({
  isGlobalAudioPlaying,
  onToggleGlobalAudio,
}) => {
  const song = relationshipData.song;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync with global audio if needed
  useEffect(() => {
    setIsPlaying(isGlobalAudioPlaying);
  }, [isGlobalAudioPlaying]);

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    onToggleGlobalAudio();

    // If there's an audio tag and user isn't exclusively using synth:
    if (audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch(() => {
          // If browser fails to load /audio/our-song.mp3, gracefully fallback to romantic Web Audio synth!
          romanticAudio.play();
        });
      } else {
        audioRef.current.pause();
        romanticAudio.pause();
      }
    } else {
      if (nextState) {
        romanticAudio.play();
      } else {
        romanticAudio.pause();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      romanticAudio.setVolume(volume);
      if (audioRef.current) audioRef.current.volume = volume;
    } else {
      setIsMuted(true);
      romanticAudio.setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  return (
    <section id="song" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 overflow-hidden">
      {/* Hidden audio element pointing to the placeholder path */}
      <audio
        ref={audioRef}
        src={song.audioUrl}
        loop
        preload="none"
      />

      {/* Atmospheric pulsing glow synced to music */}
      <motion.div
        animate={{
          scale: isPlaying ? [1, 1.15, 1] : 1,
          opacity: isPlaying ? [0.25, 0.45, 0.25] : 0.15,
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-rose-500/20 via-purple-600/20 to-pink-500/20 blur-[120px] pointer-events-none"
      />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-rose-300 text-xs uppercase tracking-widest font-medium mb-3"
        >
          <Music className="w-3 h-3 text-rose-400" />
          <span>Our Soundtrack</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3 text-glow-rose"
        >
          Our Song
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-purple-200/80 text-base sm:text-lg max-w-md mx-auto font-light"
        >
          Some songs just sound like us.
        </motion.p>
      </div>

      {/* Vinyl Record Player Unit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl mx-auto rounded-3xl glass-panel-glow border border-purple-500/25 bg-[#171329]/90 p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col items-center"
      >
        {/* Top Record Player Arm & Vinyl Presentation */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center">
          {/* Vinyl Disc Body with Realistic Grooves */}
          <div
            className={`relative w-full h-full rounded-full bg-neutral-950 p-2 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.08)] border-4 border-neutral-900 transition-transform ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
            style={{
              backgroundImage:
                'radial-gradient(circle, transparent 40%, rgba(255,255,255,0.04) 41%, transparent 42%, rgba(255,255,255,0.03) 55%, transparent 56%, rgba(255,255,255,0.05) 70%, transparent 71%)',
            }}
          >
            {/* Center Label / Album Artwork */}
            <div className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-rose-400/50 overflow-hidden shadow-inner flex items-center justify-center bg-gradient-to-tr from-purple-900 to-rose-900">
              <img
                src={song.albumArt}
                alt="Album Cover"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Heart className="w-6 h-6 fill-rose-400 text-rose-400 animate-pulse" />
              </div>
              {/* Spindle hole */}
              <div className="absolute w-3.5 h-3.5 rounded-full bg-[#0B0A16] border border-white/40 shadow-inner z-10" />
            </div>
          </div>

          {/* Turntable Stylus / Needle Arm */}
          <div
            className={`absolute top-0 right-2 w-28 h-32 pointer-events-none origin-top-right transition-transform duration-700 ease-in-out ${
              isPlaying ? 'rotate-20' : '-rotate-12'
            }`}
          >
            <div className="w-3 h-3 rounded-full bg-neutral-300 shadow-md absolute right-0 top-0 border border-neutral-600" />
            <div className="w-1.5 h-24 bg-gradient-to-b from-neutral-300 to-neutral-500 rounded-full shadow-md ml-auto mr-1 transform rotate-12 origin-top" />
            <div className="w-3.5 h-6 bg-rose-600 rounded-sm absolute bottom-4 left-6 shadow-sm border border-rose-400" />
          </div>
        </div>

        {/* Track Details */}
        <div className="text-center mt-6 space-y-1">
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            {song.title}
          </h3>
          <p className="text-sm text-rose-300 font-sans tracking-wide">
            {song.artist}
          </p>
        </div>

        {/* Animated Equalizer Frequency Bars */}
        <div className="flex items-center gap-1.5 h-8 my-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-purple-500 to-rose-400"
              animate={{
                height: isPlaying ? [6, 12 + (i % 4) * 6, 8, 28 - (i % 3) * 5, 10] : 4,
              }}
              transition={{
                duration: 0.8 + (i % 3) * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.08,
              }}
            />
          ))}
        </div>

        {/* Play/Pause Control Button */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleTogglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(251,113,133,0.5)] hover:scale-108 active:scale-95 transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-white" />
            ) : (
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            )}
          </button>
        </div>

        {/* Volume & Audio Settings */}
        <div className="mt-8 flex items-center gap-3 w-full max-w-xs text-purple-300">
          <button onClick={toggleMute} className="hover:text-white transition-colors cursor-pointer">
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-rose-400" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full accent-rose-400 h-1.5 bg-purple-950 rounded-lg cursor-pointer"
            aria-label="Volume Slider"
          />
          <span className="text-[11px] font-mono w-8 text-right">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>

        {/* Personal Note Box */}
        <div className="mt-8 pt-6 border-t border-purple-500/20 w-full text-center">
          <p className="font-handwriting text-xl sm:text-2xl text-rose-200 leading-relaxed max-w-lg mx-auto">
            "{song.personalNote}"
          </p>
          <p className="text-[11px] text-purple-300/60 mt-2 font-mono">
            {song.favoriteLyricOrLine}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
