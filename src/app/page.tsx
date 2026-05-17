"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import IdeaForm from "@/components/IdeaForm";
import LoadingState from "@/components/LoadingState";
import ResultsDisplay from "@/components/ResultsDisplay";
import NetworkBackground from "@/components/NetworkBackground";
import HowItWorks from "@/components/HowItWorks";
import LiveFeed from "@/components/LiveFeed";
import TrustSection from "@/components/TrustSection";
import TriggerChips from "@/components/TriggerChips";
import Leaderboard from "@/components/Leaderboard";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import NotificationToast from "@/components/NotificationToast";
import Onboarding from "@/components/Onboarding";
import { cn } from "@/lib/utils";

type AppState = "LANDING" | "FORM" | "LOADING" | "RESULTS";

export default function Home() {
  const [state, setState] = useState<AppState>("LANDING");
  const [result, setResult] = useState<any>(null);
  const [inputIntensity, setInputIntensity] = useState(0);
  const [isBrutal, setIsBrutal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("startup");
  const [streamingText, setStreamingText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStart = (category: string = "startup") => {
    setSelectedCategory(category);
    setState("FORM");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (formData: any) => {
    setIsBrutal(formData.isBrutal);
    setState("LOADING");
    setStreamingText("");
    setErrorMessage(null);
    
    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Server responded with status ${response.status}`);
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reconstructedAIResponse = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // SSE messages are separated by \n\n
        const lines = buffer.split("\n\n");
        // Keep the last partial line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              // Handle server-sent error events (e.g. stream crash, DB error)
              if (data.error) {
                throw new Error(data.error);
              }
              if (data.chunk) {
                reconstructedAIResponse += data.chunk;
                // Try to extract the roast text from partial JSON
                const roastMatch = reconstructedAIResponse.match(/"brutalRoast"\s*:\s*"([^"]*)"?/);
                if (roastMatch && roastMatch[1]) {
                  setStreamingText(roastMatch[1]);
                }
              }
              if (data.done) {
                // roastId available at data.roastId for reactions
              }
            } catch (e) {
              console.warn("Failed to parse SSE chunk", e);
              throw e; // re-throw so outer catch handles it
            }
          }
        }
      }

      // Cleanup and parse final response
      // Remove any markdown code blocks if the AI included them
      const jsonString = reconstructedAIResponse.replace(/```json|```/g, "").trim();

      if (!jsonString) {
        throw new Error("The AI returned an empty response. Please try again.");
      }

      const data = JSON.parse(jsonString);
      
      setResult(data);
      setState("RESULTS");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      const msg = error?.message || "Something went wrong. Please try again.";
      console.error("Failed to roast idea:", msg);
      setErrorMessage(msg);
      setState("FORM");
    }
  };

  const handleRetry = () => {
    setResult(null);
    setState("FORM");
  };

  return (
    <main className="min-h-screen bg-black relative selection:bg-gold selection:text-black overflow-x-hidden font-sans">
      <div className="particles-bg" />
      <div className="scanner-line" />
      {/* Interrogation Watermarks - Atmospheric */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[5%] text-[15vw] font-black uppercase leading-none select-none"
        >
          What is the problem?
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[5%] text-[12vw] font-black uppercase leading-none select-none text-right"
        >
          How do you make money?
        </motion.div>
        <motion.div 
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] right-[10%] text-[10vw] font-black uppercase leading-none select-none opacity-50"
        >
          Target Audience?
        </motion.div>
      </div>

      {/* Network Reactive Background - HIDDEN on Results for absolute clarity */}
      {state !== "RESULTS" && <NetworkBackground intensity={inputIntensity} state={state} />}

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {state === "LANDING" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={handleStart} />
              <TriggerChips onSelect={(cat) => handleStart(cat)} />
              <HowItWorks />
              <LiveFeed />
              <Leaderboard />
              <Newsletter />
              <Footer />
              <TrustSection />
              <NotificationToast />
              <Onboarding />
            </motion.div>
          )}

          {state === "FORM" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="pt-20"
            >
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 mx-auto max-w-2xl bg-red-900/40 border border-red-500/50 text-red-300 text-sm font-mono px-5 py-4 rounded-lg"
                >
                  ⚠️ {errorMessage}
                </motion.div>
              )}
              <IdeaForm 
                onSubmit={handleSubmit} 
                onInputChange={setInputIntensity} 
                initialCategory={selectedCategory}
              />
            </motion.div>
          )}

          {state === "LOADING" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-32"
            >
              <LoadingState streamingText={streamingText} />
            </motion.div>
          )}

          {state === "RESULTS" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsDisplay data={result} onRetry={handleRetry} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subject Data Details - Clearer/Sharp */}
      <div className="fixed top-8 right-8 z-[60] hidden md:flex flex-col items-end opacity-40 pointer-events-none">
        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white">System_Status_Ready</span>
      </div>

      {/* Footer Branding */}
      <footer className="relative md:fixed bottom-0 left-0 w-full p-8 flex flex-col md:flex-row justify-between items-center md:items-end pointer-events-none z-50 gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-[10px] font-black text-gold uppercase tracking-[0.5em] mb-2 opacity-50">
            Truth_Engine_v1.0
          </span>
          <h3 className="text-xl font-black text-white leading-none">BRUTALLY HONEST.</h3>
        </div>
        <div className="text-[10px] font-mono text-white/20 text-center md:text-right">
          PROD_READY // INTERNAL_USE_ONLY
        </div>
      </footer>
    </main>
  );
}
