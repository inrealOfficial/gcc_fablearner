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

const steps = [
  {
    icon: "📦",
    title: "Get the Program & Book Access",
    description: "📦 We ship the FabReader kit to your home.",
    color: "from-pink-100 via-pink-50/95 to-rose-100/90",
    badge: "Step 1",
    emoji: "📦",
  },
  {
    icon: "🎥",
    title: "Watch Quick Parent Videos on the App",
    description:
      "📲 Step-by-step training videos guide you — no teaching experience needed.",
    color: "from-purple-100 via-purple-50/95 to-pink-100/90",
    badge: "Step 2",
    emoji: "📲",
  },
  {
    icon: "📖",
    title: "Watch Your Child Become a Reader",
    description: "🎉 See real results in 90 days or less!",
    color: "from-yellow-100 via-pink-50/95 to-purple-100/90",
    badge: "Step 3",
    emoji: "🎉",
  },
];

export const FabReaderHowitsWorks = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-16 px-4 bg-white overflow-hidden"
    >
      {/* Subtle animated background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,231,243,0.3)_0%,rgba(255,255,255,0)_70%)]" />
      </motion.div>

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["📚", "🎉", "📦", "📲"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${10 + ((i * 25) % 80)}%`,
              top: `${5 + ((i * 20) % 90)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="relative inline-block mb-6">
            <span
              className={`
                ${andika.className}
                relative inline-flex items-center px-6 py-2
                bg-gradient-to-r from-pink-100/80 to-purple-100/80
                text-pink-600
                font-semibold
                text-lg
                tracking-wide
                rounded-full
                shadow-[0_2px_10px_-2px_rgba(236,72,153,0.3)]
                backdrop-blur-sm
              `}
            >
              How FabReader Works
            </span>
          </motion.div>
          <h2
            className="font-dingdong text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mb-4"
          >
            📚 How FabReader Works in Just 3 Simple Steps
          </h2>
        </motion.div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <div
                className={`
                  relative p-6 rounded-2xl
                  bg-gradient-to-br ${step.color}
                  border border-white/20
                  backdrop-blur-sm
                  overflow-hidden
                  transition-all duration-300
                  hover:shadow-[0_15px_30px_-8px_rgba(236,72,153,0.25)]
                  h-full
                `}
              >
                {/* Step Badge & Emoji */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className={`
                      inline-flex items-center gap-2 px-3 py-1
                      bg-pink-500/10 text-pink-600
                      rounded-xl
                      ${andika.className}
                      text-xs font-semibold
                      backdrop-blur-sm
                      border border-white/20
                    `}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-lg">{step.emoji}</span>
                    <span>{step.badge}</span>
                  </motion.div>
                </div>
                {/* Title */}
                <h3 className="font-dingdong text-lg md:text-xl font-bold mb-2 text-pink-700 leading-tight">
                  {step.title}
                </h3>
                {/* Description */}
                <p
                  className={`
                    ${andika.className}
                    text-base text-pink-950 leading-relaxed opacity-90
                  `}
                >
                  {step.description}
                </p>
                {/* Decorative Blur */}
                <div
                  className={`
                    absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12
                    rounded-full
                    bg-gradient-to-br from-pink-200/30 via-purple-200/20 to-transparent
                    blur-2xl
                    group-hover:scale-110
                    transition-transform duration-700
                  `}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
