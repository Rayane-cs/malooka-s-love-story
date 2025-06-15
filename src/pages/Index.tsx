
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import MessageSection from '../components/MessageSection';
import Gallery from '../components/Gallery';
import CountdownTimer from '../components/CountdownTimer';
import Puzzle from '../components/Puzzle';
// import VoiceSurprise from '../components/VoiceSurprise'; // Removed as per request
import ConfettiAnimation from '../components/ConfettiAnimation';
// import BackgroundMusic from '../components/BackgroundMusic'; // Removed as per request
import SurpriseMessages from '../components/SurpriseMessages';

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Initial confetti on load
    setTimeout(() => setShowConfetti(true), 1000);
    setTimeout(() => setShowConfetti(false), 6000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* <BackgroundMusic /> */}
      {showConfetti && <ConfettiAnimation />}
      
      <Hero onCelebrate={triggerConfetti} />
      <Timeline />
      <MessageSection />
      <CountdownTimer />
      <Gallery />
      <Puzzle onSolved={triggerConfetti} />
      {/* <VoiceSurprise onSolved={triggerConfetti} /> */}
      <SurpriseMessages onOpen={triggerConfetti} />
      
      {/* Floating hearts with blue theme and gold accents */}
      <div className="fixed top-1/4 left-4 animate-float">
        <div className="text-malika-bright-blue text-2xl animate-heartbeat">💙</div>
      </div>
      <div className="fixed top-3/4 right-8 animate-float" style={{ animationDelay: '1s' }}>
        <div className="text-malika-gold text-xl animate-heartbeat" style={{ animationDelay: '0.5s' }}>✨</div>
      </div>
      <div className="fixed top-1/2 right-4 animate-float" style={{ animationDelay: '2s' }}>
        <div className="text-malika-accent-purple text-lg animate-heartbeat" style={{ animationDelay: '1s' }}>🌸</div>
      </div>
    </div>
  );
};

export default Index;
