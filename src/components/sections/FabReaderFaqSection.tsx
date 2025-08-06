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

const faqs = [
  {
    question: "What age group is FabReader best for?",
    answer:
      "🧒 FabReader is designed for children aged 2 to 6 years — the golden window when kids pick up language and reading fastest.",
  },
  {
    question: "I’m not fluent in English. Can I still teach my child?",
    answer:
      "🌍 Absolutely! Our parent training videos are designed for everyday parents, not teachers.",
  },
  {
    question: "When will I start seeing results?",
    answer:
      "⏱ Most families begin seeing progress in just 2–4 weeks — and many children become fluent readers within 90 days with just 15 minutes a day.",
  },
  {
    question: "What if I get stuck or my child struggles?",
    answer:
      "💬 You’re never alone. Our expert team offers personal WhatsApp support — plus you’ll be part of our Telegram Parent Community to learn, share wins, and get help from other parents too.",
  },
  {
    question: "What will I get?",
    answer: [
      "Progress Tracker",
      "Beginner Level - Book",
      "Beginner Level - Workbook",
      "Intermediate Level - Book",
      "Intermediate Level - Workbook",
      "Intermediate Level - Storybook",
      "Advance Level - Book",
      "Advance Level - Workbook",
      "Advance Level - Storybook",
      "Flashcards:",
      "Alphabets - Capital and Small",
      "Digraphs, Trigraphs, etc",
      "Sight Words",
    ],
  },
];

export const FabReaderFaqSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-16 px-4 bg-white overflow-hidden"
    >
      {/* Creative Background Elements */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,231,243,0.3)_0%,rgba(255,255,255,0)_70%)]" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute w-96 h-96 -top-48 -right-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute w-96 h-96 -bottom-48 left-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          </div>
        </div>
      </motion.div>

      {/* Enhanced Header Section */}
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="relative inline-block mb-6">
            <span
              className={`
                ${andika.className}
                relative inline-flex items-center gap-2 px-6 py-2
                bg-gradient-to-r from-pink-50 to-purple-50
                text-pink-600
                font-semibold
                text-lg
                tracking-wide
                rounded-full
                shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)]
                border border-pink-100/50
              `}
            >
              <span className="animate-bounce">📚</span>
              FabReader FAQ
            </span>
          </motion.div>
          <h2
            className="font-dingdong text-4xl md:text-5xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 
            bg-clip-text text-transparent relative"
          >
            FREQUENTLY ASKED QUESTIONS
            <motion.span
              className="absolute -right-8 -top-6 text-3xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
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

        {/* FAQ Cards */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-white to-pink-50/30 rounded-2xl 
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]
                hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.2)] 
                transition-all duration-500"
            >
              <details className="group">
                <summary
                  className="flex justify-between items-center cursor-pointer p-6 
                    focus:outline-none rounded-2xl"
                >
                  <span
                    className={`${andika.className} font-semibold text-lg pr-6
                    bg-gradient-to-r from-gray-800 to-gray-600
                    group-hover:from-pink-600 group-hover:to-purple-600
                    bg-clip-text text-transparent transition-all duration-300`}
                  >
                    {faq.question}
                  </span>
                  <span className="text-pink-500">
                    <svg
                      className="w-6 h-6 transform group-open:rotate-180 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-pink-100">
                    {faq.question === "What will I get?" ? (
                      <ul className="mt-4 space-y-2 text-left">
                        <li className="ml-4">
                          ▪️ <span className="font-bold text-purple-700">{faq.answer[0]}</span>
                        </li>
                        <li className="ml-4">
                          ▪️ <span className="font-bold text-purple-700">{faq.answer[1]}</span>
                        </li>
                        <li className="ml-4">
                          ▪️ <span>{faq.answer[2]}</span>
                        </li>
                        <li className="ml-4 mt-2">
                          ▪️ <span className="font-bold text-purple-700">{faq.answer[3]}</span>
                        </li>
                        <li className="ml-4">
                          ▪️ <span>{faq.answer[4]}</span>
                        </li>
                        <li className="ml-4">
                          ▪️ <span>{faq.answer[5]}</span>
                        </li>
                        <li className="ml-4 mt-2">
                          ▪️ <span className="font-bold text-purple-700">{faq.answer[6]}</span>
                        </li>
                        <li className="ml-4">
                          ▪️ <span>{faq.answer[7]}</span>
                        </li>
                        <li className="ml-4">
                          ▪️ <span>{faq.answer[8]}</span>
                        </li>
                        {/* Flashcards heading */}
                        <li className="ml-4 mt-2 font-bold text-purple-700">
                          ▪️ <span>Flashcards:</span>
                        </li>
                        <ul className="mt-2 ml-14 space-y-1 list-disc">
                          <li>{faq.answer[10]}</li>
                          <li>{faq.answer[11]}</li>
                          <li>{faq.answer[12]}</li>
                        </ul>
                      </ul>
                    ) : (
                      <p className={`${andika.className} text-gray-600 leading-relaxed`}>
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};