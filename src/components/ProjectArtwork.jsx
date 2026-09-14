'use client';

function hashString(value = '') {
  return Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
}

export default function ProjectArtwork({ project, className = '' }) {
  const source = project?.title || project?.name || 'Project';
  const hueA = hashString(source) % 360;
  const hueB = (hueA + 90) % 360;
  const badge = project?.emoji || source.charAt(0).toUpperCase();

  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden border-b border-line bg-bg-soft ${className}`}
      style={{
        background: `radial-gradient(circle at 20% 20%, hsla(${hueA}, 82%, 68%, 0.30), transparent 35%), linear-gradient(135deg, hsla(${hueA}, 80%, 56%, 0.20), hsla(${hueB}, 70%, 42%, 0.18)), linear-gradient(135deg, hsl(${hueA} 35% 14%), hsl(${hueB} 42% 22%))`,
      }}
      aria-label={`Project preview for ${source}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(8,11,19,0.42)_100%)]" />
      <div className="relative z-10 flex w-full items-end justify-between gap-2 px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">Project</p>
          <p className="mt-1 font-display text-sm font-semibold text-white">{source}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl shadow-lg shadow-black/20 backdrop-blur-sm">
          {badge}
        </span>
      </div>
    </div>
  );
}
