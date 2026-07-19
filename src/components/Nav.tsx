import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { scrollTo } from '../lib/smoothScroll';

const LINKS = [
  { id: '#about', label: 'About' },
  { id: '#experience', label: 'Work' },
  { id: '#projects', label: 'Projects' },
  { id: '#skills', label: 'Skills' },
  { id: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 md:px-5 ${
          scrolled
            ? 'border-border bg-bg/70 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <button
          onClick={() => scrollTo('#hero')}
          data-cursor="hover"
          className="flex items-center gap-2 font-display text-sm font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-border text-accent">
            AY
          </span>
          <span className="hidden sm:inline">Abhishek Yadav</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              data-cursor="hover"
              className="rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo('#contact')}
          data-cursor="hover"
          className="rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-bg transition-transform hover:scale-[1.03]"
        >
          Get in touch
        </button>
      </nav>
    </motion.header>
  );
}
