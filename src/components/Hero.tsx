
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HeroProps {
  onCelebrate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCelebrate }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 animate-sparkle">
          <Sparkles className="text-malika-gold w-8 h-8 opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-sparkle" style={{ animationDelay: '1s' }}>
          <Sparkles className="text-malika-sky-blue w-6 h-6 opacity-40" />
        </div>
        <div className="absolute bottom-32 left-32 animate-sparkle" style={{ animationDelay: '2s' }}>
          <Sparkles className="text-malika-bright-blue w-10 h-10 opacity-50" />
        </div>
        <div className="absolute bottom-20 right-20 animate-sparkle" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="text-malika-accent-purple w-7 h-7 opacity-70" />
        </div>
      </div>

      <div className="text-center space-y-8 max-w-4xl mx-auto animate-fadeInUp">
        {/* Main title with gold gradient */}
        <h1 className="font-playfair text-6xl md:text-8xl font-bold leading-tight bg-gradient-to-r from-malika-gold to-malika-light-gold bg-clip-text text-transparent">
          Happy Birthday
        </h1>
        
        {/* Name with special styling */}
        <div className="space-y-4">
          <h2 className="font-dancing text-5xl md:text-7xl text-malika-ocean animate-heartbeat">
            Malooka
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <Heart className="text-malika-bright-blue w-8 h-8 animate-heartbeat" />
            <span className="font-dancing text-3xl md:text-4xl text-malika-blue">
              🎂💙
            </span>
            <Heart className="text-malika-bright-blue w-8 h-8 animate-heartbeat" />
          </div>
        </div>

        {/* Updated subtitle */}
        <div className="space-y-2">
          <p className="font-crimson text-xl md:text-2xl text-malika-gray italic">
            My beautiful Malika
          </p>
          <p className="font-crimson text-lg md:text-xl text-malika-blue">
            My sweetie, my darling, my everything 💕
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
