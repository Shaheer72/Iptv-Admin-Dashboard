"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-12">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row">
        <span>© {new Date().getFullYear()} Desi IPTV</span>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-white">Terms</Link>
          <Link href="#" className="hover:text-white">Privacy</Link>
        </div>
      </div>
    </footer>
  );
} 