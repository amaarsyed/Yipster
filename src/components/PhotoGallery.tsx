'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, X, ArrowLeft, ArrowRight } from 'lucide-react';

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Graduation photos
  const photos = [
    {
      id: 1,
      src: '/images/IMG_9986.jpg',
      fallback: '🎓'
    },
    {
      id: 2,
      src: '/images/IMG_9981.jpg',
      fallback: '👥'
    }
  ];

  const openPhoto = (index: number) => {
    setSelectedPhoto(index);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Camera className="inline w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mr-4" />
            Some Pictures
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Just nostalgic memories of the best class ever!
          </motion.p>
        </motion.div>

        {/* Photo Grid */}
        <div className="flex justify-center items-center gap-6 lg:gap-8 flex-wrap">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.4 + index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              className="group relative cursor-pointer"
              onClick={() => openPhoto(index)}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Photo Container */}
                <div className="relative aspect-square bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
                  {photo.src ? (
                    <img 
                      src={photo.src} 
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div 
                      className="text-8xl sm:text-9xl opacity-60"
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {photo.fallback}
                    </motion.div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Heart Icon on Hover */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Heart className="w-5 h-5 text-white fill-current" />
                  </motion.div>

                  {/* View Indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                </div>



                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ transform: 'translateZ(-10px)' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePhoto}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePhoto}
                aria-label="Close photo"
                title="Close photo"
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                title="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                title="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              {/* Photo Content */}
              <div className="aspect-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center overflow-hidden max-h-[70vh]">
                {photos[selectedPhoto].src ? (
                  <img 
                    src={photos[selectedPhoto].src} 
                    alt=""
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-9xl opacity-60">
                    {photos[selectedPhoto].fallback}
                  </div>
                )}
              </div>


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 