import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

// Animated number counter
function Counter({ to, suffix = '', duration = 1.5, inView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: 'easeOut' });
    return controls.stop;
  }, [inView, to, duration, count, suffix]);

  return <motion.span>{rounded}</motion.span>;
}

const stats = [
  { num: 3,   suffix: '+',  label: 'Years Experience' },
  { num: 5,   suffix: '+',  label: 'Projects Delivered' },
  { num: 4,   suffix: '',   label: 'Companies Worked' },
  { num: 100, suffix: '%',  label: 'Commitment to Quality' },
];

export default function About() {
  const [ref, inView] = useInView(0.2);

  return (
    <section id="about" style={{ padding: '6rem 2rem', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <SectionHeading tag="about_me" title="Who I Am" icon={FiUser} iconColor="#7c3aed" inView={inView} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          className="about-grid">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{
              background: 'var(--card)', borderRadius: '20px', padding: '2.5rem',
              border: '1px solid var(--border)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              }} />
              <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                I'm a passionate <span style={{ color: 'var(--accent2)', fontWeight: 600 }}>MERN Stack Developer</span> with
                3+ years of hands-on experience building modern web applications. I specialize in
                React.js, Next.js, Node.js, and cloud services like AWS.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                I love turning complex problems into elegant, performant solutions. Whether it's
                crafting pixel-perfect animated UIs or designing robust RESTful APIs, I bring the same
                level of care and attention to every layer of the stack.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.9 }}>
                I'm eager to continuously upgrade my knowledge and skills and apply them for the
                growth and success of both the organization and myself.
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                {['React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'].map(tag => (
                  <span key={tag} style={{
                    padding: '0.3rem 0.8rem', borderRadius: '6px',
                    background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
                    color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {stats.map(({ num, suffix, label }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(124,58,237,0.2)' }}
                  style={{
                    background: 'var(--card)', borderRadius: '16px', padding: '2rem',
                    border: '1px solid var(--border)', textAlign: 'center',
                    cursor: 'default', transition: 'box-shadow 0.3s',
                  }}
                >
                  <div style={{
                    fontSize: '2.5rem', fontWeight: 900,
                    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem',
                  }}>
                    <Counter to={num} suffix={suffix} inView={inView} />
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 500 }}>{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
