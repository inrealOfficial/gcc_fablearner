"use client";

import React, { useEffect, useRef, useState } from "react";
import { Andika } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { trackFBEvent } from "@/components/FacebookPixel";
import { DateTime } from "luxon";

// Font configuration
const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

// Function to get next session date in UAE timezone (same as HeroSection)
const getNextSessionUAE = () => {
  const nowUAE = DateTime.now().setZone("Asia/Dubai");
  let sessionDate = nowUAE.set({
    hour: 18,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  if (nowUAE > sessionDate) {
    sessionDate = sessionDate.plus({ days: 1 });
  }
  return sessionDate;
};

export const RegistrationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [sessionDate, setSessionDate] = useState(getNextSessionUAE());
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [sessionDateString, setSessionDateString] = useState("");

  useEffect(() => {
    // Update session date at midnight UAE time
    const updateSession = () => setSessionDate(getNextSessionUAE());
    const now = DateTime.now().setZone("Asia/Dubai");
    const tomorrow = now.plus({ days: 1 }).startOf("day");
    const msUntilMidnight = tomorrow.diff(now).toObject().milliseconds || 0;
    const timeout = setTimeout(() => {
      updateSession();
      setInterval(updateSession, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
    return () => clearTimeout(timeout);
  }, []);

  // Countdown calculation
  useEffect(() => {
    const updateCountdown = () => {
      const now = DateTime.now().setZone("Asia/Dubai");
      const diff = sessionDate
        .diff(now, ["hours", "minutes", "seconds"])
        .toObject();
      setTimeLeft({
        hours: Math.max(0, Math.floor(diff.hours || 0)),
        minutes: Math.max(0, Math.floor(diff.minutes || 0)),
        seconds: Math.max(0, Math.floor(diff.seconds || 0)),
      });
      setSessionDateString(
        sessionDate.toFormat("cccc, LLLL d, yyyy 'at' h:mm a 'UAE'")
      );
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [sessionDate]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#EC4899", "#9333EA", "#DB2777"],
    });
  };

  const handleRegister = () => {
    trackFBEvent("Lead", {
      content_name: "Registration Interest",
      content_category: "Button Click",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="register"
      className="relative py-16 px-4 bg-white overflow-hidden"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Enhanced Background with 3D effect */}
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,231,243,0.5)_0%,rgba(255,255,255,0)_100%)]" />

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-pink-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enhanced Header with 3D Hover Effect */}
        <motion.div
          className="text-center mb-16 transform-gpu"
          animate={{ rotateX: isHovering ? 10 : 0 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className={`
              ${andika.className} 
              inline-flex items-center gap-3 px-8 py-3
              bg-gradient-to-r from-pink-100/80 to-purple-100/80
              text-pink-600 
              font-semibold 
              text-lg
              tracking-wider
              rounded-full
              shadow-[0_8px_32px_-8px_rgba(236,72,153,0.3)]
              border border-pink-200/50
              backdrop-blur-md
              transform hover:scale-105 transition-transform duration-300
            `}
            >
              <motion.span
                animate={{
                  rotate: [0, 15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ⚡
              </motion.span>
              Limited Time Offer
            </span>
          </motion.div>

          <motion.h2
            className="font-dingdong text-6xl md:text-7xl font-bold mb-8
              relative inline-block cursor-default select-none"
            style={{
              WebkitTextStroke: "1px rgba(236,72,153,0.3)",
              transform: "translateZ(50px)",
            }}
          >
            <span
              className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 
              bg-clip-text text-transparent leading-tight block"
            >
              REGISTRATION FOR THE
              <br />
              NEXT MASTERCLASS
              <br />
              CLOSES SOON
            </span>

            {/* Floating elements around heading */}
            {["✨", "🌟", "💫"].map((emoji, i) => (
              <motion.span
                key={i}
                className="absolute text-3xl"
                style={{
                  top: `${-20 + Math.random() * 40}px`,
                  left: `${50 + i * 120}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Countdown Timer Section */}
        <motion.div
          className="mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Timer container */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-pink-100 shadow-[0_8px_32px_-8px_rgba(236,72,153,0.3)]">
            <div className="flex flex-col items-center">
              {/* Timer header */}
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 text-pink-500"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <motion.path
                      d="M12 6v6l4 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ transformOrigin: "12px 12px" }}
                    />
                  </svg>
                </motion.div>
                <div className="text-center">
                  <h3
                    className={`${andika.className} text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent`}
                  >
                    Next Session Starts In
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {sessionDateString}
                  </p>
                </div>
              </div>

              {/* Timer digits */}
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {[
                  {
                    unit: "Hours",
                    value: String(timeLeft.hours).padStart(2, "0"),
                  },
                  {
                    unit: "Minutes",
                    value: String(timeLeft.minutes).padStart(2, "0"),
                  },
                  {
                    unit: "Seconds",
                    value: String(timeLeft.seconds).padStart(2, "0"),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.unit}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-pink-400 to-purple-600 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-pink-100 group-hover:transform group-hover:-translate-y-1 transition-all duration-300">
                      <div className="text-center">
                        <span className="font-dingdong text-4xl md:text-5xl font-bold bg-gradient-to-b from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          {item.value}
                        </span>
                        <span className="block text-sm font-medium text-gray-500 mt-1">
                          {item.unit}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Simple urgency indicator */}
              <motion.div
                className="flex items-center justify-center gap-2 text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span
                  className={`${andika.className} text-red-600 font-medium text-sm md:text-base`}
                >
                  Limited Seats Available
                </span>
                <div
                  className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Button with synchronized animations */}
        <motion.div className="text-center">
          <motion.a
            href="/checkout"
            className={`
              relative block
              bg-yellow-300 text-black
              px-12 py-6
              rounded-xl
              border-4 border-red-500
              shadow-[4px_4px_0px_0px_rgba(239,68,153,1)]
              origin-[50%_90%]
              transform-gpu
              inline-block
              hover:shadow-[8px_8px_0px_0px_rgba(239,68,153,1)]
            `}
            animate={{
              rotate: [0, -8, 8, -8, 0],
              scale: [1, 0.92, 1.08, 0.92, 1],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              },
            }}
            whileHover={{
              scale: 1.15,
              y: -8,
              transition: {
                duration: 0.4,
                ease: "backOut",
              },
            }}
            whileTap={{
              scale: 0.85,
              y: 4,
              transition: {
                duration: 0.2,
                ease: "backIn",
              },
            }}
            onClick={() => {
              shootConfetti();
              handleRegister();
            }}
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="font-dingdong text-2xl md:text-3xl">
                RESERVE YOUR
              </span>
              <span className="font-dingdong text-2xl md:text-3xl tracking-wider">
                SPOT - 9.99 USD
              </span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
