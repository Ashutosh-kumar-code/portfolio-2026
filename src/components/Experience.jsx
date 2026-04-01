import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const experiences = [
  {
    role: 'Software Developer',
    company: 'RightByte Technologies Pvt Ltd',
    period: '06/2025 – Present',
    location: 'Indore',
    type: 'Full-time',
    color: '#7c3aed',
    points: [
      'Working as a Software Developer handling full-stack development tasks',
      'Building and maintaining scalable web applications using modern tech stacks',
      'Collaborating with cross-functional teams to deliver high-quality software solutions',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Codecaffiene Technologies Pvt Ltd',
    period: '10/2024 – 06/2025',
    location: 'Indore',
    type: 'Full-time',
    color: '#06b6d4',
    points: [
      'Worked as a full-stack developer handling both frontend and backend development using Next.js',
      'Built scalable and responsive UI components in React.js, implementing state management with Redux',
      'Integrated third-party APIs and optimized application performance across the stack',
    ],
  },
  {
    role: 'Jr. MERN Stack Developer',
    company: 'InfoSparkles IT Solution',
    period: '05/2023 – 10/2024',
    location: 'Indore',
    type: 'Full-time',
    color: '#f59e0b',
    points: [
      'Developed full-stack web applications focused on performance and scalability',
      'Designed responsive, animated UIs with seamless API integration',
      'Built custom RESTful APIs and optimized database queries for better performance',
    ],
  },
  {
    role: 'MERN Stack Developer Intern',
    company: 'Infograins Software Solutions Pvt. Ltd.',
    period: '08/2022 – 03/2023',
    location: 'Indore',
    type: 'Full-time',
    color: '#10b981',
    points: [
      'Developed and maintained web applications using the MERN stack',
      'Collaborated with the team to build responsive and user-friendly interfaces',
      'Worked on API development and database management with MongoDB',
    ],
  },
];

export default function Experience() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="experience" style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }} ref={ref}>
        <SectionHeading tag="work_history" title="Experience" icon={FiBriefcase} iconColor="#f59e0b" inView={inView} />

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Line */}
          <div style={{
            position: 'absolute', left: '24px', top: 0, bottom: 0, width: '2px',
            background: 'linear-gradient(to bottom, var(--accent), var(--accent2), transparent)',
          }} />

          {experiences.map((exp, i) => (
            <motion.div key={exp.company}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', paddingLeft: '0' }}
            >
              {/* Dot */}
              <div style={{ flexShrink: 0, position: 'relative', zIndex: 2 }}>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  style={{
                    width: '50px', height: '50px', borderRadius: '50%',
                    background: 'var(--bg)',
                    border: `2px solid ${exp.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: exp.color, fontSize: '1.1rem',
                    boxShadow: `0 0 0 4px var(--bg)`,
                  }}
                >
                  <FiBriefcase />
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -3, boxShadow: `0 20px 40px ${exp.color}15` }}
                style={{
                  flex: 1, background: 'var(--card)', borderRadius: '16px', padding: '1.8rem',
                  border: '1px solid var(--border)', transition: 'box-shadow 0.3s',
                  borderLeft: `3px solid ${exp.color}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{exp.role}</h3>
                    <span style={{ color: exp.color, fontWeight: 600, fontSize: '0.95rem' }}>{exp.company}</span>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600,
                    background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30`,
                    alignSelf: 'flex-start',
                  }}>{exp.type}</span>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FiCalendar /> {exp.period}
                  </span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FiMapPin /> {exp.location}
                  </span>
                </div>

                <ul style={{ paddingLeft: '1.2rem' }}>
                  {exp.points.map((pt, pi) => (
                    <li key={pi} style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.4rem' }}>
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
