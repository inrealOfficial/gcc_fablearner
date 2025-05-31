import { motion } from "framer-motion";
export const CtaMobileOnly = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-[9999] md:hidden">
        {/* Animated glow effect */}
        <motion.div
          className="absolute -inset-3 bg-yellow-300/70 rounded-full blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.a
          href="/checkout"
          className="relative block bg-white text-pink-700 font-dingdong text-lg px-6 py-4 rounded-full shadow-xl text-center w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          Reserve Your Spot - Rs.499
          <div className="absolute -top-3 -right-3 bg-yellow-400 text-pink-800 text-xs font-bold rounded-full px-4 py-1 transform rotate-12">
            70% OFF
          </div>
        </motion.a>
      </div>
    </>
  );
};
