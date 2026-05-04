"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Zap } from "lucide-react";

const topRoasters = [
  { name: "SavageTiger92", karma: 12400, roasts: 452, rank: 1 },
  { name: "ChaosKing_01", karma: 9800, roasts: 310, rank: 2 },
  { name: "DigitalGhost", karma: 8500, roasts: 289, rank: 3 },
  { name: "TruthSeeker", karma: 7200, roasts: 215, rank: 4 },
  { name: "BitterPill", karma: 6100, roasts: 198, rank: 5 },
];

export default function Leaderboard() {
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

        <div className="space-y-4">
          {topRoasters.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-red-600/50 transition-all group"
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl font-black text-white/20 w-8">
                  #{user.rank}
                </span>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-red-600 transition-colors">
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
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs font-black text-white/30 uppercase tracking-[0.5em]">
            Roast more to climb the ranks
          </p>
        </div>
      </div>
    </section>
  );
}
