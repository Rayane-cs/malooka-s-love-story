
import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  // Note: These are placeholder URLs. In a real implementation, you'd host the actual songs
  const playlist = [
    {
      title: "Love Story - Taylor Swift",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Placeholder
    },
    {
      title: "Chemtrails Over the Country Club - Lana Del Rey", 
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Placeholder
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Set to 30% volume
      audio.loop = false;
      
      const handleEnded = () => {
        // Move to next track
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
      };
      
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = playlist[currentTrack].url;
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    }
  }, [currentTrack]);

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

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
      />
      
      {/* Music control button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-malika-purple to-malika-pink text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </button>
      
      {/* Now playing indicator */}
      {isPlaying && (
        <div className="fixed bottom-24 right-6 z-40 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-crimson">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-malika-pink rounded-full animate-pulse"></div>
            <span>♪ {playlist[currentTrack].title}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
