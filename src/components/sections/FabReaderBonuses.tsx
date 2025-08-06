"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Andika } from "next/font/google";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

const bonuses = [
  {
    title: "BONUS #1: Lifetime Access to Parent Video Lessons",
    description: "Watch anytime on the app — no expiry.",
    icon: "📱",
    color: "from-pink-100 via-pink-50 to-yellow-50",
  },
  {
    title: "BONUS #2: Telegram Support Group for Parents",
    description: "Join hundreds of parents learning together, sharing wins & tips.",
    icon: "👨‍👩‍👧‍👦",
    color: "from-purple-100 via-pink-50 to-yellow-50",
  },
  {
    title: "BONUS #3: One-Time Purchase for All Your Kids",
    description: "Buy once — use it for your younger kids too. We support every child in your family.",
    icon: "👶👦👧",
    color: "from-yellow-100 via-pink-50 to-purple-50",
  },
  {
    title: "BONUS #4: Personal Support for Every Child",
    description: "Our team will personally guide you even if you’re helping more than one child learn to read.",
    icon: "💬",
    color: "from-pink-100 via-yellow-50 to-purple-50",
  },
];

export const FabReaderBonuses = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-16 px-4 bg-white overflow-hidden"
    >
      {/* Subtle animated background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,231,243,0.25)_0%,rgba(255,255,255,0)_70%)]" />
        <div className="absolute w-96 h-96 -top-40 -left-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute w-96 h-96 -bottom-40 -right-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-block mb-3"
            whileHover={{ scale: 1.04 }}
          >
            <span
              className={`
                ${andika.className}
                relative inline-flex items-center px-6 py-2
                bg-gradient-to-r from-yellow-100 to-pink-100
                text-pink-700
                font-semibold
                text-base
                tracking-wide
                rounded-full
                shadow-sm
                border border-pink-200
              `}
            >
              🎁 Bonuses You Get With FabReader <span className="ml-2 text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full">Limited Time</span>
            </span>
          </motion.div>
          <h2
            className="font-dingdong text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-600 via-yellow-500 to-pink-600 mb-4 tracking-tight"
          >
            Unlock These Exclusive Bonuses!
          </h2>
        </motion.div>

        {/* Bonuses Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.13 } },
          }}
        >
          {bonuses.map((bonus, idx) => (
            <motion.div
              key={idx}
              className={`
                group relative p-8 rounded-3xl
                bg-white/70 backdrop-blur-xl
                border border-pink-100/60 shadow-xl
                hover:shadow-pink-200/60 hover:scale-[1.035]
                transition-all duration-300
                overflow-visible
              `}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -10, scale: 1.04 }}
            >
              {/* Floating animated icon badge */}
              <motion.div
                className="absolute left-1/2 -top-10 -translate-x-1/2 z-10"
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.13, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(236,72,153,0.10)",
                    "0 0 32px 8px rgba(236,72,153,0.18)",
                    "0 0 0 0 rgba(236,72,153,0.10)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.15,
                }}
              >
                <div
                  className={`
                    w-18 h-18  rounded-full
                    rounded-full flex items-center justify-center
                    bg-gradient-to-br from-pink-400 via-yellow-300 to-purple-400
                    shadow-lg ring-4 ring-white/60 border-2 border-pink-200
                    text-white
                    leading-none
                    select-none
                    overflow-hidden
                  `}
                  style={{
                    fontFamily: "Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Noto Emoji, Segoe UI Symbol, Android Emoji, EmojiSymbols, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
                  }}
                >
                  {idx === 2 ? (
                    <span className="flex flex-row items-center justify-center w-full h-full gap-0.5">
                      <span className="text-lg">👶</span>
                      <span className="text-lg">👦</span>
                      <span className="text-lg">👧</span>
                    </span>
                  ) : (
                    <span className="text-3xl">{bonus.icon}</span>
                  )}
                </div>
              </motion.div>
              <div className="pt-10 pb-2 px-2 space-y-3">
                <h3 className="font-dingdong text-xl font-bold text-pink-700 min-h-[3rem] leading-tight text-center">
                  {bonus.title}
                </h3>
                <p className={`${andika.className} text-gray-700 text-[15px] leading-relaxed text-center`}>
                  {bonus.description}
                </p>
              </div>
              {/* Glass reflection */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/60 to-transparent rounded-3xl pointer-events-none" />
              {/* Subtle confetti/floating emoji background */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <motion.span
                  className="absolute left-4 bottom-4 text-2xl opacity-20"
                  animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3 }}
                >🎉</motion.span>
                <motion.span
                  className="absolute right-4 top-4 text-2xl opacity-20"
                  animate={{ y: [0, 10, 0], rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.4 }}
                >🎈</motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Wow factor: animated confetti emoji */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <motion.span
            className="text-4xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🎉
          </motion.span>
          <span className="ml-3 font-andika text-lg text-pink-700 font-bold">
            All bonuses included for a limited time!
          </span>
        </motion.div>
      </div>
    </section>
  );
};