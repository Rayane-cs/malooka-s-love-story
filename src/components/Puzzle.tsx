
import React, { useState } from 'react';
import { Puzzle as PuzzleIcon, Heart, CheckCircle } from 'lucide-react';

interface PuzzleProps {
  onSolved: () => void;
}

const Puzzle: React.FC<PuzzleProps> = ({ onSolved }) => {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const correctAnswer = 'malika'; // The puzzle answer
  const puzzle = {
    question: "What do I call the most beautiful girl in the world?",
    hint: "It's one of your special names that makes my heart skip a beat... 💖",
    clue: "Starts with 'M' and ends with 'a', and it's how I see you - a queen! 👑"
  };

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    
    if (answer.toLowerCase() === correctAnswer) {
      setSolved(true);
      onSolved();
    } else {
      // Give hints based on attempts
      if (attempts === 1) {
        alert("Close! Think about what name makes you feel most special... 💕");
      } else if (attempts === 2) {
        alert("Almost there! It rhymes with 'Angelica' but it's much more beautiful... ✨");
      }
    }
  };

  if (solved) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-malika-pink/10 to-malika-lavender/10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-effect p-8 rounded-lg shadow-xl">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-heartbeat" />
            <h2 className="font-playfair text-3xl font-bold text-malika-dark mb-4">
              Perfect! You solved it! 🎉
            </h2>
            <div className="space-y-4">
              <p className="font-crimson text-xl text-malika-burgundy italic">
                "Yes, my beautiful Malika!"
              </p>
              <p className="font-crimson text-lg text-malika-gray">
                You are my queen, my everything, my Malika. ✨
              </p>
              <p className="font-dancing text-2xl text-malika-purple">
                I love how this name sounds when I say it, 
                I love how it feels when I write it, 
                and I love YOU, my precious Malika! 💖👑
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-malika-pink/10 to-malika-lavender/10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <PuzzleIcon className="w-8 h-8 text-malika-purple" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-malika-dark">
              A Love Riddle
            </h2>
            <Heart className="w-8 h-8 text-malika-pink animate-heartbeat" />
          </div>
          <p className="font-crimson text-xl text-malika-gray">
            Solve this puzzle to unlock a special message 🔓💕
          </p>
        </div>
        
        <div className="glass-effect p-8 rounded-lg shadow-xl">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-dancing text-2xl text-malika-burgundy mb-4">
                {puzzle.question}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-malika-cream/30 p-4 rounded-lg">
                <p className="font-crimson text-malika-dark">
                  <strong>Hint:</strong> {puzzle.hint}
                </p>
              </div>
              
              {attempts > 0 && (
                <div className="bg-malika-light-pink/30 p-4 rounded-lg">
                  <p className="font-crimson text-malika-burgundy">
                    <strong>Additional Clue:</strong> {puzzle.clue}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-4 border border-malika-purple/30 rounded-lg font-crimson text-center text-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-malika-purple"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              />
              
              <button
                onClick={checkAnswer}
                className="w-full py-3 bg-gradient-to-r from-malika-purple to-malika-pink text-white font-crimson text-lg rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Check Answer ✨
              </button>
            </div>
            
            {attempts > 0 && (
              <p className="text-center text-malika-gray font-crimson">
                Attempts: {attempts} | Keep trying, my love! 💪💕
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Puzzle;
