"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skull, ShieldCheck, ArrowRight, UserCheck, EyeOff, AlertTriangle } from "lucide-react";

interface IdeaFormProps {
  onSubmit: (data: any) => void;
  onInputChange?: (intensity: number) => void;
}

const categories = [
  { id: "startup", label: "Startup", icon: "🚀" },
  { id: "resume", label: "Resume", icon: "📄" },
  { id: "looks", label: "Looks", icon: "📸", danger: true },
  { id: "ideas", label: "Ideas", icon: "💡" },
];

export default function IdeaForm({ onSubmit }: IdeaFormProps) {
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("startup");
  const [isBrutal, setIsBrutal] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [harshness, setHarshness] = useState(80);

  const handleSubmit = () => {
    if (idea.trim().length < 5) return;
    onSubmit({ idea, category, isBrutal, isAnonymous, harshness });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-16"
      >
        {/* Category & Tone Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-white/10 pb-12">
          <div className="space-y-6 flex-1">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
              Phase 01: Deploy Context
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                    category === cat.id 
                      ? "bg-gold text-black border-gold shadow-[5px_5px_0px_0px_rgba(212,175,55,0.3)]" 
                      : "text-white/40 border-white/10 hover:border-gold/50"
                  }`}
                >
                  {cat.icon} {cat.label}
                  {cat.danger && <AlertTriangle className="w-3 h-3 text-red-500" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="flex items-center justify-between gap-8 bg-white/5 p-4 border border-white/10">
              <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">
                Identity:
              </span>
              <button
                onClick={() => setIsAnonymous(!isAnonymous)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-gold transition-colors"
              >
                {isAnonymous ? <EyeOff className="w-4 h-4 text-red-500" /> : <UserCheck className="w-4 h-4 text-green-500" />}
                {isAnonymous ? "Anonymous" : "Public"}
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white/5 p-4 border border-white/10">
              <span className="text-[8px] font-black text-white/40 uppercase tracking-widest px-2">
                Intensity:
              </span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={harshness} 
                onChange={(e) => setHarshness(parseInt(e.target.value))}
                className="accent-gold w-32 h-1 bg-white/10 appearance-none cursor-pointer"
              />
              <span className="text-[10px] font-mono text-gold min-w-[2ch]">{harshness}%</span>
            </div>
          </div>
        </div>

        {/* The Text Input */}
        <div className="relative group">
          <textarea
            autoFocus
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder={
              category === "resume" 
                ? "Paste your resume text here or upload the file..." 
                : `Submit your ${category} for a reality check...`
            }
            className="w-full bg-transparent p-0 text-3xl md:text-6xl font-black text-white placeholder:text-white/5 focus:outline-none transition-all resize-none min-h-[250px] leading-tight uppercase italic scrollbar-hide"
          />
          
          {category === "resume" && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute bottom-0 right-0"
            >
              <label className="flex items-center gap-4 px-8 py-4 bg-white/5 border-2 border-dashed border-gold/30 hover:border-gold hover:bg-gold/5 cursor-pointer transition-all group">
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-gold uppercase tracking-widest">Secure_Doc_Drop</span>
                  <span className="text-[8px] font-mono text-white/20 uppercase">PDF / DOC / TXT</span>
                </div>
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-all">
                  <ArrowRight className="w-5 h-5 text-gold group-hover:text-black" />
                </div>
              </label>
            </motion.div>
          )}

          {category === "looks" && (
            <div className="absolute top-0 right-0 bg-red-600/20 text-red-600 px-4 py-2 text-[8px] font-black uppercase tracking-widest animate-pulse border border-red-600/30">
              ⚠️ Warning: Emotional damage incoming
            </div>
          )}
          <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-gold transition-all shadow-[0_0_20px_rgba(212,175,55,0)] group-focus-within:shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
        </div>

        {/* Submit Section */}
        <div className="flex flex-col items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={idea.trim().length < 5}
            className={`w-full md:w-auto px-20 py-10 bg-gold text-black font-black uppercase tracking-[0.5em] text-3xl flex items-center justify-center gap-8 brutalist-border-gold transition-all ${
              idea.trim().length < 5 ? "opacity-20 cursor-not-allowed grayscale" : "hover:translate-x-1 hover:-translate-y-1 hover:shadow-[20px_20px_0px_0px_rgba(212,175,55,0.2)]"
            }`}
          >
            <Skull className="w-10 h-10" />
            Analyze My {category}
            <ArrowRight className="w-10 h-10" />
          </motion.button>
          
          <div className="flex items-center gap-4 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
            <span>Secure Interrogation</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>AI Powered</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{isBrutal ? "Brutal Mode Active" : "Professional Analysis"}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
