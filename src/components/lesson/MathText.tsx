import katex from 'katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils';

interface MathTextProps {
  /** 
   * Arabic text with optional inline math wrapped in $...$ 
   * and display math wrapped in $$...$$
   * Example: "الكسر هو $\\frac{1}{4}$ من الكل"
   */
  text: string;
  className?: string;
  /** Font size class applied to the text wrapper */
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

const SIZE_CLASSES: Record<NonNullable<MathTextProps['size']>, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

/**
 * Renders a string that mixes Arabic RTL text with LaTeX math formulas.
 * 
 * Splitting strategy:
 *  - $$...$$ → display (block) math, centered, with ltr direction
 *  - $...$   → inline math, with ltr direction injected inside Arabic RTL context
 *
 * Arabic text retains its natural RTL flow. Math formulas are rendered in a
 * small ltr <span> so KaTeX symbols (fractions, subscripts, etc.) display
 * correctly while sitting inside the Arabic sentence.
 */
export function MathText({ text, className, size = 'base' }: MathTextProps) {
  const sizeClass = SIZE_CLASSES[size];

  // Split on display math ($$...$$) first, then inline ($...$)
  const parts = splitMathParts(text);

  return (
    <span
      dir="rtl"
      className={cn('font-[Noto_Sans_Arabic,sans-serif] leading-loose', sizeClass, className)}
    >
      {parts.map((part, i) => {
        if (part.type === 'display-math') {
          return (
            <span
              key={i}
              dir="ltr"
              className="block my-3 text-center overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: renderKatex(part.value, true),
              }}
            />
          );
        }
        if (part.type === 'inline-math') {
          return (
            <span
              key={i}
              dir="ltr"
              className="inline-block align-middle mx-1"
              dangerouslySetInnerHTML={{
                __html: renderKatex(part.value, false),
              }}
            />
          );
        }
        // Plain Arabic text — keep RTL
        return (
          <span key={i} dir="rtl">
            {part.value}
          </span>
        );
      })}
    </span>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

type MathPart =
  | { type: 'text'; value: string }
  | { type: 'inline-math'; value: string }
  | { type: 'display-math'; value: string };

/** Split a string into text / inline-math / display-math segments. */
function splitMathParts(input: string): MathPart[] {
  const parts: MathPart[] = [];
  // Match $$...$$ before $...$
  const pattern = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: input.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      parts.push({ type: 'display-math', value: match[1] });
    } else if (match[2] !== undefined) {
      parts.push({ type: 'inline-math', value: match[2] });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < input.length) {
    parts.push({ type: 'text', value: input.slice(lastIndex) });
  }

  return parts;
}

function renderKatex(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: 'html',
    });
  } catch {
    return `<code>${latex}</code>`;
  }
}
