
import React, { useEffect, useState } from 'react';

const ConfettiAnimation = () => {
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    color: string;
    left: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const colors = [
      '#7495BA', // malika-blue
      '#A7C7E7', // malika-sky-blue  
      '#3C91C4', // malika-bright-blue
      '#D6EAF8', // malika-light-blue
      '#AECFE8', // malika-powder-blue
      '#C3DFF3', // malika-soft-blue
    ];

    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));

    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;
