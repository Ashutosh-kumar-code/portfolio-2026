import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import ScrollProgress from './components/ScrollProgress';
import ScrollReveal from './components/ScrollReveal';
import ScrollParticles from './components/ScrollParticles';

export default function App() {
  return (
    <>
      <CursorFollower />
      <ScrollProgress />
      <ScrollParticles />

      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero has its own entrance animations */}
        <Hero />

        <ScrollReveal variant="fadeUp">
          <About />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.05}>
          <Skills />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.05}>
          <Projects />
        </ScrollReveal>

        <ScrollReveal variant="fadeLeft" delay={0.05}>
          <Experience />
        </ScrollReveal>

        <ScrollReveal variant="zoomIn" delay={0.05}>
          <Contact />
        </ScrollReveal>
      </main>

      <ScrollReveal variant="fadeUp" delay={0.05}>
        <Footer />
      </ScrollReveal>
    </>
  );
}
