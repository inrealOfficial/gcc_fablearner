"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Andika } from "next/font/google";
import { wrap } from "popmotion";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

// List all book images here (relative to /public)
const bookImages = [
  "Book Pics/photo_6055225467667067008_y.jpg",
  "Book Pics/photo_6059609740218053212_y.jpg",
  "Book Pics/photo_6061861540031737505_y.jpg",
  "Book Pics/photo_6064461189246726076_y.jpg",
  "Book Pics/photo_6075578999855230911_y.jpg",
  "Book Pics/photo_6087174720064696300_y.jpg",
  "Book Pics/photo_6095782641979731878_y.jpg",
  "Book Pics/photo_6095782641979731879_y.jpg",
  "Book Pics/photo_6100286241607102502_y.jpg",
  "Book Pics/photo_6100286241607102566_y.jpg",
  "Book Pics/photo_6102567522076307246_y.jpg",
  "Book Pics/photo_6116008042408555971_y.jpg",
  "Book Pics/photo_6116008042408555972_y.jpg",
  "Book Pics/photo_6116008042408556027_y.jpg",
  "Book Pics/photo_6116008042408556028_y.jpg",
  // ...add more if needed
];

export const FabReaderResultsSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [[page, direction], setPage] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  const imageIndex = wrap(0, bookImages.length, page);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Animation variants for sliding images
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const getVisibleImages = () => {
    if (isMobile) {
      return [bookImages[imageIndex]];
    }
    return [0, 1, 2].map(
      (offset) => bookImages[(imageIndex + offset) % bookImages.length]
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-4 bg-white overflow-hidden"
      id={id}
    >
      {/* SVG Background Pattern with Parallax */}
      <motion.div className="absolute inset-0 z-0 opacity-5" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/bg.svg')",
            backgroundSize: "110% 110%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-pink-100 filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-yellow-50 filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Floating Reading Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["📚", "🎯", "⭐", "📖", "🎨", "✨"].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${10 + ((i * 20) % 80)}%`,
              top: `${5 + ((i * 15) % 90)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with animated underline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 className="inline-block relative text-4xl md:text-5xl font-bold mb-4 font-dingdong text-pink-600">
            FABREADER SUCCESS STORIES
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-pink-600"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.h2>
          <motion.p
            className={`${andika.className} text-xl text-gray-600 mt-4`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Real kids reading with confidence using FabReader
          </motion.p>
        </motion.div>

        {/* Image Slideshow */}
        <div className="relative mt-16">
          <div className="relative max-w-7xl mx-auto px-8 md:px-20 overflow-hidden">
            {/* Previous Button */}
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
                bg-white rounded-full p-3 
                shadow-lg text-pink-600 hover:text-purple-600
                hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.3)]
                transition-all duration-300
                flex items-center justify-center
                w-10 h-10 md:w-12 md:h-12
                transform-gpu"
              onClick={(e) => {
                e.preventDefault();
                paginate(-1);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </motion.button>

            {/* Images Grid */}
            <motion.div
              className={`grid ${
                isMobile ? "grid-cols-1" : "grid-cols-3"
              } gap-4 md:gap-8 w-full`}
              initial={false}
              animate="center"
              variants={slideVariants}
              custom={direction}
            >
              {getVisibleImages().map((img, offset) => (
                <motion.div
                  key={img}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: offset * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="aspect-video relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <div className="relative w-full h-96 bg-white flex items-center justify-center">
                        <img
                          src={`/${img}`}
                          alt={`FabReader Book ${imageIndex + offset + 1}`}
                          className="object-contain w-full h-full rounded-2xl shadow-xl border border-pink-100 transition-all duration-300 hover:ring-4 hover:ring-pink-200"
                          loading={offset === 0 ? "eager" : "lazy"}
                          style={{ maxHeight: "100%", maxWidth: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Next Button */}
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
                bg-white rounded-full p-3
                shadow-lg text-pink-600 hover:text-purple-600
                hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.3)]
                transition-all duration-300
                flex items-center justify-center
                w-10 h-10 md:w-12 md:h-12
                transform-gpu"
              onClick={(e) => {
                e.preventDefault();
                paginate(1);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
