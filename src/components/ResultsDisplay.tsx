"use client";

import { motion } from "framer-motion";
import { Skull, Target, BarChart3, Lightbulb, DollarSign, Share2, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsProps {
  data: {
    truthScore: number;
    brutalRoast: string;
    competitorAnalysis: {
      name: string;
      whatTheyDo: string;
      whyTheyreStrong: string;
    }[];
    marketInsight: {
      targetUsers: string;
      demandLevel: string;
      problemClarity: string;
    };
    improvementPlan: {
      differentiation: string;
      keyFeature: string;
      positioning: string;
      gtm: string;
    };
    monetizationIdeas: string[];
  };
  onRetry: () => void;
}

export default function ResultsDisplay({ data, onRetry }: ResultsProps) {
  // Use fallbacks for mock data if fields are missing from existing API
  const displayData = {
    ...data,
    truthScore: data.truthScore || 0,
    brutalRoast: data.brutalRoast || "This idea isn't new — you're entering a crowded space without a clear edge. You're solving a problem, but not one people are desperate enough to pay for.",
    monetizationIdeas: data.monetizationIdeas || ["Tiered Subscription for Advanced Metrics", "Expert Analysis Upsell", "Market Report Commissions"],
    improvementPlan: data.improvementPlan || {
      differentiation: "Stop targeting 'everyone'. Focus on early-stage founders who need rapid validation, not just generic feedback.",
      keyFeature: "Add a 'Validation Score' system that compares ideas against historical market failures.",
      positioning: "Position as a 'Risk Mitigation Tool' rather than a 'Startup Roaster'.",
      gtm: "Start with tech communities like Product Hunt or Indie Hackers to build elite social proof building elite social proof."
    }
  };

  const handleShare = () => {
    const text = `I just got roasted by brutallyhonest.xyz! My truth score is ${displayData.truthScore}%. 💀\n\n"${displayData.brutalRoast.slice(0, 100)}..."\n\nGet roasted here:`;
    const url = "https://brutallyhonest.xyz";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
  };

  const cards: any[] = [
    {
      id: "roast",
      icon: <Skull className="w-8 h-8 text-red-600" />,
      title: "💀 Brutal Truth",
      type: "roast",
      content: displayData.brutalRoast
    },
    {
      id: "competitors",
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "🔍 Competitors",
      type: "list",
      items: displayData.competitorAnalysis || [
        { name: "Existing Giants", whatTheyDo: "Dominating the generic market.", whyTheyreStrong: "Massive capital and user base." },
        { name: "Niche Startups", whatTheydo: "Solving the specific pain point better.", whyTheyreStrong: "Agility and focus." }
      ]
    },
    {
      id: "market",
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "📊 Market",
      type: "grid",
      data: displayData.marketInsight || {
        targetUsers: "Early Adopters",
        demandLevel: "Moderate",
        problemClarity: "High"
      }
    },
    {
      id: "improve",
      icon: <Lightbulb className="w-8 h-8 text-gold" />,
      title: "💡 Improve",
      type: "improvement",
      data: displayData.improvementPlan
    },
    {
      id: "monetization",
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
      title: "💰 Monetization",
      type: "chips",
      items: displayData.monetizationIdeas
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 md:space-y-16 pb-40 pt-10 px-4">
      <div className="text-center space-y-4">
        {/* Massive Truth Score */}
        <div className="flex flex-col items-center mb-16 md:mb-24 relative">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="text-[80px] md:text-[200px] font-black leading-none text-white italic tracking-tighter opacity-10 blur-sm absolute -inset-6 md:-inset-10">
              {displayData.truthScore}%
            </div>
            <div className="text-[70px] md:text-[180px] font-black leading-none text-white italic tracking-tighter relative z-10">
              {displayData.truthScore}%
            </div>
          </motion.div>
          <div className="bg-red-600 px-4 md:px-6 py-1 md:py-2 text-white font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs -mt-2 md:-mt-4 relative z-20">
            Truth Score
          </div>
          
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-12 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              AI Assessment: {displayData.truthScore}%
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/20 rounded-full" />
              Community Prediction: --
            </div>
          </div>
        </div>

        {/* AI vs Humans Battle Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 border-b-4 border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
              The <span className="text-red-600">Battlefield</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white text-black font-black text-[10px] uppercase tracking-widest">
              AI Insight
            </button>
            <button 
              onClick={() => {
                const feed = document.getElementById('human-roasts');
                feed?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all"
            >
              Human Roast
            </button>
          </div>
        </div>

        <div className="space-y-8 md:space-y-16">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border-2 border-white/10 p-6 md:p-10 relative overflow-hidden group hover:border-white/20 transition-all text-left"
            >
              <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-10">
                <div className="p-3 md:p-4 bg-white/5 border border-white/10">{card.icon}</div>
                <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tight">
                  {card.title}
                </h3>
              </div>

              <div className="relative z-10">
                {card.type === "roast" && (
                  <p className="text-xl md:text-4xl font-black text-red-600 uppercase leading-[1.1] italic">
                    "{card.content}"
                  </p>
                )}

                {card.type === "list" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {card.items?.map((item: any, i: number) => (
                      <div key={i} className="p-4 md:p-6 bg-white/5 border border-white/10 space-y-3">
                        <h4 className="text-lg md:text-xl font-black text-white uppercase">{item.name}</h4>
                        <p className="text-[10px] md:text-xs text-white/60"><span className="text-red-600 font-bold uppercase tracking-widest">WHAT:</span> {item.whatTheyDo}</p>
                        <p className="text-[10px] md:text-xs text-white/60"><span className="text-red-600 font-bold uppercase tracking-widest">WHY:</span> {item.whyTheyreStrong}</p>
                      </div>
                    ))}
                  </div>
                )}

                {card.type === "grid" && card.data && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {Object.entries(card.data).map(([key, val]: any, i) => (
                      <div key={i} className="space-y-2">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <p className="text-lg md:text-xl font-black text-white uppercase leading-none">{val}</p>
                      </div>
                    ))}
                  </div>
                )}

                {card.type === "improvement" && card.data && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="p-6 md:p-8 bg-gold/5 border-l-8 border-gold space-y-4 col-span-1 md:col-span-2">
                      <h4 className="text-gold font-black uppercase text-xs tracking-widest flex items-center gap-2">
                        <Target className="w-3 h-3" /> 1. How to Differentiate
                      </h4>
                      <p className="text-xl md:text-2xl font-bold text-white leading-tight uppercase italic">
                        "{card.data.differentiation}"
                      </p>
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 border border-white/5 space-y-2 md:space-y-4">
                      <h5 className="text-red-600 font-black uppercase text-[8px] md:text-[10px] tracking-widest">2. Feature Improvements</h5>
                      <p className="text-xs md:text-sm font-bold text-white uppercase">{card.data.keyFeature}</p>
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 border border-white/5 space-y-2 md:space-y-4">
                      <h5 className="text-red-600 font-black uppercase text-[8px] md:text-[10px] tracking-widest">3. Positioning Fix</h5>
                      <p className="text-xs md:text-sm font-bold text-white uppercase">{card.data.positioning}</p>
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 border border-white/5 space-y-2 md:space-y-4 col-span-1 md:col-span-2">
                      <h5 className="text-red-600 font-black uppercase text-[8px] md:text-[10px] tracking-widest">4. GTM Strategy</h5>
                      <p className="text-xs md:text-sm font-bold text-white uppercase">{card.data.gtm}</p>
                    </div>
                  </div>
                )}

                {card.type === "chips" && (
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {card.items?.map((item: string, i: number) => (
                      <div key={i} className="px-4 md:px-6 py-2 md:py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-black uppercase text-[10px] md:text-xs tracking-widest">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Human Roast Section (The Battle) */}
        <motion.div
          id="human-roasts"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 md:mt-20 space-y-8 md:space-y-12"
        >
          <div className="flex items-center gap-4">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-widest">
              Community <span className="text-red-600">Crossfire</span>
            </h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 bg-white/5 border border-white/10 space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">@TheExecutioner</span>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">🔥 1.2k Heat</span>
              </div>
              <p className="text-lg md:text-xl font-bold text-white uppercase italic leading-tight">
                "You're not 'following your passion', you're having a mid-life crisis on a budget. This is the Pets.com of 2026."
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white/5 border border-white/10 space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">@RealityBites</span>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">💀 840 Savage</span>
              </div>
              <p className="text-lg md:text-xl font-bold text-white uppercase italic leading-tight">
                "Wait, so your plan is to burn investor cash until customers magically appear? Revolutionary. Never seen that fail before."
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="w-full md:w-auto px-12 py-5 md:py-6 bg-gold text-black font-black uppercase tracking-widest text-lg md:text-xl brutalist-border flex items-center justify-center gap-4 hover:bg-gold-light transition-all"
        >
          <RefreshCcw className="w-5 h-5 md:w-6 md:h-6" /> Reset Reality
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="w-full md:w-auto px-12 py-5 md:py-6 border-4 border-gold text-gold font-black uppercase tracking-widest text-lg md:text-xl brutalist-border flex items-center justify-center gap-4 hover:bg-gold/10 transition-all"
        >
          <Share2 className="w-5 h-5 md:w-6 md:h-6" /> Share Analysis
        </motion.button>
      </div>
    </div>
  );
}
