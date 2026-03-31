import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 28;

function rand(min, max) { return Math.random() * (max - min) + min; }

export default function ScrollParticles() {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const particles = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(1, 2.5),
      speedX: rand(-0.15, 0.15),
      speedY: rand(-0.3, -0.08),
      opacity: rand(0.15, 0.5),
      color: Math.random() > 0.5 ? '124,58,237' : '6,182,212',
    }));

    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    let lastScroll = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollDelta = (scrollRef.current - lastScroll) * 0.04;
      lastScroll = scrollRef.current;

      particles.current.forEach(p => {
        // Drift upward + react to scroll speed
        p.y += p.speedY - scrollDelta;
        p.x += p.speedX;

        // Wrap around
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Draw glow dot
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grd.addColorStop(0, `rgba(${p.color},${p.opacity})`);
        grd.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
