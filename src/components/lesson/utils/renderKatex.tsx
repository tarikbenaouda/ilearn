import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Parses a string that may contain:
 *   $$...$$ → display (block) math, LTR, centered
 *   $...$   → inline math, LTR, within RTL prose
 * Everything else is rendered as plain text.
 */
export function renderKatex(text: string): React.ReactNode {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  // $$...$$ must be tried before $...$ — alternation handles this.
  const regex = /\$\$([\s\S]*?)\$\$|\$([\s\S]*?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Plain text before this match
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++}>{text.slice(lastIndex, match.index)}</span>
      );
    }

    const isDisplay = match[0].startsWith('$$');
    const formula = isDisplay ? match[1] : match[2];

    try {
      const html = katex.renderToString(formula, {
        displayMode: isDisplay,
        throwOnError: false,
        output: 'html',
        trust: false,
      });

      if (isDisplay) {
        parts.push(
          <span
            key={key++}
            dir="ltr"
            className="block my-3 overflow-x-auto text-center"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } else {
        parts.push(
          <span
            key={key++}
            dir="ltr"
            className="inline-block mx-0.5 align-middle leading-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    } catch {
      parts.push(
        <span key={key++} className="text-red-400 font-mono text-xs">
          {match[0]}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining plain text
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return <>{parts}</>;
}

/**
 * Renders a raw LaTeX string (no $ delimiters) in display or inline mode.
 * Used by FormulaBlock where each line's formula is already raw LaTeX.
 */
export function renderRawKatex(
  formula: string,
  displayMode = false
): string {
  try {
    return katex.renderToString(formula, {
      displayMode,
      throwOnError: false,
      output: 'html',
      trust: false,
    });
  } catch {
    return `<span style="color:red">${formula}</span>`;
  }
}
