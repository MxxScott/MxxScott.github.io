export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg px-6 py-9 text-center text-sm text-muted">
      © {new Date().getFullYear()} David Lawal · dlawal979@gmail.com · Designed &amp; built from
      scratch — Next.js, React Three Fiber, Tailwind, Framer Motion &amp; a Python data pipeline.
    </footer>
  );
}
