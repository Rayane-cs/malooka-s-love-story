
import React from 'react';
import { Calendar, Heart, Star, Gift } from 'lucide-react';

const timelineEvents = [
  {
    date: "Jan 15, 2023",
    title: "Love at First Sight",
    description: "The first time I saw her — I instantly fell in love.",
    icon: Heart,
    color: "malika-burgundy"
  },
  {
    date: "Oct 29, 2023",
    title: "Our First Collaboration",
    description: "We met and presented a philosophy class together.",
    icon: Star,
    color: "malika-purple"
  },
  {
    date: "Feb 2, 2024",
    title: "A Mistake Made",
    description: "I made a mistake...",
    icon: Calendar,
    color: "malika-gray"
  },
  {
    date: "Mar 2, 2024",
    title: "Love Deeper Than Before",
    description: "I corrected it — and fell in love even deeper.",
    icon: Heart,
    color: "malika-pink"
  },
  {
    date: "Jun 19, 2024",
    title: "Promise Made",
    description: "I missed her first birthday with me... never again.",
    icon: Gift,
    color: "malika-gold"
  }
];

const Timeline = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-malika-cream/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-malika-dark">
          Our Beautiful Journey
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-malika-purple to-malika-pink"></div>
          
          {timelineEvents.map((event, index) => {
            const IconComponent = event.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className={`relative flex items-center mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="glass-effect p-6 rounded-lg shadow-lg animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="font-dancing text-lg text-malika-purple mb-2">
                      {event.date}
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-malika-dark mb-2">
                      {event.title}
                    </h3>
                    <p className="font-crimson text-malika-gray">
                      {event.description}
                    </p>
                  </div>
                </div>
                
                {/* Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-malika-pink">
                  <IconComponent className={`w-6 h-6 text-${event.color}`} />
                </div>
                
                {/* Empty space for the other side */}
                <div className="w-5/12"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
