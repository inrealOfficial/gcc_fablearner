import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Andika } from "next/font/google";
import Image from "next/image";
import { wrap } from "popmotion";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

// Move students array outside the component
const students = [
  {
    name: "TRINESH",
    videoUrl: "https://player.vimeo.com/video/1060445446?h=70d3c8cea3",
    imageUrl: "results/TRINESH.png",
  },
  {
    name: "NIKITA",
    videoUrl: "https://player.vimeo.com/video/914827236",
    imageUrl: "results/NIKITA.png",
  },
  {
    name: "DHANYA",
    videoUrl: "https://player.vimeo.com/video/914830394",
    imageUrl: "results/DHANYA.png",
  },
  {
    name: "ARCHANA",
    videoUrl: "https://player.vimeo.com/video/1060441426",
    imageUrl: "results/Archana.png",
  },
  {
    name: "PREETHI",
    videoUrl: "https://player.vimeo.com/video/1060444439?h=b4d0746a73",
    imageUrl: "results/PREETHI.png",
  },
  {
    name: "RIDDHI",
    videoUrl: "https://player.vimeo.com/video/1060445247",
    imageUrl: "results/RIDDHI.png",
  },
  {
    name: "AKSHARA",
    videoUrl: "https://player.vimeo.com/video/914828920",
    imageUrl: "results/AKSHARA.png",
  },
  {
    name: "HUSSNAIN",
    videoUrl: "https://player.vimeo.com/video/914830394",
    imageUrl: "results/HUSSNAIN.png",
  },
  {
    name: "PRIYANSH",
    videoUrl: "https://player.vimeo.com/video/914828006",
    imageUrl: "/PRIYANSH.png",
  },
];

export const ResultsSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  const videoIndex = wrap(0, students.length, page);

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

  const getVideoUrl = (baseUrl: string, isPlaying: boolean) => {
    if (baseUrl.includes("1060445446")) {
      // Special handling for Trinesh's video
      return `https://player.vimeo.com/video/1060445446?h=70d3c8cea3&autoplay=${
        isPlaying ? 1 : 0
      }&controls=1&background=0`;
    }
    if (baseUrl.includes("1060444439")) {
      // Special handling for Preethi's video
      return `https://player.vimeo.com/video/1060444439?h=b4d0746a73&autoplay=${
        isPlaying ? 1 : 0
      }&controls=1&background=0`;
    }
    // Default handling for other videos
    const url = baseUrl.split("?")[0]; // Remove any existing parameters
    return `${url}?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1&autoplay=${
      isPlaying ? 1 : 0
    }#t=`;
  };

  const handleVideoPlay = (studentName: string) => {
    setActiveVideo(studentName);
  };

  const handleVideoStop = (studentName: string) => {
    setActiveVideo(null);
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Update the slideVariants object
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

  const getVisibleStudents = () => {
    if (isMobile) {
      return [students[videoIndex]];
    }
    return [0, 1, 2].map(
      (offset) => students[(videoIndex + offset) % students.length]
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
            REAL CHILDREN, REAL RESULTS
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
            (here's the proof)
          </motion.p>
        </motion.div>

        {/* Video Slideshow */}
        <div className="relative mt-16">
          {/* Added overflow-hidden to contain buttons */}
          <div className="relative max-w-7xl mx-auto px-8 md:px-20 overflow-hidden">
            {/* Previous Button - Updated positioning and styling */}
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

            {/* Videos Grid */}
            <motion.div
              className={`grid ${
                isMobile ? "grid-cols-1" : "grid-cols-3"
              } gap-4 md:gap-8 w-full`}
              initial={false}
              animate="center"
              variants={slideVariants}
              custom={direction}
            >
              {getVisibleStudents().map((student, offset) => (
                <motion.div
                  key={student.name}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: offset * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="aspect-video relative">
                      {activeVideo === student.name ? (
                        <>
                          <iframe
                            src={getVideoUrl(student.videoUrl, true)}
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            loading="lazy"
                            title={`${student.name}'s Reading Journey`}
                            allowFullScreen
                          />
                          <motion.button
                            className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 shadow-lg"
                            onClick={() => handleVideoStop(student.name)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg
                              className="w-6 h-6 text-pink-600"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M6 6h12v12H6z" />
                            </svg>
                          </motion.button>
                        </>
                      ) : (
                        <div
                          className="group cursor-pointer"
                          onClick={() => handleVideoPlay(student.name)}
                        >
                          <img
                            src={student.imageUrl}
                            alt={`${student.name}'s Story`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                            loading={offset === 0 ? "eager" : "lazy"}
                            priority={offset === 0}
                          />
                          <motion.div
                            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            whileHover={{ opacity: 1 }}
                          >
                            <motion.div
                              className="bg-white/90 rounded-full p-4 shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg
                                className="w-6 h-6 text-pink-600"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </motion.div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3
                        className={`${andika.className} text-lg font-semibold text-pink-700 text-center`}
                      >
                        {student.name}'s Reading Journey
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Next Button - Updated positioning and styling */}
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
