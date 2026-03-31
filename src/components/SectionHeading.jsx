import { motion } from 'framer-motion';

const iconVariants = {
  initial: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, -15, 15, -10, 10, 0],
    scale: [1, 1.2, 1.1, 1.15, 1],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

// Spark particle that flies off the underline
function Spark({ color, delay, x, y }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, x],
        y: [0, y],
        scale: [0.5, 1.2, 0.4],
      }}
      transition={{ duration: 0.9, delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 2.2 }}
      style={{
        position: 'absolute',
        width: '4px', height: '4px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px 2px ${color}`,
        pointerEvents: 'none',
      }}
    />
  );
}

const sparks = [
  { x: -18, y: -22, delay: 0 },
  { x: 12, y: -28, delay: 0.1 },
  { x: 28, y: -14, delay: 0.18 },
  { x: -28, y: -10, delay: 0.08 },
  { x: 6, y: -32, delay: 0.25 },
  { x: -10, y: -26, delay: 0.15 },
  { x: 22, y: -20, delay: 0.05 },
];

export default function SectionHeading({ tag, title, icon: Icon, iconColor = 'var(--accent)', inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      style={{ textAlign: 'center', marginBottom: '3.5rem' }}
    >
      {/* Tag line — no // prefix */}
      <span style={{
        color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem',
        fontFamily: 'Fira Code, monospace', letterSpacing: '3px',
        display: 'block', marginBottom: '0.9rem',
      }}>
        {tag}
      </span>

      {/* Title row with animated icon */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
        position: 'relative',
      }}>
        {Icon && (
          <motion.span
            variants={iconVariants}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: '12px',
              background: `${iconColor}18`,
              border: `1.5px solid ${iconColor}40`,
              color: iconColor, fontSize: '1.25rem', flexShrink: 0,
              boxShadow: `0 0 16px ${iconColor}25`,
            }}
          >
            <Icon />
          </motion.span>
        )}

        <h2 style={{
          fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
          fontWeight: 800, lineHeight: 1.1,
          margin: 0,
          background: `linear-gradient(135deg, var(--text) 30%, ${iconColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {title}
        </h2>
      </div>

      {/* Animated glowing underline with sparks */}
      {inView && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.9rem' }}>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            {/* Main glowing bar */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '3px', width: '80px', borderRadius: '2px',
                background: `linear-gradient(90deg, ${iconColor}, var(--accent2))`,
                boxShadow: `0 0 12px ${iconColor}80, 0 0 24px ${iconColor}40`,
              }}
            />

            {/* Travelling glow dot */}
            <motion.div
              initial={{ left: 0, opacity: 0 }}
              animate={{ left: ['0%', '100%', '0%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: `0 0 10px 4px ${iconColor}, 0 0 20px 8px ${iconColor}60`,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />

            {/* Sparks at the right end */}
            <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
              {sparks.map((s, i) => (
                <Spark key={i} color={iconColor} delay={s.delay + 0.9} x={s.x} y={s.y} />
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
