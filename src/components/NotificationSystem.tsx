"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Bell, Flame, Skull, TrendingUp } from "lucide-react";

interface Notification {
  id: string;
  type: "ROAST" | "TRENDING" | "KARMA";
  message: string;
  time: string;
}

const mockNotifs: Notification[] = [
  { id: "1", type: "ROAST", message: "Someone just decimated your startup idea.", time: "JUST NOW" },
  { id: "2", type: "TRENDING", message: "Your post 'Is this resume good?' is going viral.", time: "2M AGO" },
  { id: "3", type: "KARMA", message: "You earned +50 Truth Karma for a savage reply.", time: "5M AGO" },
];

export default function NotificationSystem() {
  const [activeNotifs, setActiveNotifs] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate incoming notifications
    const timer = setTimeout(() => {
      setActiveNotifs([mockNotifs[0]]);
    }, 5000);

    const timer2 = setTimeout(() => {
      setActiveNotifs((prev) => [...prev, mockNotifs[1]]);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed bottom-32 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {activeNotifs.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-80 bg-black/90 border-2 border-gold p-4 flex items-start gap-4 shadow-[10px_10px_0px_0px_rgba(212,175,55,0.2)] pointer-events-auto cursor-pointer group hover:bg-gold hover:text-black transition-all"
            onClick={() => setActiveNotifs(activeNotifs.filter(notif => notif.id !== n.id))}
          >
            <div className="p-2 bg-gold/10 group-hover:bg-black/20">
              {n.type === "ROAST" && <Skull className="w-5 h-5 text-red-600" />}
              {n.type === "TRENDING" && <Flame className="w-5 h-5 text-orange-500" />}
              {n.type === "KARMA" && <TrendingUp className="w-5 h-5 text-green-500" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40">
                  {n.type}_SIGNAL
                </span>
                <span className="text-[8px] font-mono opacity-40">{n.time}</span>
              </div>
              <p className="text-xs font-black uppercase leading-tight">
                {n.message}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
