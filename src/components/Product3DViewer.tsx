'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface Product3DViewerProps {
  url: string;
}

export default function Product3DViewer({ url }: Product3DViewerProps) {
  const isSketchfab = url.includes('sketchfab.com');

  return (
    <div className="w-full h-full relative bg-brand-charcoal overflow-hidden group">
      {isSketchfab ? (
        <iframe 
          title="3D Model"
          src={url}
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
        />
      ) : (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-brand-charcoal">
              <div className="flex flex-col items-center gap-4">
                <span className="w-12 h-12 border-4 border-white/10 border-t-brand-orange rounded-full animate-spin" />
                <p className="text-xs uppercase tracking-widest text-gray-500 animate-pulse">Initializing 3D Experience</p>
              </div>
            </div>
          }
        >
          <Spline 
            scene={url} 
            className="w-full h-full"
          />
        </Suspense>
      )}
      
      {/* Interaction Hint Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full animate-ping" />
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 whitespace-nowrap">
            Drag to explore 360°
          </p>
        </div>
      </div>
    </div>
  );
}
