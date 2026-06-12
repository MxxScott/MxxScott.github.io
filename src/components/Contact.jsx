'use client';

import { FlowItem } from './Flow';

const EMAIL = 'dlawal979@gmail.com';

export default function Contact() {
  return (
    <section className="section-scroll h-full overflow-y-auto">
      <div className="flex min-h-full items-center px-6 py-12">
        <div className="mx-auto w-full max-w-4xl">
          <FlowItem from="up" order={0}>
            <div className="card relative overflow-hidden rounded-3xl px-6 py-14 text-center md:py-20">
              <div className="pointer-events-none absolute -top-28 left-1/2 h-60 w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,99,240,0.25),transparent_70%)]" />

              <h2 className="font-display relative mb-3 text-3xl font-bold md:text-4xl">
                Let&apos;s build something serious.
              </h2>
              <p className="relative mx-auto mb-2 max-w-lg text-muted">
                I&apos;m open to frontend engineering roles and ambitious projects. If you need
                someone who ships complete, polished, modern web experiences — get in touch.
              </p>
              <p className="relative mb-8 text-sm text-muted">David Lawal · Lagos, Nigeria</p>

              <a
                href={`mailto:${EMAIL}`}
                className="relative inline-block rounded-full bg-grad px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(47,99,240,0.4)] transition-transform hover:-translate-y-0.5"
              >
                {EMAIL}
              </a>

              <div className="relative mt-8 flex justify-center gap-4">
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
