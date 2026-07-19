import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/content';
import { useLocalTime } from '../hooks/useLocalTime';
import MagneticSocial from './MagneticSocial';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  const time = useLocalTime(profile.timezone);
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-border px-6 pb-10 pt-24 md:px-12 md:pt-32 lg:px-20"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted"
        >
          <span className="text-accent">06</span>
          <span className="h-px w-10 bg-border" />
          Contact
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.1 }}
          className="max-w-4xl font-display text-[10vw] font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span
              className="block"
              variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.8, ease } } }}
            >
              Let's build
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span
              className="block text-accent accent-glow"
              variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.8, ease } } }}
            >
              something that scales.
            </motion.span>
          </span>
        </motion.h2>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="link"
              className="group inline-flex items-center gap-3 font-display text-2xl font-medium transition-colors hover:text-accent md:text-3xl"
            >
              <Mail size={26} className="text-accent" />
              {profile.email}
              <ArrowUpRight
                size={22}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <div className="mt-6 flex items-center gap-3">
              <MagneticSocial href={profile.github} label="GitHub">
                <Github size={20} />
              </MagneticSocial>
              <MagneticSocial href={profile.linkedin} label="LinkedIn">
                <Linkedin size={20} />
              </MagneticSocial>
              <MagneticSocial href={`mailto:${profile.email}`} label="Email">
                <Mail size={20} />
              </MagneticSocial>
            </div>
          </div>

          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            Download résumé
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* bottom bar */}
        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Abhishek Yadav. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {profile.location} · {time || '--:--:--'} IST
          </span>
          <span>Built with React · Three.js · GSAP</span>
        </div>
      </div>
    </footer>
  );
}
