"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-gold/40 rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-gold pointer-events-none z-[9999] hidden lg:block"
        animate={{ x: mousePosition.x - 2, y: mousePosition.y - 2 }}
        transition={{ type: "spring", damping: 40, stiffness: 400, mass: 0.2 }}
      />
      <div 
        className="fixed top-0 left-0 w-4 h-px bg-gold/20 pointer-events-none z-[9999] hidden lg:block"
        style={{ transform: `translate(${mousePosition.x - 2}px, ${mousePosition.y}px)` }}
      />
      <div 
        className="fixed top-0 left-0 h-4 w-px bg-gold/20 pointer-events-none z-[9999] hidden lg:block"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y - 2}px)` }}
      />
    </>
  );
}
