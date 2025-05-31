
import React, { useState } from 'react';
import { Edit3, Heart, Save } from 'lucide-react';

const MessageSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(`My dearest Malooka,

Every day with you feels like a beautiful dream that I never want to wake up from. Your smile lights up my world, your laugh is my favorite melody, and your love is my greatest treasure.

On this special day, I want you to know that you are not just my girlfriend, but my best friend, my confidante, my partner in all of life's adventures. You make everything better just by being you.

I promise to love you more each day, to support your dreams, to make you laugh when you're sad, and to celebrate every moment of joy with you.

Happy birthday, my darling. Here's to many more years of love, laughter, and beautiful memories together.

With all my love,
— Your Youbi 💙`);

  const handleSave = () => {
    setIsEditing(false);
    // Here you could implement actual saving to a backend
    console.log('Message saved:', message);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-12 text-malika-dark">
          A Special Message
        </h2>
        
        <div className="glass-effect p-8 rounded-lg shadow-xl relative">
          {/* Edit button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 p-2 rounded-full bg-malika-sky-blue/20 hover:bg-malika-sky-blue/30 transition-colors"
          >
            <Edit3 className="w-5 h-5 text-malika-ocean" />
          </button>
          
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-96 p-4 border border-malika-blue/30 rounded-lg font-crimson text-malika-dark bg-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-malika-blue"
                placeholder="Write your special message here..."
              />
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-malika-blue text-white rounded-lg hover:bg-malika-ocean transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Message</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Heart className="w-8 h-8 text-malika-bright-blue mx-auto animate-heartbeat" />
              </div>
              <div className="font-crimson text-lg text-malika-dark leading-relaxed whitespace-pre-line">
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
