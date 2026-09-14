'use client';

import { useState } from 'react';

function hashString(value = '') {
  return Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
}

export default function ProjectArtwork({ project, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const source = project?.title || project?.name || 'Project';
  const hueA = hashString(source) % 360;
  const hueB = (hueA + 90) % 360;
  const badge = project?.emoji || source.charAt(0).toUpperCase();
  const preview = project?.previewImage;
  const showImage = preview && !imageFailed;

  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden border-b border-line bg-bg-soft ${className}`}
      style={{
        background: `radial-gradient(circle at 20% 20%, hsla(${hueA}, 82%, 68%, 0.30), transparent 35%), linear-gradient(135deg, hsla(${hueA}, 80%, 56%, 0.20), hsla(${hueB}, 70%, 42%, 0.18)), linear-gradient(135deg, hsl(${hueA} 35% 14%), hsl(${hueB} 42% 22%))`,
      }}
      aria-label={`Project preview for ${source}`}
    >
      {showImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={preview}
          alt=""
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      )}

      {!showImage && (
        <>
          <div className="absolute inset-0 opacity-35" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          <div className="absolute left-[12%] top-[18%] h-[44%] w-[62%] rounded-xl border border-white/20 bg-black/20 shadow-2xl backdrop-blur-sm">
            <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
              <i className="h-1.5 w-1.5 rounded-full bg-white/50" />
              <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <i className="h-1.5 w-1.5 rounded-full bg-white/15" />
            </div>
            <div className="grid grid-cols-[1.4fr_1fr] gap-2 p-3">
              <div className="h-16 rounded-md bg-white/10" />
              <div className="space-y-2">
                <div className="h-2 w-4/5 rounded-full bg-white/25" />
                <div className="h-2 w-full rounded-full bg-white/10" />
                <div className="h-2 w-3/5 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-[28%] right-[12%] h-14 w-20 rotate-6 rounded-lg border border-white/15 bg-white/10 shadow-xl backdrop-blur-md" />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#080b13] via-[#080b13]/10 to-transparent" />
      <div className="relative z-10 flex w-full items-end justify-between gap-2 px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
            {showImage ? 'Live preview' : 'Project study'}
          </p>
          <p className="mt-1 font-display text-sm font-semibold text-white">{source}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl shadow-lg shadow-black/20 backdrop-blur-sm">
          {badge}
        </span>
      </div>
    </div>
  );
}
