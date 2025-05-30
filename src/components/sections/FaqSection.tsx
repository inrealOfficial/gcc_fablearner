import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Andika } from "next/font/google";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export const FaqSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const faqs = [
    {
      question: "Will I get a recording if I miss the session?",
      answer:
        "Please attend live to gain full benefits of the live masterclass. Recordings will be provided to those who ask for it.",
    },
    {
      question: "How long is the session?",
      answer:
        "Each session lasts 90 minutes (6:00 PM to 7:30 PM) on May 24th and 25th, 2025.",
    },
    {
      question: "Why is this so cheap?",
      answer:
        "We believe every child deserves the gift of reading. Our mission is to make high-quality education accessible to all families.",
    },
    {
      question: "Do I need any experience to teach my child?",
      answer:
        "No prior teaching experience is required. Our step-by-step method is designed for all parents, regardless of background.",
    },
    {
      question: "What happens after I register?",
      answer:
        "You'll receive a confirmation email with the link to join the masterclass and all necessary materials to prepare.",
    },
  ];

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-16 px-4 bg-white overflow-hidden" // Reduced from py-32 to py-16
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
              <span className="animate-bounce">❓</span>
              FAQ
            </span>
          </motion.div>
          <h2
            className="font-dingdong text-4xl md:text-5xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 
            bg-clip-text text-transparent relative"
          >
            WE'VE GOT ALL THE ANSWERS FOR YOU!
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
                    <p
                      className={`${andika.className} text-gray-600 leading-relaxed`}
                    >
                      {faq.answer}
                    </p>
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
