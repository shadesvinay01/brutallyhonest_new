"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShieldAlert, Zap, Skull, TrendingDown } from "lucide-react";

interface HeroProps {
  onStart: (brutality: number) => void;
}

const Typewriter = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayedText, text, isStarted, onComplete]);

  return <span>{displayedText}</span>;
};

const failures = [
  { name: "QUIBI", reason: "Solving a problem no one had with $1.7B." },
  { name: "THERANOS", reason: "Selling science fiction as medical fact." },
  { name: "JUICERO", reason: "A $400 machine to squeeze a bag of juice." },
  { name: "PETS.COM", reason: "Spending $300M to sell dog food at a loss." },
  { name: "FAST", reason: "A one-click checkout with zero-click growth." }
];

const intelligenceStream = [
  "ANALYSIS: WEB3-FOR-CATS... STATUS: FAILED... REASON: DELUSIONAL.",
  "ANALYSIS: AI-TOASTERS... STATUS: MARGINAL... REASON: OVER-ENGINEERED.",
  "ANALYSIS: UBER-FOR-LAUNDRY... STATUS: FAILED... REASON: UNIT-ECONOMICS.",
  "ANALYSIS: TIKTOK-FOR-NEWS... STATUS: FAILED... REASON: ATTENTION-DEFICIT.",
];

export default function Hero({ onStart }: HeroProps) {
  const [showSubtext, setShowSubtext] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [brutality, setBrutality] = useState(3);

  const brutalityLevels = [
    { level: 1, label: "POLITE INVESTOR", color: "text-green-500" },
    { level: 2, label: "REALIST", color: "text-gold" },
    { level: 3, label: "BRUTALLY HONEST", color: "text-red-600" }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
      {/* Wall of Truth Ticker */}
      <div className="absolute top-0 left-0 w-full bg-red-600/10 border-b border-red-600/20 py-2 overflow-hidden whitespace-nowrap z-20">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {[...failures, ...failures].map((f, i) => (
            <div key={i} className="flex gap-4 items-center">
              <span className="text-red-600 font-black text-[10px]">// {f.name}_AUTOPSY</span>
              <span className="text-white/40 text-[10px] font-mono uppercase">{f.reason}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Anonymized Intelligence Stream */}
      <div className="absolute top-20 left-8 hidden lg:block z-10 space-y-4 opacity-20 pointer-events-none">
        {intelligenceStream.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 2, duration: 1 }}
            className="text-[8px] font-mono text-white tracking-widest bg-white/5 p-2 border-l border-white/20"
          >
            {s}
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
            <Typewriter text="Your idea sounds good." delay={500} onComplete={() => setShowSubtext(true)} />
            <br />
            <span className="text-gold italic">
              <Typewriter text="It isn’t." delay={2000} onComplete={() => setShowControls(true)} />
            </span>
          </h1>
          
          <AnimatePresence>
            {showSubtext && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg md:text-2xl text-white/40 uppercase tracking-[0.3em] font-medium max-w-3xl mx-auto leading-relaxed"
              >
                Get the truth before you waste months building a failure.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Brutality Level Slider */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 max-w-md mx-auto"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">Set_Brutality_Level</span>
                <div className="grid grid-cols-3 gap-2">
                  {brutalityLevels.map((l) => (
                    <button
                      key={l.level}
                      onClick={() => setBrutality(l.level)}
                      className={`py-3 text-[8px] font-black uppercase tracking-widest border transition-all ${
                        brutality === l.level ? "bg-white text-black border-white" : "border-white/10 text-white/30 hover:border-white/40"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onStart(brutality)}
                className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.5em] text-xl brutalist-border hover:bg-gold transition-all duration-500"
              >
                Begin Interrogation
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Industrial Grid Background (Simplified) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Decorative Stats */}
      <div className="fixed bottom-12 right-12 z-30 opacity-20 hidden md:flex flex-col items-end">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-[8px] font-mono text-white">SYSTEM_UPTIME: 99.9%</span>
          <div className="w-12 h-[1px] bg-white/40" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[8px] font-mono text-white">FAILED_IDEAS: 1,204,912</span>
          <div className="w-12 h-[1px] bg-white/40" />
        </div>
      </div>
    </div>
  );
}
