import { useEffect, useRef } from 'react';
import { gsap } from '../lib/smoothScroll';
import { marqueeTech } from '../data/content';

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Two identical rows sit side by side; move by half for a seamless loop.
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: 28,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const pause = () => tweenRef.current?.timeScale(0.15);
  const resume = () => tweenRef.current?.timeScale(1);

  const row = [...marqueeTech, ...marqueeTech];

  return (
    <div
      className="relative flex select-none items-center overflow-hidden border-y border-border bg-surface/40 py-5"
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-hidden
    >
      <div ref={trackRef} className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
        {row.map((tech, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-display text-xl font-medium text-muted transition-colors md:text-2xl">
              {tech}
            </span>
            <span className="text-accent">◆</span>
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
