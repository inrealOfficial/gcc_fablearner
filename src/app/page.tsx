"use client";

// Import section components
import { HeroSection } from "../components/sections/HeroSection";
import { ResultsSection } from "../components/sections/ResultsSection";
import { BenefitsSection } from "../components/sections/BenefitsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { ScheduleSection } from "../components/sections/ScheduleSection";
import { FaqSection } from "../components/sections/FaqSection";
import { RegistrationSection } from "../components/sections/RegistrationSection";
import { Footer } from "../components/sections/Footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden font-sans bg-gradient-to-b from-blue-50 to-white">
      <HeroSection />
      {/* <ResultsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ScheduleSection />
      <FaqSection />
      <RegistrationSection />
      <Footer /> */}
    </div>
  );
}
