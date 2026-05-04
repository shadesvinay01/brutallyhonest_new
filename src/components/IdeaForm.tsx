"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skull, ShieldCheck, ArrowRight } from "lucide-react";

interface IdeaFormProps {
  onSubmit: (data: any) => void;
  onInputChange?: (intensity: number) => void;
}

export default function IdeaForm({ onSubmit }: IdeaFormProps) {
  const [idea, setIdea] = useState("");
  const [isBrutal, setIsBrutal] = useState(true);

  const handleSubmit = () => {
    if (idea.trim().length < 5) return;
    onSubmit({ idea, isBrutal });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
              Phase 01: Input Context
            </h2>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              // READY_FOR_ANALYSIS_SUBMISSION
            </p>
          </div>

          {/* Brutal Mode Toggle */}
          <div className="flex items-center gap-4 bg-gold/5 p-2 border border-gold/20">
            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest px-2">
              Tone Setting:
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setIsBrutal(false)}
                className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  !isBrutal ? "bg-gold text-black" : "text-white/40 hover:text-gold"
                }`}
              >
                <ShieldCheck className="w-3 h-3" /> Professional
              </button>
              <button
                onClick={() => setIsBrutal(true)}
                className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  isBrutal ? "bg-gold text-black" : "text-white/40 hover:text-gold"
                }`}
              >
                <Skull className="w-3 h-3" /> Brutal Mode
              </button>
            </div>
          </div>
        </div>

        <div className="relative group">
          <textarea
            autoFocus
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea in detail..."
            className="w-full bg-transparent p-0 text-2xl md:text-5xl font-black text-white placeholder:text-white/5 focus:outline-none transition-all resize-none min-h-[200px] leading-tight uppercase italic"
          />
          <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-gold transition-all shadow-[0_0_20px_rgba(212,175,55,0)] group-focus-within:shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={idea.trim().length < 5}
            className={`px-16 py-8 bg-gold text-black font-black uppercase tracking-[0.4em] text-2xl flex items-center gap-6 brutalist-border transition-all ${
              idea.trim().length < 5 ? "opacity-20 cursor-not-allowed grayscale" : "hover:bg-gold-light shadow-[15px_15px_0px_0px_rgba(212,175,55,0.1)]"
            }`}
          >
            🟡 Analyze My Idea
            <ArrowRight className="w-8 h-8" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
