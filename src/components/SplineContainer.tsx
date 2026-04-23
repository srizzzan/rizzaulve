'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));
export default function SplineContainer() {
  const handleLoad = (app: any) => {
    console.log('Spline loaded:', app);
  };
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/huDo8Gsl4w8rV2xO/scene.splinecode"
          onLoad={handleLoad}
          className="w-full h-full pointer-events-auto"
        />
      </Suspense>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <span
      className="inline-block w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"
    />
  );
}
