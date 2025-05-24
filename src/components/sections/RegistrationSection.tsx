"use client";

import { useRef } from "react";
import { Andika } from "next/font/google";
import { CountdownTimer } from "../ui/CountdownTimer";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export const RegistrationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="register"
      className="relative py-32 px-4 min-h-[80vh] bg-white overflow-hidden"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-50" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className={`
              ${andika.className} 
              inline-flex items-center gap-2 px-6 py-2
              bg-gradient-to-r from-pink-50 to-purple-50
              text-pink-600 
              font-semibold 
              text-lg
              tracking-wide 
              rounded-full
              shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)]
              border border-pink-100/50
            `}>
              <span>⚡</span>
              Limited Time Offer
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 
            bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 
            bg-clip-text text-transparent">
            REGISTRATION FOR THE NEXT
            <br />
            MASTERCLASS CLOSES SOON
          </h2>
        </div>

        {/* Countdown Timer */}
        <div className="mb-16">
          <CountdownTimer targetDate="May 24, 2025 18:00:00" />
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="#register"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 
              bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg 
              text-white font-bold text-xl
              shadow-[0_4px_20px_-4px_rgba(236,72,153,0.5)]
              hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.8)]
              hover:scale-105 active:scale-95
              transition-all duration-300"
          >
            <span>RESERVE YOUR SPOT - RS.499</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};