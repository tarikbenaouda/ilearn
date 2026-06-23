export interface TextBlockData {
  type: 'text';
  title?: string;
  content: string; // Arabic prose, may contain $inline$ or $$display$$ KaTeX
  image?: string;  // URL — floats to the physical left (end in RTL)
}

export interface FormulaLine {
  formula?: string; // raw LaTeX, no $ delimiters
  arabic?: string;  // Arabic label on the right
}

export interface FormulaBlockData {
  type: 'formula';
  title?: string;
  lines: FormulaLine[];
}

export interface HintBlockData {
  type: 'hint';
  label?: string;   // defaults to "تلميح"
  content: string;  // may contain KaTeX
}

export interface NoteBlockData {
  type: 'note';
  content: string;  // may contain KaTeX
}

export interface MCQBlockData {
  type: 'mcq';
  question: string;    // may contain KaTeX
  options: string[];   // each may contain KaTeX
  correct: number;     // 0-indexed
  explanation?: string;
}

export interface ComponentBlockData {
  type: 'component';
  render: string; // JSX-like string, e.g. "<Graph initial={10} />"
}

export type LessonBlock =
  | TextBlockData
  | FormulaBlockData
  | HintBlockData
  | NoteBlockData
  | MCQBlockData
  | ComponentBlockData;

export interface LessonData {
  id: string;
  title: string;
  blocks: LessonBlock[];
}
