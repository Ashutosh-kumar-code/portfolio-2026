import { motion } from 'framer-motion';

// Sparkle particle that shoots upward from the underline
function Sparkle({ color, delay, x }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -28, -52],
        scale: [0, 1.2, 0.4],
      }}
      transition={{
        duration: 1.1,
        delay,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: 2.4,
      }}
      style={{
        position: 'absolute',
        bottom: '4px',
        left: '50%',
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px 2px ${color}90`,
        pointerEvents: 'none',
      }}
    />
  );
}

const sparkleOffsets = [-32, -20, -8, 4, 16, 28, 40];

export default function SectionHeading({ title, icon: Icon, iconColor = 'var(--accent)', inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      style={{ textAlign: 'center', marginBottom: '3.5rem' }}
    >
      {/* Title row */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
        {Icon && (
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: '10px',
              background: `${iconColor}12`,
              border: `1px solid ${iconColor}30`,
              color: iconColor, fontSize: '1.2rem', flexShrink: 0,
              boxShadow: `0 4px 16px ${iconColor}20`,
            }}
          >
            <Icon />
          </motion.span>
        )}
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 800, lineHeight: 1.1, margin: 0,
          background: `linear-gradient(135deg, var(--text) 40%, ${iconColor})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {title}
        </h2>
      </div>

      {/* Underline + sparkles */}
      {inView && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '3px', width: '80px', borderRadius: '2px',
                background: `linear-gradient(90deg, ${iconColor}, var(--accent2))`,
                transformOrigin: 'left',
              }}
            />
            {/* Sparkles rising from bar */}
            {sparkleOffsets.map((x, i) => (
              <Sparkle
                key={i}
                color={i % 2 === 0 ? iconColor : 'var(--accent2)'}
                delay={0.5 + i * 0.13}
                x={x}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
