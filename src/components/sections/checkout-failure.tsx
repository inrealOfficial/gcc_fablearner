"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export const CheckoutFailure = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 px-4">
      <motion.div
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-pink-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-4">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="drop-shadow-lg"
          >
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="#FDE68A"
              stroke="#D2386C"
              strokeWidth="4"
            />
            <path
              d="M38 22L22 38"
              stroke="#D2386C"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M22 22L38 38"
              stroke="#D2386C"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="font-dingdong text-3xl md:text-4xl text-pink-700 mb-2">
          Payment Failed
        </h1>
        <p className="text-pink-800 mb-4">
          Oops! Something went wrong and your payment could not be processed.
        </p>
        <p className="text-gray-700 mb-6">
          Please check your payment details or try again. If the problem
          persists, contact our support team.
        </p>
        <div className="flex flex-col gap-3">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/checkout"
              className="block bg-yellow-300 text-pink-800 font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-400 transition"
            >
              Try Again
            </Link>
          </motion.div>
          <Link
            href="/"
            className="text-pink-700 underline hover:text-pink-900 transition"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
