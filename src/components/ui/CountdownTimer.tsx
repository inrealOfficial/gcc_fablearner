"use client";

import { useState, useEffect } from "react";

type CountdownTimerProps = {
  targetDate: Date;
  render: (time: {
    days: number;
    hours: number;
    minutes: number;
  }) => React.ReactNode;
};

export const CountdownTimer = ({ targetDate, render }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return render(timeLeft);
};
