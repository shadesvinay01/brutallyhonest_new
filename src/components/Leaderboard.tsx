"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Zap, Skull, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const topRoasters = [
  { name: "SavageTiger92", karma: 12400, roasts: 452, rank: 1 },
  { name: "ChaosKing_01", karma: 9800, roasts: 310, rank: 2 },
  { name: "DigitalGhost", karma: 8500, roasts: 289, rank: 3 },
  { name: "TruthSeeker", karma: 7200, roasts: 215, rank: 4 },
  { name: "BitterPill", karma: 6100, roasts: 198, rank: 5 },
];

export default function Leaderboard() {
  const [hallOfShame, setHallOfShame] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        if (Array.isArray(data)) {
          setHallOfShame(data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter flex items-center justify-center gap-4">
            <Trophy className="text-red-600 w-8 h-8 md:w-12 md:h-12" />
            Top Roasters
          </h2>
          <p className="text-white/40 font-mono mt-4 uppercase tracking-[0.2em] text-xs">
            // ELITE_TRUTH_TELLERS_LEADERBOARD
          </p>
        </div>

        <div className="space-y-4 opacity-50 grayscale pointer-events-none">
          {topRoasters.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl font-black text-white/20 w-8">
                  #{user.rank}
                </span>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">
                    {user.name}
                  </h4>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    {user.roasts} roasts delivered
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-600" />
                <span className="text-xl font-black text-white">
                  {user.karma.toLocaleString()} <span className="text-[10px] text-white/40 uppercase">Karma</span>
                </span>
              </div>
            </div>
          ))}
          <div className="text-center pt-4">
            <span className="text-[10px] font-black text-red-600 uppercase animate-pulse tracking-[0.5em]">
              // AUTH_REQUIRED_FOR_RANKING
            </span>
          </div>
        </div>

        {/* Hall of Shame */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter flex items-center justify-center gap-4">
              <Skull className="text-red-600 w-8 h-8 md:w-12 md:h-12" />
              Hall of Shame
            </h2>
            <p className="text-white/40 font-mono mt-4 uppercase tracking-[0.2em] text-xs">
              // MOST_CONTROVERSIAL_CASUALTIES
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hallOfShame.map((post, i) => {
                const savageLevel = 100 - (post.truthScore || 0);
                return (
                  <motion.div 
                    key={post.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-red-600/5 border border-red-600/20 hover:border-red-600/50 transition-all flex justify-between items-center group cursor-default"
                  >
                    <div className="flex-1 mr-4 overflow-hidden">
                      <h4 className="text-lg font-black text-white uppercase italic tracking-tight group-hover:text-red-600 transition-colors truncate">
                        "{post.idea}"
                      </h4>
                      <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">
                        By @Anon_{post.id.slice(-4)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-red-600 italic leading-none">{savageLevel}%</div>
                      <div className="text-[8px] font-black text-red-600/40 uppercase tracking-widest">SAVAGE</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
