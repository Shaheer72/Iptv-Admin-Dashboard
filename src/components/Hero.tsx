"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroCanvas from "./3d/HeroCanvas";
import AdminLoginModal from "./AdminLoginModal";
import AdminDashboard from "./AdminDashboard";
import { useEffect, useMemo, useState } from "react";

interface HeroProps {
  onRegisterClick?: () => void;
}

function useTypewriter(samples: string[], typingSpeedMs = 35, pauseMs = 1200) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    let mounted = true;
    let timeout: ReturnType<typeof setTimeout>;

    function typeNext(sample: string, charIndex = 0) {
      if (!mounted) return;
      if (charIndex <= sample.length) {
        setText(sample.slice(0, charIndex));
        timeout = setTimeout(
          () => typeNext(sample, charIndex + 1),
          typingSpeedMs
        );
      } else {
        timeout = setTimeout(() => {
          const next = (index + 1) % samples.length;
          setIndex(next);
        }, pauseMs);
      }
    }

    typeNext(samples[index]);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [index, samples, typingSpeedMs, pauseMs]);

  return text;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string>("");

  const prompts = useMemo(
    () => [
      "Live lineup with 12,000+ premium channels",
      "Entertainment for every taste: sports, cinema, news & family",
      "Smooth playback across all major devices",
      "Professional support available anytime",
    ],
    []
  );

  const typedPrompt = useTypewriter(prompts);

  return (
    <section id="hero" className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-balance text-4xl font-semibold tracking-tight md:text-6xl"
          >
            Entertainment Without Boundaries
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-pretty text-slate-300 md:text-lg"
          >
            Stream smarter with powerful features, global channels, and uninterrupted viewing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onRegisterClick}
              className="rounded-md px-5 py-3 text-sm font-medium text-rose-400 ring-1 ring-inset ring-rose-400 hover:text-rose-400 hover:ring-rose-400 hover:bg-rose-400/10 transition-all"
            >
              Register Now
            </button>
            <button
              onClick={() => setIsAdminLoginModalOpen(true)}
              className="rounded-md px-5 py-3 text-sm font-medium text-lime-500 ring-1 ring-inset ring-lime-400 hover:text-lime-500 hover:ring-lime-500 hover:bg-lime-400/10 transition-all"
            >
              Administrator
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6"
          >
            <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                Prompt
              </div>
              <div className="mt-1 font-mono text-slate-200">
                {typedPrompt}
                <span className="animate-pulse">▍</span>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-6 text-center md:max-w-lg">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-bold text-white">12k+</div>
              <div className="text-xs text-slate-400">Live Channels</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-xs text-slate-400">Movies</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-bold text-white">30k+</div>
              <div className="text-xs text-slate-400">Series</div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative sm:block hidden"
        >
          <HeroCanvas />
        </motion.div>
      </div>

      {/* Modals */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={(token) => {
          setAdminToken(token);
          setIsAdminLoginModalOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />
      {isAdminDashboardOpen && (
        <AdminDashboard
          adminToken={adminToken}
          onLogout={() => setIsAdminDashboardOpen(false)}
        />
      )}
    </section>
  );
}
