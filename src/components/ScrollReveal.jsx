import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const variants = {
  fadeUp:    { hidden: { opacity: 0, y: 50 },           visible: { opacity: 1, y: 0 } },
  fadeLeft:  { hidden: { opacity: 0, x: -60 },          visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 60 },           visible: { opacity: 1, x: 0 } },
  zoomIn:    { hidden: { opacity: 0, scale: 0.75 },     visible: { opacity: 1, scale: 1 } },
  flipUp:    { hidden: { opacity: 0, rotateX: 40, y: 40 }, visible: { opacity: 1, rotateX: 0, y: 0 } },
};

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  style = {},
}) {
  const [ref, inView] = useInView(threshold);
  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800, ...style }}
    >
      {children}
    </motion.div>
  );
}
