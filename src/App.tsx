import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import { useReducedMotion } from './hooks/useReducedMotion';
import { initSmoothScroll, getLenis, ScrollTrigger } from './lib/smoothScroll';

export default function App() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Lock scroll while the preloader is up.
  useEffect(() => {
    if (!ready) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const lenis = initSmoothScroll(reduced);
      lenis?.start();
      // Let the DOM settle, then recalc scroll positions.
      const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => window.clearTimeout(id);
    }
  }, [ready, reduced]);

  // Keep ScrollTrigger honest on resize.
  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      getLenis()?.stop();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Footer />
      </main>
    </MotionConfig>
  );
}
