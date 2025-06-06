
import React, { useState, useRef, useEffect } from 'react';
import { Gift, Heart, Play, Pause, Volume2 } from 'lucide-react';

interface VoiceSurpriseProps {
  onSolved: () => void;
}

const VoiceSurprise: React.FC<VoiceSurpriseProps> = ({ onSolved }) => {
  const [solved, setSolved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ letter: string; used: boolean }[]>([
    { letter: 'M', used: false },
    { letter: 'A', used: false },
    { letter: 'L', used: false },
    { letter: 'I', used: false },
    { letter: 'K', used: false },
    { letter: 'A', used: false }
  ]);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const targetWord = "MALIKA";
  
  const handleLetterTap = (index: number) => {
    if (availableLetters[index].used || selectedLetters.length >= 6) return;
    
    const newSelectedLetters = [...selectedLetters, availableLetters[index].letter];
    const newAvailableLetters = [...availableLetters];
    newAvailableLetters[index].used = true;
    
    setSelectedLetters(newSelectedLetters);
    setAvailableLetters(newAvailableLetters);
    
    // Check if puzzle is solved
    if (newSelectedLetters.join("") === targetWord) {
      setSolved(true);
      onSolved();
      // Lower background music volume
      if ((window as any).backgroundMusic) {
        (window as any).backgroundMusic.lowerVolume();
      }
    }
  };

  const resetPuzzle = () => {
    setSelectedLetters([]);
    setAvailableLetters(prev => prev.map(item => ({ ...item, used: false })));
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
              Tap the letters to spell your beautiful name 💫
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-lg shadow-xl border border-malika-gold/30">
            <div className="space-y-8">
              {/* Selected letters display */}
              <div className="flex justify-center space-x-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 border-2 border-malika-gold rounded-lg flex items-center justify-center bg-malika-light-blue/20"
                  >
                    <span className="font-dancing text-2xl text-malika-bright-blue font-bold">
                      {selectedLetters[index] || ""}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Tappable letters */}
              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {availableLetters.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleLetterTap(index)}
                    disabled={item.used}
                    className={`w-16 h-16 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg font-dancing text-2xl font-bold ${
                      item.used 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50' 
                        : 'bg-gradient-to-r from-malika-accent-purple to-malika-lavender text-white hover:scale-110 active:scale-95'
                    }`}
                  >
                    {item.letter}
                  </button>
                ))}
              </div>
              
              <div className="text-center space-y-2">
                <p className="font-crimson text-malika-gray">
                  Tap the letters in order to spell your name ✨
                </p>
                {selectedLetters.length > 0 && (
                  <button
                    onClick={resetPuzzle}
                    className="text-malika-blue hover:text-malika-bright-blue font-crimson underline text-sm"
                  >
                    Reset
                  </button>
                )}
              </div>
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
