import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiCpu } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const skillGroups = [
  {
    label: 'Frontend',
    color: '#7c3aed',
    skills: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'SCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
    ],
  },
  {
    label: 'Backend',
    color: '#06b6d4',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Nest.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
    ],
  },
  {
    label: 'Database & ORM',
    color: '#f59e0b',
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Prisma ORM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
      { name: 'Sequelize', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    color: '#10b981',
    skills: [
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    ],
  },
  {
    label: 'Tools',
    color: '#f43f5e',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    ],
  },
];

const darkFilter = ['Express.js', 'GitHub', 'Next.js', 'Prisma ORM'];

function SkillPill({ name, icon, color, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -4, scale: 1.06 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.55rem',
        padding: '0.55rem 0.9rem',
        background: `${color}0d`,
        border: `1px solid ${color}30`,
        borderRadius: '10px',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}70`;
        e.currentTarget.style.background = `${color}18`;
        e.currentTarget.style.boxShadow = `0 6px 20px ${color}20`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${color}30`;
        e.currentTarget.style.background = `${color}0d`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img
        src={icon}
        alt={name}
        width={22}
        height={22}
        style={{
          objectFit: 'contain',
          filter: darkFilter.includes(name) ? 'invert(1) brightness(0.85)' : 'none',
          flexShrink: 0,
        }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }} ref={ref}>

        <SectionHeading tag="tech_stack" title="Skills & Technologies" icon={FiCpu} iconColor="#06b6d4" inView={inView} />

        {/* 2-column card grid */}
        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
        }}>
          {skillGroups.map(({ label, color, skills }, gi) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.5rem',
                // last item spans full width if odd count
                gridColumn: gi === skillGroups.length - 1 && skillGroups.length % 2 !== 0 ? '1 / -1' : undefined,
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.1rem' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: color, boxShadow: `0 0 6px ${color}`,
                  flexShrink: 0,
                }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>{label}</span>
                <div style={{ flex: 1, height: '1px', background: `${color}25` }} />
              </div>

              {/* Pills — wrap naturally, no fixed width */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {skills.map((skill, si) => (
                  <SkillPill
                    key={skill.name}
                    {...skill}
                    color={color}
                    inView={inView}
                    delay={gi * 0.07 + si * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .skills-grid > div { grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}
