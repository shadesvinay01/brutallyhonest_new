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
    brutalRoast: data.brutalRoast || "This idea isn't new — you're entering a crowded space without a clear edge. You're solving a problem, but not one people are desperate enough to pay for.",
    monetizationIdeas: data.monetizationIdeas || ["Tiered Subscription for Advanced Metrics", "Expert Analysis Upsell", "Market Report Commissions"],
    improvementPlan: data.improvementPlan || {
      differentiation: "Stop targeting 'everyone'. Focus on early-stage founders who need rapid validation, not just generic feedback.",
      keyFeature: "Add a 'Validation Score' system that compares ideas against historical market failures.",
      positioning: "Position as a 'Risk Mitigation Tool' rather than a 'Startup Roaster'.",
      gtm: "Start with tech communities like Product Hunt or Indie Hackers to build elite social proof."
    }
  };

  const cards = [
    {
      id: "roast",
      icon: <Skull className="w-8 h-8 text-red-600" />,
      title: "💀 Brutal Truth",
      type: "roast",
      content: displayData.brutalRoast || "This idea isn't new — you're entering a crowded space without a clear edge. You're solving a problem, but not one people are desperate enough to pay for."
    },
    {
      id: "competitors",
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "🔍 Competitors",
      type: "list",
      items: displayData.competitorAnalysis || [
        { name: "Existing Giant", whatTheyDo: "Dominates the general market.", whyTheyreStrong: "Infinite budget and user trust." },
        { name: "Niche Player", whatTheyDo: "Specializes in your specific feature.", whyTheyreStrong: "Fast execution and community focus." },
        { name: "Emerging Startup", whatTheyDo: "Recent VC darling with high growth.", whyTheyreStrong: "Highly aggressive acquisition strategy." }
      ]
    },
    {
      id: "market",
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "📊 Market",
      type: "grid",
      data: displayData.marketInsight || {
        targetUsers: "Early stage founders",
        demandLevel: "Extremely High (Saturation)",
        problemClarity: "Low (Solution searching for a problem)"
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
    <div className="w-full max-w-5xl mx-auto space-y-16 pb-40 pt-10 px-4">
      <div className="text-center space-y-4">
        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.6em]">Interrogation_Complete</span>
        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic">
          THE <span className="text-red-600">VERDICT.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-12">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] border-2 border-white/10 p-10 relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="p-4 bg-white/5 border border-white/10">{card.icon}</div>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight">
                {card.title}
              </h3>
            </div>

            <div className="relative z-10">
              {card.type === "roast" && (
                <p className="text-2xl md:text-4xl font-black text-red-600 uppercase leading-[1.1] italic">
                  "{card.content}"
                </p>
              )}

              {card.type === "list" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {card.items.map((item: any, i: number) => (
                    <div key={i} className="p-6 bg-white/5 border border-white/10 space-y-3">
                      <h4 className="text-xl font-black text-white uppercase">{item.name}</h4>
                      <p className="text-xs text-white/60"><span className="text-red-600 font-bold uppercase tracking-widest">WHAT:</span> {item.whatTheyDo}</p>
                      <p className="text-xs text-white/60"><span className="text-red-600 font-bold uppercase tracking-widest">WHY:</span> {item.whyTheyreStrong}</p>
                    </div>
                  ))}
                </div>
              )}

              {card.type === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Object.entries(card.data).map(([key, val]: any, i) => (
                    <div key={i} className="space-y-2">
                      <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <p className="text-xl font-black text-white uppercase leading-none">{val}</p>
                    </div>
                  ))}
                </div>
              )}

              {card.type === "improvement" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-gold/5 border-l-8 border-gold space-y-4 col-span-1 md:col-span-2">
                    <h4 className="text-gold font-black uppercase text-xs tracking-widest flex items-center gap-2">
                      <Target className="w-3 h-3" /> 1. How to Differentiate
                    </h4>
                    <p className="text-2xl font-bold text-white leading-tight uppercase italic">
                      "{card.data.differentiation}"
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/5 space-y-4">
                    <h5 className="text-red-600 font-black uppercase text-[10px] tracking-widest">2. Feature Improvements</h5>
                    <p className="text-sm font-bold text-white uppercase">{card.data.keyFeature}</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/5 space-y-4">
                    <h5 className="text-red-600 font-black uppercase text-[10px] tracking-widest">3. Positioning Fix</h5>
                    <p className="text-sm font-bold text-white uppercase">{card.data.positioning}</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/5 space-y-4 col-span-1 md:col-span-2">
                    <h5 className="text-red-600 font-black uppercase text-[10px] tracking-widest">4. GTM Strategy</h5>
                    <p className="text-sm font-bold text-white uppercase">{card.data.gtm}</p>
                  </div>
                </div>
              )}

              {card.type === "chips" && (
                <div className="flex flex-wrap gap-4">
                  {card.items.map((item: string, i: number) => (
                    <div key={i} className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-black uppercase text-xs tracking-widest">
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

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-12 py-6 bg-gold text-black font-black uppercase tracking-widest text-xl brutalist-border flex items-center gap-4 hover:bg-gold-light transition-all"
        >
          <RefreshCcw className="w-6 h-6" /> Reset Reality
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 border-4 border-gold text-gold font-black uppercase tracking-widest text-xl brutalist-border flex items-center gap-4 hover:bg-gold/10 transition-all"
        >
          <Share2 className="w-6 h-6" /> Share Analysis
        </motion.button>
      </div>
    </div>
  );
}
