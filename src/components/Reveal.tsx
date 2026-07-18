import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.08 },
  }),
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'span' | 'p' | 'h2' | 'h3';
  amount?: number;
};

/** Scroll-triggered entrance. Framer Motion honors reduced-motion automatically. */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  amount = 0.3,
}: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

/** Word-by-word / line stagger for headline reveals. */
export function RevealText({
  text,
  className,
  wordClassName,
  amount = 0.5,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  amount?: number;
}) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: 0.045 }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            variants={{
              hidden: { y: '110%' },
              show: { y: 0, transition: { duration: 0.7, ease } },
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
