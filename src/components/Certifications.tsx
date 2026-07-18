import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { certifications } from '../data/content';
import SectionHeading from './SectionHeading';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <SectionHeading index="05" label="Credentials" title="Certifications" />
      </div>

      {/* Horizontal scroll cards */}
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:px-12 lg:px-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {certifications.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            data-cursor="hover"
            className="group relative flex min-h-[220px] w-[280px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40 sm:w-[320px]"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-border text-accent transition-colors group-hover:border-accent/50">
                <Award size={20} />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {c.date}
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold leading-snug">{c.title}</h3>
              <p className="mt-2 font-mono text-xs text-accent">{c.issuer}</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
