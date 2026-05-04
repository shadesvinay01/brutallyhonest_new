"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Flame, MessageCircle, Skull } from "lucide-react";

const notifications = [
  { id: 1, message: "Your post is trending 🔥", icon: <Flame className="text-orange-500 w-4 h-4" /> },
  { id: 2, message: "New roast: 'You're delusional' 💀", icon: <Skull className="text-white w-4 h-4" /> },
  { id: 3, message: "23 people are talking about you", icon: <MessageCircle className="text-blue-500 w-4 h-4" /> },
];

export default function NotificationToast() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
      setCurrent((prev) => (prev + 1) % notifications.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[100] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="flex items-center gap-4 bg-zinc-900 border-2 border-red-600 p-4 shadow-[10px_10px_0px_0px_rgba(220,38,38,0.2)]"
          >
            <div className="p-2 bg-red-600/20 rounded-full">
              {notifications[current].icon}
            </div>
            <span className="text-xs font-black text-white uppercase tracking-widest whitespace-nowrap">
              {notifications[current].message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
