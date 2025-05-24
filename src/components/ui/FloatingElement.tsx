"use client";

type FloatingElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
};

export const FloatingElement = ({
  children,
  className,
  delay = 0,
  amplitude = 10,
}: FloatingElementProps) => {
  return (
    <div
      className={`absolute animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
        transform: `translateY(${amplitude}px)`,
      }}
    >
      {children}
    </div>
  );
};
