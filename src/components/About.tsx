import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/smoothScroll';
import { profile, education } from '../data/content';
import SectionHeading from './SectionHeading';
import { isCoarsePointer } from '../hooks/useReducedMotion';

const ABOUT_TEXT =
  'Software developer with hands-on experience in backend systems and data engineering — Java, Python, REST APIs and automation. I build data pipelines, web-scraping systems and scalable backend services, with a growing foundation in DSA and system design — shipping clean, reliable software in production, not just on a §whiteboard.';

const FACTS = [
  { k: 'Focus', v: 'Software Engineer' },
  { k: 'Stack', v: 'Java · Python · REST · Spring' },
  { k: 'Currently', v: 'SDE 1 @ AnantaSutra' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!reduced && linesRef.current) {
        const words = linesRef.current.querySelectorAll('.about-word');
        gsap.set(words, { opacity: 0.12, y: 14 });
        ScrollTrigger.create({
          trigger: linesRef.current,
          start: 'top 80%',
          onEnter: () =>
            gsap.to(words, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.022,
            }),
        });
      }

      // Photo parallax on scroll.
      if (!reduced && photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { y: 40 },
          {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Tilt on mouse move (desktop only).
  const onMouseMove = (e: React.MouseEvent) => {
    if (isCoarsePointer() || !photoInnerRef.current) return;
    const r = photoInnerRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    photoInnerRef.current.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
  };
  const onMouseLeave = () => {
    if (photoInnerRef.current)
      photoInnerRef.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <SectionHeading index="01" label="About" title="Who's behind the commits" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <p
            ref={linesRef}
            className="font-display text-2xl leading-[1.35] tracking-tight md:text-[1.9rem]"
          >
            {ABOUT_TEXT.split(' ').map((word, i) => {
              const accent = word.startsWith('§');
              return (
                <span key={i}>
                  <span className={`about-word inline-block ${accent ? 'text-accent' : ''}`}>
                    {accent ? word.slice(1) : word}
                  </span>{' '}
                </span>
              );
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.k} className="bg-bg p-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  {f.k}
                </div>
                <div className="mt-2 font-display text-sm font-medium text-text">{f.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface/40 p-5">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Education
            </div>
            <div className="mt-2 font-display text-lg font-medium">{education.degree}</div>
            <div className="text-sm text-muted">
              {education.school} · {education.period}
            </div>
          </div>
        </div>

        {/* Photo */}
        <div ref={photoRef} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            ref={photoInnerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            data-cursor="hover"
            className="group relative aspect-[5/6] overflow-hidden rounded-2xl border border-border bg-surface transition-transform duration-300 will-change-transform"
          >
            <picture>
              <source srcSet={profile.photoWebp} type="image/webp" />
              <img
                src={profile.photo}
                alt="Abhishek Yadav"
                loading="lazy"
                className="h-full w-full object-cover object-top opacity-95 mix-blend-luminosity transition-all duration-500 group-hover:mix-blend-normal group-hover:opacity-100"
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* corner ticks */}
            <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-accent/70" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-accent/70" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-accent">
              ● online · {profile.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
