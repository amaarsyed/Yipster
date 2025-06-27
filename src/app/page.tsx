'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedEnvelope from '../components/AnimatedEnvelope';
import LetterContent from '../components/LetterContent';
import PhotoGallery from '../components/PhotoGallery';

export default function Home() {
  const [currentView, setCurrentView] = useState<'envelope' | 'letter' | 'gallery'>('envelope');

  const handleEnvelopeClick = () => {
    // Smooth transition to letter
    setTimeout(() => {
      setCurrentView('letter');
    }, 1200);
  };

  const handleLetterClose = () => {
    setCurrentView('envelope');
  };

  const handleShowGallery = () => {
    setCurrentView('gallery');
  };

  const handleBackToLetter = () => {
    setCurrentView('letter');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { left: 5, top: 15, emoji: '🎓', delay: 0 },
          { left: 85, top: 20, emoji: '🎉', delay: 1 },
          { left: 10, top: 70, emoji: '📚', delay: 2 },
          { left: 90, top: 65, emoji: '🌟', delay: 3 },
          { left: 65, top: 25, emoji: '🎊', delay: 4 },
          { left: 25, top: 85, emoji: '🏆', delay: 5 },
          { left: 75, top: 90, emoji: '🎈', delay: 6 },
          { left: 40, top: 8, emoji: '✨', delay: 7 },
          { left: 15, top: 45, emoji: '🎯', delay: 8 },
          { left: 80, top: 40, emoji: '🌈', delay: 9 },
          { left: 50, top: 95, emoji: '🎭', delay: 10 },
          { left: 95, top: 35, emoji: '🎪', delay: 11 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30 select-none"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              color: 'white',
            }}
            animate={{
              y: [-30, -80, -30],
              x: [-15, 15, -15],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: item.delay * 0.5,
              ease: "easeInOut"
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <AnimatePresence>
        {currentView !== 'envelope' && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center"
          >
            <motion.button
              onClick={currentView === 'gallery' ? handleBackToLetter : handleLetterClose}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">←</span>
              <span className="text-gray-700 font-medium">
                {currentView === 'gallery' ? 'Back to Letter' : 'Back to Envelope'}
              </span>
            </motion.button>

            {currentView === 'letter' && (
              <motion.button
                onClick={handleShowGallery}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-lg">📸</span>
                <span className="font-medium">View Photos</span>
              </motion.button>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, y: -100 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {/* Header */}
              <div className="text-center pt-20 pb-8">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="max-w-4xl mx-auto px-6"
                >
                  <motion.h1 
                    className="font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gray-800 mb-6 leading-tight"
                    style={{ fontFamily: 'var(--font-dancing-script), "Dancing Script", cursive' }}
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                        "0 0 40px rgba(59, 130, 246, 0.6)",
                        "0 0 20px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Happy Retirement! 
                  </motion.h1>
                  <motion.p 
                    className="font-merriweather font-bold text-2xl sm:text-3xl md:text-4xl text-black mb-8 max-w-2xl mx-auto"
                    style={{ fontFamily: '"Merriweather", var(--font-merriweather), serif' }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      textShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                        "0 0 40px rgba(59, 130, 246, 0.6)",
                        "0 0 20px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{ 
                      opacity: { delay: 0.8, duration: 0.8 },
                      textShadow: { duration: 3, repeat: Infinity }
                    }}
                  >
                    Congratulations on your retirement!
                  </motion.p>
                  

                </motion.div>
              </div>

              {/* Teacher Picture Spaces */}
              <div className="relative flex items-center justify-center">
                {/* Left picture space */}
                <motion.div
                  className="absolute left-12 sm:left-16 md:left-20 lg:left-24 top-1/2 transform -translate-y-1/2 z-5"
                  animate={{
                    y: [-3, 3, -3],
                    rotate: [-1.5, 1.5, -1.5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-36 h-48 sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-64 bg-white rounded-xl shadow-xl border-2 border-gray-300 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/Yip2.png" 
                      alt="Teacher Photo" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {/* Photo label */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                    <p className="text-base text-gray-600 font-medium whitespace-nowrap">Mr. Yip</p>
                  </div>
                </motion.div>
                
                {/* Right picture space */}
                <motion.div
                  className="absolute right-12 sm:right-16 md:right-20 lg:right-24 top-1/2 transform -translate-y-1/2 z-5"
                  animate={{
                    y: [3, -3, 3],
                    rotate: [1.5, -1.5, 1.5],
                  }}
                  transition={{
                    
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.5
                  }}
                >
                  <div className="w-36 h-48 sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-64 bg-white rounded-xl shadow-xl border-2 border-gray-300 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/Yipster.png" 
                      alt="Teacher Photo" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {/* Photo label */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                    <p className="text-base text-gray-600 font-medium whitespace-nowrap">Young Yip</p>
                  </div>
                </motion.div>
                
                <AnimatedEnvelope onClick={handleEnvelopeClick} />
              </div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-gray-200 text-center max-w-sm mx-auto">
                  <p className="text-gray-600 text-sm font-medium">
                    🎁 Click to open the envelope!
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {currentView === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="pt-20 pb-8"
            >
              <LetterContent onShowGallery={handleShowGallery} />
            </motion.div>
          )}

          {currentView === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="pt-20"
            >
              <PhotoGallery />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Property */}
      <div className="fixed bottom-2 right-4 z-50">
        <div className="bg-black/10 backdrop-blur-sm text-gray-600 text-xs px-3 py-1 rounded-full">
          Amaar2025
        </div>
      </div>
    </main>
  );
}
