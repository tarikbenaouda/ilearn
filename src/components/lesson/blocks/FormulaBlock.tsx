import React from 'react';
import type { FormulaBlockData } from '../lesson.types';
import { renderRawKatex } from '../utils/renderKatex';

interface Props {
  block: FormulaBlockData;
}

export function FormulaBlock({ block }: Props) {
  return (
    <div className="my-6 rounded-2xl border border-border bg-muted/40 overflow-hidden">
      {block.title && (
        <div
          dir="rtl"
          className="px-5 py-3 border-b border-border bg-muted/60 text-sm font-semibold text-foreground/70 tracking-wide"
        >
          {block.title}
        </div>
      )}

      <div className="px-5 py-4 flex flex-col gap-4">
        {block.lines.map((line, i) => {
          const hasFormula = Boolean(line.formula);
          const hasArabic = Boolean(line.arabic);

          return (
            <div
              key={i}
              className="flex items-center gap-4 min-h-[2.5rem]"
              // Keep the row LTR so formula stays left and arabic stays right,
              // regardless of the document direction.
              dir="ltr"
            >
              {/* Formula — always on the left */}
              {hasFormula && (
                <div
                  dir="ltr"
                  className="shrink-0 overflow-x-auto"
                  dangerouslySetInnerHTML={{
                    __html: renderRawKatex(line.formula!, false),
                  }}
                />
              )}

              {/* Dashed separator — only when both sides exist */}
              {hasFormula && hasArabic && (
                <div className="flex-1 border-t border-dashed border-border/60 self-center" />
              )}

              {/* Arabic label — always on the right, but RTL text inside */}
              {hasArabic && (
                <div
                  dir="rtl"
                  className="shrink-0 text-sm text-foreground/75 font-medium"
                >
                  {line.arabic}
                </div>
              )}

              {/* Formula-only line: push it to take full width */}
              {hasFormula && !hasArabic && (
                <div className="flex-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
