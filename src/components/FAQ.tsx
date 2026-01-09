"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is IPTV?",
    a: "IPTV (Internet Protocol Television) delivers live TV channels and on-demand content through the internet instead of cable or satellite.",
  },
  {
    q: "What do I need to use IPTV?",
    a: "You need a stable internet connection, a compatible device (Smart TV, Android, iOS, PC, or Firestick), and an IPTV app.",
  },
  {
    q: "Is IPTV legal?",
    a: "IPTV itself is legal, but legality depends on whether the service has proper licensing for the content it provides.",
  },
  {
    q: "Does IPTV require high internet speed?",
    a: "A minimum of 10 Mbps is recommended for HD streaming, and 25 Mbps or more for 4K content.",
  },
  {
    q: "Can I watch IPTV on multiple devices?",
    a: "Yes, but simultaneous connections depend on your subscription plan.",
  },
  {
    q: "What channels are included?",
    a: "IPTV typically includes live TV channels, sports, movies, series, and international content, depending on the package.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">FAQs</h2>
      <div className="mt-10 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {faqs.map(({ q, a }, idx) => (
          <Accordion key={idx} question={q} answer={a} />
        ))}
      </div>
    </section>
  );
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/5"
      >
        <span className="font-medium text-white">{question}</span>
        <span className="text-slate-400">{open ? "–" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-slate-300">{answer}</div>
      )}
      
    </div>
  );
} 