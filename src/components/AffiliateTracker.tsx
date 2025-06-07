"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  getAffiliateIdFromUrl,
  setAffiliateId,
  trackAffiliateClick,
} from "@/lib/affiliateTracking";

// Track at the module level to persist across remounts
const isTrackedGlobally = { current: false };

export function AffiliateTracker() {
  const searchParams = useSearchParams();
  const hasTrackedRef = useRef(false);
  const affiliateIdRef = useRef<string | null>(null);

  // First useEffect: Extract affiliate ID only once when params change
  useEffect(() => {
    try {
      const currentUrl = window.location.href;
      const affiliateId = getAffiliateIdFromUrl(currentUrl);
      affiliateIdRef.current = affiliateId;
    } catch (error) {
      console.error("Error extracting affiliate ID:", error);
    }
  }, [searchParams]);

  // Second useEffect: Track the click only once per session - no dependencies
  useEffect(() => {
    // Check module-level tracking flag first
    if (isTrackedGlobally.current) {
      console.log("Click already tracked globally, skipping");
      return;
    }

    // Check component-level tracking flag
    if (hasTrackedRef.current) {
      console.log("Click already tracked in this component, skipping");
      return;
    }

    // Check browser storage to prevent tracking across page refreshes
    if (sessionStorage.getItem("fablearner_tracking_done")) {
      console.log(
        "Click already tracked in this session (from storage), skipping"
      );
      isTrackedGlobally.current = true;
      hasTrackedRef.current = true;
      return;
    }

    const handleAffiliateTracking = async () => {
      try {
        const affiliateId = affiliateIdRef.current;

        if (affiliateId) {
          console.log("Starting affiliate tracking for:", affiliateId);

          // Store affiliate ID for attribution
          setAffiliateId(affiliateId);

          // Set all tracking flags before the async call
          hasTrackedRef.current = true;
          isTrackedGlobally.current = true;
          sessionStorage.setItem("fablearner_tracking_done", "true");

          // Track click - after we've already marked as tracked
          const trackingSuccess = await trackAffiliateClick(affiliateId);
          console.log("Affiliate click tracked successfully:", trackingSuccess);
        }
      } catch (error) {
        console.error("Affiliate tracking error:", error);
      }
    };

    // Small delay to ensure we're not competing with other initializations
    const trackingTimeout = setTimeout(() => {
      if (affiliateIdRef.current) {
        handleAffiliateTracking();
      }
    }, 100);

    return () => clearTimeout(trackingTimeout);
  }, []); // No dependencies - runs once on mount

  // This component doesn't render anything visible
  return null;
}
