"use client";

import { CountdownTimer } from "../ui/CountdownTimer";

export const RegistrationSection = () => {
  return (
    <section
      id="register"
      className="py-20 px-4 bg-gradient-to-b from-purple-50 to-purple-100"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          REGISTRATION FOR THE NEXT
          <br />
          MASTERCLASS CLOSES SOON
        </h2>

        <div className="mb-8">
          <CountdownTimer targetDate="May 24, 2025 18:00:00" />
        </div>

        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
          <a
            href="#register"
            className="relative flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-bold text-xl transition transform hover:-translate-y-1"
          >
            RESERVE YOUR SPOT - RS.499
          </a>
        </div>
      </div>
    </section>
  );
};
