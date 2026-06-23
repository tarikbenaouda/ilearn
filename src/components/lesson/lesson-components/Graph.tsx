import React, { useState } from 'react';

interface GraphProps {
  initial?: number;
  title?: string;
  min?: number;
  max?: number;
}

/**
 * Example interactive lesson component.
 * Replace / expand this with your actual Mafs / D3 / etc. graph.
 * The Lesson component will inject props from the JSON render string:
 *   { "type": "component", "render": "<Graph initial={5} title=\"مثال\" />" }
 */
export function Graph({ initial = 0, title, min = 0, max = 20 }: GraphProps) {
  const [value, setValue] = useState(initial);

  // Simple visual: a horizontal bar chart-like display as a placeholder.
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      {title && (
        <p dir="rtl" className="text-sm font-semibold text-foreground/80 mb-4 text-center">
          {title}
        </p>
      )}

      {/* Bar */}
      <div className="h-8 rounded-full bg-muted overflow-hidden mb-4" dir="ltr">
        <div
          className="h-full rounded-full bg-violet-500 dark:bg-violet-400 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-violet-500"
        dir="ltr"
      />

      <p dir="ltr" className="text-center text-sm text-muted-foreground mt-2 font-mono">
        value = {value}
      </p>
    </div>
  );
}
