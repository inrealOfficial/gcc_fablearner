"use client";

import { CheckoutSuccess } from "@/components/sections/checkout-succes";
import { ConversionTracker } from "@/components/ConversionTracker";
import { useEffect, Suspense } from "react";
import { trackFBEvent } from "@/components/FacebookPixel";

function SuccessPageContent() {
  useEffect(() => {
    // Track successful purchase
    trackFBEvent("Purchase", {
      currency: "AED",
      value: 22.0,
      content_name: "FAB Masterclass",
      content_type: "product",
      content_category: "Education",
    });
  }, []);

  return (
    <>
      <ConversionTracker />
      <CheckoutSuccess />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
