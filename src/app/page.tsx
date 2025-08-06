"use client";

import FabReaderHeader from "@/components/sections/FabReaderHeader";
import { FabReaderHeroSection2 } from "@/components/sections/FabReaderHeroSection2";
import { FabReaderResultsSection } from "@/components/sections/FabReaderResultsSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { FabReaderHowitsWorks } from "@/components/sections/FabReaderHowitsWorks";
import { FabReaderBonuses } from "@/components/sections/FabReaderBonuses";
import { FabReaderBenefitsSection } from "@/components/sections/FabReaderBenefitsSection";
import { FabReaderFaqSection } from "@/components/sections/FabReaderFaqSection";
import FabReader2Checkout from "@/components/sections/FabReader2Checkout";

export default function Page() {
  return (
    <>
      <FabReaderHeader />
      <FabReaderHeroSection2 />
      <ResultsSection id="results" />
      <FabReaderResultsSection id="book" />
      <FabReaderHowitsWorks id="how" />
      <FabReaderBonuses id="bonuses" />
      <FabReaderBenefitsSection id="why" />
      <FabReaderFaqSection id="faq" />
      <FabReader2Checkout id="premium" />
    </>
  );
}
