import { useEffect, useState } from 'react';

interface Dot {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function BackgroundDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Calculate the number of dots based on screen size
  const calculateDotsCount = () => {
    const area = dimensions.width * dimensions.height;
    return Math.min(Math.max(Math.floor(area / 5000), 30), 150); // Between 30 and 150 dots
  };

  // Generate dots with random properties
  const generateDots = () => {
    const count = calculateDotsCount();
    const newDots = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 2 + Math.random() * 6, // 2–8px
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 5, // 3–8s
      opacity: 0.05 + Math.random() * 0.2, // 0.05–0.25
    }));
    setDots(newDots);
  };

  // Handle resize and initial setup
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);
    generateDots();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Regenerate dots when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      generateDots();
    }
  }, [dimensions]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-15px) translateX(5px); }
            50% { transform: translateY(5px) translateX(-10px); }
            75% { transform: translateY(-10px) translateX(10px); }
          }
          
          .dot-light {
            background-color: rgba(99, 102, 241, 0.5); /* indigo-500 with opacity */
          }
          
          .dot-dark {
            background-color: rgba(167, 139, 250, 0.5); /* purple-300 with opacity */
          }
        `}
      </style>
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={`absolute rounded-full blur-[1px] dot-light dark:dot-dark`}
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            animation: `float ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
      }
