import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle, AlertCircle, Sparkles, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { relationshipData } from '../data/relationshipData';

export const QuizSection: React.FC = () => {
  const questions = relationshipData.quiz;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      // Small sparkle celebration
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FB7185', '#FDA4AF', '#A78BFA'],
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizComplete(true);
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FB7185', '#FDA4AF', '#A78BFA', '#FFF7ED'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizComplete(false);
  };

  return (
    <section id="quiz" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-rose-300 text-xs uppercase tracking-widest font-medium mb-3"
        >
          <HelpCircle className="w-3 h-3 text-rose-400" />
          <span>Couple Trivia</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-3 text-glow-rose"
        >
          How Well Do You Know Us? 👀
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-purple-200/80 text-base sm:text-lg max-w-md mx-auto font-light"
        >
          A playful romantic quiz to test our shared memory and inside jokes.
        </motion.p>
      </div>

      {/* Main Quiz Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full rounded-3xl glass-panel-glow border border-purple-500/25 bg-[#171329]/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {!isQuizComplete ? (
          <div>
            {/* Top Progress & Score */}
            <div className="flex items-center justify-between pb-6 border-b border-purple-500/20 text-xs">
              <span className="text-purple-300 font-mono">
                QUESTION {currentIdx + 1} OF {questions.length}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                <Sparkles className="w-3 h-3" />
                <span>Score: {score}</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="my-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Answer Choices */}
            <div className="space-y-3.5">
              {currentQ.options.map((option, idx) => {
                let buttonStyle = 'bg-purple-950/40 border-purple-500/25 text-purple-100 hover:bg-purple-900/40 hover:border-purple-400/40';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    buttonStyle = 'bg-emerald-950/60 border-emerald-400/70 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.3)]';
                  } else if (idx === selectedOption) {
                    buttonStyle = 'bg-rose-950/60 border-rose-400/70 text-rose-200';
                  } else {
                    buttonStyle = 'opacity-40 bg-purple-950/20 border-transparent text-purple-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${buttonStyle}`}
                  >
                    <span className="text-sm sm:text-base font-normal">{option}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Button */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 p-4 rounded-xl bg-purple-900/30 border border-purple-500/20"
                >
                  <p className="text-sm text-purple-200 leading-relaxed font-light">
                    {currentQ.explanation}
                  </p>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-medium text-xs tracking-wider uppercase shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      {currentIdx < questions.length - 1 ? 'Next Question →' : 'See Final Score 🎉'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Quiz Results View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 sm:py-8 space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px] mx-auto shadow-[0_0_30px_rgba(251,113,133,0.4)]">
              <div className="w-full h-full rounded-full bg-[#171329] flex items-center justify-center">
                <Award className="w-10 h-10 text-rose-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                Okayyy... you really know us 🥹❤️
              </h3>
              <p className="text-xl font-handwriting text-rose-300">
                You scored {score} out of {questions.length}!
              </p>
              <p className="text-sm text-purple-200/80 max-w-md mx-auto font-light leading-relaxed">
                Whether you remembered every single detail or just laughed along the way, these past six months have been the happiest story I’ve ever been a part of.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:glass-panel-glow border border-rose-400/40 text-rose-200 hover:text-white transition-all text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>Play Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
