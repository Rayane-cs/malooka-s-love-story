
import React, { useState, useRef, useEffect } from 'react';
import { Gift, Heart, Play, Pause, Volume2 } from 'lucide-react';

interface VoiceSurpriseProps {
  onSolved: () => void;
}

const VoiceSurprise: React.FC<VoiceSurpriseProps> = ({ onSolved }) => {
  const [solved, setSolved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [draggedItems, setDraggedItems] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const targetWord = "MALIKA";
  const shuffledLetters = ["M", "A", "L", "I", "K", "A"].sort(() => Math.random() - 0.5);

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData("text");
    const newDraggedItems = [...draggedItems];
    newDraggedItems[position] = letter;
    setDraggedItems(newDraggedItems);
    
    // Check if puzzle is solved
    if (newDraggedItems.join("") === targetWord) {
      setSolved(true);
      onSolved();
      // Lower background music volume
      if ((window as any).backgroundMusic) {
        (window as any).backgroundMusic.lowerVolume();
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, letter: string) => {
    e.dataTransfer.setData("text", letter);
  };

  const playVoiceRecording = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        // Restore background music volume
        if ((window as any).backgroundMusic) {
          (window as any).backgroundMusic.restoreVolume();
        }
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing voice recording:', error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        // Restore background music volume when recording ends
        if ((window as any).backgroundMusic) {
          (window as any).backgroundMusic.restoreVolume();
        }
      });
    }
  }, []);

  if (!solved) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-malika-accent-purple/5 to-malika-gold/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Gift className="w-8 h-8 text-malika-gold animate-heartbeat" />
              <h2 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-malika-gold to-malika-light-gold bg-clip-text text-transparent">
                Unlock Your Surprise 🎁
              </h2>
              <Heart className="w-8 h-8 text-malika-accent-purple animate-heartbeat" />
            </div>
            <p className="font-crimson text-xl text-malika-gray">
              Arrange the letters to spell your beautiful name 💫
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-lg shadow-xl border border-malika-gold/30">
            <div className="space-y-8">
              {/* Drop zones */}
              <div className="flex justify-center space-x-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 border-2 border-dashed border-malika-gold rounded-lg flex items-center justify-center bg-malika-light-blue/20"
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={handleDragOver}
                  >
                    <span className="font-dancing text-2xl text-malika-bright-blue font-bold">
                      {draggedItems[index] || ""}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Draggable letters */}
              <div className="flex justify-center space-x-3">
                {shuffledLetters.map((letter, index) => (
                  <div
                    key={`${letter}-${index}`}
                    className="w-10 h-10 bg-gradient-to-r from-malika-accent-purple to-malika-lavender rounded-lg flex items-center justify-center cursor-move hover:scale-110 transition-transform shadow-lg"
                    draggable
                    onDragStart={(e) => handleDragStart(e, letter)}
                  >
                    <span className="font-dancing text-xl text-white font-bold">
                      {letter}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="text-center font-crimson text-malika-gray">
                Drag and drop the letters into the boxes above ✨
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-malika-accent-purple/5 to-malika-gold/5">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-effect p-8 rounded-lg shadow-xl border border-malika-gold/30">
          <Gift className="w-16 h-16 text-malika-gold mx-auto mb-4 animate-heartbeat" />
          <h2 className="font-playfair text-3xl font-bold text-malika-dark mb-6">
            🎉 Surprise Unlocked! 🎉
          </h2>
          
          <div className="space-y-6">
            <p className="font-crimson text-xl text-malika-ocean italic">
              I recorded something special just for you...
            </p>
            
            <div className="bg-malika-light-blue/30 p-6 rounded-lg border border-malika-accent-purple/30">
              <div className="flex items-center justify-center space-x-4">
                <Volume2 className="w-6 h-6 text-malika-bright-blue" />
                <button
                  onClick={playVoiceRecording}
                  className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-malika-gold to-malika-light-gold text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span className="font-crimson">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span className="font-crimson">Play My Voice Message</span>
                    </>
                  )}
                </button>
              </div>
              
              {isPlaying && (
                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-malika-gold rounded-full animate-pulse"></div>
                    <span className="font-crimson text-malika-ocean">Playing your special song...</span>
                    <div className="w-2 h-2 bg-malika-gold rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
            
            <p className="font-dancing text-lg text-malika-bright-blue">
              Happy Birthday, my beautiful Malika! 💙🎂
            </p>
          </div>
          
          {/* Hidden audio element - replace with actual voice recording */}
          <audio
            ref={audioRef}
            preload="metadata"
            src="/voice-recording.mp3"
          />
        </div>
      </div>
    </section>
  );
};

export default VoiceSurprise;
