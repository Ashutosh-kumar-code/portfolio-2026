import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (link) => {
    setOpen(false);
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{ fontWeight: 800, fontSize: '1.4rem', cursor: 'pointer',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        onClick={() => handleNav('Home')}
      >
        &lt;AK /&gt;
      </motion.div>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}
        className="nav-desktop">
        {links.map((link) => (
          <li key={link}>
            <motion.button
              whileHover={{ color: '#7c3aed' }}
              onClick={() => handleNav(link)}
              style={{ background: 'none', border: 'none', color: 'var(--text)',
                cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
                fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
            >
              {link}
            </motion.button>
          </li>
        ))}
        <li>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.5rem 1.2rem', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#fff', fontWeight: 600, fontSize: '0.85rem',
            }}
            onClick={(e) => { e.preventDefault(); handleNav('Contact'); }}
          >
            Hire Me
          </motion.a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="nav-hamburger"
        style={{ background: 'none', border: 'none', cursor: 'pointer',
          display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
      >
        {[0,1,2].map(i => (
          <motion.span key={i}
            animate={open ? (i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 7 } : { rotate: -45, y: -7 }) : { rotate: 0, y: 0, opacity: 1 }}
            style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text)', borderRadius: '2px' }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)', padding: '1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}
          >
            {links.map(link => (
              <button key={link} onClick={() => handleNav(link)}
                style={{ background: 'none', border: 'none', color: 'var(--text)',
                  cursor: 'pointer', fontSize: '1rem', fontWeight: 500,
                  textAlign: 'left', fontFamily: 'Inter, sans-serif', padding: '0.3rem 0' }}>
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
