"use client";

import { motion } from "framer-motion";
import { Edit3, MessageSquare, RefreshCcw } from "lucide-react";

const steps = [
  {
    icon: <Edit3 className="w-12 h-12 text-red-600" />,
    title: "1. DROP THE TRUTH",
    description: "Submit your idea. Our AI instantly scans for logical fallacies, market vulnerabilities, and structural weaknesses in your plan."
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-red-600" />,
    title: "2. GET DISSECTED",
    description: "The engine generates a high-precision roast, translating identified gaps into brutal but actionable feedback. No fluff, just data-driven dissection."
  },
  {
    icon: <RefreshCcw className="w-12 h-12 text-red-600" />,
    title: "3. EVOLVE OR DIE",
    description: "Review the autopsy, pivot your strategy based on the 'Improvement Plan', and come back when you actually have something worth showing."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            How It Works
          </h2>
          <div className="h-2 w-24 bg-red-600 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 border-4 border-white/10 hover:border-red-600/50 transition-all group bg-white/5"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-white/40 font-medium leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
