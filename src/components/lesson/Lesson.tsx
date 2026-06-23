import React from 'react';
import type { LessonData, LessonBlock } from './lesson.types';
import { TextBlock } from './blocks/TextBlock';
import { FormulaBlock } from './blocks/FormulaBlock';
import { HintBlock } from './blocks/HintBlock';
import { NoteBlock } from './blocks/NoteBlock';
import { MCQBlock } from './blocks/MCQBlock';
import { ComponentBlock } from './blocks/ComponentBlock';

// ---------------------------------------------------------------------------
// Block renderer
// ---------------------------------------------------------------------------
function renderBlock(block: LessonBlock, index: number): React.ReactNode {
  switch (block.type) {
    case 'text':
      return <TextBlock key={index} block={block} />;
    case 'formula':
      return <FormulaBlock key={index} block={block} />;
    case 'hint':
      return <HintBlock key={index} block={block} />;
    case 'note':
      return <NoteBlock key={index} block={block} />;
    case 'mcq':
      return <MCQBlock key={index} block={block} />;
    case 'component':
      return <ComponentBlock key={index} block={block} />;
    default:
      // Exhaustiveness guard — TypeScript will warn if a new type is added
      // to LessonBlock without handling it here.
      return null;
  }
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface LessonProps {
  lesson: LessonData;
  /** Optional class to override the max-width container */
  className?: string;
}

// ---------------------------------------------------------------------------
// Lesson
// ---------------------------------------------------------------------------
export function Lesson({ lesson, className = '' }: LessonProps) {
  return (
    <article
      dir="rtl"
      className={`max-w-2xl mx-auto px-4 py-10 ${className}`}
    >
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-foreground leading-snug">
          {lesson.title}
        </h1>
        {/* Accent underline — aligned to the right (RTL start) */}
        <div className="mt-3 h-1 w-14 rounded-full bg-violet-500 dark:bg-violet-400" />
      </header>

      {/* Blocks */}
      <div className="flex flex-col gap-1">
        {lesson.blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </article>
  );
}

// Re-export types so consumers import from one place
export type { LessonData, LessonBlock } from './lesson.types';
