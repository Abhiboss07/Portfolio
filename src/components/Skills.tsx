import { motion } from 'framer-motion';
import { skills } from '../data/content';
import SectionHeading from './SectionHeading';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <SectionHeading index="04" label="Capabilities" title="The stack I build with" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease, delay: (i % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-opacity duration-500 group-hover:bg-accent/10" />
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, j) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + j * 0.05, ease }}
                  className="rounded-lg border border-border bg-bg/40 px-3 py-1.5 font-display text-sm text-text transition-colors hover:border-accent hover:text-accent"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
