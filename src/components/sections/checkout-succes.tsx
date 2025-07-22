"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const CheckoutSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const addUser = async () => {
      if (!sessionId) {
        setError("Missing session_id");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/users/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to add user");
        } else {
          setSuccess(true);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    addUser();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 px-4">
        <div className="text-center">Processing your payment...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 px-4">
        <div className="text-center text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 px-4">
      <motion.div
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-yellow-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-4">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="drop-shadow-lg"
          >
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="#D1FAE5"
              stroke="#10B981"
              strokeWidth="4"
            />
            <path
              d="M20 32L28 40L42 24"
              stroke="#10B981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="font-dingdong text-3xl md:text-4xl text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-green-800 mb-4">
          Thank you for your purchase. Your spot has been reserved.
        </p>
        <p className="text-gray-700 mb-6">
          Please check your email for confirmation and next steps. If you have
          any questions, contact our support team.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="bg-yellow-300 text-pink-800 font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-400 transition"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
