"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

// Facebook Pixel ID
const FB_PIXEL_ID = "1377343302882713";

// Initializes the Facebook Pixel
export const FacebookPixel = () => {
  const pathname = usePathname();

  // Track page views when the route changes
  useEffect(() => {
    if (pathname) {
      // Basic page view tracking
      fbq("track", "PageView");

      // Enhanced page-specific tracking
      trackPageView(pathname);
    }
  }, [pathname]);

  return (
    <>
      {/* Facebook Pixel base code */}
      <Script id="facebook-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* No-script fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

// Track page-specific views
function trackPageView(pathname: string) {
  // Only run on client
  if (typeof window === "undefined") return;

  // Define page type based on pathname
  const getPageType = (path: string) => {
    if (path === "/") return "Home";
    if (path === "/checkout") return "Checkout";
    if (path === "/refund-policy") return "RefundPolicy";
    if (path === "/payment/success") return "PaymentSuccess";
    if (path === "/payment/failure") return "PaymentFailure";
    if (path.startsWith("/payment")) return "Payment";
    return "Other";
  };

  const pageType = getPageType(pathname);

  // Track standard ViewContent event with page specifics
  (window as any).fbq("track", "ViewContent", {
    content_name: pageType,
    content_category: "Page",
    content_ids: [pathname],
    content_type: "product",
  });

  // Track custom page-specific events
  switch (pageType) {
    case "Checkout":
      (window as any).fbq("track", "InitiateCheckout", {
        content_category: "Checkout",
        content_name: "FAB Masterclass",
      });
      break;
    case "PaymentSuccess":
      (window as any).fbq("track", "Purchase", {
        currency: "INR",
        value: 500.0,
        content_name: "FAB Masterclass",
        content_type: "product",
        content_category: "Education",
      });
      break;
  }
}

// Helper to track custom events
export const trackFBEvent = (eventName: string, options = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, options);
  }
};
