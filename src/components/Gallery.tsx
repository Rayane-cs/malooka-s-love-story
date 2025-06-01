
import React, { useEffect, useRef, useState } from 'react';
import { Camera, Heart } from 'lucide-react';

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
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Camera className="w-8 h-8 text-malika-accent-purple" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-malika-gold to-malika-light-gold bg-clip-text text-transparent">
              One Day, Our Memories Will Fill This Space
            </h2>
            <Heart className="w-8 h-8 text-malika-bright-blue animate-heartbeat" />
          </div>
          <div className={`space-y-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="font-crimson text-xl text-malika-gray mb-4">
              Soon, this will be full of our moments... 📸💕
            </p>
            <p className="font-crimson text-lg text-malika-blue italic max-w-2xl mx-auto">
              I can't wait to create beautiful memories with you, one smile, one adventure, one moment at a time. Here's where it begins.
            </p>
          </div>
        </div>
        
        {/* Empty space for future photos with gentle grid layout */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px] transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Placeholder grid items for spacing */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg border-2 border-dashed border-malika-light-blue/30 bg-malika-light-blue/10 flex items-center justify-center transition-all duration-300 hover:border-malika-gold/50 hover:bg-malika-gold/5"
            >
              <div className="text-center opacity-40">
                <Camera className="w-12 h-12 text-malika-blue mx-auto mb-2" />
                <p className="font-crimson text-sm text-malika-gray">
                  Future memory #{index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
