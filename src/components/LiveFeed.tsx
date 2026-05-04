"use client";

import { motion } from "framer-motion";
import { MessageCircle, Flame, Skull, Laugh, ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useState } from "react";

const mockPosts = [
  {
    id: 1,
    author: "SavageTiger92",
    category: "Startup",
    content: "Rate my startup idea: An AI that tells you which of your friends are actually fake.",
    topReply: "Solving a problem that doesn't exist with technology no one wants. Classic.",
    comments: 42,
    votes: 156,
    savageLevel: 85,
    reactions: { flame: 24, skull: 12, laugh: 8 }
  },
  {
    id: 2,
    author: "ChaosKing_01",
    category: "Career",
    content: "Am I making a bad career move by quitting my 200k job to become a full-time professional whistler?",
    topReply: "You're not 'following your passion', you're having a mid-life crisis on a budget.",
    comments: 89,
    votes: -42,
    savageLevel: 98,
    reactions: { flame: 5, skull: 67, laugh: 112 }
  },
  {
    id: 3,
    author: "DigitalGhost",
    category: "Lifestyle",
    content: "Be honest, how do I look in this $5,000 digital-only designer tracksuit?",
    topReply: "You look like someone who has more crypto than common sense.",
    comments: 12,
    votes: -10,
    savageLevel: 92,
    reactions: { flame: 2, skull: 45, laugh: 89 }
  }
];

export default function LiveFeed() {
  return (
    <section className="py-32 bg-zinc-950 relative border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
              Live <span className="text-red-600">Feed</span>
            </h2>
            <p className="text-white/40 font-mono mt-4 uppercase tracking-widest">
              // RECENT_INTERROGATIONS_IN_PROGRESS
            </p>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-red-600 text-white font-black text-xs uppercase tracking-widest animate-pulse">
              LIVE_DATA
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black border-2 border-white/10 p-8 flex flex-col gap-6 hover:border-red-600/30 transition-all relative overflow-hidden group shadow-[10px_10px_0px_0px_rgba(255,255,255,0.02)]"
            >
              {/* Savage Meter Background */}
              <div 
                className="absolute top-0 left-0 h-1 bg-red-600 transition-all duration-1000"
                style={{ width: `${post.savageLevel}%` }}
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/5 text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                    {post.category}
                  </span>
                  {post.category === "Looks" && (
                    <span className="text-[8px] font-black text-red-600 uppercase tracking-widest animate-pulse flex items-center gap-1">
                      <AlertTriangle className="w-2 h-2" /> DANGER_ZONE
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <Skull className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">{post.savageLevel}% SAVAGE</span>
                </div>
              </div>

              <h4 className="text-2xl md:text-3xl font-black text-white leading-[1.1] uppercase tracking-tight">
                "{post.content}"
              </h4>

              {/* Best Roast Highlight */}
              <div className="p-4 bg-red-600/10 border-l-4 border-red-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 bg-red-600 text-[6px] font-black text-white uppercase tracking-widest">
                  BEST_ROAST
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[8px] font-black text-red-600 uppercase tracking-widest">@TheExecutioner</span>
                </div>
                <p className="text-sm font-bold text-white italic leading-snug">
                  "{post.topReply}"
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded">
                      <ArrowBigUp className="w-6 h-6 text-white/40 hover:text-green-500 cursor-pointer transition-colors" />
                      <span className="text-sm font-black text-white">{post.votes}</span>
                      <ArrowBigDown className="w-6 h-6 text-white/40 hover:text-red-600 cursor-pointer transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button className="text-[8px] font-black text-gold uppercase tracking-widest hover:underline flex items-center gap-2">
                      <Share2 className="w-3 h-3" /> Share Roast
                    </button>
                    <span className="text-[6px] font-mono text-white/20 uppercase tracking-widest mt-1">
                      // ID_{post.id}_V{post.votes}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button className="py-3 bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-colors flex flex-col items-center justify-center group/btn">
                    <Flame className="w-4 h-4 text-orange-500 group-hover/btn:scale-125 transition-transform" />
                    <span className="text-[8px] font-black text-white/40 mt-1 uppercase">Heat</span>
                  </button>
                  <button className="py-3 bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-colors flex flex-col items-center justify-center group/btn">
                    <Skull className="w-4 h-4 text-white group-hover/btn:scale-125 transition-transform" />
                    <span className="text-[8px] font-black text-white/40 mt-1 uppercase">Dead</span>
                  </button>
                  <button className="py-3 bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-colors flex flex-col items-center justify-center group/btn">
                    <Laugh className="w-4 h-4 text-yellow-500 group-hover/btn:scale-125 transition-transform" />
                    <span className="text-[8px] font-black text-white/40 mt-1 uppercase">Laugh</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 border-2 border-gold text-gold font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all brutalist-border">
            View All Opinions
          </button>
        </div>
      </div>
    </section>
  );
}
