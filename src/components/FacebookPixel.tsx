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
      // Track page view on route change
      fbq("track", "PageView");
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

// Helper to track custom events
export const trackFBEvent = (eventName: string, options = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, options);
  }
};
