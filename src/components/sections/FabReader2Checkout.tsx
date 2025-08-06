"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Andika } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { trackFBEvent } from "@/components/FacebookPixel";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Import countries from your existing file or define them here
import { COUNTRIES } from "@/utils/countries"; // Adjust import as needed

// Updated price - AED 500 (equivalent to ₹9,000)
const originalPrice = 500.00;

// Mock coupon validation for FABREADER4K
const validateCoupon = async (code: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (code.toUpperCase() === "FABREADER4K") {
    return {
      code: "FABREADER4K",
      discount: 223.33, // AED equivalent of ₹4000 (4000/9000 * 500)
      type: "fixed",
      minAmount: 0,
    };
  }
  return null;
};

export default function FabReaderCheckout({ id }: { id?: string }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "India (IN)",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: string;
  } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const detectCountry = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return data.country_code;
    } catch (error) {
      console.error("Country detection failed:", error);
      return "IN"; // Default to India
    }
  };

  useEffect(() => {
    const setInitialCountry = async () => {
      const detectedCountry = await detectCountry();
      const country = COUNTRIES.find((c) => c.code === detectedCountry);
      if (country) {
        setFormData((prev) => ({ ...prev, country: country.code }));
      }
    };
    setInitialCountry();
  }, []);

  // Discounted price calculation
  const discountedPrice = appliedCoupon
    ? Math.max(originalPrice - appliedCoupon.discount, 0).toFixed(2)
    : originalPrice.toFixed(2);

  const [isProcessing, setIsProcessing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Coupon validation
  const validateCouponCode = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError("");

    try {
      const normalizedCode = couponCode.toUpperCase().trim();

      // Use mock validation for FABREADER4K or your existing Firestore function
      const couponData = await validateCoupon(normalizedCode);

      if (couponData) {
        if (couponData.type === "percentage" && couponData.discount < 100) {
          couponData.discount = Number(
            originalPrice * (couponData.discount / 100)
          );
        }
        if (originalPrice < couponData.discount) {
          setCouponError("Invalid coupon code");
          setAppliedCoupon(null);
          return;
        }
        if (originalPrice < couponData.minAmount) {
          setCouponError("Invalid coupon code");
          setAppliedCoupon(null);
          return;
        }

        setAppliedCoupon({
          code: normalizedCode,
          discount: couponData.discount,
          type: couponData.type,
        });

        // Track coupon usage with Facebook Pixel
        trackFBEvent("AddPaymentInfo", {
          content_name: "FabReader Premium Program",
          coupon: normalizedCode,
          discount_amount: couponData.discount,
        });

        setCouponCode("");
        setCouponError("");
      } else {
        setCouponError("Invalid coupon code");
        setAppliedCoupon(null);
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      setCouponError("Error validating coupon. Please try again.");
      setAppliedCoupon(null);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  // Handle payment - replace with Stripe implementation
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsProcessing(true);

      // Form validation
      if (!formData.email || !formData.firstName || !formData.phone) {
        alert("Please fill in all required fields");
        setIsProcessing(false);
        return;
      }

      // Track checkout event
      trackFBEvent("InitiateCheckout", {
        content_name: "FabReader Premium",
        currency: "AED",
        value: Number(discountedPrice),
        coupon: appliedCoupon?.code || null,
      });

      // Create Stripe checkout session
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: discountedPrice,
          productName: appliedCoupon
            ? `FABREADER PREMIUM (Coupon: ${appliedCoupon.code})`
            : "FABREADER PREMIUM",
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName || ""}`,
          customerPhone: formData.phone,
          couponCode: appliedCoupon?.code || null,
          metadata: {
            firstName: formData.firstName,
            lastName: formData.lastName || "",
            phone: formData.phone,
            couponApplied: appliedCoupon?.code || "none",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div
      id={id}
      className={`${andika.variable} min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50`}
    >
      {/* Main Content */}
      <main className="pt-28 max-w-3xl mx-auto py-8 px-4">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 relative overflow-hidden border border-gray-100"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {/* Decorative Background Gradients */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-50 to-purple-50 
            opacity-20 rounded-full blur-3xl -translate-y-48 translate-x-48 rotate-12"
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-indigo-50 
            opacity-20 rounded-full blur-3xl translate-y-48 -translate-x-48 -rotate-12"
          />

          {/* Content Container */}
          <div className="relative space-y-6 sm:space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-3">
              <motion.div
                className="mx-auto mb-4 w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <span className="text-3xl" role="img" aria-label="book">
                  📚
                </span>
              </motion.div>

              <motion.h1
                className="font-dingdong text-2xl sm:text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 
                  bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                FabReader Premium Program
              </motion.h1>
              <motion.p className="text-gray-500 text-sm sm:text-base">
                Advanced reading techniques for exceptional readers
              </motion.p>
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
              />
            </div>

            {/* Course Summary Card - Mobile Optimized */}
            <motion.div
              className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl p-4 sm:p-6 border-2 
              border-gray-100 group hover:border-indigo-100 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white shadow-lg flex items-center justify-center flex-shrink-0">
                    <motion.span
                      className="text-2xl sm:text-3xl"
                      animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      🌟
                    </motion.span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2
                      className={`${andika.className} text-lg sm:text-xl font-bold text-gray-800`}
                    >
                      FABREADER PREMIUM
                    </h2>
                    <p className="font-dingdong text-gray-500 text-sm sm:text-base">
                      Lifetime Access + Premium Features
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p
                    className={`${andika.className} text-xl sm:text-2xl font-bold text-indigo-600`}
                  >
                    AED {originalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Customer Information */}
              <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 rounded-2xl bg-gray-50/50 border border-gray-100">
                <h3
                  className={`${andika.className} text-lg font-bold text-gray-800`}
                >
                  Customer Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                    >
                      Email Address <span className="text-indigo-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-xl
                        focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm sm:text-base"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                      >
                        First name <span className="text-indigo-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm sm:text-base"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm sm:text-base"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                      >
                        Country <span className="text-indigo-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-xl
                            focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all appearance-none text-sm sm:text-base"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select country</option>
                          {COUNTRIES.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                          <ReactCountryFlag
                            countryCode={formData.country || "IN"}
                            style={{ fontSize: "1.2em", opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                      >
                        Phone Number <span className="text-indigo-500">*</span>
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm sm:text-base"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section - Update to show Stripe */}
              <div
                className="space-y-4 sm:space-y-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/30 to-purple-50/30 
                border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3
                      className={`${andika.className} text-lg font-bold text-gray-800`}
                    >
                      Payment Method
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Secure payment via Stripe
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/stripe.png"
                      alt="Stripe"
                      width={60}
                      height={60}
                      className="h-8 sm:h-12 w-auto"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Coupon Section - Mobile Optimized */}
              <div className="space-y-4 p-4 sm:p-6 rounded-2xl bg-white border border-gray-100">
                <h3
                  className={`${andika.className} text-lg font-bold text-gray-800`}
                >
                  Have a Coupon?
                </h3>

                {appliedCoupon ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-green-50 p-3 rounded-lg border border-green-200 gap-2">
                    <div className="min-w-0">
                      <span className="font-medium text-green-700">
                        Applied:{" "}
                      </span>
                      <span className="font-semibold">
                        {appliedCoupon.code}
                      </span>
                      <span className="ml-2 text-green-700">
                        (AED {appliedCoupon.discount.toFixed(2)} off)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-sm text-red-500 hover:text-red-700 self-start sm:self-center"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code (try FABREADER4K)"
                      className="flex-1 p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-sm sm:text-base min-w-0"
                    />
                    <button
                      type="button"
                      onClick={validateCouponCode}
                      disabled={isValidatingCoupon || !couponCode.trim()}
                      className={`bg-indigo-600 text-white px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base whitespace-nowrap ${
                        isValidatingCoupon || !couponCode.trim()
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-indigo-700"
                      }`}
                    >
                      {isValidatingCoupon ? "Validating..." : "Apply"}
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="mt-2 text-red-500 text-sm">{couponError}</p>
                )}
              </div>

              {/* Order Summary - Mobile Optimized */}
              <div className="p-4 sm:p-6 rounded-2xl bg-gray-50 space-y-3 sm:space-y-4">
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>AED {originalPrice.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 text-sm sm:text-base">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-AED {appliedCoupon.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg sm:text-xl font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    AED {Number(discountedPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                className={`${andika.className} w-full bg-gradient-to-r from-indigo-500 to-purple-500 
                  text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg relative overflow-hidden group
                  shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all
                  disabled:opacity-70 disabled:cursor-not-allowed`}
                onClick={handlePayment}
                disabled={isProcessing}
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                <span className="relative z-10">
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Secure Premium Access"
                  )}
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </motion.button>

              {/* Security Badge - Update to show Stripe */}
              <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure Payment via Stripe
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="relative py-16 sm:py-32 px-4 overflow-hidden mt-16"
        style={{ backgroundColor: "rgba(37, 150, 190, 0.8)" }} // teal-600 with opacity
      >
        {/* Background Elements */}
        <motion.div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full 
              bg-indigo-500/30 filter blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full 
              bg-purple-500/30 filter blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            className="text-center mb-8 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="inline-block mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Image
                src="/logo.png"
                alt="Fablearner Logo"
                width={200}
                height={50}
                className="h-8 sm:h-12 w-auto"
                priority
                unoptimized
              />
            </motion.div>
            <motion.h3 className="font-dingdong text-xl sm:text-2xl md:text-3xl text-white leading-tight">
              The #1 Family-Centred Ed-Tech Provider in India
            </motion.h3>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div
            className={`pt-8 border-t border-white/20 text-center ${andika.className}`}
            variants={itemVariants}
          >
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} FAB Learning. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
