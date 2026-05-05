"use client";

import { motion } from "framer-motion";
import { MessageCircle, Flame, Skull, Laugh, ArrowBigUp, ArrowBigDown, Share2, AlertTriangle, Shield, Zap, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function LiveFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRoasts() {
      try {
        const response = await fetch("/api/roasts");
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch truth stream:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRoasts();
  }, []);

  return (
    <section id="live-feed" className="py-32 bg-black relative border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
              The <span className="text-gold">War Room</span>
            </h2>
            <p className="text-white/40 font-mono mt-4 uppercase tracking-widest">
              // HIGH_INTENSITY_ENGAGEMENT_FEED
            </p>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-gold text-black font-black text-xs uppercase tracking-widest animate-pulse">
              LIVE_INTERROGATIONS
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-gold animate-spin" />
            <span className="text-xs font-black text-gold uppercase tracking-[0.5em]">Synchronizing_Reality...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {posts.map((post, index) => {
              const truthScore = post.truthScore || 0;
              const savageLevel = 100 - truthScore;
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-zinc-950 border-4 border-white/5 p-8 flex flex-col gap-8 hover:border-gold/20 transition-all relative group shadow-[15px_15px_0px_0px_rgba(212,175,55,0.02)]"
                >
                  {/* Post Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">
                          @Anonymous_Subject_{post.id.slice(-4)}
                        </span>
                        <span className="px-2 py-0.5 bg-white/10 text-[6px] font-black text-white/60 uppercase tracking-widest rounded-full">
                          Casualty
                        </span>
                      </div>
                      <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                        Subject: {post.category}
                      </span>
                    </div>
                    {savageLevel > 80 && (
                      <div className="flex items-center gap-2 text-orange-500 animate-bounce">
                        <Flame className="w-4 h-4 fill-current" />
                        <span className="text-[8px] font-black uppercase">Viral_Burn</span>
                      </div>
                    )}
                  </div>

                  {/* Main Content */}
                  <h4 className="text-xl md:text-2xl font-black text-white leading-tight uppercase italic tracking-tighter">
                    "{post.idea}"
                  </h4>

                  {/* Threaded Replies */}
                  <div className="space-y-4 pl-4 border-l-2 border-white/10">
                    <div className="p-4 bg-red-600/10 border border-red-600/30 relative">
                      <div className="absolute -top-2 -right-2 px-2 py-1 bg-red-600 text-[6px] font-black text-white uppercase tracking-widest italic">
                        AI_INTERROGATOR
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[8px] font-black text-white/40 uppercase">@System_Admin</span>
                        <span className="text-[8px] font-black text-red-600 uppercase italic">CRITICAL_HIT</span>
                      </div>
                      <p className="text-sm font-bold text-white uppercase leading-snug">
                        "{post.brutalRoast}"
                      </p>
                    </div>
                  </div>

                  {/* Interaction Bar */}
                  <div className="mt-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 bg-white/5 p-2 border border-white/10">
                      <button className="p-2 hover:bg-green-600/20 group/up transition-all">
                        <ArrowBigUp className="w-6 h-6 text-white/20 group-hover/up:text-green-500" />
                      </button>
                      <span className={`text-xl font-black italic ${truthScore > 50 ? "text-green-500" : "text-red-600"}`}>
                        {truthScore}
                      </span>
                      <button className="p-2 hover:bg-red-600/20 group/down transition-all">
                        <ArrowBigDown className="w-6 h-6 text-white/20 group-hover/down:text-red-600" />
                      </button>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="flex flex-col items-end">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => alert("Reported to Interrogation Systems.")}
                            className="p-3 bg-white/5 border border-white/10 text-white/20 hover:text-red-600 hover:bg-red-600/10 transition-all group"
                            title="Flag Content"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                          <button className="px-6 py-3 bg-gold text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all flex items-center gap-2">
                            <Share2 className="w-4 h-4" /> Share
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <Skull className="w-5 h-5 text-red-600 mb-1" />
                        <span className="text-[8px] font-black text-red-600 uppercase tracking-tighter">
                          {savageLevel}% Dead
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-20 text-center">
          <button className="px-12 py-6 bg-transparent border-4 border-gold text-gold font-black uppercase tracking-[0.4em] text-xl hover:bg-gold hover:text-black transition-all brutalist-border-gold">
            Enter the Deep Feed
          </button>
        </div>
      </div>
    </section>
  );
}
