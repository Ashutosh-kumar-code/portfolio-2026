import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight, FiCode, FiLayers, FiServer } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';

const roles = ['MERN Stack Developer', 'React.js Specialist', 'Next.js Engineer', 'Full Stack Developer'];

// ── Typewriter ───────────────────────────────────────────────────────────────
function TypeWriter() {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.substring(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = current.substring(0, displayed.length - 1);
        setDisplayed(next);
        if (next === '') { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length); }
      }
    }, deleting ? 50 : 95);
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span>
      <span style={{
        background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700,
      }}>{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        style={{ color: 'var(--accent)', fontWeight: 300, marginLeft: '2px' }}
      >|</motion.span>
    </span>
  );
}

// ── Background canvas: birds + particles ─────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    class Bird {
      constructor(init = false) { this.reset(init); }
      reset(init = false) {
        this.x = init ? Math.random() * canvas.width : -60;
        this.y = Math.random() * canvas.height * 0.85 + 20;
        this.baseY = this.y;
        this.speed = 0.4 + Math.random() * 0.9;
        this.size = 4 + Math.random() * 8;
        this.flapAngle = Math.random() * Math.PI * 2;
        this.flapSpeed = 0.03 + Math.random() * 0.04;
        this.waveAmp = 15 + Math.random() * 25;
        this.waveFreq = 0.002 + Math.random() * 0.003;
        this.t = Math.random() * 1000;
        this.opacity = 0.15 + Math.random() * 0.2;
        this.color = Math.random() > 0.5 ? '#2563eb' : '#7c3aed';
      }
      update() {
        this.x += this.speed; this.flapAngle += this.flapSpeed; this.t += this.speed;
        this.y = this.baseY + Math.sin(this.t * this.waveFreq) * this.waveAmp;
        if (this.x > canvas.width + 80) this.reset();
      }
      draw() {
        const flap = Math.sin(this.flapAngle) * this.size * 0.7;
        ctx.save(); ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color; ctx.lineWidth = 1.3; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x - this.size, this.y - flap);
        ctx.quadraticCurveTo(this.x - this.size * 0.4, this.y + flap * 0.3, this.x, this.y);
        ctx.moveTo(this.x + this.size, this.y - flap);
        ctx.quadraticCurveTo(this.x + this.size * 0.4, this.y + flap * 0.3, this.x, this.y);
        ctx.stroke(); ctx.restore();
      }
    }

    class Dot {
      constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
        this.r = 1.5 + Math.random() * 1.5;
        this.color = Math.random() > 0.5 ? '#2563eb' : '#7c3aed';
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.globalAlpha = 0.25; ctx.fill(); ctx.globalAlpha = 1;
      }
    }

    const birds = Array.from({ length: 18 }, () => new Bird(true));
    const dots = Array.from({ length: 40 }, () => new Dot());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${0.08 * (1 - d / 100)})`; ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
        dots[i].update(); dots[i].draw();
      }
      birds.forEach(b => { b.update(); b.draw(); });
      animId = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

// ── Floating stat card ────────────────────────────────────────────────────────
function StatCard({ icon: Icon, value, label, color, delay, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: `0 12px 32px ${color}20` }}
      style={{
        background: '#fff',
        border: `1px solid ${color}25`,
        borderRadius: '14px',
        padding: '0.9rem 1.1rem',
        display: 'flex', alignItems: 'center', gap: '0.7rem',
        boxShadow: `0 4px 20px rgba(0,0,0,0.07)`,
        position: 'absolute',
        transition: 'box-shadow 0.3s',
        ...style,
      }}
    >
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: `${color}12`, display: 'flex', alignItems: 'center',
        justifyContent: 'center', color, fontSize: '1rem', flexShrink: 0,
      }}>
        <Icon />
      </div>
      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 500, marginTop: '1px' }}>{label}</div>
      </div>
    </motion.div>
  );
}

const socials = [
  { icon: FiGithub, href: 'https://github.com/Ashutosh-kumar-code', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/ashutosh-kumar', label: 'LinkedIn' },
];

const techStack = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
];

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 50]);

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '0 2rem', position: 'relative', overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      <HeroCanvas />

      {/* Diagonal tinted panel */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '48%', height: '100%',
        background: 'linear-gradient(160deg, rgba(37,99,235,0.035) 0%, rgba(124,58,237,0.055) 100%)',
        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Glow blobs */}
      <div style={{ position: 'absolute', top: '8%', right: '12%', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '12%', left: '2%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        paddingTop: '5rem', opacity: heroOpacity, y: heroY, position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          className="hero-grid">

          {/* ── LEFT ── */}
          <div>
            {/* Status pill */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '1.8rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4rem 1rem', borderRadius: '100px',
                background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.25)',
                color: '#16a34a', fontSize: '0.8rem', fontWeight: 600,
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }} />
                Available for work
              </span>
            </motion.div>
           

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '1rem', color: 'var(--text)', letterSpacing: '-1px' }}
            >
              Hi, I'm{' '}
              <span style={{ display: 'block', background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Ashutosh Kumar
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', marginBottom: '1.6rem', minHeight: '2.2rem' }}>
              <TypeWriter />
            </motion.div>

            {/* Bio */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '460px' }}>
              3+ years building scalable MERN stack applications. Passionate about
              clean code, responsive UIs, and seamless API integrations.
            </motion.p>

            {/* Tech stack row */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.2rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500, marginRight: '0.2rem' }}>Tech stack:</span>
              {techStack.map(({ name, icon }) => (
                <motion.div key={name} whileHover={{ y: -3, scale: 1.15 }}
                  title={name}
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    width: '34px', height: '34px', borderRadius: '9px',
                    background: 'var(--card)', border: '1.5px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}>
                  <img src={icon} alt={name} width={20} height={20} style={{ objectFit: 'contain',
                    filter: name === 'Next.js' ? 'invert(0.15)' : 'none' }}
                    onError={e => { e.target.style.display = 'none'; }} />
                </motion.div>
              ))}
              <motion.span
                whileHover={{ scale: 1.05 }}
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}
              >+more</motion.span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.2rem' }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(37,99,235,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '0.85rem 2rem', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  boxShadow: '0 4px 20px rgba(37,99,235,0.25)',
                }}>
                View Projects <FiArrowRight />
              </motion.button>
              <motion.a href="#"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.85rem 2rem', borderRadius: '10px',
                  border: '1.5px solid var(--border)', color: 'var(--text)',
                  fontWeight: 600, fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'var(--card)', boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}>
                <FiDownload /> Download CV
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'var(--card)', border: '1.5px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--muted)', fontSize: '1.1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                  aria-label={label}>
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Professional photo card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className="hero-avatar-wrap"
          >
            {/* Outer wrapper — gives room for floating cards */}
            <div style={{ position: 'relative', width: '320px', height: '400px' }}>

              {/* Animated gradient blob behind photo */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: '-24px',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.14) 50%, rgba(245,158,11,0.08) 100%)',
                  borderRadius: '40% 60% 55% 45% / 45% 40% 60% 55%',
                  filter: 'blur(2px)',
                  zIndex: 0,
                }}
              />

              {/* Photo card */}
              <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', height: '100%',
                borderRadius: '24px', overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(37,99,235,0.15), 0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid rgba(37,99,235,0.12)',
              }}>
                <img
                  src="/mypic.png"
                  alt="Ashutosh Kumar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Gradient overlay at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, rgba(15,23,42,0.55) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
                {/* Name tag at bottom of photo */}
                {/* <div style={{
                  position: 'absolute', bottom: '1.2rem', left: '1.2rem', right: '1.2rem',
                }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>Ashutosh Kumar</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: '2px' }}>Full Stack Developer · Indore, India</div>
                </div> */}
              </div>

              {/* Floating stat card — top right */}
              <StatCard
                icon={FiCode}
                value="3+ Yrs"
                label="Experience"
                color="#2563eb"
                delay={0.6}
                style={{ top: '-16px', right: '-28px', minWidth: '130px', zIndex: 10 }}
              />

              {/* Floating stat card — bottom left */}
              <StatCard
                icon={FiLayers}
                value="10+ Projects"
                label="Delivered"
                color="#7c3aed"
                delay={0.75}
                style={{ bottom: '60px', left: '-32px', minWidth: '130px', zIndex: 10 }}
              />

              {/* Floating stat card — bottom right */}
              <StatCard
                icon={FiServer}
                value="3 Companies"
                label="Worked"
                color="#f59e0b"
                delay={0.9}
                style={{ bottom: '-16px', right: '-20px', minWidth: '120px', zIndex: 10 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.78rem', cursor: 'pointer' }}
          >
            <span>Scroll down</span>
            <div style={{ width: '24px', height: '38px', borderRadius: '12px', border: '2px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px' }}>
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{ width: '4px', height: '8px', borderRadius: '2px', background: 'var(--accent)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-avatar-wrap { display: none !important; }
        }
      `}</style>
    </section>
  );
}
