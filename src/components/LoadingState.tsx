"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

interface LoadingProps {
  streamingText?: string;
}

export default function LoadingState({ streamingText }: LoadingProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (streamingText) return; // Pause message rotation if we have real data
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [streamingText]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden px-4">
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
          scale: [1, 1.05, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-8 md:mb-12 bg-gold text-black px-6 md:px-8 py-2 md:py-3 font-black text-xl md:text-2xl tracking-[0.4em] uppercase"
      >
        {streamingText ? "Receiving_Data" : "Processing"}
      </motion.div>
      
      <div className="flex flex-col items-center w-full max-w-3xl space-y-8 md:space-y-12">
        <AnimatePresence mode="wait">
          {!streamingText ? (
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter text-center italic leading-none h-20 flex items-center"
            >
              {messages[index]}
            </motion.p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="bg-[#0A0A0A] border-2 border-red-600/30 p-6 md:p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-scan" />
                <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Direct_Interrogation_Stream</span>
                </div>
                <p className="text-xl md:text-3xl font-bold text-white uppercase italic leading-[1.2] text-left">
                  "{streamingText}<span className="inline-block w-2 h-6 bg-white ml-1 animate-pulse" />"
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
                    Source: Gemini_1.5_Flash<br />
                    Status: Decoding...
                  </div>
                  <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest text-right">
                    Packet_Size: {streamingText.length} bytes<br />
                    Integrity: High
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: [8, 24, 8],
                backgroundColor: streamingText ? ["#DC2626", "#ffffff", "#DC2626"] : ["#D4AF37", "#ffffff", "#D4AF37"]
              }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
              className={cn("w-[2px] shadow-sm", streamingText ? "bg-red-600 shadow-red-600" : "bg-gold shadow-gold")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
