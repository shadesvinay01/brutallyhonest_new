"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Flame, MessageCircle, Skull, TrendingUp, Zap } from "lucide-react";

const notifications = [
  { id: 1, message: "CRITICAL: YOUR STARTUP IDEA WAS JUST DECIMATED.", type: "ROAST", icon: <Skull className="text-red-600 w-4 h-4" /> },
  { id: 2, message: "TRENDING: 'QUIT MY JOB' POST GOING VIRAL.", type: "HOT", icon: <Flame className="text-orange-500 w-4 h-4" /> },
  { id: 3, message: "REPUTATION: +150 KARMA EARNED FOR SAVAGE REPLY.", type: "KARMA", icon: <TrendingUp className="text-green-500 w-4 h-4" /> },
  { id: 4, message: "SIGNAL: 42 PEOPLE ARE VOTING ON YOUR LOOKS.", type: "ENGAGE", icon: <Zap className="text-gold w-4 h-4" /> },
];

export default function NotificationToast() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 5s
    const startTimer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }, 5000);

    const cycleTimer = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
      setCurrent((prev) => (prev + 1) % notifications.length);
    }, 12000);

    return () => {
      clearTimeout(startTimer);
      clearInterval(cycleTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[100] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, x: -50, scale: 0.8 }}
            className="flex items-center gap-6 bg-black border-4 border-gold p-6 shadow-[15px_15px_0px_0px_rgba(212,175,55,0.2)]"
          >
            <div className="p-3 bg-gold/10 border border-gold/20 relative">
              {notifications[current].icon}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gold/40 uppercase tracking-[0.3em] mb-1">
                {notifications[current].type}_FEED_ALERT
              </span>
              <span className="text-sm font-black text-white uppercase tracking-tight italic whitespace-nowrap">
                {notifications[current].message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
