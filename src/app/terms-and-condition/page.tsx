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

export default function TermsConditions() {
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
        {/* Terms Content */}
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-6 text-center font-dingdong">
              FAB Terms and Conditions
            </h2>

            <div className={`${andika.className} text-gray-700 space-y-6`}>
              <p className="text-sm text-gray-600 mb-6">
                <strong>Last Updated:</strong> January 2025
              </p>

              <p>
                Welcome to Fablearner.com. These Terms and Conditions ("Terms")
                govern your use of our website and services. By accessing or
                using Fablearner.com, you agree to be bound by these Terms. If
                you do not agree with any part of these Terms, you may not use
                our services.
              </p>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  1. Acceptance of Terms:
                </h3>
                <p>
                  By creating an account, making a purchase, or using any part
                  of our services, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and our
                  Privacy Policy. These Terms constitute a legally binding
                  agreement between you and Fablearner.com.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  2. Eligibility:
                </h3>
                <p>
                  You must be at least 18 years old to use our services. If you
                  are under 18, you may only use our services with the
                  involvement and consent of a parent or guardian. By using our
                  services, you represent and warrant that you meet these
                  eligibility requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  3. Account Registration and Security:
                </h3>
                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    You must provide accurate, current, and complete information
                    during registration
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your account credentials
                  </li>
                  <li>
                    You are responsible for all activities that occur under your
                    account
                  </li>
                  <li>
                    You must notify us immediately of any unauthorized use of
                    your account
                  </li>
                  <li>
                    We reserve the right to suspend or terminate accounts that
                    violate these Terms
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  4. Course Access and Content:
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      License to Use:
                    </h4>
                    <p>
                      Upon purchase, we grant you a limited, non-exclusive,
                      non-transferable license to access and use the course
                      content for your personal, non-commercial use only.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Restrictions:
                    </h4>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>
                        You may not share, distribute, or resell course content
                      </li>
                      <li>
                        You may not reproduce, modify, or create derivative
                        works
                      </li>
                      <li>You may not use content for commercial purposes</li>
                      <li>
                        You may not reverse engineer or attempt to extract
                        source materials
                      </li>
                      <li>
                        Course access is tied to your individual account and
                        cannot be transferred
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  5. Payment Terms:
                </h3>
                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    All prices are listed in USD and are subject to applicable
                    taxes
                  </li>
                  <li>Payment is due at the time of purchase</li>
                  <li>
                    We accept major credit cards and other payment methods as
                    displayed
                  </li>
                  <li>
                    All sales are final and non-refundable as per our Refund
                    Policy
                  </li>
                  <li>We reserve the right to change prices at any time</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  6. User Conduct:
                </h3>
                <p className="mb-3">You agree not to:</p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>
                    Upload or transmit harmful, offensive, or inappropriate
                    content
                  </li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of our services</li>
                  <li>
                    Use our services for spam, fraud, or other malicious
                    activities
                  </li>
                  <li>Share your account credentials with others</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  7. Intellectual Property Rights:
                </h3>
                <p>
                  All content, materials, and intellectual property on
                  Fablearner.com, including but not limited to text, graphics,
                  logos, images, videos, and software, are owned by or licensed
                  to us and are protected by copyright, trademark, and other
                  intellectual property laws. Unauthorized use is strictly
                  prohibited.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  8. Service Availability:
                </h3>
                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    We strive to maintain service availability but cannot
                    guarantee uninterrupted access
                  </li>
                  <li>
                    We may suspend services for maintenance, updates, or other
                    operational reasons
                  </li>
                  <li>
                    We reserve the right to modify, discontinue, or terminate
                    services at any time
                  </li>
                  <li>
                    Course content and features may be updated or changed
                    without notice
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  9. Disclaimers and Limitations:
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Educational Purpose:
                    </h4>
                    <p>
                      Our courses are for educational purposes only. Results may
                      vary, and we make no guarantees about specific outcomes or
                      achievements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Limitation of Liability:
                    </h4>
                    <p>
                      To the maximum extent permitted by law, Fablearner.com
                      shall not be liable for any indirect, incidental, special,
                      consequential, or punitive damages arising from your use
                      of our services.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  10. Privacy and Data Protection:
                </h3>
                <p>
                  Your privacy is important to us. Our collection, use, and
                  protection of your personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by
                  reference.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  11. Termination:
                </h3>
                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    You may terminate your account at any time by contacting our
                    support team
                  </li>
                  <li>
                    We may terminate or suspend your account for violations of
                    these Terms
                  </li>
                  <li>
                    Upon termination, your right to access course content will
                    cease
                  </li>
                  <li>
                    Provisions that should survive termination will remain in
                    effect
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  12. Dispute Resolution:
                </h3>
                <p>
                  Any disputes arising from these Terms or your use of our
                  services will be resolved through binding arbitration in
                  accordance with applicable arbitration rules. You waive any
                  right to participate in class action lawsuits or class-wide
                  arbitrations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  13. Governing Law:
                </h3>
                <p>
                  These Terms shall be governed by and construed in accordance
                  with applicable laws, without regard to conflict of law
                  principles.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  14. Severability:
                </h3>
                <p>
                  If any provision of these Terms is found to be unenforceable
                  or invalid, the remaining provisions will continue to be valid
                  and enforceable to the fullest extent permitted by law.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  15. Contact Information:
                </h3>
                <p>
                  If you have any questions about these Terms and Conditions,
                  please contact us at{" "}
                  <a
                    href="mailto:legal@fablearner.com"
                    className="text-pink-600 underline"
                  >
                    legal@fablearner.com
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
                  16. Changes to Terms:
                </h3>
                <p>
                  We reserve the right to modify these Terms at any time. We
                  will notify users of any material changes by posting the
                  updated Terms on our website and updating the "Last Updated"
                  date. Your continued use of our services after any changes
                  constitutes acceptance of the new Terms.
                </p>
                <p className="mt-3 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                  <strong>
                    By using Fablearner.com, you acknowledge that you have read,
                    understood, and agreed to be bound by these Terms and
                    Conditions.
                  </strong>
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
