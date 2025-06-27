'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import * as THREE from 'three';

interface Envelope3DProps {
  onClick: () => void;
}

function AnimatedEnvelope({ onClick, isHovered }: { onClick: () => void; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const flapRef = useRef<THREE.Mesh>(null);
  const sealRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Hover rotation
      if (isHovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0.3, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -0.1, 0.1);
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
      }
    }

    // Animate envelope flap
    if (flapRef.current) {
      if (isHovered) {
        flapRef.current.rotation.x = THREE.MathUtils.lerp(flapRef.current.rotation.x, -0.3, 0.1);
      } else {
        flapRef.current.rotation.x = THREE.MathUtils.lerp(flapRef.current.rotation.x, 0, 0.1);
      }
    }

    // Rotate the wax seal
    if (sealRef.current) {
      sealRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={meshRef} onClick={onClick}>
      {/* Main envelope body */}
      <Box args={[4, 2.5, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.1} />
      </Box>

      {/* Envelope flap */}
      <group ref={flapRef} position={[0, 1.25, 0.05]}>
        <Box args={[4, 1.5, 0.05]}>
          <meshStandardMaterial color="#b91c1c" roughness={0.2} metalness={0.2} />
        </Box>
        
        {/* Wax seal */}
        <group ref={sealRef} position={[0, 0.3, 0.1]}>
          <Sphere args={[0.3]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.7} />
          </Sphere>
        </group>
      </group>

      {/* Address lines */}
      <Box args={[1.5, 0.1, 0.02]} position={[-0.8, -0.3, 0.06]}>
        <meshStandardMaterial color="#7f1d1d" />
      </Box>
      <Box args={[1.2, 0.1, 0.02]} position={[-0.9, -0.6, 0.06]}>
        <meshStandardMaterial color="#7f1d1d" />
      </Box>
      <Box args={[1.3, 0.1, 0.02]} position={[-0.85, -0.9, 0.06]}>
        <meshStandardMaterial color="#7f1d1d" />
      </Box>

      {/* Stamp */}
      <Box args={[0.6, 0.5, 0.03]} position={[1.5, 0.8, 0.06]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.8} />
      </Box>
    </group>
  );
}

export default function Envelope3D({ onClick }: Envelope3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-96 h-72 cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#3b82f6" />
        <pointLight position={[0, 0, 10]} intensity={0.5} color="#fbbf24" />

        {/* 3D Envelope */}
        <AnimatedEnvelope onClick={onClick} isHovered={isHovered} />
      </Canvas>

      {/* 2D UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-yellow-400/20 blur-2xl rounded-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Click hint */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
          animate={{ 
            y: isHovered ? -20 : -10,
            opacity: isHovered ? 1 : 0.7
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border">
            <p className="text-gray-700 text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Click to open the letter
              <Heart className="w-4 h-4 text-red-500" />
            </p>
          </div>
          <motion.div
            className="w-3 h-3 bg-red-500 rounded-full mx-auto mt-2"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Particle effects */}
        {isHovered && (
          <motion.div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                }}
                animate={{
                  y: [-5, -15, -5],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 