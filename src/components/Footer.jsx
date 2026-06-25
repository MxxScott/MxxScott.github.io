export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-line bg-bg px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <a href="/#top" className="font-display text-lg font-bold tracking-wide">
            David<span className="text-grad">Lawal</span>
          </a>
          <p className="mt-1 text-xs text-muted">
            Designed &amp; built from scratch — Next.js · R3F · Tailwind · Framer Motion.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          <a href="/projects" className="link-underline transition-colors hover:text-ink">Projects</a>
          <a href="/about" className="link-underline transition-colors hover:text-ink">About</a>
          <a href="/#contact" className="link-underline transition-colors hover:text-ink">Contact</a>
          <a href="https://github.com/MxxScott" target="_blank" rel="noopener noreferrer" className="link-underline transition-colors hover:text-ink">GitHub ↗</a>
        </nav>
      </div>
      <p className="mt-8 text-center text-xs text-muted">© {year} David Lawal · dlawal979@gmail.com</p>
    </footer>
  );
}
