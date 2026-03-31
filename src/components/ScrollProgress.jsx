import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))',
        scaleX, transformOrigin: '0%',
        zIndex: 9999, pointerEvents: 'none',
        boxShadow: '0 0 10px rgba(124,58,237,0.8), 0 0 20px rgba(6,182,212,0.4)',
      }}
    />
  );
}
