'use client';

import { motion } from 'framer-motion';
import { FlowItem } from './Flow';

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
                      <span
                        key={s}
                        className="rounded-full border border-line bg-accent/10 px-3 py-1 text-xs text-[#c6d2f2]"
                      >
                        {s}
                      </span>
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
