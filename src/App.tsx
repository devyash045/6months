import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { StarryBackground } from './components/StarryBackground';
import { FloatingNav } from './components/FloatingNav';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { LoveReasonsSection } from './components/LoveReasonsSection';
import { LetterSection } from './components/LetterSection';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';
import { relationshipData } from './data/relationshipData';
import { Heart, ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle entering the experience from Hero
  const handleEnterExperience = () => {
    setHasEntered(true);
    // Smooth scroll to story section
    const storyEl = document.getElementById('story');
    if (storyEl) {
      storyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to any section by ID
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Section observer to update active nav tab
  useEffect(() => {
    const sections = [
      'hero',
      'story',
      'reasons',
      'letter',
      'surprise',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            if (sectionId !== 'hero' && !hasEntered) {
              setHasEntered(true);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  return (
    <div className="relative min-h-screen bg-[#0B0A16] text-[#FFF7ED] selection:bg-[#FB7185]/30 selection:text-[#FDA4AF] overflow-x-hidden">
      {/* Custom Romantic Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Atmospheric Starry Background with Glowing Orbs & Floating Hearts */}
      <StarryBackground />

      {/* Floating Navigation Bar */}
      <FloatingNav
        visible={hasEntered}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10">
        {/* Page 1: Cinematic Intro Hero */}
        <HeroSection 
          onEnter={handleEnterExperience} 
          hasEntered={hasEntered} 
        />

        {/* Page 2: Our Story (Milestone Timeline) */}
        <TimelineSection />

        {/* Page 3: 30 Little Reasons I Love You */}
        <LoveReasonsSection />

        {/* Page 4: The Letter */}
        <LetterSection />

        {/* Page 5: Final Surprise Reveal */}
        <FinalSurpriseSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-4 text-center border-t border-purple-500/15 bg-[#0B0A16]/80 backdrop-blur-md">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span className="font-serif italic text-lg text-rose-200">
              {relationshipData.names.person1} &amp; {relationshipData.names.person2}
            </span>
            <Heart className="w-4 h-4 fill-rose-500" />
          </div>

          <p className="font-handwriting text-2xl text-purple-200/90">
            "6 Months of loving you, and forever to go."
          </p>

          <p className="text-xs text-purple-400/60 font-mono tracking-wider">
            {relationshipData.anniversary} • 182 Days of Memories &amp; Love
          </p>

          <div className="pt-4">
            <button
              onClick={() => handleNavigate('hero')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel hover:glass-panel-glow border border-purple-500/30 text-purple-300 hover:text-white text-xs transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-rose-400" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
