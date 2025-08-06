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

const benefits = [
  {
    icon: "🧠",
    title: "Why FabReader Works (Even When Other Methods Don’t)",
    description:
      "FabReader combines time-tested phonics with brain science, so your child doesn't just decode words, but understands and remembers them.",
  },
  {
    icon: "💡",
    title: "It’s Not Just About Phonics — It’s About the Brain.",
    description:
      "Our brain-based + phonics approach ensures deep comprehension, not just rote learning.",
  },
  {
    icon: "📌",
    title: "Parent-Powered Learning",
    description:
      "You’re not outsourcing your child’s learning to a screen or stranger. You lead it — with our step-by-step help.",
  },
  {
    icon: "⏱️",
    title: "Just 15 Minutes a Day — No Screen Time",
    description:
      "Short, focused sessions tap into your child’s natural attention span. No overstimulation, no battles.",
  },
  {
    icon: "🌱",
    title: "Builds Comprehension, Confidence & Focus",
    description:
      "We don’t stop at “sounding out words.” Your child learns to read with meaning — a lifelong skill.",
  },
  {
    icon: "📊",
    title: "Backed by Science",
    description:
      "Studies prove that microlearning (15 minutes a day) and guided reading with a parent lead to better outcomes than passive apps or tuition.",
  },
  {
    icon: "🧠",
    title: "In short: FabReader works with your child’s brain, not against it.",
    description: "",
  },
];

export const FabReaderBenefitsSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Floating emoji background
  const floatEmojis = [
    { icon: "🧠", left: "10%", top: "12%", delay: 0 },
    { icon: "💡", left: "80%", top: "18%", delay: 0.5 },
    { icon: "🌱", left: "18%", top: "80%", delay: 1 },
    { icon: "📊", left: "75%", top: "75%", delay: 1.5 },
    { icon: "⏱️", left: "50%", top: "5%", delay: 0.7 },
    { icon: "📌", left: "5%", top: "55%", delay: 1.2 },
  ];

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.10) 0%, rgba(255,255,255,0.0) 70%)",
          y: bgY,
        }}
      />

      {/* Floating Emojis for Wow Factor */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {floatEmojis.map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-5xl opacity-20 select-none"
            style={{ left: e.left, top: e.top }}
            animate={{
              y: [0, -18, 0],
              scale: [1, 1.15, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: e.delay,
              ease: "easeInOut",
            }}
          >
            {e.icon}
          </motion.span>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-20 px-4">
        {/* Section Label */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
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
                relative inline-flex items-center px-7 py-2
                bg-gradient-to-r from-pink-100 to-purple-100
                text-pink-700
                font-semibold
                text-base
                tracking-wide
                z-10
                rounded-full
                shadow-md
                border border-pink-200
              `}
            >
              Why FabReader Works
            </span>
          </motion.div>
          <h2
            className="font-dingdong text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mb-4 tracking-tight drop-shadow-lg"
          >
            Brain-Based, Parent-Powered, Proven Results
            <motion.span
              className="inline-block ml-2 text-3xl align-middle"
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
              ✨
            </motion.span>
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.13 } },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 8px 32px 0 rgba(236,72,153,0.10)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Card */}
              <div
                className="relative h-full p-7 rounded-3xl bg-white/80
                shadow-[0_8px_32px_-6px_rgba(236,72,153,0.10)]
                hover:shadow-[0_16px_40px_-8px_rgba(236,72,153,0.18)]
                transition-all duration-300 border border-pink-100/60 backdrop-blur-md"
              >
                {/* Elegant Icon Badge */}
                <div className="flex justify-center -mt-12 mb-2">
                  <motion.div
                    className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 via-white to-purple-100 shadow-lg ring-4 ring-pink-200/40"
                    animate={{
                      scale: [1, 1.08, 1],
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
                      delay: index * 0.1,
                    }}
                  >
                    <span className="text-4xl">{benefit.icon}</span>
                    {/* Optional: animated glow */}
                    <span className="absolute inset-0 rounded-full bg-pink-400/10 blur-xl pointer-events-none" />
                  </motion.div>
                </div>

                <div className="pt-6 space-y-3">
                  <h3 className="font-dingdong text-xl font-bold text-pink-600 min-h-[3.5rem] leading-tight">
                    {benefit.title}
                  </h3>
                  {benefit.description && (
                    <p
                      className={`${andika.className} text-gray-700 text-[15px] leading-relaxed group-hover:text-gray-900 transition-colors duration-300`}
                    >
                      {benefit.description}
                    </p>
                  )}
                </div>
                {/* Glass reflection effect */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/60 to-transparent rounded-3xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
