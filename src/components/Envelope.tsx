'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { useState } from 'react';

interface EnvelopeProps {
  onClick: () => void;
}

export default function Envelope({ onClick }: EnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="relative">
      <motion.div
        className="relative cursor-pointer perspective-1000"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ rotateY: 0 }}
        animate={{ 
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Envelope Back */}
        <div className="relative w-80 h-56 bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-2xl transform-gpu">
          {/* Envelope Flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-28 bg-gradient-to-br from-red-500 to-red-700 rounded-t-lg origin-top"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isHovered ? -15 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              clipPath: 'polygon(0 0, 50% 70%, 100% 0)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Wax Seal */}
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg flex items-center justify-center"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                boxShadow: isHovered ? '0 8px 25px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="w-6 h-6 text-red-600" />
            </motion.div>
          </motion.div>

          {/* Envelope Body */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-br from-red-400 to-red-600 rounded-b-lg">
            {/* Address Lines */}
            <div className="absolute top-8 left-8 space-y-2">
              <div className="w-32 h-2 bg-red-800/30 rounded"></div>
              <div className="w-24 h-2 bg-red-800/30 rounded"></div>
              <div className="w-28 h-2 bg-red-800/30 rounded"></div>
            </div>

            {/* Stamp */}
            <div className="absolute top-6 right-6 w-12 h-10 bg-blue-500 rounded-sm shadow-md flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Glow Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-400/20 to-red-600/20 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ transform: 'translateZ(-10px)' }}
            />
          )}
        </div>

        {/* Click Hint */}
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
          animate={{ 
            y: isHovered ? -5 : 0,
            opacity: isHovered ? 1 : 0.7
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600 text-sm font-medium">Click to open</p>
          <motion.div
            className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
} 