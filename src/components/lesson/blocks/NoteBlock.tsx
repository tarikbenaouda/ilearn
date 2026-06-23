import React from 'react';
import type { NoteBlockData } from '../lesson.types';
import { renderKatex } from '../utils/renderKatex';

interface Props {
  block: NoteBlockData;
}

export function NoteBlock({ block }: Props) {
  return (
    <div
      dir="rtl"
      className="my-5 flex items-stretch gap-0 rounded-xl border border-violet-300 dark:border-violet-700/60 bg-violet-50 dark:bg-violet-950/25 overflow-hidden"
    >
      {/* Left accent bar (physical left = end in RTL) */}
      <div className="w-1 shrink-0 bg-violet-500 dark:bg-violet-400" />

      <div className="flex items-start gap-3 px-4 py-4 flex-1">
        {/* Label */}
        <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mt-0.5 select-none">
          ملاحظة
        </span>

        {/* Divider */}
        <div className="w-px self-stretch bg-violet-200 dark:bg-violet-700/50" />

        {/* Content */}
        <p className="flex-1 text-sm leading-7 text-foreground/85">
          {renderKatex(block.content)}
        </p>
      </div>
    </div>
  );
}
