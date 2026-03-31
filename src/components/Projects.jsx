import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiGithub, FiExternalLink, FiFolder, FiArrowUpRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const projects = [
  {
    title: 'Video LMS',
    desc: 'A full-featured Learning Management System with video content delivery, course management, and student progress tracking.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    category: 'Full Stack', color: '#7c3aed', emoji: '🎓',
    github: 'https://github.com/Ashutosh-kumar-code', live: 'https://lms.infosparkles.com/', featured: true,
  },
  {
    title: 'DesertGate',
    desc: 'A scalable web platform with responsive UI, seamless API integration, and optimized database queries for high performance.',
    tags: ['Next.js', 'Redux', 'Node.js', 'MongoDB'],
    category: 'Full Stack', color: '#06b6d4', emoji: '🏜️',
    github: 'https://github.com/Ashutosh-kumar-code', live: 'https://desert2.infosparkles.com/', featured: true,
  },
  {
    title: 'Vagus Health',
    desc: 'A mental health platform with a clean, accessible UI focused on user well-being and seamless navigation.',
    tags: ['React.js', 'Tailwind CSS', 'REST API'],
    category: 'Frontend', color: '#f59e0b', emoji: '🧠',
    github: 'https://github.com/Ashutosh-kumar-code', live: 'https://vagusmentalhealths.netlify.app/',
  },
  {
    title: 'Grocery Shop',
    desc: 'An online grocery shopping app with product listings, cart management, and a smooth checkout experience.',
    tags: ['React.js', 'Redux', 'Node.js', 'MongoDB'],
    category: 'Full Stack', color: '#10b981', emoji: '🛒',
    github: 'https://github.com/Ashutosh-kumar-code', live: 'https://grocery-onlineshop.netlify.app/',
  },
  {
    title: 'E-Power',
    desc: 'A dynamic web application with animated UI components, responsive design, and integrated backend APIs.',
    tags: ['React.js', 'Express.js', 'MongoDB', 'Bootstrap'],
    category: 'Full Stack', color: '#f43f5e', emoji: '⚡',
    github: 'https://github.com/Ashutosh-kumar-code', live: 'https://e-powerweb.netlify.app/',
  },
];

const filters = ['All', 'Full Stack', 'Frontend'];

// Big featured card — horizontal layout
function FeaturedCard({ p, i, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        border: `1px solid ${hovered ? p.color + '55' : 'var(--border)'}`,
        background: 'var(--card)',
        boxShadow: hovered ? `0 30px 80px ${p.color}20` : '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '260px',
      }}
      className="featured-card"
    >
      {/* Left: content */}
      <div style={{
        padding: '2.2rem 2.4rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', zIndex: 1,
      }}>
        {/* Top row */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{
              padding: '0.2rem 0.7rem', borderRadius: '100px',
              background: `${p.color}20`, color: p.color,
              fontSize: '0.7rem', fontWeight: 700, border: `1px solid ${p.color}35`,
            }}>{p.category}</span>
            <span style={{
              fontFamily: 'Fira Code, monospace', fontSize: '0.7rem',
              color: 'var(--muted)',
            }}>featured</span>
          </div>

          <h3 style={{
            fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.75rem',
            background: `linear-gradient(135deg, var(--text), ${p.color})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            lineHeight: 1.2,
          }}>{p.title}</h3>

          <p style={{ color: 'var(--muted)', fontSize: '0.87rem', lineHeight: 1.75, marginBottom: '1.4rem' }}>
            {p.desc}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.6rem' }}>
            {p.tags.map(tag => (
              <span key={tag} style={{
                padding: '0.22rem 0.6rem', borderRadius: '6px',
                fontSize: '0.71rem', fontWeight: 600,
                background: `${p.color}12`, color: p.color,
                border: `1px solid ${p.color}28`,
                fontFamily: 'Fira Code, monospace',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <motion.a href={p.github} target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1.1rem', borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)', color: 'var(--text)',
              fontSize: '0.82rem', fontWeight: 600,
              border: '1px solid var(--border)',
            }}
          >
            <FiGithub size={14} /> GitHub
          </motion.a>
          <motion.a href={p.live} target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1.1rem', borderRadius: '10px',
              background: p.color, color: '#fff',
              fontSize: '0.82rem', fontWeight: 700,
            }}
          >
            <FiExternalLink size={14} /> Live Demo
          </motion.a>
        </div>
      </div>

      {/* Right: visual panel */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `radial-gradient(ellipse at 30% 40%, ${p.color}22 0%, transparent 70%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderLeft: `1px solid ${p.color}18`,
      }}>
        {/* Grid lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`v${i}`} x1={`${i * 14.3}%`} y1="0" x2={`${i * 14.3}%`} y2="100%" stroke={p.color} strokeWidth="1" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={`${i * 20}%`} x2="100%" y2={`${i * 20}%`} stroke={p.color} strokeWidth="1" />
          ))}
        </svg>

        {/* Glow blob */}
        <div style={{
          position: 'absolute', width: '180px', height: '180px', borderRadius: '50%',
          background: p.color, opacity: 0.12, filter: 'blur(50px)',
        }} />

        {/* Emoji */}
        <motion.div
          animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ fontSize: '5rem', position: 'relative', zIndex: 1, userSelect: 'none' }}
        >
          {p.emoji}
        </motion.div>

        {/* Corner number */}
        <span style={{
          position: 'absolute', bottom: '16px', right: '20px',
          fontFamily: 'Fira Code, monospace', fontSize: '3rem', fontWeight: 900,
          color: p.color, opacity: 0.12, lineHeight: 1,
        }}>
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}

