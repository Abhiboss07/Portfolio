import type { ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

export default function MagneticSocial({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.5);
  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-label={label}
      data-cursor="link"
      data-magnetic
      className="grid h-14 w-14 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
