import { motion } from 'framer-motion';
import type { Project } from '../data/content';

/**
 * Each project gets a bespoke, lightweight animated motif tied to its subject.
 * All are pure SVG/CSS so they stay cheap and respect reduced-motion via the
 * global CSS override (animations collapse to a static frame).
 */

function KVGrid() {
  // hash buckets filling in — nods to the LRU / KV store
  const cells = Array.from({ length: 36 });
  return (
    <div className="grid grid-cols-6 gap-2">
      {cells.map((_, i) => {
        const active = [2, 5, 8, 9, 14, 17, 20, 21, 27, 30, 33].includes(i);
        return (
          <motion.div
            key={i}
            className="aspect-square rounded-[3px] border"
            style={{ borderColor: active ? 'var(--color-accent)' : 'var(--color-border)' }}
            initial={{ opacity: 0.2 }}
            animate={
              active
                ? { opacity: [0.25, 1, 0.25], backgroundColor: ['rgba(45,212,255,0)', 'rgba(45,212,255,0.35)', 'rgba(45,212,255,0)'] }
                : { opacity: 0.25 }
            }
            transition={active ? { duration: 2.4, repeat: Infinity, delay: (i % 6) * 0.18 } : {}}
          />
        );
      })}
    </div>
  );
}

function Waveform() {
  const bars = Array.from({ length: 40 });
  return (
    <div className="flex h-40 items-center justify-center gap-[3px]">
      {bars.map((_, i) => {
        const base = 12 + Math.abs(Math.sin(i * 0.6)) * 70;
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-accent"
            style={{ height: base }}
            animate={{ scaleY: [0.35, 1, 0.5, 0.9, 0.35] }}
            transition={{
              duration: 1.6 + (i % 5) * 0.12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 8) * 0.06,
            }}
          />
        );
      })}
    </div>
  );
}

function Gauges() {
  const gauges = [
    { label: 'CPU', pct: 62 },
    { label: 'MEM', pct: 78 },
    { label: 'NET', pct: 41 },
  ];
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex items-center justify-center gap-6">
      {gauges.map((g) => (
        <div key={g.label} className="flex flex-col items-center gap-2">
          <svg width="86" height="86" viewBox="0 0 86 86" className="-rotate-90">
            <circle cx="43" cy="43" r={R} fill="none" stroke="var(--color-border)" strokeWidth="6" />
            <motion.circle
              cx="43"
              cy="43"
              r={R}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              whileInView={{ strokeDashoffset: C - (C * g.pct) / 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {g.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function AuthFlow() {
  return (
    <div className="flex flex-col items-center gap-4 font-mono text-xs text-muted">
      {['POST /auth/login', '→ verify credentials', '→ sign JWT', '200 · access + refresh'].map(
        (line, i) => (
          <motion.div
            key={i}
            className="flex w-full max-w-[240px] items-center gap-3 rounded-lg border border-border bg-bg/60 px-4 py-2.5"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.22 }}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${i === 3 ? 'bg-accent' : 'bg-muted'}`}
            />
            <span className={i === 3 ? 'text-accent' : ''}>{line}</span>
          </motion.div>
        )
      )}
    </div>
  );
}

function PriceChart() {
  const pts = [8, 24, 18, 40, 34, 58, 48, 72, 66, 88];
  const path = pts
    .map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * 240} ${100 - y}`)
    .join(' ');
  return (
    <svg viewBox="0 0 240 100" className="w-full max-w-[280px]">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2dd4ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="var(--color-border)" strokeWidth="0.5" />
      ))}
      <motion.path
        d={`${path} L 240 100 L 0 100 Z`}
        fill="url(#area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
      {pts.map((y, i) => (
        <motion.circle
          key={i}
          cx={(i / (pts.length - 1)) * 240}
          cy={100 - y}
          r="2.5"
          fill="#2dd4ff"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.12 }}
        />
      ))}
    </svg>
  );
}

export default function ProjectMotif({ motif }: { motif: Project['motif'] }) {
  switch (motif) {
    case 'kv':
      return <KVGrid />;
    case 'voice':
      return <Waveform />;
    case 'nexus':
      return <Gauges />;
    case 'auth':
      return <AuthFlow />;
    case 'chart':
      return <PriceChart />;
  }
}
