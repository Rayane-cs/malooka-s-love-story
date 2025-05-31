
import React, { useState } from 'react';
import { Camera, Play, Heart } from 'lucide-react';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);

  // Placeholder media items - replace with actual photos/videos
  const mediaItems = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
      alt: 'Beautiful moment together',
      description: 'Our first photo together'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400',
      alt: 'Romantic evening',
      description: 'Under the stars'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400',
      alt: 'Special day',
      description: 'A day to remember'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400',
      alt: 'Together forever',
      description: 'My favorite smile'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400',
      alt: 'Cozy moments',
      description: 'Home is wherever you are'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Camera className="w-8 h-8 text-malika-accent-purple" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-malika-gold to-malika-light-gold bg-clip-text text-transparent">
              One Day, Our Memories Will Fill This Space
            </h2>
            <Heart className="w-8 h-8 text-malika-bright-blue animate-heartbeat" />
          </div>
          <p className="font-crimson text-xl text-malika-gray mb-4">
            Soon, this will be full of our moments... 📸💕
          </p>
          <p className="font-crimson text-lg text-malika-blue italic">
            I can't wait to create beautiful memories with you, one smile, one adventure, one moment at a time. Here's where it begins.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg animate-fadeInUp border border-malika-accent-purple/20"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedMedia(index)}
            >
              <div className="aspect-square relative">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white bg-black/50 rounded-full p-3" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-crimson text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal for enlarged view */}
        {selectedMedia !== null && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div className="max-w-4xl max-h-full">
              <img
                src={mediaItems[selectedMedia].src}
                alt={mediaItems[selectedMedia].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 font-crimson">
                {mediaItems[selectedMedia].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
