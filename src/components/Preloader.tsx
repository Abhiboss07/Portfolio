import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const BOOT_LINES = [
  '> initializing runtime ...........  ok',
  '> mounting services ..............  ok',
  '> connecting data pipelines ......  ok',
  '> warming cache [redis] ..........  ok',
  '> cluster nodes online ...........  46/46',
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false);
    // Match the exit animation duration before releasing scroll.
    setTimeout(onDone, reduced ? 0 : 700);
  };

  useEffect(() => {
    if (reduced) {
      finish();
      return;
    }
    let raf = 0;
    const start = performance.now();
    const TOTAL = 2200;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TOTAL);
      setProgress(p);
      setLines(Math.min(BOOT_LINES.length, Math.floor(p * (BOOT_LINES.length + 0.5))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg px-6"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onClick={finish}
        >
          <div className="w-full max-w-md">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-border font-display text-xl font-bold text-accent">
                  AY
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                  abhishek@portfolio:~$
                </span>
              </div>
              <span className="font-mono text-xs text-muted">
                {Math.round(progress * 100)}%
              </span>
            </div>

            <div className="min-h-[7.5rem] space-y-1.5 font-mono text-[13px] text-muted">
              {BOOT_LINES.slice(0, lines).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-between gap-4"
                >
                  <span>{l.split('  ')[0]}</span>
                  <span className="text-accent">{l.split('  ').slice(1).join(' ')}</span>
                </motion.div>
              ))}
              <span className="inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
            </div>

            <div className="mt-6 h-px w-full overflow-hidden bg-border">
              <div
                className="h-full bg-accent"
                style={{ width: `${progress * 100}%`, transition: 'width 80ms linear' }}
              />
            </div>

            <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-widest text-muted/60">
              click / esc to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
