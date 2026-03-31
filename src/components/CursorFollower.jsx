import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const ICONS = ['⚡', '{}', '</>', '★', '◈', '⬡'];

export default function CursorFollower() {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Fast dot
  const dotX = useSpring(mouseX, { stiffness: 300, damping: 22 });
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 22 });

  // Slower trailing ring
  const trailX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const [particles, setParticles] = useState([]);
  const [iconIdx, setIconIdx] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const counterRef = useRef(0);
  const lastPos = useRef({ x: -300, y: -300 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 65) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        const id = counterRef.current++;
        setIconIdx(id % ICONS.length);
        setParticles(prev => [
          ...prev.slice(-6),
          { id, x: e.clientX, y: e.clientY, icon: ICONS[id % ICONS.length] },
        ]);
        setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 900);
      }
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, textarea, select, label');
      setIsHover(!!el);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ── DEFAULT STATE: dot + ring + floating icon ── */}
      <AnimatePresence>
        {!isHover && (
          <>
            {/* Glowing dot */}
            <motion.div
              key="dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
                x: dotX, y: dotY,
                translateX: '-50%', translateY: '-50%',
                width: '9px', height: '9px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                boxShadow: '0 0 12px rgba(124,58,237,0.9), 0 0 4px rgba(6,182,212,0.6)',
              }}
            />

            {/* Trailing ring */}
            <motion.div
              key="ring"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998,
                x: trailX, y: trailY,
                translateX: '-50%', translateY: '-50%',
                width: '34px', height: '34px', borderRadius: '50%',
                border: '1.5px solid rgba(124,58,237,0.5)',
                boxShadow: '0 0 8px rgba(124,58,237,0.2)',
              }}
            />

            {/* Floating code icon */}
            <motion.div
              key="icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9997,
                x: trailX, y: trailY,
                translateX: '14px', translateY: '-26px',
                fontSize: '0.7rem', fontWeight: 700,
                fontFamily: 'Fira Code, monospace',
                color: 'var(--accent2)',
                textShadow: '0 0 8px rgba(6,182,212,0.7)',
              }}
            >
              {ICONS[iconIdx]}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── HOVER STATE: gradient arrow ── */}
      <AnimatePresence>
        {isHover && (
          <motion.div
            key="arrow"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.18, ease: 'backOut' }}
            style={{
              position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
              x: dotX, y: dotY,
              translateX: '-2px', translateY: '-2px',
            }}
          >
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="gf" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1.8" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Arrow shape */}
              <path
                d="M3 2 L3 22 L9 16 L13 25 L17 23 L13 14 L20 14 Z"
                fill="url(#ag)"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
                strokeLinejoin="round"
                filter="url(#gf)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle trail (always) */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.85, scale: 1, x: p.x, y: p.y }}
          animate={{ opacity: 0, scale: 0.2, y: p.y - 45 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9996,
            translateX: '-50%', translateY: '-50%',
            fontSize: '0.75rem', fontWeight: 700,
            fontFamily: 'Fira Code, monospace',
            color: 'var(--accent)',
            textShadow: '0 0 6px rgba(124,58,237,0.8)',
          }}
        >
          {p.icon}
        </motion.div>
      ))}
    </>
  );
}
