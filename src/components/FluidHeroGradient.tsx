import React, { useEffect, useRef, useState } from 'react';

export const FluidHeroGradient: React.FC = () => {
  // Center of radiant white light (starts at bottom-right / center as in blurry-gradient-haikei.svg)
  const [glowPos, setGlowPos] = useState({ x: 74, y: 68 });
  const [isInteracting, setIsInteracting] = useState(false);

  const targetRef = useRef({ x: 74, y: 68 });
  const currentRef = useRef({ x: 74, y: 68 });
  const isInteractingRef = useRef(false);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();

    const updatePointer = (clientX: number, clientY: number, active: boolean) => {
      const heroEl = document.getElementById('hero-gradient-section');
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      // Keep within comfortable bounds
      targetRef.current = {
        x: Math.max(12, Math.min(88, x)),
        y: Math.max(12, Math.min(88, y)),
      };

      isInteractingRef.current = active;
      setIsInteracting(active);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY, false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    };

    const handleTouchEnd = () => {
      isInteractingRef.current = false;
      setIsInteracting(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    // Smooth natural flow loop
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Natural gentle flow: slow, calming wave oscillations (periods ~10-14s)
      const flowOffsetX = Math.sin(elapsed * 0.45) * 6 + Math.cos(elapsed * 0.25) * 3;
      const flowOffsetY = Math.cos(elapsed * 0.38) * 5 + Math.sin(elapsed * 0.22) * 2.5;

      // Target position: blends pointer position with natural drift
      const baseTargetX = targetRef.current.x + flowOffsetX;
      const baseTargetY = targetRef.current.y + flowOffsetY;

      // Fluid lerp damping for smooth, organic movement
      const lerpFactor = isInteractingRef.current ? 0.08 : 0.035;
      currentRef.current.x += (baseTargetX - currentRef.current.x) * lerpFactor;
      currentRef.current.y += (baseTargetY - currentRef.current.y) * lerpFactor;

      setGlowPos({
        x: currentRef.current.x,
        y: currentRef.current.y,
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* ─── 1. BASE SOLID GRAFANA ORANGE (#F2652A) ─── */}
      <div className="absolute inset-0 bg-[#F2652A]" />

      {/* ─── 2. SOFT BLURRED CORAL & PEACH AMBIENT FIELDS (blurry-gradient-haikei.svg) ─── */}
      {/* Top-Left warm core bloom */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[90vw] max-w-[1200px] h-[75vh] rounded-full opacity-95 animate-fluid-float-1"
        style={{
          background: 'radial-gradient(circle, #FA6E34 0%, #F2652A 60%, transparent 85%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Center sunlit transition */}
      <div
        className="absolute top-[10%] left-[25%] w-[80vw] max-w-[1000px] h-[70vh] rounded-full opacity-90 animate-fluid-float-2"
        style={{
          background: 'radial-gradient(circle, #FF834B 0%, #FA6E34 50%, transparent 80%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Soft warm peach tone leading into the white light */}
      <div
        className="absolute bottom-[5%] right-[10%] w-[85vw] max-w-[1100px] h-[75vh] rounded-full opacity-90 animate-fluid-float-1"
        style={{
          background: 'radial-gradient(circle, #FFA170 0%, #FF834B 50%, transparent 80%)',
          filter: 'blur(85px)',
          animationDelay: '-9s',
        }}
      />

      {/* ─── 3. RADIANT WHITE IN BETWEEN (MATCHING blurry-gradient-haikei.svg) ─── */}
      {/* Dynamic naturally flowing white light with smooth touch response */}
      <div
        className="absolute rounded-full transition-all duration-150 ease-out pointer-events-none"
        style={{
          left: `${glowPos.x}%`,
          top: `${glowPos.y}%`,
          transform: `translate(-50%, -50%) scale(${isInteracting ? 1.15 : 1.0})`,
          width: 'min(72vw, 840px)',
          height: 'min(66vh, 660px)',
          background:
            'radial-gradient(circle at center, #FFFFFF 0%, rgba(255,255,255,0.96) 28%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,0.2) 75%, transparent 88%)',
          filter: `blur(${isInteracting ? 50 : 58}px)`,
        }}
      />

      {/* Anchor luminous white bloom at bottom-right corner */}
      <div
        className="absolute -bottom-[10%] -right-[5%] w-[55vw] max-w-[750px] h-[60vh] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 75% 75%, #FFFFFF 0%, rgba(255,255,255,0.95) 32%, rgba(255,255,255,0.45) 65%, transparent 88%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Ambient overlay for soft tonal depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-black/5 pointer-events-none" />
    </div>
  );
};
