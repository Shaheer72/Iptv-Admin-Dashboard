"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function LiveDemo() {
  const prompts = useMemo(
    () => [
      `Stream the best of India with top TV channels, live sports, latest movies, and trending shows—all in one place.`,

      `Access your favorite USA channels for live sports, hit shows, news, and all the top American entertainment.`,

      `Watch popular UK and Canadian TV, exclusive streaming originals, movies, and family-friendly cartoons anytime.`,
    ],
    []
  );

  // Image sets mapped to each prompt index (Unsplash)
  const imageSets = useMemo(
    () => [
      [
        "/images/teal-water-heart-1.webp",
        "/images/teal-water-heart-2.webp",
        "/images/teal-water-heart-3.webp",
        "/images/teal-water-heart-4.webp",
        "/images/teal-water-heart-5.webp",
        "/images/teal-water-heart-6.webp",
        "/images/teal-water-heart-7.webp",
        "/images/teal-water-heart-8.webp",
        "/images/teal-water-heart-9.webp",
      ],
      [
        "/images/Isometric-city-1.webp",
        "/images/Isometric-city-2.webp",
        "/images/Isometric-city-3.webp",
        "/images/Isometric-city-4.webp",
        "/images/Isometric-city-5.webp",
        "/images/Isometric-city-6.webp",
        "/images/Isometric-city-7.webp",
        "/images/Isometric-city-8.webp",
        "/images/Isometric-city-9.webp",
      ],
      [
        "/images/luxury-watch-1.webp",
        "/images/luxury-watch-2.webp",
        "/images/luxury-watch-3.webp",
        "/images/luxury-watch-4.webp",
        "/images/luxury-watch-5.png",
        "/images/luxury-watch-6.webp",
        "/images/luxury-watch-7.webp",
        "/images/luxury-watch-8.webp",
        "/images/luxury-watch-9.webp",
      ]
    ],
    []
  );

  const [i, setI] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    function tick(t: number) {
      if (start === null) start = t;
      const elapsed = t - start;
      const pct = Math.min(100, (elapsed / 1400) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setI((prev) => (prev + 1) % prompts.length);
          setProgress(0);
          start = null;
          raf = requestAnimationFrame(tick);
        }, 700);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prompts.length]);

  const images = imageSets[i] ?? imageSets[0];
  const visibleCount = Math.max(1, Math.floor((progress / 100) * 9));

  return (
    <section id="live" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 
bg-gradient-to-br from-red-500/20 via-green-500/20 to-blue-500/20
p-4 ring-1 ring-white/10"
        >
          <div className="text-sm text-slate-400">Channels</div>
          <div className="mt-2 rounded-md border border-white/10
bg-gradient-to-br from-red-500/10 via-green-500/10 to-blue-500/10
p-3 font-mono text-white">
            {prompts[i]}
          </div>
          <div className="mt-4 text-sm text-slate-400">Loading Channels...</div>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-lime-600 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-400">{Math.floor(progress)}%</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/10 
bg-gradient-to-br from-red-500/20 via-green-500/20 to-blue-500/20
p-4 ring-1 ring-white/10"
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 9 }).map((_, idx) => {
              const isVisible = idx < visibleCount;
              const src = images[idx % images.length];
              return (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10">
                  {isVisible ? (
                    <Image
                      src={src}
                      alt={`Generated sample ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                      className="object-cover"
                      priority={idx < 2}
                    />
                  ) : (
                    <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-500/30 via-fuchsia-400/20 to-emerald-400/20" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center text-sm text-slate-400">American shows, live sports, and exciting news events, all with high-quality streaming</div>
        </motion.div>
      </div>
    </section>
  );
} 