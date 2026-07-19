import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * A glassy "live system monitor" HUD card for the hero — ties into the
 * distributed-systems theme and reliably fills the right column without
 * depending on WebGL. All animation freezes under reduced motion.
 */

const LOG_POOL = [
  ['GET  /api/v2/ingest', '200 · 8ms', 'ok'],
  ['POST /auth/token', '200 · 12ms', 'ok'],
  ['cache redis:session', 'HIT', 'hit'],
  ['worker#7 flush AOF', 'ok', 'ok'],
  ['scrape batch#1042', '+38 rows', 'up'],
  ['dedupe pipeline', '-12 dupes', 'down'],
  ['GET  /health', '200 · 2ms', 'ok'],
  ['kafka consumer lag', '0', 'ok'],
  ['GET  /api/v2/leads', '200 · 15ms', 'ok'],
  ['ci/cd deploy #204', 'passed', 'up'],
  ['spring boot /orders', '200 · 21ms', 'ok'],
  ['celery task#8831', 'done', 'ok'],
] as const;

type LogLine = { id: number; text: string; tag: string; status: string };

const statusColor: Record<string, string> = {
  ok: 'text-accent',
  hit: 'text-accent',
  up: 'text-emerald-400',
  down: 'text-amber-400',
};

function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    setR(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return r;
}

export default function SystemMonitor() {
  const reduced = useReduced();
  const [rps, setRps] = useState(12480);
  const [latency, setLatency] = useState(38);
  const [spark, setSpark] = useState<number[]>(() =>
    Array.from({ length: 28 }, (_, i) => 30 + Math.round(Math.abs(Math.sin(i * 0.5)) * 55))
  );
  const [logs, setLogs] = useState<LogLine[]>(() =>
    LOG_POOL.slice(0, 5).map((l, i) => ({ id: i, text: l[0], tag: l[1], status: l[2] }))
  );
  const idRef = useRef(100);

  useEffect(() => {
    if (reduced) return;

    const metrics = setInterval(() => {
      setRps((v) => {
        const next = v + Math.round((Math.random() - 0.45) * 420);
        return Math.min(15200, Math.max(9800, next));
      });
      setLatency(() => 32 + Math.round(Math.random() * 16));
      setSpark((s) => {
        const next = [...s.slice(1), 25 + Math.round(Math.random() * 70)];
        return next;
      });
    }, 1100);

    const logTick = setInterval(() => {
      setLogs((prev) => {
        const pick = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
        const line: LogLine = {
          id: idRef.current++,
          text: pick[0],
          tag: pick[1],
          status: pick[2],
        };
        return [...prev.slice(-4), line];
      });
    }, 1900);

    return () => {
      clearInterval(metrics);
      clearInterval(logTick);
    };
  }, [reduced]);

  const max = Math.max(...spark);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="relative w-full max-w-md"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-accent/10 blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* title bar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="ml-2 font-mono text-xs text-muted">abhishek@prod : system-monitor</span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            live
          </span>
        </div>

        {/* metrics */}
        <div className="grid grid-cols-2 gap-px bg-border">
          <Metric label="nodes online" value="46/46" badge="ONLINE" />
          <Metric label="requests / s" value={rps.toLocaleString()} trend />
          <Metric label="p99 latency" value={`${latency}ms`} />
          <Metric label="uptime" value="99.98%" badge="SLA" />
        </div>

        {/* throughput sparkline */}
        <div className="border-t border-border px-5 py-4">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
            <span>throughput</span>
            <span className="text-accent">req/s · 60s</span>
          </div>
          <div className="flex h-12 items-end gap-[3px]">
            {spark.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-accent/70 transition-[height] duration-700 ease-out"
                style={{ height: `${(v / max) * 100}%`, opacity: 0.35 + (i / spark.length) * 0.65 }}
              />
            ))}
          </div>
        </div>

        {/* log stream */}
        <div className="border-t border-border px-5 py-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            event stream
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
            {logs.map((l) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-between gap-3"
              >
                <span className="truncate text-muted">
                  <span className="text-accent/60">$</span> {l.text}
                </span>
                <span className={`shrink-0 ${statusColor[l.status] ?? 'text-muted'}`}>{l.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Metric({
  label,
  value,
  badge,
  trend,
}: {
  label: string;
  value: string;
  badge?: string;
  trend?: boolean;
}) {
  return (
    <div className="bg-bg/40 px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1.5 flex items-center gap-2">
        <span className="font-display text-xl font-semibold tabular-nums text-text">{value}</span>
        {badge && (
          <span className="rounded border border-accent/30 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-accent">
            {badge}
          </span>
        )}
        {trend && <span className="font-mono text-xs text-emerald-400">▲</span>}
      </div>
    </div>
  );
}
