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

// Helper function to get the date 24 hours from now
const get24HoursFromNow = () => {
  const date = new Date();
  date.setHours(date.getHours() + 24);
  return date;
};

// Keyframe animation for wobble effect
const wobbleKeyframes = {
  "0%": { transform: "rotate(0deg) scale(1)" },
  "10%": { transform: "rotate(-15deg) scale(1.05)" },
  "20%": { transform: "rotate(10deg) scale(1.05)" },
  "30%": { transform: "rotate(-10deg) scale(1.05)" },
  "40%": { transform: "rotate(8deg) scale(1.05)" },
  "50%": { transform: "rotate(-8deg) scale(1.05)" },
  "60%": { transform: "rotate(6deg) scale(1.05)" },
  "70%": { transform: "rotate(-4deg) scale(1.05)" },
  "80%": { transform: "rotate(2deg) scale(1.05)" },
  "90%": { transform: "rotate(-1deg) scale(1.05)" },
  "100%": { transform: "rotate(0deg) scale(1)" }
};

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
          className="mb-16 scale-110 flex justify-center items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex gap-4 justify-center items-center">
            <CountdownTimer targetDate={get24HoursFromNow().toString()} />
          </div>
        </motion.div>

        {/* Enhanced CTA Button */}
        <motion.div className="text-center">
          <div className="relative inline-block">
            {/* Pulse animation wrapper */}
            <motion.div
              className="absolute -inset-2 rounded-xl bg-red-500/50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.a
              href="#register"
              className={`
                relative block
                bg-yellow-300 text-black
                px-12 py-6
                rounded-xl
                border-4 border-red-500
                shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]
                hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]
                origin-[50%_90%]
                transform-gpu
              `}
              animate={{
                rotate: [0, -3, 3, -2, 2, -1, 1, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.2
                }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                shootConfetti();
                // Add extra wobble on click
                const target = e.currentTarget;
                target.style.animation = 'none';
                target.offsetHeight; // Trigger reflow
                target.style.animation = 'bigWobble 0.8s cubic-bezier(0.36, 0, 0.66, -0.56)';
              }}
            >
              <style jsx global>{`
                @keyframes bigWobble {
                  0% { transform: rotate(0deg) scale(1); }
                  25% { transform: rotate(-20deg) scale(1.1); }
                  50% { transform: rotate(15deg) scale(1.1); }
                  75% { transform: rotate(-10deg) scale(1.05); }
                  100% { transform: rotate(0deg) scale(1); }
                }
              `}</style>
              <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                <span className="font-dingdong text-2xl md:text-3xl">
                  RESERVE YOUR
                </span>
                <span className="font-dingdong text-2xl md:text-3xl tracking-wider">
                  SPOT - RS.499
                </span>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};