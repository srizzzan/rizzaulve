'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplineContainer from '@/components/SplineContainer';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transform for the background text
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Opacity transform to fade out as it scrolls down
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-brand-dark"
    >
      {/* Rizzaulve Parallax Background Text */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
      >
        <h1 className="font-serif text-[18vw] leading-none text-white/10 font-bold tracking-tighter whitespace-nowrap drop-shadow-2xl">
          rizzaulve
        </h1>
      </motion.div>

      {/* 3D Spline Container */}
      {/* Placed above the text, but below the foreground content */}
      <div className="absolute inset-0 z-10">
        <SplineContainer />
      </div>

      {/* Hero Content - Pushed lower to focus on 3D model */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-[55vh] md:mt-[65vh]">
        <p className="text-brand-orange font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4 drop-shadow-md">
          New Season Collection
        </p>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight text-balance leading-tight drop-shadow-2xl">
          Redefine Your <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Aesthetic</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link 
            href="/shop" 
            className="px-8 py-3 bg-brand-orange hover:bg-brand-amber text-brand-dark font-semibold tracking-wider transition-all duration-300 transform hover:scale-105 text-sm"
          >
            Explore Collection
          </Link>
          <Link 
            href="/editorial" 
            className="px-8 py-3 bg-transparent border border-white/30 text-white hover:bg-white/10 font-semibold tracking-wider transition-all duration-300 text-sm"
          >
            View Editorial
          </Link>
        </div>
      </div>
    </section>
  );
}
