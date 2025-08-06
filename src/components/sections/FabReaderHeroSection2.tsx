"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Andika } from "next/font/google";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export const FabReaderHeroSection2 = () => {
  // Parallax background effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const bgX = mousePosition.x * 30;
  const bgY = mousePosition.y * 30;

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "rgba(37, 150, 190, 0.8)" }} // teal-600 with opacity
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
        />
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

      {/* Floating reading-related elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["📚", "📖", "✏️", "🎯", "🌟", "💡", "👶", "🎓", "📝", "✨"].map(
          (emoji, i) => (
            <motion.div
              key={emoji}
              className="absolute font-dingdong text-white/10 text-4xl md:text-6xl lg:text-8xl font-bold"
              style={{
                left: `${5 + ((i * 18) % 90)}%`,
                top: `${5 + ((i * 12) % 85)}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              {emoji}
            </motion.div>
          )
        )}
      </div>

      {/* Content Container - Centered */}
      <div className="container mx-auto px-4 relative z-10 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h1
              className="font-dingdong text-3xl mt-12 md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="block mb-2">
                💡 Teach Your Child to Read Fluently
              </span>
              <span className="text-yellow-300 block">
                in Just 15 Minutes a Day
              </span>
              <span className="text-white/90 text-lg md:text-xl lg:text-2xl block mt-2">
                Even If You're Not a Teacher!
              </span>
            </motion.h1>

            <motion.p
              className={`${andika.className} text-base md:text-lg lg:text-xl text-white/90 mb-4 max-w-3xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              🎯 India's #1 Parent-Led Reading Program —{" "}
              <span className="text-yellow-200 font-bold">
                Trusted by 5,000+ Families
              </span>
            </motion.p>
          </motion.div>

          {/* Elegant Benefits - Single Row */}
          <motion.div
            className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <motion.div
                className="flex items-center gap-2 text-white z-[999]"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-green-300 text-lg">✅</span>
                <span className="text-sm md:text-base font-medium">
                  No Experience Needed
                </span>
              </motion.div>

              <div className="hidden md:block w-px h-6 bg-white/30"></div>

              <motion.div
                className="flex items-center gap-2 text-white"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-blue-300 text-lg">⏱️</span>
                <span className="text-sm md:text-base font-medium">
                  15 Min Daily
                </span>
              </motion.div>

              <div className="hidden md:block w-px h-6 bg-white/30"></div>

              <motion.div
                className="flex items-center gap-2 text-white"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-yellow-300 text-lg">🎯</span>
                <span className="text-sm md:text-base font-medium">
                  90-Day Fluency
                </span>
              </motion.div>

              <div className="hidden md:block w-px h-6 bg-white/30"></div>

              <motion.div
                className="flex items-center gap-2 text-white"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-pink-300 text-lg">👶</span>
                <span className="text-sm md:text-base font-medium">
                  Ages 2-6
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Main CTA Button */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="relative inline-block">
              {/* Glowing background */}
              <motion.div
                className="absolute -inset-4 bg-white/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <motion.button
                onClick={() => scrollToSection("premium")}
                className="relative bg-white text-pink-700 font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-full shadow-2xl font-dingdong hover:bg-gray-50 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255, 255, 255, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Get FabReader Now - Transform Your Child's Reading!
              </motion.button>
            </div>
          </motion.div>

          {/* Elegant Stats & Social Proof */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="text-2xl mb-1">🌟</div>
              <div className="font-dingdong text-lg text-white">5,000+</div>
              <p className={`${andika.className} text-xs text-white/80`}>
                Happy Families
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="text-2xl mb-1">📚</div>
              <div className="font-dingdong text-lg text-white">Grade 2</div>
              <p className={`${andika.className} text-xs text-white/80`}>
                Reading Level
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="text-2xl mb-1">⚡</div>
              <div className="font-dingdong text-lg text-white">Proven</div>
              <p className={`${andika.className} text-xs text-white/80`}>
                Results
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm p-3 rounded-xl text-center"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="text-2xl mb-1">🎓</div>
              <div className="font-dingdong text-lg text-white">Expert</div>
              <p className={`${andika.className} text-xs text-white/80`}>
                Designed
              </p>
            </motion.div>
          </motion.div>

          {/* Trust Indicator */}
          <motion.div
            className="flex items-center justify-center gap-2 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.3 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </motion.div>
              ))}
            </div>
            <span className={`${andika.className} text-sm font-medium`}>
              4.9/5 rating from parents
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
