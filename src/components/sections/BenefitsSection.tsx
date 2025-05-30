import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Andika } from "next/font/google";

// Add Andika font
const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export const BenefitsSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const benefits = [
    {
      title: "Learn to Teach Your Child with Confidence",
      description:
        "Joining the masterclass will help you understand how your child learns and get simple, effective strategies to teach them better.",
    },
    {
      title: "Put an End to Your Worrying Thoughts",
      description:
        "This masterclass replaces your uncertainty with a clear, step-by-step roadmap that will make a difference.",
    },
    {
      title: "Turn Your Child into a Lifelong Learner",
      description:
        "What you'll learn will not only benefit your child now, but will invest in your child's future with a love for learning.",
    },
    {
      title: "Give Your Child a Head Start",
      description:
        "Early reading gives your child an advantage in school and life. Strong reading skills lead to better grades and opportunities.",
    },
    {
      title: "Strengthen Your Family Bond",
      description:
        "Teaching your child strengthens your bond and shows them you're their biggest supporter in their learning journey.",
    },
    {
      title: "See Real, Fast Results",
      description:
        "Learn the exact methods that have helped thousands of children read up to 27,000 English words in just 90 days.",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-12 overflow-hidden bg-gradient-to-b from-white via-pink-50/20 to-white"
    >
      {/* Modern Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(252, 231, 243, 0.4) 0%, rgba(255, 255, 255, 0) 50%)",
          y: bgY,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 px-4">
        {/* Updated Benefits Label with Better Visibility */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-3"
            whileHover={{ scale: 1.02 }}
          >
            <span
              className={`
            ${andika.className} 
            relative inline-flex items-center px-6 py-2
            bg-pink-100 
            text-pink-700 
            font-semibold 
            text-base
            tracking-wide 
            z-10
            rounded-full
            shadow-sm
            border border-pink-200
          `}
            >
              Benefits
            </span>
          </motion.div>

          <h2
            className="font-dingdong text-4xl md:text-5xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mb-4 tracking-tight"
          >
            Why FAB Masterclass
          </h2>
        </motion.div>

        {/* Modern Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Card with improved contrast */}
              <div
                className="relative h-full p-6 rounded-2xl bg-white 
              shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)]
              hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300"
              >
                {/* Animated Number Badge */}
                <motion.div
                  className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600
                  rounded-xl flex items-center justify-center text-white font-bold text-lg
                  shadow-lg transform -rotate-6 group-hover:rotate-0 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {index + 1}
                </motion.div>

                <div className="pt-4 space-y-3">
                  {" "}
                  {/* Increased spacing */}
                  <h3
                    className="font-dingdong text-xl font-bold text-pink-600 line-clamp-2 
                  min-h-[3.5rem] leading-tight"
                  >
                    {" "}
                    {/* Removed gradient, added solid color */}
                    {benefit.title}
                  </h3>
                  <p
                    className={`${andika.className} text-gray-700 text-[15px] leading-relaxed line-clamp-3
                  group-hover:text-gray-900 transition-colors duration-300`}
                  >
                    {" "}
                    {/* Darker text color and slightly larger size */}
                    {benefit.description}
                  </p>
                </div>

                {/* Elegant Hover Effect */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={false}
                  animate={isInView ? { x: [20, 0], opacity: [0, 1] } : {}}
                >
                  <svg
                    className="w-5 h-5 text-pink-600 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
