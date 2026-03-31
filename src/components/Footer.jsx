import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';

const socials = [
  { icon: FiGithub, href: 'https://github.com/Ashutosh-kumar-code', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/ashutosh-kumar', label: 'LinkedIn' },
];

const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Footer() {
  return (
    <footer style={{
      padding: '3rem 2rem', borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{
            fontWeight: 800, fontSize: '1.4rem',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            &lt;AK /&gt;
          </div>

          <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {links.map(link => (
              <motion.button key={link}
                whileHover={{ color: 'var(--accent)' }}
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer',
                  fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
              >
                {link}
              </motion.button>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                whileHover={{ y: -3, color: 'var(--accent)' }}
                style={{ color: 'var(--muted)', fontSize: '1.1rem', transition: 'color 0.2s' }}
                aria-label={label}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            Built with <FiHeart style={{ color: '#f43f5e' }} /> using React & Framer Motion · © {new Date().getFullYear()} Ashutosh Kumar
          </p>
        </div>
      </div>
    </footer>
  );
}
