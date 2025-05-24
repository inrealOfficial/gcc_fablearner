import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Andika } from "next/font/google";
import Image from 'next/image';
import { wrap } from "popmotion";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

interface Testimonial {
  id: number;
  imageUrl: string;
  rating: number;
  childAge: number;
}

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const testimonials = [
    {
      id: 1,
      imageUrl: "https://fablearner.com/wp-content/uploads/2025/02/Group-37297.png",
      rating: 5,
      childAge: 3
    },
    {
      id: 2,
      imageUrl: "https://fablearner.com/wp-content/uploads/2025/02/Group-37295.png",
      rating: 5,
      childAge: 4
    },
    {
      id: 3,
      imageUrl: "https://fablearner.com/wp-content/uploads/2025/02/Group-37294.png",
      rating: 5,
      childAge: 3
    },
    {
      id: 4,
      imageUrl: "https://fablearner.com/wp-content/uploads/2025/02/Group-37293.png",
      rating: 5,
      childAge: 4
    },
    {
      id: 5,
      imageUrl: "https://fablearner.com/wp-content/uploads/2025/02/Group-37292.png",
      rating: 5,
      childAge: 3
    },
    {
      id: 6,
      imageUrl: "https://fablearner.com/wp-content/uploads/2025/02/Group-37290.png",
      rating: 5,
      childAge: 4
    },
    {
      id: 7,
      imageUrl: "https://fablearner.com/wp-content/uploads/2025/02/Group-37288.png",
      rating: 5,
      childAge: 3
    },
    {
      id: 8,
      imageUrl: "https://fablearner.com/wp-content/uploads/2025/02/Group-37289.png",
      rating: 5,
      childAge: 4
    }
  ];

  // Add state for slideshow
  const [[page, direction], setPage] = useState([0, 0]);
  const testimonialIndex = wrap(0, testimonials.length, page);

  // Update slide variants for more elegant animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(8px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(8px)',
    })
  };

  // Calculate visible testimonials (only 3 at a time with smooth transitions)
  const visibleTestimonials = [
    testimonials[wrap(0, testimonials.length, page - 1)],
    testimonials[wrap(0, testimonials.length, page)],
    testimonials[wrap(0, testimonials.length, page + 1)]
  ];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Add this new animation control
  const [[activePage, activeDirection], setActivePage] = useState([0, 0]);

  const slideRight = () => {
    setActivePage([activePage + 1, 1]);
    paginate(1);
  };

  const slideLeft = () => {
    setActivePage([activePage - 1, -1]);
    paginate(-1);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 min-h-screen bg-white overflow-hidden"
    >
      {/* Simplified Background Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,231,243,0.3)_0%,rgba(255,255,255,0)_70%)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Updated Header Background */}
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
              bg-pink-50
              text-pink-600 
              font-semibold 
              text-lg
              tracking-wide 
              rounded-full
              shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)]
            `}>
              Testimonials
            </span>
          </motion.div>

          <h2 className="font-dingdong text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 
            bg-clip-text text-transparent relative inline-block">
            DOES IT REALLY WORK?
          </h2>
        </motion.div>

        {/* Updated Card Styles */}
        <div className="relative mt-16 px-4">
          <div className="relative max-w-6xl mx-auto">
            {/* Updated Navigation Buttons */}
            <motion.button
              className="absolute -left-8 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-5
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] text-pink-600 hover:text-purple-600
                hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.3)] transition-all duration-300"
              onClick={slideLeft}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Updated Testimonials Grid */}
            <motion.div
              className="grid grid-cols-3 gap-8"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.15)]
                    transition-all duration-500">
                    {/* Enhanced Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={testimonial.imageUrl}
                        alt={`Parent Testimonial ${testimonial.id}`}
                        fill
                        priority={index === 1}
                        className="object-cover object-center transform transition-all duration-700
                          group-hover:scale-110 group-hover:rotate-1"
                        sizes="(max-width: 1536px) 33vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Updated Card Content Background */}
                    <div className="p-6 bg-white">
                      {/* Enhanced Rating and Info */}
                      <div className="flex justify-center space-x-1 text-yellow-400 text-xl mb-3">
                        {Array(testimonial.rating).fill("★").map((star, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                          >
                            {star}
                          </motion.span>
                        ))}
                      </div>
                      <p className={`${andika.className} text-center text-base font-medium text-gray-700
                        group-hover:text-pink-600 transition-colors duration-300`}>
                        Parent of a {testimonial.childAge}-year-old
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Next Button */}
            <motion.button
              className="absolute -right-8 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-5
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] text-pink-600 hover:text-purple-600
                hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.3)] transition-all duration-300"
              onClick={slideRight}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Updated Navigation Dots */}
          <div className="flex justify-center items-center space-x-3 mt-12">
            {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index * 3, index * 3 > page ? 1 : -1])}
                className={`
                  h-2 rounded-full transition-all duration-500 
                  ${Math.floor(page / 3) === index 
                    ? 'w-8 bg-pink-500' 
                    : 'w-2 bg-pink-100 hover:bg-pink-200'
                  }
                `}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
