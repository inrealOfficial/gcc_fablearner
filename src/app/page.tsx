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
import { CtaMobileOnly } from "@/components/sections/cta-mobile-only";
export default function Home() {
  return (
    <main className="overflow-x-hidden font-sans bg-white">
      <CtaMobileOnly />
      <HeroSection />
      <ResultsSection id="results" />
      <BenefitsSection id="benifits" />
      <TestimonialsSection id="testimonials" />
      <ScheduleSection id="schedule" />
      <FaqSection id="faq" />
      <RegistrationSection />
      <Footer />
    </main>
  );
}
