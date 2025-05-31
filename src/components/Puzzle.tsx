
import React, { useState } from 'react';
import { Puzzle as PuzzleIcon, Heart, CheckCircle } from 'lucide-react';

interface PuzzleProps {
  onSolved: () => void;
}

const Puzzle: React.FC<PuzzleProps> = ({ onSolved }) => {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const correctAnswer = 'youbi'; // Updated puzzle answer
  const puzzle = {
    question: "What do you call the person who loves you most?",
    hint: "It's the special name you gave me, the one that makes my heart warm every time you say it... 💙",
    clue: "Starts with 'Y' and ends with 'i', it's your nickname for me! 💕"
  };

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    
    if (answer.toLowerCase() === correctAnswer) {
      setSolved(true);
      onSolved();
    } else {
      // Give hints based on attempts
      if (attempts === 1) {
        alert("Close! Think about what you call me when you're being sweet... 💙");
      } else if (attempts === 2) {
        alert("Almost there! It's the name you gave me that no one else uses... ✨");
      }
    }
  };

  if (solved) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-malika-sky-blue/10 to-malika-light-blue/10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-effect p-8 rounded-lg shadow-xl">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-heartbeat" />
            <h2 className="font-playfair text-3xl font-bold text-malika-dark mb-4">
              Perfect! You solved it! 🎉
            </h2>
            <div className="space-y-4">
              <p className="font-crimson text-xl text-malika-ocean italic">
                "Yes, your loving Youbi!"
              </p>
              <p className="font-crimson text-lg text-malika-gray">
                You gave me this name, and it's become my favorite thing to hear. ✨
              </p>
              <p className="font-dancing text-2xl text-malika-blue">
                I love being your Youbi, 
                I love when you say it with that smile, 
                and I love YOU, my precious Malika! 💙👑
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-malika-sky-blue/10 to-malika-light-blue/10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <PuzzleIcon className="w-8 h-8 text-malika-blue" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-malika-dark">
              A Love Riddle
            </h2>
            <Heart className="w-8 h-8 text-malika-bright-blue animate-heartbeat" />
          </div>
          <p className="font-crimson text-xl text-malika-gray">
            Solve this puzzle to unlock a special message 🔓💙
          </p>
        </div>
        
        <div className="glass-effect p-8 rounded-lg shadow-xl">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-dancing text-2xl text-malika-ocean mb-4">
                {puzzle.question}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-malika-light-blue/30 p-4 rounded-lg">
                <p className="font-crimson text-malika-dark">
                  <strong>Hint:</strong> {puzzle.hint}
                </p>
              </div>
              
              {attempts > 0 && (
                <div className="bg-malika-soft-blue/30 p-4 rounded-lg">
                  <p className="font-crimson text-malika-ocean">
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
                className="w-full p-4 border border-malika-blue/30 rounded-lg font-crimson text-center text-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-malika-blue"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              />
              
              <button
                onClick={checkAnswer}
                className="w-full py-3 bg-gradient-to-r from-malika-blue to-malika-bright-blue text-white font-crimson text-lg rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Check Answer ✨
              </button>
            </div>
            
            {attempts > 0 && (
              <p className="text-center text-malika-gray font-crimson">
                Attempts: {attempts} | Keep trying, my love! 💪💙
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Puzzle;
