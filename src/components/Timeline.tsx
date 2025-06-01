
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Heart, Star, Gift } from 'lucide-react';

const timelineEvents = [
  {
    date: "Jan 15, 2023",
    title: "Love at First Sight",
    description: "The first time I saw you — I instantly fell in love.",
    icon: Heart,
    color: "malika-ocean",
    bgColor: "#AECFE8"
  },
  {
    date: "Oct 29, 2023",
    title: "Our First Collaboration",
    description: "We met and presented a philosophy class together.",
    icon: Star,
    color: "malika-blue",
    bgColor: "#F1C87C"
  },
  {
    date: "Feb 2, 2024",
    title: "A Mistake Made",
    description: "I made a mistake...",
    icon: Calendar,
    color: "malika-gray",
    bgColor: "#D2B8F2"
  },
  {
    date: "Mar 2, 2024",
    title: "Love Deeper Than Before",
    description: "I corrected it — and fell in love even deeper.",
    icon: Heart,
    color: "malika-bright-blue",
    bgColor: "#AECFE8"
  },
  {
    date: "Jun 19, 2024",
    title: "Promise Made",
    description: "I missed your first birthday with me... never again.",
    icon: Gift,
    color: "malika-gold",
    bgColor: "#F1C87C"
  },
  {
    date: "Jun 19, 2025",
    title: "Your Birthday Today",
    description: "Your birthday today — the reason this page exists. I hope this surprise makes you smile.",
    icon: Heart,
    color: "malika-sky-blue",
    bgColor: "#D2B8F2"
  }
];

const Timeline = () => {
  const [visibleEvents, setVisibleEvents] = useState<number[]>([]);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = eventRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleEvents(prev => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });

    // Timeline animation observer for mobile
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;
            
            // Calculate how much of the timeline is visible
            const visibleHeight = Math.min(windowHeight - elementTop, elementHeight);
            const progress = Math.max(0, Math.min(1, visibleHeight / elementHeight));
            setTimelineProgress(progress);
          }
        });
      },
      { threshold: 0 }
    );

    if (timelineRef.current) {
      timelineObserver.observe(timelineRef.current);
    }

    return () => {
      observers.forEach(observer => observer?.disconnect());
      timelineObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-malika-light-blue/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-malika-dark">
          Our Beautiful Journey
        </h2>
        
        <div ref={timelineRef} className="relative">
          {/* Desktop Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-malika-blue to-malika-bright-blue hidden md:block"></div>
          
          {/* Mobile Timeline line with animation */}
          <div className="absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-malika-blue/20 to-malika-bright-blue/20 md:hidden"></div>
          <div 
            className="absolute left-6 top-0 w-1 bg-gradient-to-b from-malika-blue to-malika-bright-blue shadow-lg md:hidden transition-all duration-1000 ease-out"
            style={{ 
              height: `${timelineProgress * 100}%`,
              boxShadow: '0 0 8px rgba(60, 145, 196, 0.5)'
            }}
          ></div>
          
          {timelineEvents.map((event, index) => {
            const IconComponent = event.icon;
            const isEven = index % 2 === 0;
            const isVisible = visibleEvents.includes(index);
            
            return (
              <div 
                key={index} 
                ref={el => eventRefs.current[index] = el}
                className={`relative flex flex-col md:flex-row items-center mb-8 md:mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} mb-4 md:mb-0 ${index === 0 ? 'ml-16 md:ml-0' : 'ml-16 md:ml-0'}`}>
                  <div 
                    className={`glass-effect p-4 md:p-6 rounded-lg shadow-lg transition-all duration-500 timeline-card ${
                      isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{ 
                      animationDelay: `${index * 0.2}s`,
                      transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
                    }}
                  >
                    <div className="font-dancing text-base md:text-lg text-malika-blue mb-2 transition-colors duration-300">
                      {event.date}
                    </div>
                    <h3 className="font-playfair text-lg md:text-xl font-semibold text-malika-dark mb-2 transition-colors duration-300 leading-tight">
                      {event.title}
                    </h3>
                    <p className="font-playfair text-sm md:text-base text-malika-gray transition-colors duration-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
                
                {/* Icon with perfect centering */}
                <div 
                  className="absolute w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-4 border-white transition-all duration-300 z-10 animate-pulse-gentle"
                  style={{ 
                    background: `linear-gradient(135deg, ${event.bgColor}, ${event.bgColor}dd)`,
                    left: '1.5rem',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <IconComponent className={`w-6 h-6 text-white drop-shadow-sm`} />
                </div>
                
                {/* Desktop icon positioning */}
                <div 
                  className="hidden md:block absolute w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-4 border-white transition-all duration-300 z-10 animate-pulse-gentle left-1/2 transform -translate-x-1/2"
                  style={{ 
                    background: `linear-gradient(135deg, ${event.bgColor}, ${event.bgColor}dd)`,
                  }}
                >
                  <IconComponent className={`w-6 h-6 text-white drop-shadow-sm`} />
                </div>
                
                {/* Empty space for the other side - only on desktop */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
