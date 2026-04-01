import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiExternalLink, FiFolder } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const IMG1 = '/lms1.png';
// const IMG2 = '/Gemini_Generated_Image_fo7r7xfo7r7xfo7r.png';
const IMG2 = '/Epower.png';
const IMG3 = '/desert2.png';
const IMG4 = '/whyconsult.png';
const IMG5 = '/online-shop.jpeg';
const IMG6 = '/portfolio-a1.png';

const projects = [
  {
    title: 'WhyConsult – AI-Powered Business Consulting Platform',
    desc: 'WhyConsult is an AI-powered consulting platform that turns business data and surveys into actionable insights, automated reports, and strategic scorecards to help firms improve efficiency and decision-making.',
   tags: ['Next.js frontend backend both', 'Clerk Authentication', 'Supabase'],
    category: 'Next.js', color: '#7c3aed',
    live: 'https://lms.infosparkles.com/',
    image: IMG4,
  },
  {
    title: 'Video LMS',
    desc: 'A full-featured Learning Management System with video content delivery, course management, and student progress tracking.',
    tags: ['React.js','Redux'],
    category: 'React.js', color: '#7c3aed',
    live: 'https://lms.infosparkles.com/',
    image: IMG1,
  },
  {
    title: 'DesertGate',
    desc: 'A scalable web platform with responsive UI, seamless API integration, and optimized database queries for high performance.',
    tags: ['React.js', 'Redux'],
    category: 'React.js', color: '#2563eb',
    live: 'https://desert2.infosparkles.com/',
    image: IMG3,
  },
    {
    title: 'Portfolio Analyzer',
    desc: 'A dynamic web apPIs.',
    tags: ['React.js', 'Node.js', 'Express', 'Mongodb'],
    category: 'Full Stack', color: '#f43f5e',
    live: 'https://e-powerweb.netlify.app/',
    image: IMG6,
  },
  {
    title: 'Grocery Shop',
    desc: 'An online grocery shopping app with product listings, cart management, and a smooth checkout experience.',
    tags: ['HTML', 'JQuery'],
    category: 'Full Stack', color: '#10b981',
    live: 'https://grocery-onlineshop.netlify.app/',
    image: IMG5,
  },
  {
    title: 'E-Power',
    desc: 'A dynamic web application with animated UI components, responsive design, and integrated backend APIs.',
    tags: ['HTML', 'Bootstrap'],
    category: 'Full Stack', color: '#f43f5e',
    live: 'https://e-powerweb.netlify.app/',
    image: IMG2,
  },
  
];

function ProjectCard({ p, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderRadius: '18px',
        background: 'var(--card)',
        border: `1px solid ${hovered ? p.color + '60' : 'var(--border)'}`,
        boxShadow: hovered
          ? `0 20px 50px ${p.color}18, 0 4px 16px rgba(0,0,0,0.08)`
          : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px', flexShrink: 0 }}>
        <img
          src={p.image}
          alt={p.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${p.color}30 100%)`,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.3s',
        }} />

        {/* Category badge */}
        <span style={{
          position: 'absolute', top: '12px', left: '12px',
          padding: '0.22rem 0.7rem', borderRadius: '100px',
          background: `${p.color}ee`, color: '#fff',
          fontSize: '0.68rem', fontWeight: 700,
          backdropFilter: 'blur(6px)',
          boxShadow: `0 2px 8px ${p.color}40`,
        }}>{p.category}</span>
      </div>

      {/* Info */}
      <div style={{ padding: '1.4rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)',
          marginBottom: '0.5rem', lineHeight: 1.3,
        }}>{p.title}</h3>

        <p style={{
          color: 'var(--muted)', fontSize: '0.83rem', lineHeight: 1.7,
          marginBottom: '1.1rem', flex: 1,
        }}>{p.desc}</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem' }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              padding: '0.2rem 0.6rem', borderRadius: '6px',
              fontSize: '0.69rem', fontWeight: 600,
              background: `${p.color}10`, color: p.color,
              border: `1px solid ${p.color}25`,
            }}>{tag}</span>
          ))}
        </div>

        {/* Live Demo button */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <motion.a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.4rem', padding: '0.55rem',
              borderRadius: '8px', border: 'none',
              background: p.color, color: '#fff',
              fontSize: '0.82rem', fontWeight: 700,
              boxShadow: `0 3px 12px ${p.color}35`,
            }}
          >
            <FiExternalLink size={13} /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="projects" style={{ padding: '6rem 2rem', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>

        <SectionHeading tag="my_work" title="Featured Projects" icon={FiFolder} iconColor="#7c3aed" inView={inView} />

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
          className="projects-grid"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
