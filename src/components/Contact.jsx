import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiMessageCircle } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'ashu2040kumar@gmail.com', href: 'mailto:ashu2040kumar@gmail.com' },
  { icon: FiMapPin, label: 'Location', value: 'Indore, Madhya Pradesh', href: null },
];

const socials = [
  { icon: FiGithub, href: 'https://github.com/Ashutosh-kumar-code', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/ashutosh-kumar', label: 'LinkedIn' },
];

export default function Contact() {
  const [ref, inView] = useInView(0.2);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: '10px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
    color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '6rem 2rem', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>
        <SectionHeading tag="get_in_touch" title="Let's Work Together" icon={FiMessageCircle} iconColor="#10b981" inView={inView} />
          <p style={{ color: 'var(--muted)', marginTop: '-2rem', marginBottom: '3rem', textAlign: 'center' }}>
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}
          className="contact-grid">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{
              background: 'var(--card)', borderRadius: '20px', padding: '2.5rem',
              border: '1px solid var(--border)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              }} />
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Open to Opportunities
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Currently available for freelance projects and full-time roles. Let's build something great together.
              </p>

              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'var(--accent)', fontSize: '1rem',
                  }}>
                    <Icon />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.1rem' }}>{label}</div>
                    {href
                      ? <a href={href} style={{ color: 'var(--text)', fontSize: '0.9rem', fontWeight: 500 }}>{value}</a>
                      : <span style={{ color: 'var(--text)', fontSize: '0.9rem', fontWeight: 500 }}>{value}</span>
                    }
                  </div>
                </div>
              ))}

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>Find me on</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {socials.map(({ icon: Icon, href, label }) => (
                    <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                      whileHover={{ y: -3, color: 'var(--accent)' }}
                      style={{ color: 'var(--muted)', fontSize: '1.2rem', transition: 'color 0.2s' }}
                      aria-label={label}
                    >
                      <Icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} style={{
              background: 'var(--card)', borderRadius: '20px', padding: '2.5rem',
              border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}
                className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                    Your Name
                  </label>
                  <input
                    type="text" required placeholder="John Doe"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                    Email Address
                  </label>
                  <input
                    type="email" required placeholder="john@example.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Message
                </label>
                <textarea
                  required rows={6} placeholder="Tell me about your project..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', padding: '0.9rem', borderRadius: '10px', border: 'none',
                  background: sent
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'background 0.3s',
                }}
              >
                {sent ? '✓ Message Sent!' : <><FiSend /> Send Message</>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
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
