import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionHeading({
  index,
  label,
  title,
  className = '',
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mb-14 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease }}
        className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted"
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-border" />
        {label}
      </motion.div>
      <h2 className="max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
        {/* Observe the static wrapper; animate the child so IntersectionObserver
            measures the un-transformed element and fires reliably. */}
        <motion.span
          className="block overflow-hidden pb-[0.1em]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: '110%' },
              show: { y: 0, transition: { duration: 0.8, ease } },
            }}
          >
            {title}
          </motion.span>
        </motion.span>
      </h2>
    </div>
  );
}
