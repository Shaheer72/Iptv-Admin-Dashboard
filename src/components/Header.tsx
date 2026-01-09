"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  onRegisterClick?: () => void;
}

export default function Header({ onRegisterClick }: HeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-500/20 ring-1 ring-inset ring-rose-400/30">
          <Sparkles className="h-5 w-5 text-rose-400" />
        </div>
        <span className="text-lg font-semibold tracking-tight">Desi IPTV</span>
      </div>

      <nav className="hidden items-center gap-8 md:flex">
        <a className="text-sm text-slate-300 hover:text-white" href="#features">Features</a>
        <a className="text-sm text-slate-300 hover:text-white" href="#live">Channels</a>
        <a className="text-sm text-slate-300 hover:text-white" href="#downloads">Downloads</a>
        <a className="text-sm text-slate-300 hover:text-white" href="#faq">FAQ</a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={onRegisterClick}
          className="rounded-md bg-lime-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500"
        >
          Register Now
        </button>
      </div>
    </header>
  );
} 