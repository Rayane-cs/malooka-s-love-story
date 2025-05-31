
import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [originalVolume] = useState(0.2); // 20% volume

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = originalVolume;
      audio.loop = true;
    }
  }, [originalVolume]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Auto-play on first user interaction
  useEffect(() => {
    const handleFirstInteraction = async () => {
      const audio = audioRef.current;
      if (audio && !isPlaying) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Auto-play failed:', error);
        }
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  // Function to lower volume for voice recordings
  const lowerVolumeForVoice = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.volume = 0.05; // 5% volume
    }
  };

  const restoreVolume = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.volume = originalVolume;
    }
  };

  // Expose volume control functions globally
  useEffect(() => {
    (window as any).backgroundMusic = {
      lowerVolume: lowerVolumeForVoice,
      restoreVolume: restoreVolume
    };
  }, [isPlaying, originalVolume]);

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        src="https://www.youtube.com/watch?v=K11_8DcfMHE"
      />
      
      {/* Music control button with purple hover */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-malika-blue to-malika-bright-blue text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:from-malika-accent-purple hover:to-malika-lavender flex items-center justify-center"
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </button>
      
      {/* Now playing indicator with gold accent */}
      {isPlaying && (
        <div className="fixed bottom-24 right-6 z-40 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-crimson border border-malika-gold/30">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-malika-gold rounded-full animate-pulse"></div>
            <span>♪ Love Story (Slowed) - Indila</span>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
