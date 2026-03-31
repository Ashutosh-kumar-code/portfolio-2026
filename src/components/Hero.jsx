import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import { useEffect, useRef } from 'react';

const roles = ['MERN Stack Developer', 'React.js Specialist', 'Next.js Engineer', 'Full Stack Developer'];

function TypeWriter() {
  const ref = useRef(null);
  useEffect(() => {
    let roleIdx = 0, charIdx = 0, deleting = false;
    const tick = () => {
      const current = roles[roleIdx];
      if (ref.current) {
        ref.current.textContent = deleting
          ? current.substring(0, charIdx--)
          : current.substring(0, charIdx++);
      }
      let delay = deleting ? 60 : 100;
      if (!deleting && charIdx === current.length + 1) { delay = 1800; deleting = true; }
      if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 400; }
      setTimeout(tick, delay);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);
  return (
    <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>
      <span ref={ref} />
      <span style={{ animation: 'blink 1s infinite', color: 'var(--accent)' }}>|</span>
    </span>
  );
}

const socials = [
  { icon: FiGithub, href: 'https://github.com/Ashutosh-kumar-code', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/ashutosh-kumar', label: 'LinkedIn' },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 600], [0, -120]);
  const blob2Y = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);
  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '0 2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <motion.div style={{
        position: 'absolute', top: '10%', right: '5%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', y: blob1Y,
      }} />
      <motion.div style={{
        position: 'absolute', bottom: '10%', left: '5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', y: blob2Y,
      }} />

      <motion.div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', paddingTop: '5rem', opacity: heroOpacity, y: heroY }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          className="hero-grid">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span style={{
                display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '100px',
                background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
                color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem',
              }}>
                👋 Available for work
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem' }}
            >
              Hi, I'm{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Ashutosh Kumar
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', marginBottom: '1.5rem', minHeight: '2rem' }}
            >
              <TypeWriter />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '480px' }}
            >
              3+ years building scalable MERN stack applications. Passionate about
              clean code, responsive UIs, and seamless API integrations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '0.85rem 2rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Inter, sans-serif',
                }}
              >
                View My Work
              </motion.button>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.85rem 2rem', borderRadius: '10px',
                  border: '1px solid var(--border)', color: 'var(--text)',
                  fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <FiDownload /> Download CV
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ y: -3, color: 'var(--accent)' }}
                  style={{ color: 'var(--muted)', fontSize: '1.3rem', transition: 'color 0.2s' }}
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className="hero-avatar-wrap"
          >
            <div style={{ position: 'relative' }}>
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-20px',
                  borderRadius: '50%',
                  border: '2px dashed rgba(124,58,237,0.4)',
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-40px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(6,182,212,0.3)',
                }}
              />
              {/* Avatar circle */}
              <div style={{
                width: '280px', height: '280px', borderRadius: '50%',
                border: '3px solid rgba(124,58,237,0.5)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 0 60px rgba(124,58,237,0.3)',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
              }}>
                <img
                  src="/profile-pic.png"
                  alt="Ashutosh Kumar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* Floating badges */}
              {[
              { label: '3+ Yrs Exp', top: '5%', right: '-10%', color: 'var(--accent)' },
                { label: '5+ Projects', bottom: '10%', left: '-15%', color: 'var(--accent2)' },
                { label: 'Full Stack', top: '50%', right: '-20%', color: 'var(--accent3)' },
              ].map(({ label, color, ...pos }) => (
                <motion.div key={label}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
                  style={{
                    position: 'absolute', ...pos,
                    background: 'var(--card)', border: `1px solid ${color}40`,
                    borderRadius: '8px', padding: '0.4rem 0.8rem',
                    fontSize: '0.75rem', fontWeight: 700, color,
                    whiteSpace: 'nowrap', boxShadow: `0 4px 20px ${color}20`,
                  }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              color: 'var(--muted)', fontSize: '0.8rem', cursor: 'pointer' }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Scroll down</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-avatar-wrap { display: none !important; }
        }
      `}</style>
    </section>
  );
}
