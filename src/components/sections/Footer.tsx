import { motion } from "framer-motion";
import Image from "next/image";
import { Andika } from "next/font/google";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

export const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer 
      className="relative py-20 px-4 overflow-hidden"
      style={{ backgroundColor: "rgba(218, 38, 83, 0.8)" }}
    >
      {/* Background Elements */}
      <motion.div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full 
            bg-pink-500/30 filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full 
            bg-purple-500/30 filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with updated fonts */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="inline-block mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4"
            variants={itemVariants}
          >
            <Image
              src="https://fablearner.com/wp-content/uploads/2025/05/logo.png"
              alt="Fablearner Logo"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </motion.div>
          <motion.h3 
            className="font-dingdong text-2xl md:text-3xl text-white leading-tight"
            variants={itemVariants}
          >
            The #1 Family-Centred Ed-Tech Provider in India
          </motion.h3>
        </motion.div>

        {/* Grid Section with updated fonts */}
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 ${andika.className}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* About Us */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6 text-white/90">About Us</h4>
            <ul className="space-y-3">
              {["Who We Are", "FAB Masterclass", "Testimonials", "Refund Policy"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="inline-flex items-center group">
                    <span className="w-6 h-px bg-white/30 group-hover:w-8 group-hover:bg-white/50 
                      transition-all duration-300 mr-3"/>
                    <span className="text-white/80 group-hover:text-white font-medium transition-colors duration-300">
                      {item}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6 text-white/90">Quick Links</h4>
            <ul className="space-y-3">
              {["FAQs", "Contact Us"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="inline-flex items-center group">
                    <span className="w-6 h-px bg-white/30 group-hover:w-8 group-hover:bg-white/50 
                      transition-all duration-300 mr-3"/>
                    <span className="text-white/80 group-hover:text-white font-medium transition-colors duration-300">
                      {item}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6 text-white/90">Contact</h4>
            <motion.address 
              className={`not-italic space-y-2 text-white/80 ${andika.className}`}
              whileHover={{ scale: 1.02 }}
            >
              <p>B5 Sheetal Apartment,</p>
              <p>New Hall Road Kurla (West),</p>
              <p>Mumbai, 400070,</p>
              <p>India</p>
            </motion.address>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className={`pt-8 border-t border-white/20 text-center ${andika.className}`}
          variants={itemVariants}
        >
          <p className="text-sm text-white/70">
            © 2025 FAB Learning. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};