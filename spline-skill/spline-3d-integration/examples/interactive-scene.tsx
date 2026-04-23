/**
 * InteractiveSplineScene — Full interactive example
 *
 * Demonstrates:
 *   1. Lazy loading the Spline component
 *   2. Using onLoad to get a reference to the Spline app
 *   3. Listening for mouse events on 3D objects
 *   4. Reading and writing Spline variables
 *   5. Triggering events from React state
 *   6. Scroll-driven animations
 *   7. Mobile responsiveness with static fallback
 *
 * This is a reference implementation — copy the patterns you need.
 */

'use client';

import React, {
    Suspense,
    lazy,
    useRef,
    useState,
    useEffect,
    useCallback,
} from 'react';
import type { Application } from '@splinetool/runtime';

// ─── Lazy load the heavy Spline runtime ──────────────────────────
const Spline = lazy(() => import('@splinetool/react-spline'));

// ─── Configuration ───────────────────────────────────────────────
const SCENE_URL = 'https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode';
const MOBILE_FALLBACK_IMAGE = '/images/scene-fallback.png'; // Optional

// ─── Main Component ──────────────────────────────────────────────
export default function InteractiveSplineScene() {
    const splineRef = useRef<Application | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeObject, setActiveObject] = useState<string | null>(null);
    const [score, setScore] = useState(0);

    // ─── Mobile detection ────────────────────────────────────────
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // ─── Scene loaded callback ───────────────────────────────────
    // ✅ FIXED: Correct callback signature for Spline onLoad
    const handleLoad = useCallback((splineApp: any): void => {
        splineRef.current = splineApp;
        setIsLoaded(true);

        console.log('Scene loaded!');

        // List all objects (useful for debugging)
        const objects = splineApp.getAllObjects();
        console.log(
            'Scene objects:',
            objects.map((o: any) => o.name)
        );

        // ─── Event Listeners ─────────────────────────────────────
        // ✅ FIXED: Correct event listener signature
        splineApp.addEventListener('mouseDown', (event: any): void => {
            const objectName = event?.name || 'Unknown';
            console.log('Clicked:', objectName);
            setActiveObject(objectName);

            // Example: Increment score when a specific object is clicked
            if (event?.name === 'Coin') {
                setScore((prev) => prev + 1);
            }
        });

        splineApp.addEventListener('mouseHover', (): void => {
            // Change cursor on hover
            document.body.style.cursor = 'pointer';
        });

        splineApp.addEventListener('mouseUp', (): void => {
            // Reset cursor
            document.body.style.cursor = 'default';
        });

        // Reset cursor when not hovering any object
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.addEventListener('mousemove', () => {
                // Optional: Additional cursor handling
            });
        }
    }, []);

    // ─── Sync React state → Spline variables ─────────────────────
    useEffect(() => {
        if (splineRef.current && isLoaded) {
            try {
                splineRef.current.setVariable('score', score);
            } catch (error) {
                console.warn('Could not set Spline variable:', error);
            }
        }
    }, [score, isLoaded]);

    // ─── Scroll-driven animation ─────────────────────────────────
    useEffect(() => {
        if (!isLoaded || !splineRef.current) return;

        const handleScroll = (): void => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            if (maxScroll <= 0) return;

            const progress = Math.min(window.scrollY / maxScroll, 1);
            try {
                splineRef.current?.setVariable('scrollProgress', progress);
            } catch (error) {
                console.warn('Could not set scroll variable:', error);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoaded]);

    // ─── External controls ───────────────────────────────────────
    const triggerEvent = (eventName: string, objectName: string): void => {
        if (splineRef.current) {
            try {
                splineRef.current.emitEvent(eventName, objectName);
            } catch (error) {
                console.warn('Could not emit event:', error);
            }
        }
    };

    const resetScene = (): void => {
        setScore(0);
        setActiveObject(null);
        if (splineRef.current) {
            try {
                splineRef.current.setVariable('score', 0);
                splineRef.current.emitEvent('mouseDown', 'ResetButton');
            } catch (error) {
                console.warn('Could not reset scene:', error);
            }
        }
    };

    // ─── Mobile fallback ─────────────────────────────────────────
    if (isMobile && MOBILE_FALLBACK_IMAGE) {
        return (
            <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                <img
                    src={MOBILE_FALLBACK_IMAGE}
                    alt="3D scene"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#fff',
                        fontSize: 14,
                        opacity: 0.6,
                    }}
                >
                    3D scene available on desktop
                </div>
            </div>
        );
    }

    // ─── Render ──────────────────────────────────────────────────
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {/* Loading state */}
            {!isLoaded && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0a0a0a',
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            border: '3px solid rgba(255,255,255,0.15)',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                        }}
                    />
                </div>
            )}

            {/* 3D Scene */}
            <Suspense fallback={null}>
                <Spline
                    scene={SCENE_URL}
                    onLoad={handleLoad}
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                    }}
                />
            </Suspense>

            {/* UI Overlay — example controls */}
            {isLoaded && (
                <div
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        zIndex: 20,
                        color: '#fff',
                        fontFamily: 'system-ui, sans-serif',
                    }}
                >
                    <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 8 }}>
                        Active: {activeObject || 'None'}
                    </p>
                    <p style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                        Score: {score}
                    </p>
                    <button
                        onClick={() => triggerEvent('mouseDown', 'PlayButton')}
                        style={{
                            padding: '8px 16px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 6,
                            color: '#fff',
                            cursor: 'pointer',
                            marginRight: 8,
                            transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                            'rgba(255,255,255,0.2)')
                        }
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                            'rgba(255,255,255,0.1)')
                        }
                    >
                        ▶ Play
                    </button>
                    <button
                        onClick={resetScene}
                        style={{
                            padding: '8px 16px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 6,
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                            'rgba(255,255,255,0.2)')
                        }
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                            'rgba(255,255,255,0.1)')
                        }
                    >
                        ↺ Reset
                    </button>
                </div>
            )}

            {/* Inject spinner keyframes */}
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}