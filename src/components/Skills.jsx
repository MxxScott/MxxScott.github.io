'use client';

import { motion } from 'framer-motion';
import { FlowItem } from './Flow';

/* brand color + short abbreviation for each tech */
const TECH = {
  'Nuxt':                    { color: '#00dc82', abbr: 'Nx', fg: '#000' },
  'Vue 3':                   { color: '#42b883', abbr: 'V',  fg: '#fff' },
  'React 19':                { color: '#61dafb', abbr: '⚛',  fg: '#000' },
  'Next.js 15':              { color: '#ffffff', abbr: 'N',  fg: '#000' },
  'Tailwind CSS':            { color: '#06b6d4', abbr: 'Tw', fg: '#000' },
  'Framer Motion':           { color: '#ff4d6a', abbr: 'FM', fg: '#fff' },
  'HTML5':                   { color: '#e34f26', abbr: 'H5', fg: '#fff' },
  'CSS3':                    { color: '#264de4', abbr: 'C3', fg: '#fff' },
  'JavaScript (ES2024)':     { color: '#f7df1e', abbr: 'JS', fg: '#000' },
  'TypeScript':              { color: '#3178c6', abbr: 'TS', fg: '#fff' },
  'Three.js / R3F':          { color: '#8ca6ff', abbr: '3D', fg: '#000' },
  'Responsive Design':       { color: '#8b5cf6', abbr: '↕',  fg: '#fff' },
  'Python':                  { color: '#3776ab', abbr: 'Py', fg: '#fff' },
  'C':                       { color: '#a8b9cc', abbr: 'C',  fg: '#000' },
  'C++':                     { color: '#00599c', abbr: 'C+', fg: '#fff' },
  'Java':                    { color: '#ed8b00', abbr: 'Jv', fg: '#fff' },
  'RISC-V / MIPS ASM':       { color: '#6b7280', abbr: '01', fg: '#fff' },
  'Node.js':                 { color: '#339933', abbr: 'Nd', fg: '#fff' },
  'Express':                 { color: '#d1d5db', abbr: 'Ex', fg: '#000' },
  'Git / GitHub':            { color: '#f05032', abbr: 'G',  fg: '#fff' },
  'GitHub Actions (CI/CD)':  { color: '#2088ff', abbr: 'CI', fg: '#fff' },
  'Netlify':                 { color: '#00c7b7', abbr: 'NF', fg: '#000' },
};

const GROUPS = [
  {
    title: 'Frontend Frameworks',
    skills: ['Nuxt', 'Vue 3', 'React 19', 'Next.js 15', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Core Web',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES2024)', 'TypeScript', 'Three.js / R3F', 'Responsive Design'],
  },
  {
    title: 'Languages & Systems',
    skills: ['Python', 'C', 'C++', 'Java', 'RISC-V / MIPS ASM'],
  },
  {
    title: 'Backend & Tooling',
    skills: ['Node.js', 'Express', 'Git / GitHub', 'GitHub Actions (CI/CD)', 'Netlify'],
  },
];

function IconChip({ name }) {
  const meta = TECH[name];
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-line bg-accent/10 py-1 pl-1 pr-3 text-xs text-[#c6d2f2]">
      {meta ? (
        <span
          style={{
            background: meta.color,
            color: meta.fg,
            minWidth: 20,
            height: 20,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 0,
            flexShrink: 0,
          }}
        >
          {meta.abbr}
        </span>
      ) : (
        <span className="h-2 w-2 shrink-0 rounded-full bg-accent/60" />
      )}
      {name}
    </span>
  );
}

export default function Skills() {
  return (
    <section className="section-scroll h-full overflow-y-auto">
      <div className="flex min-h-full items-center px-6 py-12">
        <div className="mx-auto w-full max-w-6xl">
          <FlowItem from="left" order={0}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-mint">Skills</p>
          </FlowItem>
          <FlowItem from="left" order={1}>
            <h2 className="font-display mb-3 text-3xl font-bold md:text-4xl">Tools I work with</h2>
          </FlowItem>
          <FlowItem from="left" order={2}>
            <p className="mb-10 max-w-xl text-muted">
              Frameworks I&apos;m strong in, languages I&apos;m fluent in, and the foundations underneath.
            </p>
          </FlowItem>

          <div className="grid gap-4 sm:grid-cols-2">
            {GROUPS.map((g, gi) => (
              <FlowItem key={g.title} from={gi % 2 === 0 ? 'left' : 'right'} order={2 + gi}>
                <motion.div
                  whileHover={{ y: -5, borderColor: 'rgba(91,130,255,0.45)' }}
                  className="card h-full p-6"
                >
                  <h3 className="font-display mb-4 flex items-center gap-2.5 text-lg font-semibold">
                    <span className="inline-block h-2 w-2 rounded-full bg-grad" />
                    {g.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <IconChip key={s} name={s} />
                    ))}
                  </div>
                </motion.div>
              </FlowItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
