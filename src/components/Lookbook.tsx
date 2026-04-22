'use client';

import { motion } from 'framer-motion';
import { lookbookImages } from '@/lib/data';

export default function Lookbook() {
  return (
    <section className="py-32 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Editorial Header */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="text-brand-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
              Autumn / Winter 2026
            </span>
            <h2 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-[1.1]">
              The <span className="italic text-brand-orange/90">Ethereal</span> <br />
              Monochrome
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl font-light">
              A cinematic exploration of architectural form and shadow. This season, we redefine minimalism through high-contrast silhouettes and structural fluidity.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <button className="group relative text-sm uppercase tracking-[0.3em] text-white overflow-hidden pb-2">
              <span className="relative z-10">Discover Collection</span>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-orange transition-all duration-500 group-hover:w-full" />
            </button>
          </motion.div>
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {lookbookImages.map((src, idx) => {
            // Define custom grid spans for a premium editorial look
            const gridSpans = [
              "md:col-span-7 aspect-[4/5]", // Large vertical
              "md:col-span-5 aspect-[3/4] md:mt-20", // Smaller vertical offset
              "md:col-span-4 aspect-[1/1]", // Square
              "md:col-span-8 aspect-[16/9]", // Landscape
              "md:col-span-6 aspect-[4/5] md:-mt-32", // Mid vertical pull-up
              "md:col-span-6 aspect-[3/4]", // Mid vertical
            ];

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                className={`relative overflow-hidden group ${gridSpans[idx % gridSpans.length]}`}
              >
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                
                <img
                  src={src}
                  alt={`Editorial Look ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                />
                
                {/* Floating Info */}
                <div className="absolute bottom-8 left-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-brand-orange font-bold mb-1">Look {idx + 1}</p>
                  <p className="text-white text-sm font-serif italic tracking-wider">Aesthetic Form Study</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cinematic Quote Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="mt-32 text-center border-t border-white/5 pt-20"
        >
          <p className="font-serif text-2xl md:text-4xl text-white/20 italic max-w-4xl mx-auto leading-relaxed">
            "Style is a way to say who you are without having to speak."
          </p>
          <div className="mt-8 w-12 h-[1px] bg-brand-orange mx-auto opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
