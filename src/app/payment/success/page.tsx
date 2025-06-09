"use client";

import { CheckoutSuccess } from "@/components/sections/checkout-succes";
import { metadata as layoutMetadata } from "@/app/layout";
import { ConversionTracker } from "@/components/ConversionTracker";
import { useEffect } from "react";
import { trackFBEvent } from "@/components/FacebookPixel";

export const metadata = {
  ...layoutMetadata,
  title: "Payment Successful !! - FabLearner",
};

export default function Page() {
  useEffect(() => {
    // Track successful purchase
    trackFBEvent("Purchase", {
      currency: "INR",
      value: 500.0,
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
