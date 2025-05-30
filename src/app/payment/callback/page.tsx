"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // You may need to create this component

export default function PaymentCallback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse URL parameters from PayU callback
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const mihpayid = urlParams.get("mihpayid");

    // Process based on payment status
    if (status === "success") {
      // Payment was successful
      console.log("Payment successful:", mihpayid);
      router.push("/payment/success");
    } else {
      // Payment failed
      console.log("Payment failed:", urlParams.get("error_Message"));
      router.push("/payment/failure");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Processing Payment</h1>
        <p className="mb-6">Please wait while we verify your payment...</p>
        <div className="flex justify-center">
          {/* You'll need to create a simple loading spinner component */}
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
