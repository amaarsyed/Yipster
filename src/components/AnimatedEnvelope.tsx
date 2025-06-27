'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Sparkles } from 'lucide-react';

interface AnimatedEnvelopeProps {
  onClick?: () => void;
}

export default function AnimatedEnvelope({ onClick }: AnimatedEnvelopeProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPaper, setShowPaper] = useState(false);

  const handleClick = () => {
    if (isClicked) return;
    
    setIsClicked(true);
    
    // Show paper animation immediately
    setTimeout(() => {
      setShowPaper(true);
    }, 100);
    
    // Then trigger the main transition after paper completes
    if (onClick) {
      setTimeout(() => {
        onClick();
      }, 1400);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[50vh] p-8">
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        style={{ perspective: '1000px' }}
      >
        {/* Envelope Container */}
        <motion.div
          className="relative cursor-pointer"
          onHoverStart={() => !isClicked && setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
          whileHover={{ scale: isClicked ? 1 : 1.03 }}
          whileTap={{ scale: isClicked ? 1 : 0.98 }}
          animate={{
            scale: isClicked ? 1.1 : 1,
            opacity: isClicked ? 0.9 : 1,
          }}
          transition={{ duration: isClicked ? 1.2 : 0.3 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Envelope Body */}
          <motion.div
            className="relative w-72 h-48 sm:w-80 sm:h-52 md:w-96 md:h-60 bg-red-500 rounded-lg shadow-xl"
            animate={{
              scale: isClicked ? 1.1 : 1,
            }}
            transition={{ duration: 1.2, type: "spring" }}
          >
            {/* Envelope flap line */}
            <div 
              className="absolute top-0 left-0 w-full h-1 bg-red-600/50"
              style={{
                clipPath: 'polygon(15% 0%, 85% 0%, 50% 100%)',
                height: '20px'
              }}
            />
            
            {/* Address lines */}
            <div className="absolute top-6 left-6 space-y-2">
              <div className="w-16 h-1 bg-red-700/30 rounded-full"></div>
              <div className="w-12 h-1 bg-red-700/30 rounded-full"></div>
              <div className="w-14 h-1 bg-red-700/30 rounded-full"></div>
            </div>
            
            {/* Stamp */}
            <div className="absolute top-4 right-4 w-8 h-6 bg-red-700/40 rounded-sm border border-red-800/30"></div>
          </motion.div>

          {/* Badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border-2 border-red-200 select-none"
              animate={{
                opacity: isClicked ? 0 : 1,
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <span className="text-red-600 font-semibold text-sm">Congratulations!</span>
                <span className="text-2xl">🎓</span>
              </div>
            </motion.div>
          </div>

          {/* Glow Effect */}
          {(isHovered || isClicked) && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-400/30 to-yellow-400/30 blur-xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isClicked ? 0.6 : 0.4, 
                scale: isClicked ? 1.8 : 1.3 
              }}
              transition={{ duration: isClicked ? 1.2 : 0.3 }}
            />
          )}

          {/* Paper Animation */}
          {showPaper && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 w-48 h-64 sm:w-56 sm:h-72 bg-white rounded-lg shadow-2xl border border-gray-200"
                style={{ transformOrigin: 'bottom center' }}
                initial={{ 
                  scale: 0.05,
                  y: 10,
                  x: '-50%',
                  rotate: 0,
                  opacity: 0
                }}
                animate={{
                  scale: [0.05, 0.4, 0.7, 15],
                  y: [10, -20, -80, -window.innerHeight * 0.8],
                  x: ['-50%', '-50%', '-50%', '-50%'],
                  rotate: [0, -2, 3, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.3, 0.6, 1],
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Paper content preview */}
                <div className="p-4 space-y-2">
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Success Sparkles */}
          {isClicked && (
            <motion.div className="absolute inset-0 pointer-events-none z-20">
              {[
                { left: 25, top: 30, x: -15 },
                { left: 70, top: 25, x: 20 },
                { left: 40, top: 60, x: -25 },
                { left: 60, top: 70, x: 15 },
                { left: 30, top: 45, x: -10 },
                { left: 80, top: 50, x: 25 },
                { left: 45, top: 35, x: -20 },
                { left: 65, top: 40, x: 10 },
                { left: 35, top: 75, x: -5 },
                { left: 75, top: 30, x: 30 },
              ].map((sparkle, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${sparkle.left}%`,
                    top: `${sparkle.top}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    y: [0, -40, -80],
                    x: [0, sparkle.x],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.3 + i * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>



        {/* Opening Message */}
        {isClicked && (
          <motion.div
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="bg-green-100 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-green-300">
              <p className="text-green-800 text-sm font-medium flex items-center gap-2">
                <span className="text-lg">✉️</span>
                Opening your letter...
                <span className="text-lg">💌</span>
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}