"use client";

import { motion } from "framer-motion";
import { Briefcase, Heart, Brain, Camera, TrendingUp } from "lucide-react";

const chips = [
  { label: "My startup idea", icon: <Briefcase className="w-4 h-4" />, category: "startup" },
  { label: "My relationship", icon: <Heart className="w-4 h-4" />, category: "relationship" },
  { label: "My decision", icon: <Brain className="w-4 h-4" />, category: "decision" },
  { label: "My looks", icon: <Camera className="w-4 h-4" />, category: "looks" },
  { label: "My career", icon: <TrendingUp className="w-4 h-4" />, category: "career" },
];

interface TriggerChipsProps {
  onSelect: (category: string) => void;
}

export default function TriggerChips({ onSelect }: TriggerChipsProps) {
  return (
    <section className="py-12 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/40 text-sm font-black uppercase tracking-[0.3em] mb-8"
        >
          What do you want brutal honesty about today?
        </motion.h3>

        <div className="flex flex-wrap justify-center gap-4">
          {chips.map((chip, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(chip.category)}
              className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white font-black uppercase text-xs tracking-widest hover:border-white/40 transition-all rounded-full bg-white/5"
            >
              {chip.icon}
              {chip.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
