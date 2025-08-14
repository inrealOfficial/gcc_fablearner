import { AnimatePresence, motion } from "framer-motion";
import { Andika } from "next/font/google";
import { useEffect, useState } from "react";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export const CtaMobileOnly = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Show after scrolling 100px, hide when near bottom
      const showButton =
        currentScrollY > 100 &&
        currentScrollY <
          document.documentElement.scrollHeight - window.innerHeight - 200;

      setIsVisible(showButton);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 left-4 right-4 z-[9999] md:hidden">
          <div className="relative">
            {/* Elegant Floating Arrow */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                {/* Simplified elegant arrow */}
                <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] border border-white/50">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-pink-600"
                  >
                    <path
                      d="M12 5L12 19M12 19L18 13M12 19L6 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Subtle pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-pink-500/20"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Elegant Button Container */}
            <motion.div
              className="relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Glass morphism background */}
              <div className="absolute inset-0 rounded-3xl" />

              {/* Subtle outer glow */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-sm"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.a
                href="/checkout"
                className="relative block bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 text-white font-dingdong text-lg px-6 py-4 rounded-3xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] text-center w-full overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Button content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="font-bold">
                      Reserve Your Spot - 19.99 USD
                    </span>
                  </div>

                  {/* Subtle subtitle */}
                  <div
                    className={`${andika.className} text-white/90 text-xs font-medium`}
                  >
                    Join 10,000+ Parents Today
                  </div>
                </div>

                {/* Elegant discount badge */}
                <motion.div
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 text-xs font-bold rounded-full px-3 py-1.5 shadow-lg border border-white/30"
                  animate={{
                    rotate: [8, 12, 8],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  70% OFF
                </motion.div>

                {/* Elegant shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{
                    x: [-100, 400],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                />

                {/* Inner border highlight */}
                <div className="absolute inset-0.5 rounded-3xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
              </motion.a>

              {/* Elegant Money-back Guarantee */}
              <motion.div
                className="text-center mt-4 px-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-sm border border-white/50">
                  <motion.p
                    className={`${andika.className} text-gray-700 text-sm font-semibold flex items-center justify-center gap-2`}
                    animate={{
                      scale: [1, 1.01, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-green-500 text-base">🛡️</span>
                    <span>100% Money-Back Guarantee</span>
                    <span className="text-green-500">✓</span>
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {/* Minimal floating elements */}
            <motion.div
              className="absolute -top-4 -left-1 text-lg opacity-60"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>

            <motion.div
              className="absolute -top-2 -right-1 text-sm opacity-60"
              animate={{
                y: [0, -6, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              ⭐
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};