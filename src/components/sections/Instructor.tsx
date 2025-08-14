"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Andika } from "next/font/google";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export const Instructor = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-20 px-4 bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.08)_0%,rgba(255,255,255,0)_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.06)_0%,rgba(255,255,255,0)_50%)]" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["🎓", "📚", "⭐", "🌟"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-10"
            style={{
              left: `${15 + ((i * 30) % 70)}%`,
              top: `${10 + ((i * 25) % 80)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, i % 2 === 0 ? 5 : -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
              relative inline-flex items-center px-6 py-3
              bg-gradient-to-r from-pink-100/80 to-purple-100/80
              text-pink-600 
              font-semibold 
              text-lg
              tracking-wide 
              rounded-full
              shadow-[0_4px_15px_-3px_rgba(236,72,153,0.3)]
              backdrop-blur-sm
              border border-white/20
            `}
            >
              About the Instructor
            </span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            className="relative order-1 lg:order-1 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -inset-6 bg-gradient-to-br from-pink-100/40 to-purple-100/40 rounded-3xl blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-200/30 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200/30 rounded-full blur-xl" />
              
              {/* Main image container - transparent background */}
              <div className="relative rounded-3xl p-6">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50/60 to-purple-50/60">
                  <Image
                    src="/Instructor.png"
                    alt="Waleed Ansari - Founder of FabLearner"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover mix-blend-multiply brightness-105 contrast-110"
                    style={{
                      filter: 'contrast(1.1) brightness(1.05)',
                      mixBlendMode: 'multiply'
                    }}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ7W82JugAAAABJRU5ErkJggg=="
                  />
                </div>
              </div>

              {/* Floating stats/badges */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-pink-100/50"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <div className="font-dingdong text-2xl text-pink-600 font-bold">15+</div>
                  <div className={`${andika.className} text-xs text-pink-600 font-semibold`}>Years Experience</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-purple-100/50"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-center">
                  <div className="font-dingdong text-2xl text-purple-600 font-bold">10K+</div>
                  <div className={`${andika.className} text-xs text-purple-600 font-semibold`}>Parents Helped</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="order-2 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Name and Title */}
            <div className="mb-8">
              <motion.h2
                className="font-dingdong text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Waleed Ansari
              </motion.h2>
              <motion.p
                className={`${andika.className} text-xl text-pink-600 font-semibold mb-2`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Founder of FabLearner
              </motion.p>
              <motion.p
                className={`${andika.className} text-lg text-gray-600`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Educator & Early Reading Specialist
              </motion.p>
            </div>

            {/* Description */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className={`${andika.className} text-lg text-gray-700 leading-relaxed`}>
                With over <span className="font-bold text-pink-600">15 years of teaching experience</span>, Waleed has helped more than <span className="font-bold text-purple-600">10,000 parents</span> teach their children to read before school. His unique, science-backed method has turned even the youngest learners — some as young as <span className="font-bold text-pink-600">2 years 8 months</span> — into confident, independent readers.
              </p>
              
              <p className={`${andika.className} text-lg text-gray-700 leading-relaxed`}>
                After founding and running a successful kindergarten where children learned to read <span className="font-bold text-purple-600">3–4 letter words in just 3 months</span>, Waleed created FabLearner, a parent-led reading program that has now reached <span className="font-bold text-pink-600">100+ cities worldwide</span>.
              </p>
              
              <p className={`${andika.className} text-lg text-gray-700 leading-relaxed`}>
                His approach blends proven phonics techniques with practical, everyday strategies that any parent can follow — <span className="font-bold text-purple-600">no teaching background needed</span>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};