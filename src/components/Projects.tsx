import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/content';
import ProjectMotif from './ProjectMotif';
import SectionHeading from './SectionHeading';

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, i }: { project: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-0 flex min-h-[100svh] items-center justify-center px-6 py-20 md:px-12 lg:px-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
        style={{ top: `${i * 12}px` }}
        className="group relative w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface/70 backdrop-blur-sm"
      >
        {/* accent top hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* text side */}
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-5xl font-bold text-border transition-colors group-hover:text-accent/30 md:text-6xl">
                  {project.index}
                </span>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  aria-label={`${project.title} on GitHub`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Github size={18} />
                </a>
              </div>

              <div className="font-mono text-xs uppercase tracking-widest text-accent">
                {project.subtitle}
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
                {project.description}
              </p>
              <p className="mt-4 max-w-md font-mono text-xs leading-relaxed text-muted/70">
                {project.accentNote}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-bg/50 px-3 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                data-cursor-label="View"
                className="mt-6 inline-flex items-center gap-2 font-display text-sm font-medium text-text transition-colors hover:text-accent"
              >
                Explore project
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* motif side */}
          <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border-t border-border bg-[radial-gradient(circle_at_center,#111318,transparent_75%)] p-8 lg:min-h-full lg:border-l lg:border-t-0">
            <div
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: 'radial-gradient(circle at center, #000 30%, transparent 75%)',
              }}
            />
            <div className="relative w-full max-w-[320px]">
              <ProjectMotif motif={project.motif} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-12 md:pt-32 lg:px-20">
        <SectionHeading index="03" label="Selected Work" title="Systems worth shipping" />
      </div>

      <div className="relative">
        {projects.map((p, i) => (
          <ProjectCard key={p.index} project={p} i={i} />
        ))}
      </div>
    </section>
  );
}
