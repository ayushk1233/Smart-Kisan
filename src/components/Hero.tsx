'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface HeroProps {
  onLogin: () => void;
}

const Hero = ({ onLogin }: HeroProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-900">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 0%, rgba(0, 0, 0, 0) 50%),
                      radial-gradient(circle at 0% 0%, rgba(0, 255, 0, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
          animation: 'pulse 8s infinite'
        }}
      />

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Gradient headline */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="animate-gradient bg-gradient-to-r from-green-300 via-green-500 to-green-300 bg-clip-text text-transparent">
              Smart Farming for a
            </span>
            <br />
            <span className="animate-gradient bg-gradient-to-r from-green-300 via-green-500 to-green-300 bg-clip-text text-transparent">
              Sustainable Future
            </span>
          </h1>

          {/* Subheadline with fade-in */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-200"
          >
            Empower your farming with AI-driven insights, real-time weather tracking,
            and smart inventory management. Join the agricultural revolution today.
          </motion.p>

          {/* CTA Button with glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10"
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-green-500 px-8 py-6 text-lg font-semibold text-white transition-all hover:bg-green-600"
              onClick={onLogin}
            >
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 -z-10 animate-glow bg-gradient-to-r from-green-400 to-green-600 opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
