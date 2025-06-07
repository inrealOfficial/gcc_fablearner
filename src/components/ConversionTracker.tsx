"use client";

import { useEffect } from "react";
import { trackAffiliateConversion } from "@/lib/affiliateTracking";

export function ConversionTracker() {
  // Track conversion once when page loads
  useEffect(() => {
    const trackConversion = async () => {
      try {
        const success = await trackAffiliateConversion();
        console.log(`Conversion ${success ? "tracked" : "not tracked"}`);
      } catch (error) {
        console.error("Error tracking conversion:", error);
      }
    };

    trackConversion();
  }, []);

  // This component doesn't render anything visible
  return null;
}
