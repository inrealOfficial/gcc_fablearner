"use client";

// Import section components
import { HeroSection } from "../components/sections/HeroSection";
import { ResultsSection } from "../components/sections/ResultsSection";
import { BenefitsSection } from "../components/sections/BenefitsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { ScheduleSection } from "../components/sections/ScheduleSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { RegistrationSection } from "../components/sections/RegistrationSection";
import { Footer } from "../components/sections/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden font-sans bg-white">
      <HeroSection />
      <ResultsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ScheduleSection />
      <FaqSection />
      <RegistrationSection />
      <Footer />
    </main>
  );
}
