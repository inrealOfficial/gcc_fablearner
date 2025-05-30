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

export default function RefundPolicy() {
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
        {/* Top Cloud Image */}

        {/* Policy Content */}
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-6 text-center font-dingdong">
              FAB Refund & Return Policy
            </h2>

            <div className={`${andika.className} text-gray-700 space-y-6`}>
              <p>
                Thank you for choosing Fablearner.com. We appreciate your trust
                in our courses. Please read this refund policy carefully before
                making any purchase. By purchasing a course on Fablearner.com,
                you agree to abide by the terms of this refund policy.
              </p>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Non-Refundable Policy:
                </h3>
                <p>
                  All purchases made on Fablearner.com are non-refundable. This
                  includes, but is not limited to, course fees, subscription
                  charges, and any additional purchases related to our
                  educational content.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Understanding Non-Refundable Policy:
                </h3>
                <ol className="list-decimal ml-5 space-y-2">
                  <li>
                    <strong>Digital Nature of Courses:</strong> Fablearner.com
                    provides digital courses, and upon purchase, you gain
                    immediate access to the course content. Due to the
                    intangible nature of digital goods and the ability to access
                    them instantly, we do not offer refunds.
                  </li>
                  <li>
                    <strong>Commitment to Course Quality:</strong> We are
                    committed to providing high-quality educational content.
                    However, if you have concerns about the course content or
                    experience, we encourage you to reach out to our support
                    team, and we will make every effort to address your
                    concerns.
                  </li>
                  <li>
                    <strong>Course Preview:</strong> Before making a purchase,
                    we provide a preview of our courses to help you make an
                    informed decision. We recommend reviewing the course
                    details, curriculum, and any available free content to
                    ensure compatibility with your learning objectives.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Exceptional Circumstances:
                </h3>
                <p>
                  In rare instances, Fablearner.com may consider refunds on a
                  case-by-case basis due to extraordinary circumstances such as
                  technical issues preventing access to the course content. Such
                  requests must be submitted to our support team within 7 days
                  of purchase, providing detailed information about the issue.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-600 mb-2">
                  Contact Information:
                </h3>
                <p>
                  If you have any questions or concerns regarding our refund
                  policy, please contact our support team at{" "}
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
                  Policy Updates:
                </h3>
                <p>
                  Fablearner.com reserves the right to update or modify this
                  refund policy at any time. Any changes will be effective
                  immediately upon posting on our website. It is your
                  responsibility to review this refund policy periodically for
                  updates.
                </p>
                <p className="mt-2">
                  By making a purchase on Fablearner.com, you acknowledge that
                  you have read, understood, and agreed to the terms of this
                  refund policy.
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
