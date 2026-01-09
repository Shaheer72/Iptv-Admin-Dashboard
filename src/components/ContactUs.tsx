"use client";

import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // Importing icons

interface ContactUsProps {
  onRegisterClick?: () => void;
}

export default function ContactUs({ onRegisterClick }: ContactUsProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20" id="contact">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 
bg-gradient-to-br from-red-500/20 via-green-500/20 to-blue-500/20 
p-10 ring-1 ring-white/10
">
        <div className="absolute -inset-12 -z-10 bg-[radial-gradient(ellipse_at_top,_#6366f1_0%,_transparent_60%)] opacity-30" />
        <h3 className="text-center text-3xl font-semibold tracking-tight text-white">
          Contact Us
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-300">
          Feel free to keep in touch with us!
        </p>

        <div className="mt-6 space-y-4 text-slate-300">

          <div className="flex items-center gap-3 text-center justify-center">
            <FaMapMarkerAlt className="text-lime-500" />
            <span>Available in: USA, UAE, UK, Canada & India</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onRegisterClick}
            className="rounded-md bg-lime-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-600"
          >
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
}
