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

    // Mobile timeline animation observer
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;
            
            let progress = 0;
            if (elementTop < windowHeight) {
              const visibleHeight = Math.min(windowHeight - Math.max(elementTop, 0), elementHeight);
              progress = Math.max(0, Math.min(1, visibleHeight / elementHeight));
            }
            setTimelineProgress(progress);
          }
        });
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
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
    <section className="py-14 md:py-20 px-2 md:px-4 bg-gradient-to-b from-transparent to-malika-light-blue/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-malika-dark">
          Our Beautiful Journey
        </h2>
        
        <div ref={timelineRef} className="relative">
          {/* Desktop Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-malika-blue to-malika-bright-blue hidden md:block z-0"></div>
          
          {/* Mobile Timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 h-full bg-gradient-to-b from-malika-blue/20 to-malika-bright-blue/20 md:hidden z-0"></div>
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-malika-blue to-malika-bright-blue md:hidden transition-all duration-1000 ease-out z-0"
            style={{ 
              height: `${timelineProgress * 100}%`,
              boxShadow: '0 0 12px rgba(60, 145, 196, 0.6), 0 0 24px rgba(60, 145, 196, 0.3)'
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
                className="relative mb-8 md:mb-16"
              >
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center">
                  {/* Left card (even indexes) */}
                  {isEven && (
                    <div className="w-5/12 text-right pr-2 md:pr-8">
                      <div 
                        className={`glass-effect p-4 md:p-6 rounded-lg shadow-lg transition-all duration-500 timeline-card ${
                          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}
                        style={{ 
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
                  )}
                  
                  {/* Center Icon */}
                  <div className="relative w-2/12 flex justify-center z-10">
                    <div 
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center border-4 border-white transition-all duration-500 ${
                        isVisible ? 'animate-pulse-gentle scale-100' : 'scale-90 opacity-70'
                      }`}
                      style={{ 
                        background: `linear-gradient(135deg, ${event.bgColor}, ${event.bgColor}dd)`,
                        transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
                      }}
                    >
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-sm" />
                    </div>
                  </div>
                  
                  {/* Right card (odd indexes) */}
                  {!isEven && (
                    <div className="w-5/12 text-left pl-2 md:pl-8">
                      <div 
                        className={`glass-effect p-4 md:p-6 rounded-lg shadow-lg transition-all duration-500 timeline-card ${
                          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}
                        style={{ 
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
                  )}
                  {isEven && <div className="w-5/12"></div>}
                  {!isEven && <div className="w-5/12"></div>}
                </div>
                
                {/* Mobile Layout - Single Column */}
                <div className="md:hidden relative">
                  {/* Center Icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-0 z-10">
                    <div 
                      className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center border-4 border-white transition-all duration-500 ${
                        isVisible ? 'animate-pulse-gentle scale-100' : 'scale-90 opacity-70'
                      }`}
                      style={{ 
                        background: `linear-gradient(135deg, ${event.bgColor}, ${event.bgColor}dd)`,
                        transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
                      }}
                    >
                      <IconComponent className="w-6 h-6 text-white drop-shadow-sm" />
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className="mx-1 pt-12">
                    <div 
                      className={`glass-effect p-4 rounded-lg shadow-lg transition-all duration-500 timeline-card w-full ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                      }`}
                      style={{ 
                        transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
                      }}
                    >
                      <div className="font-dancing text-sm text-malika-blue mb-1 transition-colors duration-300 text-center">
                        {event.date}
                      </div>
                      <h3 className="font-playfair text-base font-semibold text-malika-dark mb-2 transition-colors duration-300 leading-tight text-center">
                        {event.title}
                      </h3>
                      <p className="font-playfair text-xs text-malika-gray transition-colors duration-300 leading-relaxed text-center">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
