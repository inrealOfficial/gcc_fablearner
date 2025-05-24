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
    description: "A proven step-by-step formula that has helped over 2,000+ parents teach their kids to read - without tutors, expensive programs, or stress.",
    color: "pink", // Changed from purple to pink to match Day 1
    emoji: "⏱️",
  }
];

export const ScheduleSection = () => {
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
      className="relative py-32 px-4 min-h-[80vh] overflow-hidden bg-white"
    >
      {/* Updated Background with subtle gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
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
            <span className={`
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
            `}>
              Schedule
            </span>
          </motion.div>
          <h2 className="font-dingdong text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mb-4">
            YOUR ROADMAP TO SUCCESS
          </h2>
        </motion.div>

        {/* Updated Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {scheduleData.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`
                relative bg-white p-8 rounded-2xl
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]
                hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.15)]
                transition-all duration-500
                border border-pink-50
                overflow-hidden
              `}>
                {/* Updated Background Pattern */}
                <div className={`
                  absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20
                  bg-gradient-to-br from-pink-50/40 to-transparent
                  rounded-full blur-3xl
                `} />

                {/* Day Badge */}
                <motion.div
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 
                    bg-pink-100 text-pink-600
                    rounded-full text-sm font-semibold mb-6
                  `}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{day.emoji}</span>
                  <span>DAY {day.day}</span>
                </motion.div>

                <h3 className={`
                  text-xl md:text-2xl font-bold mb-4
                  bg-gradient-to-r from-pink-600 to-pink-500
                  text-transparent bg-clip-text
                `}>
                  {day.title}
                </h3>

                <p className={`
                  ${andika.className} 
                  text-gray-600 leading-relaxed
                `}>
                  {day.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};