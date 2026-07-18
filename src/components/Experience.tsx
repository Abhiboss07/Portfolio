import { motion } from 'framer-motion';
import { experience } from '../data/content';
import SectionHeading from './SectionHeading';
import Counter from './Counter';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <SectionHeading index="02" label="Experience" title="Where I've shipped" />

      <div className="relative">
        {/* timeline spine */}
        <div className="absolute left-0 top-2 hidden h-full w-px bg-border md:block md:left-[7.5rem]">
          <motion.div
            className="absolute inset-x-0 top-0 w-px origin-top bg-accent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease }}
            style={{ height: '100%' }}
          />
        </div>

        <div className="space-y-16">
          {experience.map((job, i) => (
            <div key={i} className="relative md:grid md:grid-cols-[7.5rem_1fr] md:gap-10">
              {/* period + node */}
              <div className="relative mb-4 md:mb-0 md:text-right">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6 }}
                  className="font-mono text-xs uppercase tracking-widest text-muted"
                >
                  {job.period}
                </motion.span>
                <span className="absolute -right-[calc(1.25rem+1px)] top-1 hidden h-3 w-3 -translate-y-0 rounded-full border-2 border-accent bg-bg md:block" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease }}
                className="rounded-2xl border border-border bg-surface/40 p-6 md:p-8"
              >
                <h3 className="font-display text-xl font-semibold md:text-2xl">{job.role}</h3>
                <div className="mt-1 flex items-center gap-2 font-mono text-sm text-accent">
                  {job.company}
                </div>

                <ul className="mt-5 space-y-3">
                  {job.bullets.map((b, bi) => (
                    <motion.li
                      key={bi}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: bi * 0.12, ease }}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {b}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                  {job.stats.map((s, si) => (
                    <div key={si} className="bg-bg p-4 text-center">
                      <div className="font-display text-2xl font-bold text-accent md:text-3xl">
                        <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-wider text-muted">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
