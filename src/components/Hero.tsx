import { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/content';
import { useReducedMotion, isCoarsePointer } from '../hooks/useReducedMotion';
import { useMagnetic } from '../hooks/useMagnetic';
import { scrollTo } from '../lib/smoothScroll';

const NetworkScene = lazy(() => import('./NetworkScene'));
const SystemMonitor = lazy(() => import('./SystemMonitor'));

const ease = [0.22, 1, 0.36, 1] as const;

function StaticNetwork() {
  // Lightweight SVG stand-in for mobile / reduced-motion.
  const nodes = [
    [12, 30], [28, 18], [22, 55], [45, 40], [40, 72],
    [62, 22], [68, 58], [82, 38], [90, 70], [55, 12],
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [5, 6], [5, 7], [7, 8], [6, 8], [1, 9], [5, 9],
  ];
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-60"
      viewBox="0 0 100 90"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#2dd4ff"
          strokeOpacity="0.18"
          strokeWidth="0.2"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 0.9 : 0.6} fill="#2dd4ff" fillOpacity="0.85">
          <animate
            attributeName="fill-opacity"
            values="0.85;0.35;0.85"
            dur={`${2 + (i % 4)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);
  const magRef = useMagnetic<HTMLAnchorElement>(0.4);

  useEffect(() => {
    // Only mount WebGL on capable, motion-friendly, fine-pointer devices.
    if (!reduced && !isCoarsePointer()) setUse3D(true);
  }, [reduced]);

  useEffect(() => {
    // Only mount the (interval-driven) monitor on lg+ screens, so it never
    // runs or loads its chunk on mobile/tablet.
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setShowMonitor(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 pt-24 md:px-12 lg:px-20"
    >
      {/* Background network */}
      <div className="absolute inset-0 -z-10">
        {use3D ? (
          <Suspense fallback={<StaticNetwork />}>
            <NetworkScene />
          </Suspense>
        ) : (
          <StaticNetwork />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_48%,transparent_52%,#08090c_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left column — headline & CTAs */}
        <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
          Available for software roles · {profile.location}
        </motion.div>

        <h1 className="font-display text-[13vw] font-bold leading-[0.92] tracking-tight sm:text-[11vw] md:text-[8.5vw] lg:text-[6.25rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
            >
              Software
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-accent accent-glow"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.28 }}
            >
              Developer
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          className="mt-8 max-w-xl text-balance font-mono text-base text-muted md:text-lg"
        >
          Building systems that scale — backend services, REST APIs, data
          pipelines and automation, engineered for production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            ref={magRef}
            href={`mailto:${profile.email}`}
            data-cursor="link"
            data-magnetic
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-bg transition-transform"
          >
            <Mail size={16} />
            Get in touch
          </a>
          <button
            onClick={() => scrollTo('#projects')}
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            View work
          </button>
          <div className="flex items-center gap-1 pl-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </motion.div>
        </div>

        {/* Right column — live system monitor (mounted on lg+ only) */}
        {showMonitor && (
          <div className="hidden justify-end lg:flex">
            <Suspense fallback={null}>
              <SystemMonitor />
            </Suspense>
          </div>
        )}
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        data-cursor="hover"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-accent" />
        </motion.span>
      </motion.button>
    </section>
  );
}
