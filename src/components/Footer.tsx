"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileText, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#", icon: <FileText className="w-3 h-3" /> },
        { label: "Privacy Policy", href: "#", icon: <Lock className="w-3 h-3" /> },
        { label: "Community Guidelines", href: "#", icon: <Shield className="w-3 h-3" /> },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "How it Works", href: "#how-it-works" },
        { label: "Hall of Shame", href: "#live-feed" },
        { label: "Leaderboard", href: "#leaderboard" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Twitter / X", href: "https://twitter.com", icon: <Twitter className="w-3 h-3" /> },
        { label: "GitHub", href: "https://github.com", icon: <Github className="w-3 h-3" /> },
        { label: "Contact", href: "mailto:support@brutallyhonest.xyz", icon: <Mail className="w-3 h-3" /> },
      ],
    },
  ];

  return (
    <footer className="bg-black border-t-4 border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              BRUTALLY<span className="text-gold">HONEST.</span>
            </h2>
            <p className="text-white/40 text-xs font-mono uppercase leading-relaxed tracking-wider">
              // THE_INTERROGATION_ENGINE<br />
              // NO_FEELINGS_SPARED<br />
              // DATA_DRIVEN_REALITY
            </p>
            <div className="flex gap-4">
              <motion.a 
                whileHover={{ y: -2, color: "#D4AF37" }}
                href="#" 
                className="text-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -2, color: "#D4AF37" }}
                href="#" 
                className="text-white/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-white font-black uppercase text-[10px] tracking-[0.3em] opacity-40">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      whileHover={{ x: 4, color: "#FFF" }}
                      href={link.href}
                      className="text-white/40 text-xs font-black uppercase tracking-widest flex items-center gap-2 group transition-colors"
                    >
                      {link.icon && <span className="opacity-0 group-hover:opacity-100 transition-opacity">{link.icon}</span>}
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
            © {currentYear} BRUTALLY HONEST INTERROGATION SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">System Status: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
