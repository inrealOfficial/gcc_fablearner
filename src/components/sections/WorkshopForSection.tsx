"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Andika } from "next/font/google";

// Import Andika font
const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

const workshopPoints = [
  {
    id: 1,
    icon: "📚",
    title: "ABC Learned, But Can't Read",
    description:
      "Your child learnt ABC before school, but even after 2 years of school he cannot read sentences.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: 2,
    icon: "💸",
    title: "Wasted Time & Money",
    description:
      "You have wasted precious time and money on other methods with no noticeable results.",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: 3,
    icon: "🛡️",
    title: "Prevent Reading Stress",
    description:
      "You want to save your 2 year old from stress related to reading.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: 4,
    icon: "⏰",
    title: "Busy But Caring Parent",
    description:
      "You are a busy parent, but want to equip yourself to help your child heal.",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: 5,
    icon: "😰",
    title: "Grade 1 Reading Dread",
    description:
      "Your child is in Grade 1 and dreads reading and memorizing spellings.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: 6,
    icon: "🔤",
    title: "Phonics Confusion",
    description:
      "Your child's school has taught him phonics, but he still cannot make sense of it.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
];

export const WorkshopForSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50"
      id="workshop-for"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('/bg.svg')] bg-center bg-no-repeat bg-cover"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 rounded-full px-6 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            <span
              className={`${andika.className} text-pink-700 font-semibold text-sm uppercase tracking-wider`}
            >
              Perfect Match Check
            </span>
          </motion.div>

          {/* Main Title */}
          <h2 className="font-dingdong text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Who is this Workshop for?
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className={`${andika.className} text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto`}
          >
            If any of these scenarios sound familiar, this workshop will be a
            <span className="font-bold text-pink-600"> game-changer </span>
            for you and your child
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {workshopPoints.map((point, index) => (
            <motion.div
              key={point.id}
              className={`group relative ${point.bgColor} ${point.borderColor} border-2 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background Gradient Overlay on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
              />

              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="text-4xl md:text-5xl mb-4 filter drop-shadow-lg"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {point.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className={`font-dingdong text-xl md:text-2xl text-gray-800 mb-4 leading-tight group-hover:text-gray-900 transition-colors duration-300`}
                >
                  {point.title}
                </h3>

                {/* Description */}
                <p
                  className={`${andika.className} text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300`}
                >
                  {point.description}
                </p>

                {/* Decorative Element */}
                <motion.div
                  className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${point.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                />
              </div>

              {/* Card Number */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                <span
                  className={`${andika.className} text-sm font-bold text-gray-700`}
                >
                  {point.id}
                </span>
              </div>

              {/* Hover Border Effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${point.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                  WebkitMaskImage:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* Highlight Box */}
          <div className="relative inline-block">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Content box */}
            <div className="relative bg-white/90 backdrop-blur-md border-2 border-white/50 rounded-2xl p-8 md:p-10 shadow-2xl max-w-3xl">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="font-dingdong text-2xl md:text-3xl text-gray-800 mb-4">
                  If any of the above statements apply to you...
                </h3>

                <p
                  className={`${andika.className} text-lg md:text-xl text-gray-700 mb-6 leading-relaxed`}
                >
                  <span className="font-bold text-pink-600">
                    This workshop is designed specifically for you!
                  </span>
                  <br />
                  Join thousands of parents who have already transformed their
                  child's reading journey.
                </p>

                {/* CTA Button */}
                <div className="relative inline-block">
                  <motion.a
                    href="/checkout"
                    className="inline-block bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white font-dingdong text-xl px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px -10px rgba(236, 72, 153, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reserve Your Spot Now - ₹299
                  </motion.a>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-pink-800 text-xs font-bold rounded-full px-2 py-1 transform rotate-12">
                    70% OFF
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="rgba(255, 255, 255, 0.1)"
            animate={{
              d: [
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                "M321.39,76.44c58-10.79,114.16-10.13,172-21.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,51,906.67,52,985.66,72.83c70.05,18.48,146.53,46.09,214.34,23V0H0V47.35A600.21,600.21,0,0,0,321.39,76.44Z",
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </section>
  );
};
