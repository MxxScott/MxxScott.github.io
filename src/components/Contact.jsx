'use client';

import { FlowItem } from './Flow';

const EMAIL = 'dlawal979@gmail.com';

const SERVICES = [
  { t: 'Frontend builds', d: 'Multi-page sites & component-driven apps in Nuxt and React / Next.js.' },
  { t: 'Interactive & 3D', d: 'WebGL / R3F scenes and motion design that feels alive, not gimmicky.' },
  { t: 'End-to-end delivery', d: 'From design system to build pipeline, deploy and CI — shipped.' },
];

export default function Contact() {
  return (
    <section className="section-scroll h-full overflow-y-auto">
      <div className="flex min-h-full items-center px-6 py-12">
        <div className="mx-auto w-full max-w-5xl">

          <FlowItem from="up" order={0}>
            <p className="eyebrow mb-4 justify-center"><span className="num">05</span>&nbsp;Contact</p>
          </FlowItem>

          <FlowItem from="up" order={1}>
            <div className="card relative overflow-hidden rounded-3xl px-6 py-12 text-center md:py-16">
              <div className="pointer-events-none absolute -top-28 left-1/2 h-60 w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,99,240,0.25),transparent_70%)]" />

              <h2 className="display-sm relative mb-3">Let&apos;s build something serious.</h2>
              <p className="relative mx-auto mb-8 max-w-lg text-muted">
                Open to frontend engineering roles and ambitious freelance projects. If you need
                someone who ships complete, polished, modern web experiences — let&apos;s talk.
              </p>

              {/* light services row (hybrid positioning) */}
              <div className="relative mx-auto mb-9 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
                {SERVICES.map((s) => (
                  <div key={s.t} className="card card-lift p-4">
                    <p className="font-display text-sm font-semibold text-ink">{s.t}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{s.d}</p>
                  </div>
                ))}
              </div>

              <div className="relative flex flex-wrap items-center justify-center gap-4">
                <a href={`mailto:${EMAIL}`} className="btn-primary">
                  {EMAIL}
                </a>
                <a href={`mailto:${EMAIL}?subject=Let%27s%20work%20together`} className="btn-ghost">
                  Book a call <span aria-hidden>→</span>
                </a>
              </div>

              <p className="relative mt-7 text-sm text-muted">David Lawal · Lagos, Nigeria</p>

              <div className="relative mt-6 flex justify-center gap-4">
                <a
                  href="https://github.com/MxxScott"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-1 hover:border-ink hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-1 hover:border-ink hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-8 5-8-5V6.5l8 5 8-5v1.74z" />
                  </svg>
                </a>
              </div>
            </div>
          </FlowItem>
        </div>
      </div>
    </section>
  );
}
