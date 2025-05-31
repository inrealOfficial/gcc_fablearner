"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useScroll,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Andika } from "next/font/google";

// Import Andika font
const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

// Function to get next weekend (Saturday-Sunday)
const getNextWeekend = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  let daysUntilSaturday;
  if (dayOfWeek === 0) {
    // Sunday
    daysUntilSaturday = 6; // Next Saturday
  } else if (dayOfWeek === 6) {
    // Saturday
    daysUntilSaturday = 7; // Next Saturday
  } else {
    // Monday-Friday
    daysUntilSaturday = 6 - dayOfWeek; // Days until this Saturday
  }

  const saturday = new Date(now);
  saturday.setDate(now.getDate() + daysUntilSaturday);
  saturday.setHours(18, 0, 0, 0); // 6:00 PM

  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);

  return { saturday, sunday };
};

const formatWeekendDates = (saturday: Date, sunday: Date): string => {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const satDay: number = saturday.getDate();
  const sunDay: number = sunday.getDate();
  const month: string = months[saturday.getMonth()];
  const year: number = saturday.getFullYear();

  return `${satDay}-${sunDay} ${month} ${year}`;
};

export const HeroSection = () => {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [childAge, setChildAge] = useState<number | null>(null);
  const [letterIndex, setLetterIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [weekendDates, setWeekendDates] = useState("");

  useEffect(() => {
    const { saturday } = getNextWeekend();
    setWeekendDates(
      formatWeekendDates(
        saturday,
        new Date(saturday.getTime() + 24 * 60 * 60 * 1000)
      )
    );

    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = saturday.getTime() - now.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // NEW - Smooth scroll function
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

  // Animation hooks
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const isInView = useInView(heroRef, { once: true });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Words for the interactive reading demo
  const readingWords = ["CAT", "DOG", "SUN", "PLAY", "BOOK"];
  const currentDemoWord = readingWords[currentWord];

  // Statistics for floating badges
  const stats = [
    { number: "90%", label: "Success rate" },
    { number: "10x", label: "Faster learning (guaranteed)" },
    { number: "15 min", label: "Daily practice" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Word rotation effect
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % readingWords.length);
      // Reset letter animation when word changes
      setLetterIndex(0);
    }, 4000);
    return () => clearInterval(wordInterval);
  }, []);

  // Letter-by-letter animation
  useEffect(() => {
    if (letterIndex < currentDemoWord.length) {
      const letterTimeout = setTimeout(() => {
        setLetterIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(letterTimeout);
    }
  }, [letterIndex, currentDemoWord]);

  // Track mouse for parallax effect
  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position state
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });

      // Update motion values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transform values
  const bgX = useTransform(mouseX, [-0.5, 0.5], [30, -30]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [30, -30]);

  return (
    <>
      {/* Fixed Header/Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 shadow-md py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header content */}
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/logo.png"
              alt="Fablearner Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
              unoptimized // Add this if the image still doesn't load
            />
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <motion.nav className={`flex gap-4 ${andika.className}`}>
              {[
                { name: "Success Stories", target: "results" },
                { name: "Why FAB", target: "benifits" },
                { name: "Testimonials", target: "testimonials" },
                { name: "Schedule", target: "schedule" },
                { name: "FAQ", target: "faq" },
              ].map((item, i) => (
                <motion.a
                  key={item.name}
                  href={`#${item.target}`}
                  onClick={(e) => scrollToSection(item.target, e)}
                  className={`font-medium px-1 py-2 border-b-2 transition-all ${
                    scrolled
                      ? "text-pink-700 border-transparent hover:border-pink-600"
                      : "text-white border-transparent hover:border-white/50"
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.nav>

            <motion.a
              href="/checkout"
              className={`
    font-medium rounded-full px-6 py-2.5 
    transition-all duration-300 font-dingdong
    ${
      scrolled
        ? "bg-pink-600 text-white hover:bg-pink-700 hover:shadow-pink-200 hover:shadow-lg"
        : "bg-white text-pink-600 hover:bg-white/90 hover:shadow-white/20 hover:shadow-lg"
    }
  `}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: scrolled
                  ? "0 10px 25px -5px rgba(236, 72, 153, 0.3)"
                  : "0 10px 25px -5px rgba(255, 255, 255, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Reserve Your Spot
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`focus:outline-none ${
                scrolled ? "text-pink-700" : "text-white"
              }`}
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
              {/* Mobile menu content */}
              <div className="flex flex-col items-center py-4 gap-4">
                {["Our Method", "Results", "FAQ", "Success Stories"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`${andika.className} text-pink-700 font-medium w-full text-center py-3 hover:bg-pink-50`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  )
                )}
                <a
                  href="/checkout"
                  className="bg-pink-600 text-white font-medium rounded-full px-6 py-2.5 w-4/5 text-center font-dingdong"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reserve Your Spot
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section with SVG Background Pattern */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden transition-all duration-500"
        style={{ backgroundColor: "rgba(218, 38, 83, 0.8)" }}
      >
        {/* SVG Background Pattern with Parallax Effect */}
        <motion.div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            x: bgX,
            y: bgY,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/bg.svg')",
              backgroundSize: "110% 110%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          {/* Main background gradient circles */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-pink-500/30 filter blur-3xl"
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
            className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/30 filter blur-3xl"
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
        </div>

        {/* Floating alphabet letters in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["A", "B", "C", "R", "E", "S", "T", "P", "M"].map((letter, i) => (
            <motion.div
              key={letter}
              className="absolute font-dingdong text-white/10 text-6xl md:text-8xl font-bold"
              style={{
                left: `${10 + ((i * 20) % 80)}%`,
                top: `${5 + ((i * 15) % 90)}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              {letter}
            </motion.div>
          ))}
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Date Badge with Countdown */}
          <motion.div
            className="mb-6 md:mb-8 max-w-fit mx-auto md:mx-0 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full h-10 w-10 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6V12L16 14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </motion.div>
                </div>
                <div>
                  <p className="font-dingdong text-lg md:text-xl text-white flex items-center">
                    <span>{weekendDates}</span>
                    <span className="bg-white/20 h-4 w-px mx-3 inline-block"></span>
                    <span className="text-yellow-200">6:00-7:30 PM</span>
                  </p>
                  <div className="flex gap-1 mt-1">
                    <div className="bg-white/20 px-1.5 py-0.5 rounded text-xs text-white">
                      <span className="font-bold">{timeLeft.days}</span> days
                    </div>
                    <div className="bg-white/20 px-1.5 py-0.5 rounded text-xs text-white">
                      <span className="font-bold">{timeLeft.hours}</span> hrs
                    </div>
                    <div className="bg-white/20 px-1.5 py-0.5 rounded text-xs text-white">
                      <span className="font-bold">{timeLeft.minutes}</span> min
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Limited seats indicator */}
            <div className="absolute -top-3 -right-3 bg-yellow-400 text-pink-800 text-xs font-bold rounded-full px-2 py-1 transform rotate-12 shadow-lg">
              Only 28 seats left!
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content Column */}
            <div className="order-1 md:order-1">
              {/* Headline with child age personalization */}
              <div className="mb-8">
                {!childAge ? (
                  <motion.div
                    className="bg-white/20 backdrop-blur-md rounded-xl p-5 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <p className={`${andika.className} text-white mb-3`}>
                      How old is your child?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[2, 3, 4, 5, "6+"].map((age) => (
                        <motion.button
                          key={age}
                          className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setChildAge(typeof age === "number" ? age : 6)
                          }
                        >
                          {age} {typeof age === "number" ? "years" : ""}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-5"
                  >
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                      <span>Child age: {childAge}+</span>
                      <button
                        className="underline hover:text-white"
                        onClick={() => setChildAge(null)}
                      >
                        Change
                      </button>
                    </div>
                    <div
                      className={`inline-flex bg-gradient-to-r from-yellow-400/20 to-yellow-400/30 backdrop-blur-sm text-yellow-200 rounded-full px-4 py-2 text-sm ${andika.className} font-bold`}
                    >
                      Perfect timing! Age {childAge} is optimal for early
                      reading skills.
                    </div>
                  </motion.div>
                )}

                <motion.h1
                  className="font-dingdong text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Your Child Can Start Reading
                  <span className="text-yellow-300 block mt-2">
                    Before Age 3!
                  </span>
                </motion.h1>

                {/* New text section */}
                <motion.p
                  className={`${andika.className} text-lg md:text-xl text-white/90 mt-4 mb-6 max-w-2xl leading-relaxed`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Join the World's Highest-Rated Online Masterclass (for
                  Parents).
                  <span className="block mt-1">
                    Learn simple, science-backed techniques to teach your child
                    to read — in just 15 minutes a day.
                  </span>
                </motion.p>
              </div>

              {/* CTA Button - Mobile: shown after heading, Desktop: shown after image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mb-8 md:hidden order-2"
              >
                <div className="mt-4 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <p className={`${andika.className} text-white text-sm`}>
                    <span className="font-bold"></span> from 800+ reviews
                  </p>
                </div>
              </motion.div>

              {/* CTA Button - Desktop only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mb-8 hidden md:block"
              >
                <div className="relative inline-block">
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute -inset-3 bg-yellow-300/70 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.a
                    href="/checkout"
                    className="relative block bg-white text-pink-700 font-dingdong text-xl px-8 py-4 rounded-full shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    Reserve Your Spot - Rs.499
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-pink-800 text-xs font-bold rounded-full px-2 py-1 transform rotate-12">
                      70% OFF
                    </div>
                  </motion.a>
                </div>

                <div className="mt-4 flex items-center justify-start">
                  <svg
                    className="w-5 h-5 text-yellow-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    className="w-5 h-5 text-yellow-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <p className={`${andika.className} text-white text-sm`}>
                    <span className="font-bold"> </span> from 800+ reviews
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Image Column - Order 3 on mobile, order-last on desktop */}
            <motion.div
              className="relative order-3 md:order-last"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Floating statistics badges - hidden on mobile */}
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="absolute bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg z-20 hidden md:block"
                  style={{
                    top: `${25 + index * 25}%`,
                    left: index % 2 === 0 ? "-10%" : "auto",
                    right: index % 2 === 1 ? "-5%" : "auto",
                  }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -5, 0],
                  }}
                  transition={{
                    delay: 0.7 + index * 0.2,
                    y: {
                      repeat: Infinity,
                      duration: 2 + index,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <p className="font-dingdong text-pink-700 text-sm">
                    <span className="font-bold text-base">{stat.number}</span>
                    <span className="block text-xs text-pink-600">
                      {stat.label}
                    </span>
                  </p>
                </motion.div>
              ))}

              {/* Decorative elements - smaller/hidden on mobile */}
              <motion.div className="absolute -top-3 -left-3 md:-top-6 md:-left-6 w-12 h-12 md:w-24 md:h-24 bg-yellow-300/30 rounded-full filter blur-md" />
              <motion.div className="absolute -bottom-3 -right-3 md:-bottom-6 md:-right-6 w-16 h-16 md:w-32 md:h-32 bg-pink-300/30 rounded-full filter blur-md" />

              {/* Main Hero Image */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
                <Image
                  src="/hero.png"
                  alt="Child learning to read"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />

                {/* Interactive image overlay - simplified on mobile */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-pink-700/50 via-transparent to-transparent flex flex-col-reverse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className="p-3 md:p-6">
                    <div
                      className={`bg-white/90 backdrop-blur-md rounded-lg p-2 md:p-3 transform -rotate-1 shadow-lg max-w-xs mx-auto ${andika.className}`}
                    >
                      {/* Simplified content for mobile */}
                      <div className="md:flex items-start gap-3 hidden md:block">
                        <div className="bg-pink-100 rounded-full p-1.5">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#D2386C"
                              strokeWidth="2"
                            />
                            <path
                              d="M15 9L9 15"
                              stroke="#D2386C"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 9L15 15"
                              stroke="#D2386C"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-pink-700">
                            Common Myths:
                          </h4>
                          <p className="text-sm text-gray-700">
                            Children under 3 can't learn to read on their own.
                          </p>
                        </div>
                      </div>

                      {/* Mobile-only simplified version */}
                      <div className="md:hidden text-center">
                        <h4 className="font-bold text-green-700">Reality:</h4>
                        <p className="text-sm text-gray-700">
                          Children as young as 2 years can learn to read!
                        </p>
                      </div>

                      <div className="h-px bg-gray-200 my-2 md:my-3 hidden md:block"></div>

                      {/* Full content shown only on larger screens */}
                      <div className="md:flex items-start gap-3 hidden md:block">
                        <div className="bg-green-100 rounded-full p-1.5">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#10B981"
                              strokeWidth="2"
                            />
                            <path
                              d="M8 12L11 15L16 9"
                              stroke="#10B981"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-700">Reality:</h4>
                          <p className="text-sm text-gray-700">
                            Our science-backed method works for children as
                            young as 2 years old!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Mobile stats display at the bottom */}
              <div className="md:hidden mt-6 grid grid-cols-3 gap-2">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-xl text-center"
                  >
                    <p className="font-dingdong text-white text-sm">
                      <span className="font-bold block text-base">
                        {stat.number}
                      </span>
                      <span className="text-xs text-white/80">
                        {stat.label}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          {/* Stats Row */}
          <motion.div
            className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {[
              {
                icon: "🌎",
                number: "100+",
                label: "Cities Worldwide",
              },
              {
                icon: "👨‍👩‍👧‍👦",
                number: "10,000+",
                label: "Parents Attended",
              },
              {
                icon: "📚",
                number: "2,000+",
                label: "Kids Reading",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl mr-4">
                  {stat.icon}
                </div>
                <div>
                  <div className="font-dingdong text-2xl text-white">
                    {stat.number}
                  </div>
                  <p className={`${andika.className} text-sm text-white/80`}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10L12 15L17 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </section>
    </>
  );
};
