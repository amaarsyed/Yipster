'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Users, Star, Sparkles, Award, Heart, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterContentProps {
  onShowGallery: () => void;
}

export default function LetterContent({ onShowGallery }: LetterContentProps) {
  useEffect(() => {
    // Trigger confetti when letter appears
    const timer = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6']
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Letter Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: ["0%", "100%", "0%"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="inline w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mr-4" />
          Thank You for Everything!
          <Award className="inline w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 ml-4" />
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl text-gray-600 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          A heartfelt message from your grateful students
        </motion.p>
      </motion.div>

      {/* Letter Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 mb-8 border border-gray-100"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
              Dear <span className="font-bold text-blue-600 text-2xl sm:text-3xl">Mr. Yip</span>,
            </p>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              As you embark on this well-deserved retirement, we want you to know how profoundly 
              you've impacted our lives. Your passion for teaching didn't just show us how to 
              code, but taught us to think outside the box, solve complex problems, and embrace lifelong learning. 
              Most importantly, you instilled in us the values of professionalism and excellence in everything we create.
            </motion.p>

            <motion.p 
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              Through countless hours of patient guidance, from debugging our first "Hello World" programs 
              to tackling advanced topics, you've shaped not just our technical skills but our character. 
              Your enthusiasm was spread to everyone in the class, your dedication unwavering, and your belief in our potential 
              made all the difference. You didn't just teach computer science, you taught us how to look at a problem beyond just a screen, most importanly 
              visualize it too.
            </motion.p>

            <motion.p 
              className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              Your classroom was more than a place of learning – it was where curiosity expanded, 
              where mistakes became stepping stones, and where impossible seemed achievable. 
              You celebrated our accomplishments from making it to World Vex Robotics, to encouraged us through challenges, 
              and always gave us the hard time so we never settle for less.
            </motion.p>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.6 }}
            className="space-y-4 text-center"
          >
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Your legacy lives from, every bug we debug with patience you taught us, 
              and every time we mentor others with the same care you showed us. 
            </p>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              As you begin this exciting new chapter, know that your influence extends far beyond the classroom. 
              We carry your lessons with us, not just in technical knowledge, but in the way we approach challenges, 
              treat colleagues, and strive for excellence. Thank you for being more than a teacher  
              thank you for being a pat in the back when we need it, a mentor when we need it, and a role model when we need it.
            </p>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Enjoy every moment of your well-earned retirement! May it be filled with joy, adventure, 
              new discoveries beyond just a monitor screen. 
            </p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.3, duration: 0.6 }}
              className="pt-6 border-t border-gray-200 mt-8"
            >
              <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                With love and gratitude,
              </p>
              <motion.p 
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Your Computer Science Students 2025!
              </motion.p>
        
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Photo Gallery CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.button
          onClick={onShowGallery}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Camera className="w-6 h-6" />
          View Our Photo Gallery
        </motion.button>
        <p className="text-gray-600 mt-4">
          See some wonderful memories we've shared together!
        </p>
      </motion.div>
    </div>
  );
} 