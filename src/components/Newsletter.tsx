"use client";

import { motion } from "framer-motion";
import { Send, Zap } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-32 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest">
              <Zap className="w-3 h-3 fill-current" /> Stay Brutal
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] italic">
              Join the <br />
              <span className="text-gold">Inner Circle.</span>
            </h2>
            <p className="text-white/40 font-medium text-lg max-w-md uppercase tracking-tight">
              Get the most brutal startup autopsies and truth bombs delivered to your inbox weekly. No fluff. Just data.
            </p>
          </div>

          <div className="relative group">
            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 border-4 border-gold bg-gold/5 text-center space-y-4"
              >
                <h3 className="text-3xl font-black text-gold uppercase tracking-tighter">You're In.</h3>
                <p className="text-white/60 text-xs font-black uppercase tracking-widest">Prepare for the truth.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER_YOUR_EMAIL"
                    className="w-full bg-transparent border-4 border-white/10 p-8 text-2xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-gold transition-all uppercase italic"
                  />
                  <div className="absolute top-2 right-4 text-[8px] font-black text-white/20 tracking-widest uppercase">
                    Security_Encryption: Active
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-black font-black uppercase tracking-[0.5em] py-8 text-2xl flex items-center justify-center gap-4 hover:bg-white transition-all brutalist-border-gold"
                >
                  <Send className="w-6 h-6" />
                  Subscribe
                </button>
                <p className="text-center text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mt-4">
                  By joining, you agree to hear the truth.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
