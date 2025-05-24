type ScribbleEffectProps = {
  className?: string;
};

export const ScribbleEffect = ({ className }: ScribbleEffectProps) => {
  return (
    <svg
      className={`absolute ${className}`}
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
    >
      <path
        d="M10,30 Q30,5 50,30 T90,30"
        stroke="#FFD166"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="animate-draw"
      />
    </svg>
  );
};
