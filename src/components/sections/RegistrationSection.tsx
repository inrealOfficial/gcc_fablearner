"use client";

import { useRef, useState } from "react";
import { Andika } from "next/font/google";
import { CountdownTimer } from "../ui/CountdownTimer";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from 'canvas-confetti';

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export const RegistrationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // Confetti effect function
  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EC4899', '#9333EA', '#DB2777']
    });
  };

  return (
    <section
      ref={sectionRef}
      id="register"
      className="relative py-32 px-4 min-h-[90vh] bg-white overflow-hidden"
      style={{
        perspective: "1000px"
      }}
    >
      {/* Enhanced Background with 3D effect */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, opacity }}
      >
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
            <span className={`
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
            `}>
              <motion.span
                animate={{ 
                  rotate: [0, 15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >⚡</motion.span>
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
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 
              bg-clip-text text-transparent leading-tight block">
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

        {/* Countdown Timer */}
        <motion.div 
          className="mb-16 scale-110 flex justify-center items-center" // Added flex and center classes
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex gap-4 justify-center items-center"> {/* Added container for timer */}
            <CountdownTimer targetDate="May 24, 2025 18:00:00" />
          </div>
        </motion.div>

        {/* Enhanced CTA Button */}
        <motion.div className="text-center">
          <motion.a
            href="#register"
            className={`
              ${andika.className} 
              group
              relative inline-flex items-center justify-center gap-4 
              px-12 py-6
              bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 
              rounded-2xl
              text-white font-bold text-2xl
              shadow-[0_8px_32px_-8px_rgba(236,72,153,0.5)]
              hover:shadow-[0_16px_48px_-8px_rgba(236,72,153,0.6)]
              transition-all duration-300
              overflow-hidden
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onTap={shootConfetti}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {/* Button content with floating arrow */}
            <span>RESERVE YOUR SPOT - RS.499</span>
            <motion.span 
              className="transform"
              animate={{ 
                x: [0, 4, 0],
                y: [0, -2, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};