// Compact card for the bottom grid
function CompactCard({ p, i, offset, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: offset * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        background: 'var(--card)',
        border: `1px solid ${hovered ? p.color + '50' : 'var(--border)'}`,
        boxShadow: hovered ? `0 20px 50px ${p.color}18` : '0 2px 12px rgba(0,0,0,0.25)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        padding: '1.8rem',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Subtle top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${p.color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        {/* Emoji icon box */}
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: `${p.color}15`, border: `1px solid ${p.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem',
        }}>
          {p.emoji}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[{ icon: FiGithub, href: p.github }, { icon: FiExternalLink, href: p.live }].map(({ icon: Icon, href }, li) => (
            <motion.a key={li} href={href} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.15, color: p.color }}
              style={{
                width: '34px', height: '34px', borderRadius: '9px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--muted)', fontSize: '0.95rem',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Category */}
      <span style={{
        fontSize: '0.68rem', fontWeight: 700, color: p.color,
        letterSpacing: '1px', textTransform: 'uppercase',
        marginBottom: '0.4rem', display: 'block',
      }}>{p.category}</span>

      {/* Title */}
      <h3 style={{
        fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)',
        marginBottom: '0.6rem', lineHeight: 1.3,
      }}>{p.title}</h3>

      {/* Desc */}
      <p style={{
        color: 'var(--muted)', fontSize: '0.83rem', lineHeight: 1.7,
        flex: 1, marginBottom: '1.2rem',
      }}>{p.desc}</p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {p.tags.map(tag => (
          <span key={tag} style={{
            padding: '0.2rem 0.55rem', borderRadius: '5px',
            fontSize: '0.69rem', fontWeight: 600,
            background: `${p.color}10`, color: p.color,
            border: `1px solid ${p.color}25`,
            fontFamily: 'Fira Code, monospace',
          }}>{tag}</span>
        ))}
      </div>

      {/* Hover arrow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute', bottom: '1.6rem', right: '1.6rem',
          color: p.color, fontSize: '1.1rem',
        }}
      >
        <FiArrowUpRight />
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);
  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <section id="projects" style={{ padding: '6rem 2rem', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>

        <SectionHeading tag="my_work" title="Featured Projects" icon={FiFolder} iconColor="#7c3aed" inView={inView} />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: '0.55rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}
        >
          {filters.map(f => (
            <motion.button key={f}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setActive(f)}
              style={{
                padding: '0.48rem 1.25rem', borderRadius: '100px', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.83rem',
                background: active === f ? `linear-gradient(135deg, var(--accent), var(--accent2))` : 'var(--card)',
                color: active === f ? '#fff' : 'var(--muted)',
                outline: active === f ? 'none' : '1px solid var(--border)',
                boxShadow: active === f ? '0 4px 18px rgba(124,58,237,0.35)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {/* Featured row */}
          {featured.length > 0 && (
            <motion.div
              key="featured"
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.6rem', marginBottom: '1.6rem' }}
              className="featured-row"
            >
              {featured.map((p, i) => (
                <FeaturedCard key={p.title} p={p} i={i} inView={inView} />
              ))}
            </motion.div>
          )}

          {/* Compact grid */}
          {rest.length > 0 && (
            <motion.div
              key="rest"
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.4rem' }}
              className="compact-grid"
            >
              {rest.map((p, i) => (
                <CompactCard key={p.title} p={p} i={i} offset={featured.length + i} inView={inView} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-row { grid-template-columns: 1fr !important; }
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-card > div:last-child { height: 160px; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.06); }
          .compact-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .compact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
