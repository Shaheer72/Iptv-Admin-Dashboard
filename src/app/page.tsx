'use client'

import { useState } from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import LiveDemo from "../components/Channels";
import Showcase from "../components/Downloads";
import FAQ from "../components/FAQ";
import CTA from "../components/ContactUs";
import Footer from "../components/Footer";
import RegistrationModal from "../components/RegistrationModal";

export default function Landing() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistrationModalOpen(true);
  };

  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.2),_rgba(34,197,94,0.2),_rgba(59,130,246,0.2))] bg-gray-950
">
      <Header onRegisterClick={handleRegisterClick} />
      <Hero onRegisterClick={handleRegisterClick} />
      <Features />
      <LiveDemo />
      <Showcase />
      <FAQ />
      <CTA onRegisterClick={handleRegisterClick} />
      <Footer />
      
      {/* Global Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </div>
  )
}
