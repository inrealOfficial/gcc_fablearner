"use client";

import React, { useRef, useState } from "react";
import { Andika } from "next/font/google";
import { CountdownTimer } from "../ui/CountdownTimer";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from 'canvas-confetti';

// Font configuration
const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

// Helper function
const get24HoursFromNow = () => {
  const date = new Date();
  date.setHours(date.getHours() + 24);
  return date;
};

export const RegistrationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
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
      colors: ['#EC4899', '#9333EA', '#DB2777']
    });
  };

  return (
    <section
      ref={sectionRef}
      id="register"
      className="relative py-16 px-4 bg-white overflow-hidden"
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

        {/* Countdown Timer Section */}
        <motion.div 
          className="mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 via-pink-200/20 to-purple-200/20 blur-3xl transform rotate-12" />
            <div className="absolute inset-0 bg-gradient-to-l from-purple-200/20 via-pink-200/20 to-purple-200/20 blur-3xl transform -rotate-12" />
          </div>
          
          {/* Timer container */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-pink-100 shadow-[0_8px_32px_-8px_rgba(236,72,153,0.3)]">
            <div className="flex flex-col items-center">
              {/* Timer header */}
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <motion.path
                      d="M12 6v6l4 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: '12px 12px' }}
                    />
                  </svg>
                </motion.div>
                <div className="text-center">
                  <h3 className={`${andika.className} text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent`}>
                    Masterclass Starts In
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Don't miss this opportunity!</p>
                </div>
              </div>

             

{/* Timer digits */}
<div className="grid grid-cols-3 gap-4 md:gap-8">
  <CountdownTimer 
    targetDate={get24HoursFromNow()}
    render={({ hours, minutes, seconds }) => (
      <>
        {[
          { unit: 'Hours', value: String(hours).padStart(2, '0') },
          { unit: 'Minutes', value: String(minutes).padStart(2, '0') },
          { unit: 'Seconds', value: String(seconds).padStart(2, '0') }
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
                repeatType: "reverse"
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
      </>
    )}
  />
</div>


              {/* Live indicator */}
              <motion.div 
                className="mt-8 flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-sm text-gray-600">
                  {Math.floor(Math.random() * 50) + 130} people viewing now
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Button with synchronized animations */}
        <motion.div className="text-center">
          <motion.a
            href="/checkout" // Update this line
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
              scale: [1, 0.92, 1.08, 0.92, 1], // Modified scale values
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
              }
            }}
            whileHover={{
              scale: 1.15, // Increased hover scale
              y: -8, // Added slight upward movement
              transition: { 
                duration: 0.4,
                ease: "backOut"
              }
            }}
            whileTap={{
              scale: 0.85, // Increased scale down on tap
              y: 4, // Added slight downward movement
              transition: { 
                duration: 0.2,
                ease: "backIn"
              }
            }}
            onClick={shootConfetti}
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="font-dingdong text-2xl md:text-3xl">
                RESERVE YOUR
              </span>
              <span className="font-dingdong text-2xl md:text-3xl tracking-wider">
                SPOT - RS.499
              </span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};