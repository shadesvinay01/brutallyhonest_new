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
  const [brutality, setBrutality] = useState(3);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
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

      <div className="relative z-20 w-full max-w-5xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] uppercase min-h-[2.4em] md:min-h-[1.6em]">
            <Typewriter text="Get Brutally Honest" delay={500} /> <br />
            <span className="text-gold">
              <Typewriter text="Feedback." delay={1500} />
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-white/60 font-medium max-w-3xl mx-auto leading-tight min-h-[3em]">
            <Typewriter 
              text="No Sugarcoating. Post anything — your idea, profile, decision — and get raw, unfiltered opinions from real people." 
              delay={2500} 
            />
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-8 bg-gold ml-2 align-middle"
            />
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#FFD700" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStart(3)}
            className="px-12 py-6 bg-gold text-black font-black uppercase tracking-widest text-2xl flex items-center gap-4 brutalist-border hover:shadow-none transition-all"
          >
            <span className="w-4 h-4 bg-black rounded-full animate-pulse" />
            Get Roasted
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(212,175,55,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 border-4 border-gold text-gold font-black uppercase tracking-widest text-2xl brutalist-border"
          >
            Explore Opinions
          </motion.button>
        </motion.div>
      </div>

      {/* Industrial Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
    </div>
  );
}
