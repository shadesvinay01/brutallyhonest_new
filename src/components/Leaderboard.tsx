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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "My Startup for Dog NFTs", savage: 98, author: "DelusionalFounder" },
              { title: "Am I hot or just rich?", savage: 95, author: "TrustFundKid" },
              { title: "Quit my job for whistling", savage: 92, author: "Whistler101" },
              { title: "Is this resume good?", savage: 89, author: "JuniorDev" }
            ].map((post, i) => (
              <div key={i} className="p-6 bg-red-600/5 border border-red-600/20 hover:border-red-600/50 transition-all flex justify-between items-center group">
                <div>
                  <h4 className="text-lg font-black text-white uppercase italic tracking-tight group-hover:text-red-600 transition-colors">
                    "{post.title}"
                  </h4>
                  <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">By @{post.author}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-red-600 italic leading-none">{post.savage}%</div>
                  <div className="text-[8px] font-black text-red-600/40 uppercase tracking-widest">SAVAGE</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
