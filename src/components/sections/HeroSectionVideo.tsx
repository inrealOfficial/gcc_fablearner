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
import {
  getAffiliateIdFromStorage,
  getAffiliateName,
} from "@/lib/affiliateTracking";
import Player from "@vimeo/player";
import {
  createLandingRecord,
  trackPlayClick,
  updateWatchDuration,
} from "@/lib/videoTracking";

// Import Andika font
const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

// Function to get next 3 consecutive workshop dates
const getWorkshopDates = () => {
  const today = new Date();
  const dates = [];

  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    date.setHours(18, 0, 0, 0); // 6:00 PM
    dates.push(date);
  }

  return dates;
};

// Function to format workshop date range (e.g., "14-16 August")
const formatWorkshopDateRange = (dates: Date[]): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (dates.length === 0) return "";

  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];

  const startDay = firstDate.getDate();
  const endDay = lastDate.getDate();
  const startMonth = months[firstDate.getMonth()];
  const endMonth = months[lastDate.getMonth()];

  // If dates span across different months
  if (firstDate.getMonth() !== lastDate.getMonth()) {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }

  return `${startDay}-${endDay} ${startMonth}`;
};

// Function to format individual workshop date and time
const formatWorkshopDateTime = (
  date: Date,
  index: number
): { dateStr: string; timeStr: string; dayLabel: string } => {
  const months = [
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

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const weekday = weekdays[date.getDay()];

  const dayLabels = ["TODAY", "TOMORROW", "DAY AFTER"];
  const dayLabel = dayLabels[index];
  const dateStr = `${weekday}, ${month} ${day}`;
  const timeStr = "6:00 PM - 6:30 PM IST";

  return { dateStr, timeStr, dayLabel };
};

export const HeroSectionVideo = () => {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const [workshopDates, setWorkshopDates] = useState<
    Array<{ dateStr: string; timeStr: string; dayLabel: string }>
  >([]);
  const [workshopDateRange, setWorkshopDateRange] = useState("");
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [affiliateInfo, setAffiliateInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // New: blob URL + fetching state so Drive link can be used reliably
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [isFetchingVideo, setIsFetchingVideo] = useState(false);

  // Theatre modal + iframe state
  const [isTheatreOpen, setIsTheatreOpen] = useState(false);
  const theatreRef = useRef<HTMLDivElement | null>(null);
  const iframeWrapperRef = useRef<HTMLDivElement | null>(null);
  const vimeoId = "1111218470";
  // iframe src only set when opening theatre
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Vimeo SDK refs / state
  const vimeoContainerRef = useRef<HTMLDivElement | null>(null);
  const vimeoPlayerRef = useRef<Player | null>(null);
  const [vimeoLoaded, setVimeoLoaded] = useState(false);

  // Updated tracking state with session persistence
  const [trackingDocId, setTrackingDocId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [videoStartTime, setVideoStartTime] = useState<number | null>(null);
  const [watchTimer, setWatchTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTrackingInitialized, setIsTrackingInitialized] = useState(false);

  // Parse URL parameters on component mount with session persistence
  useEffect(() => {
    const initializeTracking = async () => {
      // Prevent multiple initializations
      if (isTrackingInitialized) return;

      try {
        // Check for existing session in localStorage first
        const existingSession = localStorage.getItem("fablearner_session");
        const existingDocId = localStorage.getItem("fablearner_tracking_doc");

        if (existingSession && existingDocId) {
          // Use existing session
          setSessionId(existingSession);
          setTrackingDocId(existingDocId);
          setIsTrackingInitialized(true);
          console.log("Using existing session:", existingSession);
          return;
        }

        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get("name");
        const phone = urlParams.get("phone");

        // Only create/update record if we have URL params or no existing session
        const trackingResult = await createLandingRecord({
          name: name || undefined,
          phone: phone || undefined,
        });

        if (trackingResult) {
          setTrackingDocId(trackingResult.docId);
          setSessionId(trackingResult.sessionId);

          // Store in localStorage for session persistence
          localStorage.setItem("fablearner_session", trackingResult.sessionId);
          localStorage.setItem("fablearner_tracking_doc", trackingResult.docId);

          // Store session expiry (24 hours from now)
          const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
          localStorage.setItem(
            "fablearner_session_expiry",
            expiryTime.toString()
          );

          console.log(
            trackingResult.isReturningUser
              ? "Welcome back!"
              : "New session created"
          );
        }
      } catch (error) {
        console.error("Error initializing tracking:", error);
      } finally {
        setIsTrackingInitialized(true);
      }
    };

    // Check if session has expired
    const checkSessionExpiry = () => {
      const expiryTime = localStorage.getItem("fablearner_session_expiry");
      if (expiryTime && Date.now() > parseInt(expiryTime)) {
        // Session expired, clear localStorage
        localStorage.removeItem("fablearner_session");
        localStorage.removeItem("fablearner_tracking_doc");
        localStorage.removeItem("fablearner_session_expiry");
        return true;
      }
      return false;
    };

    // Clear expired session before initializing
    const sessionExpired = checkSessionExpiry();
    if (!sessionExpired) {
      initializeTracking();
    } else {
      // Session expired, will create new one
      initializeTracking();
    }
  }, [isTrackingInitialized]);

  // Updated openTheatre function with tracking
  const openTheatre = async () => {
    // Track play click
    if (trackingDocId) {
      await trackPlayClick(trackingDocId);
    }

    // Set video start time
    setVideoStartTime(Date.now());

    // Start watch duration timer (update every 5 seconds)
    const timer = setInterval(() => {
      if (videoStartTime && trackingDocId) {
        const currentDuration = Math.floor(
          (Date.now() - videoStartTime) / 1000
        );
        updateWatchDuration(trackingDocId, currentDuration);
      }
    }, 5000);

    setWatchTimer(timer);

    // Existing theatre opening logic
    setIframeLoaded(false);
    setIframeSrc(
      `https://player.vimeo.com/video/${vimeoId}?autoplay=1&playsinline=1`
    );
    setIsTheatreOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Updated closeTheatre function with final tracking
  const closeTheatre = async () => {
    // Stop the watch timer
    if (watchTimer) {
      clearInterval(watchTimer);
      setWatchTimer(null);
    }

    // Update final watch duration
    if (videoStartTime && trackingDocId) {
      const finalDuration = Math.floor((Date.now() - videoStartTime) / 1000);
      await updateWatchDuration(trackingDocId, finalDuration);
    }

    // Reset video tracking state
    setVideoStartTime(null);

    // Existing theatre closing logic
    setIsTheatreOpen(false);
    document.body.style.overflow = "";
    setIframeSrc(null);
    setIframeLoaded(false);
  };

  // Enhanced iframe onLoad to better track video viewing
  const handleIframeLoad = () => {
    setTimeout(() => setIframeLoaded(true), 80);

    // Update video start time when iframe actually loads
    if (!videoStartTime) {
      setVideoStartTime(Date.now());
    }
  };

  // cleanup blob url on unmount
  useEffect(() => {
    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
    };
  }, [videoBlobUrl]);

  // Function to update dates
  const updateWorkshopDates = () => {
    const dates = getWorkshopDates();
    const formattedDates = dates.map((date, index) =>
      formatWorkshopDateTime(date, index)
    );
    const dateRange = formatWorkshopDateRange(dates);

    setWorkshopDates(formattedDates);
    setWorkshopDateRange(dateRange);
  };

  useEffect(() => {
    // Set workshop dates and times initially
    updateWorkshopDates();

    // Update dates every day at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to midnight

    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set timeout for first midnight update
    const midnightTimeout = setTimeout(() => {
      updateWorkshopDates();

      // Then set interval to update every 24 hours
      const dailyInterval = setInterval(() => {
        updateWorkshopDates();
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, []);

  // Optional: Update dates when component becomes visible (in case user left tab open)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Check if we need to update dates when tab becomes visible
        const lastUpdate = localStorage.getItem("lastDateUpdate");
        const today = new Date().toDateString();

        if (lastUpdate !== today) {
          updateWorkshopDates();
          localStorage.setItem("lastDateUpdate", today);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Set initial last update
    localStorage.setItem("lastDateUpdate", new Date().toDateString());

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
    { number: "Just 15 mins", label: "a day" },
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
  }, [readingWords.length]);

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

  // Load affiliate info
  useEffect(() => {
    const loadAffiliateInfo = async () => {
      try {
        const affiliateId = getAffiliateIdFromStorage();
        if (affiliateId) {
          const affiliateName = await getAffiliateName(affiliateId);
          setAffiliateInfo({
            id: affiliateId,
            name: affiliateName || "Your trusted partner",
          });
        }
      } catch (error) {
        console.error("Error loading affiliate info:", error);
      }
    };

    loadAffiliateInfo();
  }, []);

  // Navigation items
  const navItems = [
    { name: "Success Stories", target: "results" },
    { name: "Why FAB", target: "benifits" },
    { name: "Testimonials", target: "testimonials" },
    { name: "Schedule", target: "schedule" },
    { name: "FAQ", target: "faq" },
  ];

  return (
    <>
      {/* Fixed Header/Navigation */}
      <motion.header
        className={`transition-all duration-500 ${
          scrolled ? "bg-white/95 shadow-md py-3" : "bg-transparent py-5"
        } ${mobileMenuOpen ? "md:fixed" : "md:fixed"} ${
          mobileMenuOpen ? "" : "fixed top-0 left-0 right-0 z-50"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
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
              unoptimized
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.nav className={`flex gap-8 ${andika.className}`}>
              {navItems.map((item, i) => (
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
              className="md:hidden w-full bg-white/95 shadow-lg z-40"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center py-4 gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={`#${item.target}`}
                    className={`${andika.className} text-pink-700 font-medium w-full text-center py-3 hover:bg-pink-50`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
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

        {/* Content Container - Updated Layout for Mobile */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content Column - Mobile: order-2, Desktop: order-1 */}
            <div className="order-2 md:order-1 space-y-6">
              {/* Workshop Date Section */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="relative inline-block">
                  {/* Elegant card with gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 rounded-2xl p-[2px]">
                    <div className="bg-white rounded-2xl h-full w-full"></div>
                  </div>

                  {/* Content inside the card */}
                  <div className="relative bg-white rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl min-w-0">
                    {/* Calendar Icon with gradient background */}
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-2 flex-shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Date and Time Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-dingdong text-lg md:text-xl text-gray-800 font-bold leading-tight">
                        {workshopDateRange}
                      </div>
                      <div
                        className={`${andika.className} text-gray-600 text-xs md:text-sm font-medium leading-tight flex items-center gap-1`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-pink-500 flex-shrink-0"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <polyline
                            points="12,6 12,12 16,14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>6:00-6:30 PM IST</span>
                      </div>
                    </div>

                    {/* Live Badge */}
                    <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg flex-shrink-0">
                      <motion.div
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      LIVE
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full opacity-70"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full opacity-60"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h1 className="font-dingdong text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  By Class 2, 80% of children can't read at grade level
                  <span className="text-yellow-300 block mt-2">
                    Don't let your child be one of them
                  </span>
                </h1>
              </motion.div>

              {/* Sub-headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <p
                  className={`${andika.className} text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl`}
                >
                  Imagine your toddler, just 90 days from now, reading bedtime
                  stories aloud to you — proud, confident, and begging for books
                  instead of screens. (guaranteed).
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="flex flex-col items-start space-y-4"
              >
                <div className="relative">
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
                    className="relative inline-block bg-white text-pink-700 font-dingdong text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    Reserve Your Spot - 9.99 USD
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-pink-800 text-xs font-bold rounded-full px-2 py-1 transform rotate-12">
                      70% OFF
                    </div>
                  </motion.a>
                </div>

                {/* Risk-Free Guarantee */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <p
                    className={`${andika.className} text-white text-sm font-medium`}
                  >
                    Join Risk-Free — 100% Money-Back Guarantee. No questions
                    asked
                  </p>
                </motion.div>
              </motion.div>

              {/* Testimonial Quote */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <div className="relative max-w-lg">
                  {/* Quote background with gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/40 via-white/20 to-pink-300/40 rounded-2xl p-[1px]">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl h-full w-full"></div>
                  </div>

                  {/* Content */}
                  <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-xl">
                    {/* Quote icon */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>

                    {/* Stars rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.svg
                          key={star}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 1.6 + star * 0.1,
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                      <span
                        className={`${andika.className} text-gray-600 text-sm font-medium ml-2`}
                      >
                        5.0
                      </span>
                    </div>

                    {/* Quote text */}
                    <blockquote
                      className={`${andika.className} text-gray-800 text-sm leading-relaxed italic mb-4 relative`}
                    >
                      "The sessions are unique on every day… It's an eye-opener
                      — learned the mistakes we make when teaching reading."
                    </blockquote>

                    {/* Author info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                        <span
                          className={`${andika.className} text-white font-bold text-sm`}
                        >
                          RB
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`${andika.className} text-gray-800 text-sm font-semibold truncate`}
                        >
                          Rani Biswas
                        </p>
                        <p
                          className={`${andika.className} text-gray-600 text-xs`}
                        >
                          Verified Parent
                        </p>
                      </div>

                      {/* Verified badge */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span
                            className={`${andika.className} text-xs font-medium`}
                          >
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full opacity-60"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -top-1 -right-3 w-3 h-3 bg-pink-300 rounded-full opacity-50"
                    animate={{
                      scale: [1, 1.3, 1],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </motion.div>

              {/* Star Rating */}
              <motion.div
                className="flex items-center justify-start gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                {/* Five green star badges */}
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center shadow-sm"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ))}

                {/* Rating text */}
                <p className={`${andika.className} text-white text-sm ml-1`}>
                  Trusted by 800+ parents with{" "}
                  <span className="font-bold">4.8/5</span> star rating
                </p>
              </motion.div>

              {/* Mobile stats display at the bottom */}
              <div className="md:hidden grid grid-cols-3 gap-2 mt-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center"
                  >
                    <p className="font-dingdong text-white text-sm">
                      <span className="font-bold block text-base">
                        {stat.number}
                      </span>
                      <span className="text-xs text-white/80 leading-tight">
                        {stat.label}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Video Column - Desktop: order-2, Mobile: order-1 (shows first) */}
            <motion.div
              className="relative order-1 md:order-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Floating statistics badges - Desktop only */}
              <div className="hidden md:block">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="absolute bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg z-20"
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
              </div>

              {/* Decorative elements - Desktop only */}
              <div className="hidden md:block">
                <motion.div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300/30 rounded-full filter blur-md" />
                <motion.div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-300/30 rounded-full filter blur-md" />
              </div>

              {/* Main Video Player */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
                {/* Poster / thumbnail area with play overlay (click opens theatre) */}
                <div
                  className="relative aspect-video bg-gray-900 flex items-center justify-center"
                  role="button"
                  aria-label="Play video"
                >
                  {/* Poster background - replace with Image if needed */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/thumbnail.webp')",
                    }}
                  />

                  {/* small top-left watch badge — makes it obvious this is a video */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-white/10 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="opacity-90"
                    >
                      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                    </svg>
                    <span className="font-medium">Watch 8:00</span>
                  </div>

                  {/* very small play indicator placed over the speaker mouth (adjust left/top below) */}
                  <button
                    onClick={openTheatre}
                    aria-label="Play video"
                    className="absolute z-20 flex items-center justify-center p-0"
                    // tweak left/top to place exactly on the mouth; use devtools to fine-tune
                    style={{
                      left: "50%", // adjust if needed
                      top: "52%", // adjust if needed
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* larger subtle outer pulse / halo (low opacity so it doesn't hide art) */}
                    <span
                      aria-hidden
                      className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/20"
                      style={{
                        animation: "pulse 1.8s infinite ease-in-out",
                        opacity: 0.45,
                      }}
                    />

                    {/* semi-transparent contrast disc so the play knob reads on any background */}
                    <span
                      className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full"
                      style={{
                        background: "rgba(0,0,0,0.36)",
                        backdropFilter: "blur(3px)",
                      }}
                    />

                    {/* white play knob (bigger but still compact) */}
                    <span className="relative w-12 h-12 md:w-14 md:h-14 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M8 5V19L19 12L8 5Z" fill="#E11D6F" />
                      </svg>
                    </span>
                  </button>

                  {/* make helper caption slightly larger so users notice it's a video */}

                  {/* description & duration badge on poster */}
                </div>

                {/* Theatre modal - Vimeo iframe */}
                <AnimatePresence>
                  {isTheatreOpen && (
                    <motion.div
                      className="fixed inset-0 z-50 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* backdrop */}
                      <motion.div
                        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                        onClick={closeTheatre}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />

                      {/* modal content */}
                      <motion.div
                        ref={theatreRef}
                        className="relative z-60 w-full max-w-5xl mx-4"
                        initial={{ y: 20, scale: 0.98 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 20, scale: 0.98 }}
                      >
                        {/* controls (close + fullscreen) */}
                        <div className="absolute right-2 top-2 z-60 flex items-center gap-2">
                          <button
                            onClick={() => {
                              // attempt request fullscreen on wrapper
                              if (iframeWrapperRef.current?.requestFullscreen) {
                                iframeWrapperRef.current
                                  .requestFullscreen()
                                  .catch(() => {});
                              }
                            }}
                            className="bg-white/10 text-white px-3 py-2 rounded-full hover:bg-white/20 transition"
                            aria-label="Fullscreen"
                          >
                            ⤢
                          </button>
                          <button
                            onClick={closeTheatre}
                            className="bg-white/10 text-white px-3 py-2 rounded-full hover:bg-white/20 transition"
                            aria-label="Close"
                          >
                            ✕
                          </button>
                        </div>

                        {/* iframe wrapper - use Vimeo SDK container */}
                        <div
                          ref={iframeWrapperRef}
                          className="w-full aspect-video rounded-xl overflow-hidden bg-black relative"
                          style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}
                        >
                          {/* static thumbnail under the player */}
                          <img
                            src="/thumbnail.webp"
                            alt="Video thumbnail"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                              iframeLoaded ? "opacity-0" : "opacity-100"
                            }`}
                          />

                          {/* iframe rendered when iframeSrc is set; fades in on load */}
                          {iframeSrc && (
                            <iframe
                              title="Vimeo video"
                              src={iframeSrc}
                              className="absolute inset-0 w-full h-full border-0 transition-opacity duration-300"
                              style={{ opacity: iframeLoaded ? 1 : 0 }}
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              onLoad={handleIframeLoad}
                            />
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Stats Row - Fixed syntax */}
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
                icon: "meta",
                number: "",
                label: "Verified by Meta",
                special: true,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex items-center justify-center"
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
                {stat.special ? (
                  // Meta verification badge
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Image
                        src="/meta.png"
                        alt="Meta Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                        style={{
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                          mixBlendMode: "normal",
                        }}
                        unoptimized
                      />
                    </div>
                    <div>
                      <p
                        className={`${andika.className} text-sm text-white/90 font-medium`}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Regular stats styling
                  <>
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-2xl mr-4">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="font-dingdong text-2xl text-white">
                        {stat.number}
                      </div>
                      <p
                        className={`${andika.className} text-sm text-white/80`}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </>
                )}
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
