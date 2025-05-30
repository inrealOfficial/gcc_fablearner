import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Andika } from "next/font/google";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

const scheduleData = [
  {
    day: 1,
    title: "7 DEADLY MISTAKES THAT STOP KIDS FROM LEARNING TO READ",
    description: "Most parents make these without even realizing it.",
    color: "pink",
    emoji: "⏱️",
  },
  {
    day: 2,
    title: "THE 15-MINUTE METHOD TO TEACH READING BEFORE AGE 3",
    description:
      "A proven step-by-step formula that has helped over 2,000+ parents teach their kids to read - without tutors, expensive programs, or stress.",
    color: "pink", // Changed from purple to pink to match Day 1
    emoji: "⏱️",
  },
];

export const ScheduleSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-16 px-4 bg-white overflow-hidden" // Reduced from py-32 to py-16
    >
      {/* Updated Background with subtle gradient */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,231,243,0.3)_0%,rgba(255,255,255,0)_70%)]" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["📚", "🎯", "⭐", "📖"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${10 + ((i * 25) % 80)}%`,
              top: `${5 + ((i * 20) % 90)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
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
              relative inline-flex items-center px-6 py-2
              bg-gradient-to-r from-pink-100/80 to-purple-100/80
              text-pink-600 
              font-semibold 
              text-lg
              tracking-wide 
              rounded-full
              shadow-[0_2px_10px_-2px_rgba(236,72,153,0.3)]
              backdrop-blur-sm
            `}
            >
              Schedule
            </span>
          </motion.div>
          <h2
            className="font-dingdong text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mb-4"
          >
            YOUR ROADMAP TO SUCCESS
          </h2>
        </motion.div>

        {/* Enhanced Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {scheduleData.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <div
                className={`
                relative p-6
                rounded-2xl
                ${
                  index === 0
                    ? "bg-gradient-to-br from-pink-100 via-pink-50/95 to-rose-100/90"
                    : "bg-gradient-to-br from-purple-100 via-purple-50/95 to-pink-100/90"
                }
                border border-white/20
                backdrop-blur-sm
                overflow-hidden
                transition-all duration-300
                hover:shadow-[0_15px_30px_-8px_rgba(236,72,153,0.25)]
                h-full
              `}
              >
                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Day Badge & Title Group */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`
                      flex-shrink-0 flex flex-col items-center justify-center
                      w-16 h-16 rounded-xl
                      ${
                        index === 0
                          ? "bg-gradient-to-br from-pink-500 to-rose-600"
                          : "bg-gradient-to-br from-purple-500 to-pink-600"
                      }
                      text-white
                      shadow-lg
                      group-hover:scale-105
                      transition-all duration-300
                    `}
                    >
                      <span className="font-dingdong text-sm font-medium opacity-80">
                        DAY
                      </span>
                      <span className="font-dingdong text-2xl font-bold -mt-1">
                        {day.day}
                      </span>
                    </div>

                    <motion.div
                      className={`
                        inline-flex items-center gap-2 px-4 py-2
                        ${index === 0 ? "bg-pink-500/10" : "bg-purple-500/10"}
                        ${index === 0 ? "text-pink-600" : "text-purple-600"}
                        rounded-xl
                        ${andika.className}
                        text-sm font-semibold
                        backdrop-blur-sm
                        border border-white/20
                      `}
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="text-lg">{day.emoji}</span>
                      <span>15 Minutes</span>
                    </motion.div>
                  </div>

                  {/* Title with enhanced styling */}
                  <h3
                    className={`
                    font-dingdong text-xl md:text-2xl font-bold mb-3
                    ${index === 0 ? "text-pink-700" : "text-purple-700"}
                    leading-tight
                  `}
                  >
                    {day.title}
                  </h3>

                  {/* Description with improved contrast */}
                  <p
                    className={`
                    ${andika.className}
                    text-base
                    ${index === 0 ? "text-pink-950" : "text-purple-950"}
                    leading-relaxed
                    opacity-90
                  `}
                  >
                    {day.description}
                  </p>

                  {/* Enhanced Decorative Elements */}
                  <div
                    className={`
                    absolute top-0 right-0 w-80 h-80 -mr-40 -mt-40
                    rounded-full
                    ${
                      index === 0
                        ? "bg-gradient-to-br from-pink-200/30 via-rose-200/20 to-transparent"
                        : "bg-gradient-to-br from-purple-200/30 via-pink-200/20 to-transparent"
                    }
                    blur-3xl
                    group-hover:scale-110
                    transition-transform duration-700
                  `}
                  />

                  {/* Additional subtle patterns */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-32 
                    bg-gradient-to-t from-white/5 to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
