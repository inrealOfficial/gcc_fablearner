"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Andika } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { nanoid } from "nanoid";
import CryptoJS from "crypto-js";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

// Add this animation variant
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// First, add these animation variants at the top of your file after the fadeInUp variant
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

// Add the countries list constant
const COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CD", name: "Congo, Democratic Republic of the" },
  { code: "CG", name: "Congo, Republic of the" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Curaçao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea, Democratic People's Republic of" },
  { code: "KR", name: "Korea, Republic of" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia (Federated States of)" },
  { code: "MD", name: "Moldova (Republic of)" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin (French part)" },
  { code: "SX", name: "Saint Martin (Dutch part)" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan, Province of China" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "VI", name: "United States Virgin Islands" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Viet Nam" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

// Add this function outside your component
const detectCountry = async () => {
  try {
    const response = await fetch(
      "https://api.ipapi.com/api/check?access_key=YOUR_API_KEY"
    );
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.error("Error detecting country:", error);
    return "US"; // Default to US if detection fails
  }
};

// PayU configuration
const PAYU_CONFIG = {
  key: process.env.NEXT_PUBLIC_PAYU_KEY || "",
  salt: process.env.NEXT_PUBLIC_PAYU_SALT || "",
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://secure.payu.in"
      : "https://test.payu.in",
};

// Add this type for payment data
type PaymentData = {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
};

// Add these helper functions
const generateTxnId = () => `FAB-${nanoid(8)}`;

const generateHash = (data: PaymentData) => {
  const hashString = `${PAYU_CONFIG.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${PAYU_CONFIG.salt}`;
  return CryptoJS.SHA512(hashString).toString();
};

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "United States (US)",
    couponCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add this effect for country detection
  const detectCountry = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return data.country_code;
    } catch (error) {
      console.error("Country detection failed:", error);
      return "US";
    }
  };

  useEffect(() => {
    const setInitialCountry = async () => {
      const detectedCountry = await detectCountry();
      const country = COUNTRIES.find((c) => c.code === detectedCountry);
      if (country) {
        setFormData((prev) => ({ ...prev, country: country.code }));
      }
    };
    setInitialCountry();
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsProcessing(true);

      // Form validation
      if (!formData.email || !formData.firstName || !formData.phone) {
        alert("Please fill in all required fields");
        setIsProcessing(false);
        return;
      }

      // Prepare payment data
      const paymentData: PaymentData = {
        key: PAYU_CONFIG.key,
        txnid: generateTxnId(),
        amount: "500.00",
        productinfo: "FAB MASTERCLASS",
        firstname: formData.firstName,
        lastname: formData.lastName || "",
        email: formData.email,
        phone: formData.phone,
        surl: `${window.location.origin}/payment/success`,
        furl: `${window.location.origin}/payment/failure`,
      };

      // Generate hash
      const hash = generateHash(paymentData);

      // Create and submit form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = `${PAYU_CONFIG.baseURL}/_payment`;
      form.style.display = "none";

      // Add all fields to form
      const allData = { ...paymentData, hash };
      Object.entries(allData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initialization failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`${andika.variable} min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50`}
    >
      {/* Header with Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 shadow-md py-3"
            : "bg-gradient-to-r from-pink-600 to-purple-600 py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="https://fablearner.com/wp-content/uploads/2025/05/logo.png"
              alt="Fablearner Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {["Our Method", "Results", "FAQ", "Success Stories"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-${
                  scrolled ? "gray-700" : "white"
                } hover:text-${scrolled ? "pink-600" : "white/80"}`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={scrolled ? "text-pink-700" : "text-white"}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute w-full bg-white/95 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center py-4 gap-4">
                {["Our Method", "Results", "FAQ", "Success Stories"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`/#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`${andika.className} text-pink-700 font-medium w-full text-center py-3 hover:bg-pink-50`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Add margin-top to main content to account for fixed header */}
      <main className="pt-24 max-w-3xl mx-auto py-8 px-4">
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 relative overflow-hidden"
          variants={fadeInUp}
        >
          {/* Decorative Background Gradients */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-50 to-purple-50 
            opacity-20 rounded-full blur-3xl -translate-y-48 translate-x-48 rotate-12"
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-cyan-50 
            opacity-20 rounded-full blur-3xl translate-y-48 -translate-x-48 -rotate-12"
          />

          {/* Content Container */}
          <div className="relative space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-3">
              <motion.h1
                className="font-dingdong text-3xl bg-gradient-to-r from-pink-600 to-purple-600 
                  bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Complete Your Purchase
              </motion.h1>
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
              />
            </div>

            {/* Course Summary Card */}
            <motion.div
              className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-2xl p-6 border-2 
              border-gray-100 group hover:border-pink-100 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white shadow-lg flex items-center justify-center">
                    <motion.span
                      className="text-3xl"
                      animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      📚
                    </motion.span>
                  </div>
                  <div>
                    <h2
                      className={`${andika.className} text-xl font-bold text-gray-800`}
                    >
                      FAB MASTERCLASS
                    </h2>
                    <p className="font-dingdong text-gray-500">
                      Lifetime Access
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p
                    className={`${andika.className} text-2xl font-bold text-pink-600`}
                  >
                    ₹500.00
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Customer Information */}
              <div className="space-y-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100">
                <h3
                  className={`${andika.className} text-lg font-bold text-gray-800`}
                >
                  Customer Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                    >
                      Email Address <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                        focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-all"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                      >
                        First name <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-all"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                      >
                        Last name <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-all"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                      >
                        Country <span className="text-pink-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                            focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-all appearance-none"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select country</option>
                          {COUNTRIES.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <ReactCountryFlag
                            countryCode={formData.country || "IN"}
                            style={{ fontSize: "1.2em", opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        className={`${andika.className} block text-sm font-medium text-gray-700 mb-1`}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
                          focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-all"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div
                className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-pink-50/30 to-purple-50/30 
                border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`${andika.className} text-lg font-bold text-gray-800`}
                    >
                      Payment Method
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Secure payment via PayU
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://fablearner.com/wp-content/plugins/payu-india/images/payubizlogo.png"
                      alt="PayU Secure"
                      width={60}
                      height={60}
                      className="h-12 w-auto"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6 rounded-2xl bg-gray-50 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹500.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-pink-600">₹500.00</span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                className={`${andika.className} w-full bg-gradient-to-r from-pink-500 to-purple-500 
                  text-white py-4 px-6 rounded-xl font-bold text-lg relative overflow-hidden group
                  shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all
                  disabled:opacity-70 disabled:cursor-not-allowed`}
                onClick={handlePayment}
                disabled={isProcessing}
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                <span className="relative z-10">
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Proceed to Payment"
                  )}
                </span>
              </motion.button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure Payment via PayU
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Trust Badges Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                Our Guarantees
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-4" />
          </motion.div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Money Back Guarantee Card */}
            <motion.div
              className="group h-[400px] relative rounded-3xl border border-gray-100 p-8 bg-white 
                shadow-[0_0_50px_0_rgba(0,0,0,0.1)] transition-all duration-300
                hover:shadow-[0_0_80px_0_rgba(236,72,153,0.1)]"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon Container */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="bg-gradient-to-br from-pink-500 to-purple-500 p-5 rounded-2xl
                    shadow-xl shadow-pink-500/20"
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.8 },
                  }}
                >
                  <Image
                    src="https://fablearner.com/wp-content/uploads/2025/01/fab-guarantee-money-back-100-600-px-1.png"
                    alt="Money Back Guarantee"
                    width={60}
                    height={60}
                    className="w-14 h-14"
                    unoptimized
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="pt-12 text-center h-full flex flex-col items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    100% Money-Back Guarantee
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We're so confident in the FAB Masterclass that we offer a
                    100% money-back guarantee. With a 5-star rating from over
                    9,000 parents, we're certain you'll love it.
                  </p>
                </div>
                <motion.div
                  className="w-full max-w-[240px] h-1 bg-gradient-to-r from-pink-200 to-purple-200 
                    rounded-full mt-8 group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300"
                  whileHover={{ scaleX: 1.1 }}
                />
              </div>
            </motion.div>

            {/* Privacy & Security Card */}
            <motion.div
              className="group h-[400px] relative rounded-3xl border border-gray-100 p-8 bg-white 
                shadow-[0_0_50px_0_rgba(0,0,0,0.1)] transition-all duration-300
                hover:shadow-[0_0_80px_0_rgba(56,189,248,0.1)]"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Icon Container */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="bg-gradient-to-br from-cyan-500 to-blue-500 p-5 rounded-2xl
                    shadow-xl shadow-blue-500/20"
                  whileHover={{
                    rotate: -360,
                    scale: 1.1,
                    transition: { duration: 0.8 },
                  }}
                >
                  <Image
                    src="https://fablearner.com/wp-content/uploads/2025/01/fab-encrypted-secure-payment-seal-600-px-1.png"
                    alt="Security Badge"
                    width={60}
                    height={60}
                    className="w-14 h-14"
                    unoptimized
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="pt-12 text-center h-full flex flex-col items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Privacy & Security
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We will not share or trade online information that you
                    provide us. All personal information you submit is encrypted
                    and secure.
                  </p>
                </div>
                <motion.div
                  className="w-full max-w-[240px] h-1 bg-gradient-to-r from-cyan-200 to-blue-200 
                    rounded-full mt-8 group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300"
                  whileHover={{ scaleX: 1.1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <footer
        className="relative py-32 px-4 overflow-hidden mt-16"
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
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="inline-block mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Image
                src="https://fablearner.com/wp-content/uploads/2025/05/logo.png"
                alt="Fablearner Logo"
                width={200}
                height={50}
                className="h-12 w-auto"
                priority
                unoptimized
              />
            </motion.div>
            <motion.h3 className="font-dingdong text-2xl md:text-3xl text-white leading-tight">
              The #1 Family-Centred Ed-Tech Provider in India
            </motion.h3>
          </motion.div>

          {/* Grid Section */}
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
                {[
                  "Who We Are",
                  "FAB Masterclass",
                  "Testimonials",
                  "Refund Policy",
                ].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="inline-flex items-center group">
                      <span
                        className="w-6 h-px bg-white/30 group-hover:w-8 group-hover:bg-white/50 
                        transition-all duration-300 mr-3"
                      />
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
              <h4 className="text-xl font-bold mb-6 text-white/90">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {["FAQs", "Contact Us"].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href="#" className="inline-flex items-center group">
                      <span
                        className="w-6 h-px bg-white/30 group-hover:w-8 group-hover:bg-white/50 
                        transition-all duration-300 mr-3"
                      />
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
    </div>
  );
}
