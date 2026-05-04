"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Lock } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8 text-red-600" />,
    value: "1,000+",
    label: "Opinions Shared"
  },
  {
    icon: <Lock className="w-8 h-8 text-red-600" />,
    value: "100%",
    label: "Anonymous & Private"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-600" />,
    value: "Real People",
    label: "Zero Judgment"
  }
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="flex justify-center">{stat.icon}</div>
              <div className="text-4xl font-black text-white uppercase tracking-tighter">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-white/40 uppercase tracking-[0.3em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
