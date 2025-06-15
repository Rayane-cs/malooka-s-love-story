
import React, { useState } from 'react';
import { Gift, Heart, Star, Sparkles } from 'lucide-react';

interface SurpriseMessagesProps {
  onOpen: () => void;
}

const SurpriseMessages: React.FC<SurpriseMessagesProps> = ({ onOpen }) => {
  const [openedMessages, setOpenedMessages] = useState<number[]>([]);

  const surpriseMessages = [
    {
      icon: Heart,
      color: 'malika-pink',
      title: 'Why I Love You',
      content: 'I love your beautiful smile that lights up every room, your kind heart that makes everyone feel special, and the way you make ordinary moments feel magical. You are my sunshine! ☀️💖'
    },
    {
      icon: Sparkles,
      color: 'malika-gold',
      title: 'Dreams for Us',
      content: 'I dream of traveling the world with you, discovering new places, trying new foods, and creating countless adventures together. But most of all, I dream of growing old with you by my side. 🌍💕'
    },
    {
      icon: Gift,
      color: 'malika-burgundy',
      title: 'A Promise',
      content: 'I promise to always be your biggest supporter, your shoulder to cry on, your partner in laughter, and your best friend. I promise to love you more each day than I did the day before. Forever and always. 💍🤝'
    }
  ];

  const openMessage = (index: number) => {
    if (!openedMessages.includes(index)) {
      setOpenedMessages([...openedMessages, index]);
      onOpen();
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-malika-cream/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-malika-dark mb-4">
            Surprise Messages
          </h2>
          <p className="font-crimson text-xl text-malika-gray">
            Click on each gift to reveal a special message just for you 🎁💕
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {surpriseMessages.map((message, index) => {
            const IconComponent = message.icon;
            const isOpened = openedMessages.includes(index);
            
            return (
              <div
                key={index}
                className={`glass-effect p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-500 animate-fadeInUp ${
                  isOpened ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => openMessage(index)}
              >
                {!isOpened ? (
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${message.color}/20 flex items-center justify-center animate-pulse`}>
                      <IconComponent className={`w-8 h-8 text-${message.color}`} />
                    </div>
                    <h3 className="font-dancing text-2xl text-malika-dark mb-2">
                      Mystery Gift #{index + 1}
                    </h3>
                    <p className="font-crimson text-malika-gray">
                      Click to open! 🎀
                    </p>
                  </div>
                ) : (
                  <div className="animate-fadeInUp">
                    <div className="text-center mb-4">
                      <IconComponent className={`w-8 h-8 text-${message.color} mx-auto animate-heartbeat`} />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-malika-dark mb-3 text-center">
                      {message.title}
                    </h3>
                    <p className="font-crimson text-malika-gray leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {openedMessages.length === surpriseMessages.length && (
          <div className="text-center mt-12 animate-fadeInUp">
            <div className="glass-effect p-6 rounded-lg shadow-xl">
              <h3 className="font-dancing text-3xl text-malika-burgundy mb-4">
                All messages unlocked! 🎉
              </h3>
              <p className="font-crimson text-lg text-malika-dark">
                You've discovered all my secret messages, just like you've discovered all the ways to make my heart flutter. Happy Birthday, my love! 💖✨
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SurpriseMessages;
