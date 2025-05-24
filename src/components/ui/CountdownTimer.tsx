"use client";

import { useState, useEffect } from "react";

type CountdownTimerProps = {
  targetDate: string;
};

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = new Date(targetDate).getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col">
          <div className="bg-gradient-to-b from-purple-500 to-purple-700 rounded-lg p-4 w-16 h-16 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{value}</span>
          </div>
          <span className="text-xs mt-2 uppercase tracking-wider">{unit}</span>
        </div>
      ))}
    </div>
  );
};
