
import React, { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="w-8 h-8 text-malika-bright-blue animate-heartbeat" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-malika-gold to-malika-light-gold bg-clip-text text-transparent">
              One Day, Our Memories Will Fill This Space
            </h2>
            <Heart className="w-8 h-8 text-malika-accent-purple animate-heartbeat" />
          </div>
          <div className={`space-y-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="font-playfair text-xl text-malika-blue mb-4 italic">
              Soon, this will be full of our moments... 📸💕
            </p>
            <p className="font-playfair text-lg text-malika-ocean italic max-w-2xl mx-auto leading-relaxed">
              I can't wait to create beautiful memories with you, one smile, one adventure, one moment at a time. Here's where it begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
