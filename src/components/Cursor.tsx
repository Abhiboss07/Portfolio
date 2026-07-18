import { useEffect, useRef, useState } from 'react';
import { isCoarsePointer } from '../hooks/useReducedMotion';

/**
 * Custom cursor: a small dot + a lagging ring. The ring grows and can show a
 * label when hovering elements marked with [data-cursor] / [data-cursor-label].
 * Magnetic pull on [data-magnetic] is handled inside the target components.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Decide once whether the custom cursor should run at all.
  useEffect(() => {
    if (isCoarsePointer()) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor');
    return () => document.body.classList.remove('custom-cursor');
  }, []);

  // Attach listeners only after the cursor elements are actually rendered.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const render = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]');
      if (el) {
        const variant = el.getAttribute('data-cursor');
        const text = el.getAttribute('data-cursor-label') || '';
        ring.dataset.variant = variant || 'hover';
        label.textContent = text;
        label.style.opacity = text ? '1' : '0';
      } else {
        ring.dataset.variant = '';
        label.style.opacity = '0';
        label.textContent = '';
      }
    };

    const onDown = () => (ring.dataset.down = 'true');
    const onUp = () => (ring.dataset.down = 'false');

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        data-variant=""
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] flex h-9 w-9 -ml-[18px] -mt-[18px] items-center justify-center rounded-full border border-white/30"
        style={{ willChange: 'transform' }}
      >
        <span
          ref={labelRef}
          className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-wider text-bg opacity-0"
        />
      </div>
      <style>{`
        .cursor-ring {
          transition: width .3s cubic-bezier(.22,1,.36,1), height .3s cubic-bezier(.22,1,.36,1),
                      background-color .3s, border-color .3s, margin .3s;
        }
        .cursor-ring[data-variant="view"] {
          width: 84px; height: 84px; margin-left: -42px; margin-top: -42px;
          background: var(--color-accent); border-color: var(--color-accent);
        }
        .cursor-ring[data-variant="link"] {
          width: 52px; height: 52px; margin-left: -26px; margin-top: -26px;
          background: color-mix(in srgb, var(--color-accent) 18%, transparent);
          border-color: var(--color-accent);
        }
        .cursor-ring[data-variant="hover"] {
          width: 52px; height: 52px; margin-left: -26px; margin-top: -26px;
          border-color: var(--color-accent);
        }
        .cursor-ring[data-down="true"] { transform-origin: center; filter: brightness(.85); }
      `}</style>
    </>
  );
}
