
import React, { useState } from 'react';
import { Edit3, Heart, Save } from 'lucide-react';

const MessageSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(`My dearest Malooka,

Every day with you feels like a beautiful dream that I never want to wake up from. Your smile lights up my world, your laugh is my favorite melody, and your love is my greatest treasure.

On this special day, I want you to know that you are not just my friend, but my best friend, my confidante, my partner in all of life's adventures, you are my sister. You make everything better just by being you.

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
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-malika-gold to-malika-light-gold bg-clip-text text-transparent">
          A Special Message
        </h2>
        
        <div className="glass-effect p-8 rounded-lg shadow-xl relative border border-malika-accent-purple/20">
          {/* Edit button with purple hover */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 p-2 rounded-full bg-malika-sky-blue/20 hover:bg-malika-accent-purple/30 transition-colors"
          >
            <Edit3 className="w-5 h-5 text-malika-ocean" />
          </button>
          
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-96 p-4 border border-malika-blue/30 rounded-lg font-crimson text-malika-dark bg-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-malika-gold"
                placeholder="Write your special message here..."
              />
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-malika-gold to-malika-light-gold text-white rounded-lg hover:shadow-lg transition-all duration-300"
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
              <div className="font-playfair text-lg text-malika-dark leading-relaxed">
                {message.split('\n').map((line, index) => {
                  if (line.includes('— Your Youbi')) {
                    return (
                      <div key={index} className="text-right mt-6">
                        <span className="font-dancing text-xl text-malika-bright-blue">
                          {line}
                        </span>
                      </div>
                    );
                  }
                  return line ? <p key={index} className="mb-4">{line}</p> : <br key={index} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
