"use client";

import { motion } from "framer-motion";
import { Brush, Layers, Sparkles, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    title: "Live TV Channels",
    description: "Access thousands of live TV channels from around the world.",
    Icon: Brush,
  },
  {
    title: "Video on Demand (VOD)",
    description: "Watch movies and TV series anytime from a large on-demand library.",
    Icon: Layers,
  },
  {
    title: "HD & 4K Quality",
    description: "Enjoy high-quality streaming with HD and 4K resolution support.",
    Icon: Zap,
  },
  {
    title: "Multi-Device",
    description: "Works on Smart TVs, Android, iOS, PCs, tablets, and streaming devices.",
    Icon: Sparkles,
  },
  {
    title: "Electronic Program Guide (EPG)",
    description: "View schedules and upcoming programs with an easy-to-use TV guide.",
    Icon: Shield,
  },
  {
    title: "Fast & Stable Streaming",
    description: "Optimized servers ensure smooth playback with minimal buffering.",
    Icon: Globe,
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">All you need to watch TV</h2>
        <p className="mt-4 text-slate-300">Smart IPTV features for a better viewing experience.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, description, Icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="group rounded-xl border border-white/10 bg-white/5 p-5 ring-1 ring-inset ring-white/10 hover:border-white/20"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-rose-500/15 ring-1 ring-inset ring-indigo-400/20">
              <Icon className="h-5 w-5 text-rose-400" />
            </div>
            <div className="text-lg font-semibold text-white">{title}</div>
            <div className="mt-1 text-sm text-slate-300">{description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 