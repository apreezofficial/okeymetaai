import { useEffect, useState } from 'react';

export default function BackgroundDots() {
  const [dots, setDots] = useState<any[]>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 4 + Math.random() * 6, // 4–10px
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4, // 4–8s
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes float {
            0%   { transform: translateY(0px); }
            50%  { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute bg-primary rounded-full blur-sm"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            animation: `float ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
