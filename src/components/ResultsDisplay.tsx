"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  AlertTriangle, 
  TrendingDown, 
  Skull, 
  Lightbulb, 
  RefreshCcw,
  Share2,
  Copy,
  Activity,
  Zap,
  Globe,
  Trophy,
  FileText,
  Sparkles,
  ArrowRight,
  Target,
  BarChart3,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsProps {
  data: {
    truthScore: number;
    summary: string;
    flaws: string[];
    marketReality: string;
    risks: string[];
    suggestions: string[];
    marketMetrics: {
      tam: string;
      hostility: string;
      saturation: string;
      competitors: string[];
    };
    successScenario: {
      title: string;
      outcome: string;
      keyMilestones: string[];
      whyItWorked: string;
      visionaryQuote: string;
    };
  };
  onRetry: () => void;
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
      }, 10);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayedText, text, isStarted, onComplete]);

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && <span className="cursor-blink" />}
    </span>
  );
};

export default function ResultsDisplay({ data, onRetry }: ResultsProps) {
  const [reality, setReality] = useState<"FAILURE" | "SUCCESS">("FAILURE");
  const [viewMode, setViewMode] = useState<"NARRATIVE" | "INVESTOR_MEMO">("NARRATIVE");
  const [oneWishText, setOneWishText] = useState("");
  const [isWishing, setIsWishing] = useState(false);
  const [wishResult, setWishResult] = useState<string | null>(null);

  const handleWish = () => {
    setIsWishing(true);
    setTimeout(() => {
      setWishResult("In the Unicorn Timeline, you resolved this by automating the bottleneck with a proprietary neural layer, reducing churn by 80%.");
      setIsWishing(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 pb-32 pt-10 px-4">
      {/* Reality & Mode Switchers */}
      <div className="flex flex-col items-center gap-8 mb-16">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Active_Reality</span>
          <div className="flex flex-col sm:flex-row p-2 bg-[#111] border-2 border-white/10 gap-2">
            <button onClick={() => setReality("FAILURE")} className={cn("px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all", reality === "FAILURE" ? "bg-red-600 text-white" : "text-white/30 hover:text-white")}>REALITY_01: THE TRUTH</button>
            <button onClick={() => setReality("SUCCESS")} className={cn("px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all", reality === "SUCCESS" ? "bg-green-600 text-white" : "text-white/30 hover:text-white")}>REALITY_02: THE DELUSION</button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Visualization_Mode</span>
          <div className="flex p-1 bg-white/5 gap-1">
            <button onClick={() => setViewMode("NARRATIVE")} className={cn("px-6 py-2 text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2", viewMode === "NARRATIVE" ? "bg-gold text-black" : "text-white/50 hover:text-white")}><Zap className="w-3 h-3" /> Narrative</button>
            <button onClick={() => setViewMode("INVESTOR_MEMO")} className={cn("px-6 py-2 text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2", viewMode === "INVESTOR_MEMO" ? "bg-gold text-black" : "text-white/50 hover:text-white")}><FileText className="w-3 h-3" /> Investor Memo</button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "NARRATIVE" ? (
          <motion.div key={reality} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
            {/* Header / Score Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-[#111] p-10 border border-white/20 flex flex-col justify-center items-center text-center">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4 block">Truth_Score</span>
                <div className={cn("text-8xl font-black tracking-tighter leading-none mb-6", data.truthScore > 40 ? "text-gold" : "text-red-600")}>{data.truthScore}</div>
                <div className="w-full bg-white/10 h-1"><motion.div initial={{ width: 0 }} animate={{ width: `${data.truthScore}%` }} className={cn("h-full", data.truthScore > 40 ? "bg-gold" : "bg-red-600")} /></div>
              </div>
              <div className="lg:col-span-2 bg-[#111] p-10 border border-white/20 relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                  <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">Executive_Summary</span>
                  <div className="text-2xl md:text-4xl font-black text-white leading-tight italic uppercase">
                    <Typewriter text={reality === "FAILURE" ? data.summary : data.successScenario.outcome} delay={300} />
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Skull className="w-32 h-32" /></div>
              </div>
            </div>

            {/* Market Intelligence Row - NEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-black border border-white/10 space-y-4">
                <div className="flex items-center gap-3 text-gold"><Target className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Market TAM</span></div>
                <div className="text-4xl font-black text-white">{data.marketMetrics.tam}</div>
                <p className="text-[8px] text-white/40 uppercase font-bold">Estimated Total Addressable Market</p>
              </div>
              <div className="p-8 bg-black border border-white/10 space-y-4">
                <div className="flex items-center gap-3 text-red-600"><TrendingDown className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Hostility</span></div>
                <div className="text-4xl font-black text-white">{data.marketMetrics.hostility}</div>
                <p className="text-[8px] text-white/40 uppercase font-bold">Difficulty to penetrate / Market resistance</p>
              </div>
              <div className="p-8 bg-black border border-white/10 space-y-4">
                <div className="flex items-center gap-3 text-white"><Users className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Saturation</span></div>
                <div className="text-4xl font-black text-white">{data.marketMetrics.saturation}</div>
                <p className="text-[8px] text-white/40 uppercase font-bold">Existing competitor density level</p>
              </div>
            </div>

            {/* Competitive Landscape */}
            <div className="bg-[#111] p-10 border border-white/20">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.5em] mb-8 flex items-center gap-3"><BarChart3 className="w-4 h-4" /> Competitive Killers</h3>
              <div className="flex flex-wrap gap-4">
                {data.marketMetrics.competitors.map((comp, i) => (
                  <div key={i} className="px-6 py-3 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:border-gold transition-colors">
                    {comp}
                  </div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-[#111] border border-white/20 space-y-8">
                <h3 className="text-xl font-black flex items-center gap-3 text-red-600 uppercase italic"><AlertTriangle className="w-5 h-5" /> Structural Failures</h3>
                <ul className="space-y-6">
                  {data.flaws.map((flaw, i) => (
                    <li key={i} className="flex gap-4 text-white font-bold border-b border-white/5 pb-4 last:border-0 uppercase text-xs">
                      <span className="text-red-600">0{i + 1}</span>
                      <span><Typewriter text={flaw} delay={1000 + i * 400} /></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-10 bg-[#111] border border-white/20 space-y-8">
                <h3 className="text-xl font-black flex items-center gap-3 text-gold uppercase italic"><TrendingDown className="w-5 h-5" /> Market Reality</h3>
                <p className="text-white/60 font-medium leading-relaxed font-mono text-sm uppercase tracking-wider">
                  <Typewriter text={data.marketReality} delay={1500} />
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="memo" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white text-black p-12 shadow-2xl space-y-12 font-mono border-t-[20px] border-black">
            {/* Investor Memo Mode */}
            <div className="flex justify-between items-start border-b-2 border-black pb-8">
              <div className="space-y-2"><h2 className="text-4xl font-black uppercase tracking-tighter">INTERNAL MEMO</h2><p className="text-[10px] font-bold">CONFIDENTIAL // PARTNERS ONLY</p></div>
              <div className="text-right text-[10px] font-bold space-y-1"><p>DATE: {new Date().toLocaleDateString()}</p><p>REF: BRUTAL-ANALYSIS-0921</p></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6"><h3 className="font-black border-b border-black text-sm uppercase">I. Market Opportunity (TAM)</h3><div className="text-3xl font-black">{data.marketMetrics.tam}</div><p className="text-[10px] opacity-70">Significant capital at risk in a highly resistant landscape.</p></div>
              <div className="space-y-6">
                <h3 className="font-black border-b border-black text-sm uppercase">II. Competitive Killers</h3>
                <ul className="space-y-2">
                  {data.marketMetrics.competitors.map((c, i) => (
                    <li key={i} className="text-[10px] font-bold">{" >> "} {c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6"><h3 className="font-black border-b border-black text-sm uppercase">III. Executive Summary</h3><p className="text-xs leading-relaxed font-bold italic">{reality === "FAILURE" ? data.summary : data.successScenario.outcome}</p></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="md:col-span-2 bg-gold p-12 border border-black group cursor-pointer hover:bg-gold/90 transition-all">
          <h3 className="text-3xl font-black mb-8 flex items-center gap-3 text-black uppercase"><Lightbulb className="w-8 h-8" /> Final Directives</h3>
          <ul className="space-y-6">
            {data.suggestions.map((suggestion, i) => (
              <li key={i} className="flex gap-4 text-black font-black uppercase text-sm leading-tight border-b border-black/20 pb-4 last:border-0">
                <span>{">>"}</span><Typewriter text={suggestion} delay={2000 + i * 300} />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-1 flex flex-col gap-4">
          <button onClick={onRetry} className="w-full py-6 bg-white text-black font-black uppercase tracking-tighter text-xl border-4 border-black hover:bg-gold transition-colors">Reset Reality</button>
          <button onClick={() => { navigator.clipboard.writeText(`Truth Score: ${data.truthScore}/100`); alert("Data copied."); }} className="w-full py-6 bg-black border-4 border-white text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Extract Transcript</button>
        </div>
      </div>
    </div>
  );
}
