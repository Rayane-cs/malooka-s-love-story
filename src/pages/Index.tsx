
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
  const [isMuted, setIsMuted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
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

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsClicked(true);

    if (isMuted) {
      // Fade-in volume
      let vol = 0;
      audio.play().catch(() => {});
      const fade = setInterval(() => {
        if (vol < 0.2) {
          vol += 0.01;
          audio.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 100);
    } else {
      // Fade-out volume
      let vol = 0.2;
      const fade = setInterval(() => {
        if (vol > 0) {
          vol -= 0.01;
          audio.volume = Math.max(0, vol);
        } else {
          clearInterval(fade);
          audio.pause();
        }
      }, 100);
    }

    setTimeout(() => setIsClicked(false), 300);
    setIsMuted(!isMuted);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Background Music */}
      <audio ref={audioRef} src="/background-music.mp3" autoPlay loop hidden />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleSound}
        className={`fixed top-4 right-4 z-50 bg-malika-blue/20 hover:bg-malika-blue/30 backdrop-blur-sm border border-malika-blue/30 rounded-full p-3 transition-all duration-300 ${
          isClicked ? 'scale-95' : 'scale-100'
        } hover:scale-105`}
      >
        {isMuted ? (
          // Muted Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M16.5 12a4.5 4.5 0 0 0-4.5-4.5v9a4.5 4.5 0 0 0 4.5-4.5z" opacity="0.5" />
            <path
              d="M9 9H5v6h4l5 5V4l-5 5zM18 9l-1.41 1.41L19.17 13l-2.58 2.59L18 17l4-4-4-4z"
              fill="white"
            />
          </svg>
        ) : (
          // Speaker On Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path d="M16.5 12a4.5 4.5 0 0 0-4.5-4.5v9a4.5 4.5 0 0 0 4.5-4.5z" />
          </svg>
        )}
      </button>

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
