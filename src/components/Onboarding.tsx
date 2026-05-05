"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ArrowRight, Skull } from "lucide-react";

export default function Onboarding() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeen) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
        >
          <div className="bg-zinc-900 border-4 border-gold p-6 shadow-[20px_20px_0px_0px_rgba(212,175,55,0.2)] relative overflow-hidden">
            <button 
              onClick={close}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold text-black">
                <Skull className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-black uppercase text-sm tracking-widest">Protocol Briefing</h4>
                <p className="text-white/60 text-[10px] font-mono leading-relaxed">
                  1. <span className="text-gold">Paste your idea</span> below.<br />
                  2. <span className="text-gold">Get roasted</span> by AI & Community.<br />
                  3. <span className="text-gold">Improve</span> based on the autopsy.
                </p>
                <button 
                  onClick={close}
                  className="flex items-center gap-2 text-gold font-black uppercase text-[8px] tracking-widest hover:underline pt-2"
                >
                  Understood <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Background scanner line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gold/30 animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
