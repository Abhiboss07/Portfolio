import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * Initialise Lenis smooth scroll and bridge it into GSAP's ticker so
 * ScrollTrigger stays in sync. Respects reduced-motion by skipping smoothing.
 */
export function initSmoothScroll(reducedMotion: boolean): Lenis | null {
  if (lenis) return lenis;
  if (reducedMotion) {
    // Still let ScrollTrigger update on native scroll.
    ScrollTrigger.refresh();
    return null;
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollTo(target: string | HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
  } else if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export { gsap, ScrollTrigger };
