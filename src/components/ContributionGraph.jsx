'use client';

import { useEffect, useState } from 'react';

const WEEKS = 26; // half a year visible

function levelColor(level) {
  const map = ['#1a1f2e', '#1a3060', '#234bbf', '#2f63f0', '#5b82ff'];
  return map[Math.min(level, 4)];
}

function SkeletonGraph() {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: WEEKS }).map((_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: 7 }).map((_, d) => (
            <div key={d} className="h-[10px] w-[10px] animate-pulse rounded-[2px] bg-line" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ContributionGraph() {
  const [weeks, setWeeks] = useState(null);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/MxxScott?y=last')
      .then((r) => r.json())
      .then((data) => {
        const days = data.contributions ?? [];
        // group into weeks (Sun-first), take last WEEKS weeks
        const grid = [];
        let week = [];
        days.forEach((d, i) => {
          week.push(d);
          if (week.length === 7 || i === days.length - 1) {
            grid.push(week);
            week = [];
          }
        });
        const yearKey = Object.keys(data.total ?? {}).sort().pop();
        setTotal(data.total?.[yearKey] ?? null);
        setWeeks(grid.slice(-WEEKS));
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-mint">
          GitHub Activity
        </p>
        {total !== null && (
          <span className="text-[10px] text-muted">{total} contributions this year</span>
        )}
      </div>

      <div className="overflow-x-auto">
        {weeks === null ? (
          <SkeletonGraph />
        ) : (
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                    className="h-[10px] w-[10px] rounded-[2px] transition-opacity hover:opacity-80"
                    style={{ background: levelColor(day.level) }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
