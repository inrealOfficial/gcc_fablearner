"use client";
import dynamic from "next/dynamic";

// Dynamically import non-critical sections
const BenefitsSection = dynamic(() =>
  import("../components/sections/BenefitsSection").then((mod) => ({
    default: mod.BenefitsSection,
  }))
);
const TestimonialsSection = dynamic(() =>
  import("../components/sections/TestimonialsSection").then((mod) => ({
    default: mod.TestimonialsSection,
  }))
);
const ScheduleSection = dynamic(() =>
  import("../components/sections/ScheduleSection").then((mod) => ({
    default: mod.ScheduleSection,
  }))
);
const FaqSection = dynamic(() =>
  import("@/components/sections/FaqSection").then((mod) => ({
    default: mod.FaqSection,
  }))
);
const RegistrationSection = dynamic(() =>
  import("../components/sections/RegistrationSection").then((mod) => ({
    default: mod.RegistrationSection,
  }))
);

// Import critical sections normally
import { HeroSection } from "../components/sections/HeroSection";
import { ResultsSection } from "../components/sections/ResultsSection";
import { Footer } from "../components/sections/Footer";
import { CtaMobileOnly } from "@/components/sections/cta-mobile-only";
import { AffiliateTracker } from "@/components/AffiliateTracker";

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
      <AffiliateTracker />
    </main>
  );
}
