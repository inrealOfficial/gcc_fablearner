"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Andika } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { nanoid } from "nanoid";
import CryptoJS from "crypto-js";
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

// PayU configuration
const PAYU_CONFIG = {
  key: process.env.NEXT_PUBLIC_PAYU_KEY || "",
  salt: process.env.NEXT_PUBLIC_PAYU_SALT || "",
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://secure.payu.in"
      : "https://test.payu.in",
};

// Add this type for payment data
type PaymentData = {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
};

// Helper functions
const generateTxnId = () => `FABG-${nanoid(8)}`;

const generateHash = (data: PaymentData) => {
  const hashString = `${PAYU_CONFIG.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${PAYU_CONFIG.salt}`;
  return CryptoJS.SHA512(hashString).toString();
};

export default function FabGeniusCheckout() {
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
      return "AE"; // Default to UAE if detection fails
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

  // Original price - higher for FabGenius
  const originalPrice = 215.0;

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
  const validateCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError("");

    // Simulate API call with setTimeout
    setTimeout(() => {
      const normalizedCode = couponCode.toUpperCase().trim();
      // More unique coupon codes that don't directly indicate the discount amount
      const COUPONS = {
        // 1K discount codes
        BRAINBOOST: { discount: 43, type: "fixed" },
        MINDMASTER: { discount: 43, type: "fixed" },

        // 2K discount codes
        STARSCHOLAR: { discount: 86, type: "fixed" },
        WONDERKID: { discount: 86, type: "fixed" },
      };

      if (COUPONS.hasOwnProperty(normalizedCode)) {
        setAppliedCoupon({
          code: normalizedCode,
          ...COUPONS[normalizedCode as keyof typeof COUPONS],
        });

        // Track coupon usage with Facebook Pixel
        trackFBEvent("AddPaymentInfo", {
          content_name: "FabGenius Premium Program",
          coupon: normalizedCode,
          discount_amount:
            COUPONS[normalizedCode as keyof typeof COUPONS].discount,
        });

        setCouponCode("");
        setCouponError("");
      } else {
        setCouponError("Invalid coupon code");
        setAppliedCoupon(null);
      }

      setIsValidatingCoupon(false);
    }, 500);
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  // Handle payment
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

      // Create checkout session
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: discountedPrice,
          productName: appliedCoupon
            ? `FAB MASTERCLASS (Coupon: ${appliedCoupon.code})`
            : "FAB MASTERCLASS",
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
      className={`${andika.variable} min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50`}
    >
      {/* Header with Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 shadow-md py-3"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Fablearner Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {["Our Method", "Results", "FAQ", "Success Stories"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-${
                  scrolled ? "gray-700" : "white"
                } hover:text-${scrolled ? "indigo-600" : "white/80"}`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={scrolled ? "text-indigo-700" : "text-white"}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute w-full bg-white/95 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center py-4 gap-4">
                {["Our Method", "Results", "FAQ", "Success Stories"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`${andika.className} text-indigo-700 font-medium w-full text-center py-3 hover:bg-indigo-50`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="pt-28 max-w-3xl mx-auto py-8 px-4">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden border border-gray-100"
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
          <div className="relative space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-3">
              <motion.div
                className="mx-auto mb-4 w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <span className="text-3xl" role="img" aria-label="genius">
                  🧠
                </span>
              </motion.div>

              <motion.h1
                className="font-dingdong text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 
                  bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                FabGenius Premium Program
              </motion.h1>
              <motion.p className="text-gray-500">
                Advanced learning techniques for exceptional readers
              </motion.p>
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
              />
            </div>

            {/* Course Summary Card */}
            <motion.div
              className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl p-6 border-2 
              border-gray-100 group hover:border-indigo-100 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white shadow-lg flex items-center justify-center">
                    <motion.span
                      className="text-3xl"
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
                  <div>
                    <h2
                      className={`${andika.className} text-xl font-bold text-gray-800`}
                    >
                      FABGENIUS PREMIUM
                    </h2>
                    <p className="font-dingdong text-gray-500">
                      Lifetime Access + Premium Features
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p
                    className={`${andika.className} text-2xl font-bold text-indigo-600`}
                  >
                    AED 215.00
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature Highlights */}
            {/* <div className="rounded-2xl bg-indigo-50/50 p-6 border border-indigo-100/50">
              <h3 className={`${andika.className} font-bold text-lg mb-4`}>
                Premium Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "1-on-1 Expert Sessions",
                  "Advanced Reading Materials",
                  "Progress Analytics Dashboard",
                  "Premium Support Access",
                  "Lifetime Curriculum Updates",
                  "Priority Community Access",
                ].map((feature, i) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div> */}

            {/* Form Section */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Customer Information */}
              <div className="space-y-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100">
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
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                        focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
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
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
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
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
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
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                            focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all appearance-none"
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
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
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
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
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

              {/* Payment Section */}
              <div
                className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/30 to-purple-50/30 
                border border-gray-100"
              >
                <div className="flex items-center justify-between">
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
                      className="h-12 w-auto"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="space-y-4 p-6 rounded-2xl bg-white border border-gray-100">
                <h3
                  className={`${andika.className} text-lg font-bold text-gray-800`}
                >
                  Have a Coupon?
                </h3>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                    <div>
                      <span className="font-medium text-green-700">
                        Applied:{" "}
                      </span>
                      <span className="font-semibold">
                        {appliedCoupon.code}
                      </span>
                      <span className="ml-2 text-green-700">
                        (AED {appliedCoupon.discount} off)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                    />
                    <button
                      type="button"
                      onClick={validateCoupon}
                      disabled={isValidatingCoupon || !couponCode.trim()}
                      className={`bg-indigo-600 text-white px-4 py-2 rounded-lg ${
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

              {/* Order Summary */}
              <div className="p-6 rounded-2xl bg-gray-50 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>AED {originalPrice.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-AED {appliedCoupon.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-indigo-600">AED{discountedPrice}</span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                className={`${andika.className} w-full bg-gradient-to-r from-indigo-500 to-purple-500 
                  text-white py-4 px-6 rounded-xl font-bold text-lg relative overflow-hidden group
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

              {/* Security Badge */}
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure Payment via PayU
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="relative py-32 px-4 overflow-hidden mt-16"
        style={{ backgroundColor: "rgba(79, 70, 229, 0.8)" }} // Indigo color instead of pink
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
            className="text-center mb-16"
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
                className="h-12 w-auto"
                priority
                unoptimized
              />
            </motion.div>
            <motion.h3 className="font-dingdong text-2xl md:text-3xl text-white leading-tight">
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
