"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Andika } from "next/font/google";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

const navItems = [
  { name: "Success Stories", target: "results" },
  { name: "FabReader", target: "book" },
  { name: "Works", target: "how" },
  { name: "Bonus", target: "bonuses" },
  { name: "Benefits", target: "why" },
  { name: "FAQ", target: "faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Close mobile menu first
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    // Small delay to allow menu to close
    setTimeout(
      () => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      },
      mobileMenuOpen ? 300 : 0
    );
  };

  // Handle mobile menu item click
  const handleMobileClick = (sectionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Close menu immediately
    setMobileMenuOpen(false);

    // Scroll after menu closes
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 100);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-4"
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
            onClick={() => (window.location.href = "/")}
          >
            <Image
              src="/logo.png"
              alt="Fablearner Logo"
              width={180}
              height={50}
              className="h-10 md:h-12 w-auto object-contain"
              priority
              unoptimized
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <motion.nav className={`flex gap-4 ${andika.className}`}>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  onClick={(e) => scrollToSection(item.target, e)}
                  className={`font-medium px-3 py-2 rounded-lg transition-all duration-300 ${
                    scrolled
                      ? "text-pink-700 hover:bg-pink-50"
                      : "text-white hover:bg-white/10"
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.nav>

            {/* Desktop CTA Button */}
            <motion.button
              onClick={(e) => scrollToSection("premium", e)}
              className="bg-white text-pink-700 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get FabReader Now!
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`focus:outline-none p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-pink-700 hover:bg-pink-50"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle mobile menu"
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
      </motion.header>

      {/* Mobile menu (pushes content down) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200 z-40 mt-16"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    onClick={(e) => handleMobileClick(item.target, e)}
                    className={`${andika.className} text-pink-700 font-medium py-3 px-4 rounded-lg hover:bg-pink-50 transition-colors text-left w-full`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  onClick={(e) => handleMobileClick("premium", e)}
                  className="bg-white text-pink-700 border-2 border-pink-200 font-bold py-4 px-6 rounded-full shadow-lg text-center mt-2 hover:bg-gray-50 transition-colors w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get FabReader Now! 🚀
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
