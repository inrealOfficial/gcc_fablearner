"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Andika } from "next/font/google";
import { Footer } from "@/components/sections/Footer";
import { useState, useEffect } from "react";

// Import Andika font
const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export default function PrivacyPolicy() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function (reused from HeroSection)
  const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }

    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Matching home page */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 shadow-md py-3" : "bg-white py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
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
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <motion.nav className={`flex gap-4 ${andika.className}`}>
              {[
                { name: "Our Method", target: "our-method" },
                { name: "Results", target: "testimonials" },
                { name: "FAQ", target: "faq" },
                { name: "Success Stories", target: "results" },
              ].map((item, i) => (
                <motion.a
                  key={item.name}
                  href={`/#${item.target}`}
                  className="font-medium px-1 py-2 border-b-2 transition-all text-pink-700 border-transparent hover:border-pink-600"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.nav>

            <Link
              href="/checkout"
              className="bg-pink-600 text-white font-medium rounded-full px-6 py-2.5 transition-all hover:bg-pink-700 hover:shadow-lg"
            >
              Reserve Your Spot
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-pink-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
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
                {[
                  { name: "Our Method", target: "our-method" },
                  { name: "Results", target: "testimonials" },
                  { name: "FAQ", target: "faq" },
                  { name: "Success Stories", target: "results" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={`/#${item.target}`}
                    className={`${andika.className} text-pink-700 font-medium w-full text-center py-3 hover:bg-pink-50`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Link
                  href="/checkout"
                  className="bg-pink-600 text-white font-medium rounded-full px-6 py-2.5 w-4/5 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reserve Your Spot
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content - Reduced top padding */}
      <main className="flex-grow pt-24">
        {/* Policy Content */}
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-6 text-center font-dingdong">
              FAB Privacy Policy
            </h2>

            <div className={`${andika.className} text-gray-700 space-y-6`}>
              <p className="text-sm text-gray-600 mb-6">
                <strong>Last Updated:</strong> January 2025
              </p>

              <p>
                At Fablearner.com, we are committed to protecting your privacy
                and ensuring the security of your personal information. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website and use
                our services.
              </p>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Information We Collect:
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Personal Information:
                    </h4>
                    <p>
                      We may collect personal information that you voluntarily
                      provide to us, including:
                    </p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>
                        Name and contact information (email address, phone
                        number)
                      </li>
                      <li>
                        Payment information (processed securely through
                        third-party payment processors)
                      </li>
                      <li>Account credentials (username, password)</li>
                      <li>Profile information and preferences</li>
                      <li>Communication records with our support team</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Automatically Collected Information:
                    </h4>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>
                        Device information (IP address, browser type, operating
                        system)
                      </li>
                      <li>
                        Usage data (pages visited, time spent, course progress)
                      </li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  How We Use Your Information:
                </h3>
                <ul className="list-disc ml-5 space-y-2">
                  <li>Provide and maintain our educational services</li>
                  <li>Process payments and manage your account</li>
                  <li>Deliver course content and track your progress</li>
                  <li>
                    Communicate with you about courses, updates, and support
                  </li>
                  <li>
                    Improve our website and services based on usage patterns
                  </li>
                  <li>
                    Comply with legal obligations and protect against fraud
                  </li>
                  <li>Send promotional materials (with your consent)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Information Sharing and Disclosure:
                </h3>
                <p className="mb-3">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information in the following
                  circumstances:
                </p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> With trusted third-party
                    vendors who assist in operating our website and services
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law or
                    to protect our rights and safety
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with
                    mergers, acquisitions, or sale of assets
                  </li>
                  <li>
                    <strong>Consent:</strong> With your explicit permission for
                    specific purposes
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Data Security:
                </h3>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Cookies and Tracking Technologies:
                </h3>
                <p>
                  We use cookies and similar technologies to enhance your
                  browsing experience, analyze website traffic, and personalize
                  content. You can control cookie preferences through your
                  browser settings, though some features may not function
                  properly if cookies are disabled.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Your Rights and Choices:
                </h3>
                <p>
                  Depending on your location, you may have the following rights
                  regarding your personal information:
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate or incomplete information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                  <li>Withdrawal of consent</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Children's Privacy:
                </h3>
                <p>
                  Our services are not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If we become aware that we have collected
                  information from a child under 13, we will take steps to
                  delete such information.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  International Data Transfers:
                </h3>
                <p>
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place to protect your information in
                  accordance with applicable data protection laws.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Data Retention:
                </h3>
                <p>
                  We retain your personal information for as long as necessary
                  to fulfill the purposes for which it was collected, comply
                  with legal obligations, resolve disputes, and enforce our
                  agreements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Contact Information:
                </h3>
                <p>
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please contact us
                  at{" "}
                  <a
                    href="mailto:privacy@fablearner.com"
                    className="text-pink-600 underline"
                  >
                    privacy@fablearner.com
                  </a>{" "}
                  or{" "}
                  <a
                    href="mailto:support@fablearner.com"
                    className="text-pink-600 underline"
                  >
                    support@fablearner.com
                  </a>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Changes to This Privacy Policy:
                </h3>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or applicable laws. We will notify
                  you of any material changes by posting the updated policy on
                  our website and updating the "Last Updated" date. We encourage
                  you to review this Privacy Policy periodically.
                </p>
                <p className="mt-2">
                  By using Fablearner.com, you acknowledge that you have read,
                  understood, and agreed to the terms of this Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Using the same Footer component as home page */}
      <Footer />
    </div>
  );
}
