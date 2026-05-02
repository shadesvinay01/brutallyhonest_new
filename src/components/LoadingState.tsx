"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Analyzing your 'revolutionary' idea...",
  "Finding the inevitable flaws...",
  "Destroying your optimistic assumptions...",
  "Checking if anyone actually cares about this...",
  "Running the numbers (they don't look good)...",
  "Consulting the brutal truth engine...",
  "Preparing the execution summary...",
  "Sharpening the feedback...",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
      {/* Background Data Stream (Subtle) */}
      <div className="absolute inset-0 flex flex-col gap-4 opacity-[0.03] pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex gap-8 whitespace-nowrap text-[8px] font-mono animate-scroll-left">
            {"ANALYZING_SURVIVAL_DATA_STREAM_X0928374928374928374".repeat(10)}
          </div>
        ))}
      </div>

      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="mb-16 bg-gold text-black px-8 py-3 font-black text-2xl tracking-[0.4em] uppercase"
      >
        Processing
      </motion.div>
      
      <div className="h-20 flex items-center justify-center px-4 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter text-center italic leading-none"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <div className="mt-16 flex gap-3">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: [8, 24, 8],
              backgroundColor: ["#D4AF37", "#ffffff", "#D4AF37"]
            }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
            className="w-[2px] bg-gold shadow-[0_0_10px_#D4AF37]"
          />
        ))}
      </div>
    </div>
  );
}
