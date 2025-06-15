
import React, { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import MessageSection from '../components/MessageSection';
import Gallery from '../components/Gallery';
import CountdownTimer from '../components/CountdownTimer';
import Puzzle from '../components/Puzzle';
import VoiceSurprise from '../components/VoiceSurprise';
import ConfettiAnimation from '../components/ConfettiAnimation';
import SurpriseMessages from '../components/SurpriseMessages';

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
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

    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0;
      audio.play().catch(() => {});
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.2) {
          vol += 0.01;
          audio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    }

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
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Background Music */}
      <audio ref={audioRef} src="/background-music.mp3" autoPlay loop hidden />

      {showConfetti && <ConfettiAnimation />}
      <Hero onCelebrate={triggerConfetti} />
      <Timeline />
      <MessageSection />
      <CountdownTimer />
      <Gallery />
      <Puzzle onSolved={triggerConfetti} />
      <SurpriseMessages onOpen={triggerConfetti} />

      {/* Floating emojis */}
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
