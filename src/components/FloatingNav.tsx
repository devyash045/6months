import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  BookHeart, 
  Heart, 
  ScrollText, 
  Gift,
  Menu,
  X
} from 'lucide-react';

interface FloatingNavProps {
  visible: boolean;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const navItems = [
  { id: 'story', label: 'Story', icon: BookHeart },
  { id: 'reasons', label: '30 Reasons', icon: Heart },
  { id: 'letter', label: 'Letter', icon: ScrollText },
  { id: 'surprise', label: 'Surprise', icon: Gift },
];

export const FloatingNav: React.FC<FloatingNavProps> = ({
  visible,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!visible) return null;

  return (
    <>
      {/* Desktop / Tablet Floating Pill Dock */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel shadow-[0_10px_35px_rgba(0,0,0,0.5)] border border-purple-500/20 backdrop-blur-xl"
        aria-label="Experience Navigation"
      >
        {/* Little Heart Icon */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-rose-300 hover:text-white transition-colors group cursor-pointer"
          title="Back to Top"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
          <span className="font-serif italic text-sm tracking-wide">6 Months</span>
        </button>

        <div className="w-[1px] h-4 bg-purple-500/20 mx-1" />

        {/* Section Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-purple-200/70 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/30 via-purple-500/30 to-rose-500/30 border border-rose-400/40 shadow-[0_0_15px_rgba(251,113,133,0.3)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-rose-400' : ''}`} />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 rounded-full glass-panel border border-purple-500/30 text-purple-200 shadow-lg active:scale-95 transition-transform cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Bottom Dock */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm rounded-full glass-panel px-4 py-2 border border-purple-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-around"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-full transition-colors ${
                isActive ? 'text-rose-400' : 'text-purple-300/70 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B0A16]/95 backdrop-blur-2xl flex flex-col justify-center px-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="font-serif text-2xl text-rose-300 italic">6 Months Together</p>
                <p className="text-xs text-purple-300/70">Aapka Yash &amp; Wife Jii</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-purple-900/40 text-purple-200 border border-purple-500/30 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-rose-500/20 border-rose-400/50 text-white'
                        : 'bg-purple-950/40 border-purple-800/40 text-purple-200 hover:bg-purple-900/40'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-rose-400' : 'text-purple-400'}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
