"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface InterrogationProps {
  onSubmit: (data: any) => void;
  onInputChange: (intensity: number) => void;
}

const steps = [
  {
    id: "idea",
    label: "Step 01",
    question: "What is your startup idea?",
    placeholder: "Explain yourself...",
    type: "textarea",
  },
  {
    id: "audience",
    label: "Step 02",
    question: "Who is it for?",
    placeholder: "Target audience...",
    type: "input",
  },
  {
    id: "problem",
    label: "Step 03",
    question: "What problem are you solving?",
    placeholder: "Identify the pain...",
    type: "input",
  },
  {
    id: "pricing",
    label: "Step 04",
    question: "How will you make money?",
    placeholder: "Monetization strategy...",
    type: "input",
  }
];

export default function Interrogation({ onSubmit, onInputChange }: InterrogationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    idea: "",
    audience: "",
    problem: "",
    pricing: "",
  });

  useEffect(() => {
    const totalLength = Object.values(formData).join("").length;
    onInputChange(Math.min(1, totalLength / 200));
  }, [formData, onInputChange]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] relative">
      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center gap-2 mb-20">
        <div className="flex justify-between w-full text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">
          <span>Survival Analysis</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute top-0 left-0 h-full bg-gold shadow-[0_0_10px_#D4AF37]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full space-y-12 text-center"
        >
          <div className="space-y-4">
            <span className="text-gold font-black text-xs tracking-[0.4em] uppercase">
              {steps[currentStep].label}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-tight">
              {steps[currentStep].question}
            </h2>
          </div>

          <div className="relative group max-w-2xl mx-auto px-4">
            {steps[currentStep].type === "textarea" ? (
              <textarea
                autoFocus
                value={formData[steps[currentStep].id]}
                onChange={(e) => setFormData({ ...formData, [steps[currentStep].id]: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleNext())}
                placeholder={steps[currentStep].placeholder}
                className="w-full bg-transparent border-b-2 border-white/10 p-2 sm:p-4 text-xl sm:text-2xl md:text-3xl text-white placeholder:text-white/5 focus:outline-none focus:border-gold transition-all resize-none text-center font-mono"
              />
            ) : (
              <input
                autoFocus
                type="text"
                value={formData[steps[currentStep].id]}
                onChange={(e) => setFormData({ ...formData, [steps[currentStep].id]: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                placeholder={steps[currentStep].placeholder}
                className="w-full bg-transparent border-b-2 border-white/10 p-2 sm:p-4 text-xl sm:text-2xl md:text-3xl text-white placeholder:text-white/5 focus:outline-none focus:border-gold transition-all text-center font-mono"
              />
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, gap: "1.5rem" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="flex items-center justify-center gap-4 mx-auto text-white/40 hover:text-gold transition-all duration-300 group"
          >
            <span className="uppercase tracking-[0.4em] text-xs font-black">
              {currentStep === steps.length - 1 ? "Submit to AI" : "Press Enter for Next"}
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
    </div>
  );
}
