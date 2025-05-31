
import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let nextBirthday = new Date(currentYear, 5, 19); // June 19 (month is 0-indexed)
      
      // If birthday has passed this year, calculate for next year
      if (now > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, 5, 19);
      }
      
      const difference = nextBirthday.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days, color: 'malika-burgundy' },
    { label: 'Hours', value: timeLeft.hours, color: 'malika-purple' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'malika-pink' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'malika-gold' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-malika-cream/20 to-malika-pink/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Calendar className="w-8 h-8 text-malika-purple" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-malika-dark">
            Until Your Next Birthday
          </h2>
          <Clock className="w-8 h-8 text-malika-purple" />
        </div>
        
        <p className="font-crimson text-xl text-malika-gray mb-12">
          Every moment until I can celebrate you again ✨
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {timeBlocks.map((block, index) => (
            <div
              key={block.label}
              className="glass-effect p-6 rounded-lg shadow-lg animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`font-playfair text-4xl md:text-5xl font-bold text-${block.color} mb-2`}>
                {block.value.toString().padStart(2, '0')}
              </div>
              <div className="font-crimson text-lg text-malika-gray">
                {block.label}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 font-dancing text-2xl text-malika-purple">
          🎂 June 19th can't come soon enough! 🎂
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
