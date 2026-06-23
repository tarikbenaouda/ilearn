import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MCQBlockData } from '../lesson.types';
import { renderKatex } from '../utils/renderKatex';

interface Props {
  block: MCQBlockData;
}

// Arabic abjad letters for A B C D E
const ARABIC_LETTERS = ['أ', 'ب', 'ج', 'د', 'هـ', 'و'];

type OptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dimmed';

function getOptionState(
  index: number,
  selected: number | null,
  correct: number
): OptionState {
  if (selected === null) return 'idle';
  if (index === correct) return 'correct';
  if (index === selected) return 'wrong';
  return 'dimmed';
}

const optionStyles: Record<OptionState, string> = {
  idle: 'border-border bg-card text-foreground/80 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/20 cursor-pointer',
  selected: 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 cursor-pointer',
  correct: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 cursor-default',
  wrong:   'border-red-400 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 cursor-default',
  dimmed:  'border-border bg-card/50 text-foreground/30 cursor-default',
};

export function MCQBlock({ block }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const answered = selected !== null;
  const isCorrect = answered && selected === block.correct;

  function handleSelect(i: number) {
    if (!answered) setSelected(i);
  }

  function handleRetry() {
    setSelected(null);
  }

  return (
    <div
      dir="rtl"
      className="my-6 rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      {/* Question */}
      <p className="font-semibold text-foreground leading-8 mb-4">
        {renderKatex(block.question)}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {block.options.map((option, i) => {
          const state = getOptionState(i, selected, block.correct);

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              whileTap={!answered ? { scale: 0.985 } : {}}
              className={[
                'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-right transition-all duration-150',
                optionStyles[state],
              ].join(' ')}
            >
              {/* Letter badge */}
              <span
                className={[
                  'shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold transition-colors',
                  state === 'correct'
                    ? 'border-emerald-500 text-emerald-600'
                    : state === 'wrong'
                    ? 'border-red-400 text-red-500'
                    : 'border-current',
                ].join(' ')}
              >
                {ARABIC_LETTERS[i] ?? i + 1}
              </span>

              {/* Option text */}
              <span className="flex-1 leading-relaxed">
                {renderKatex(option)}
              </span>

              {/* Status icon */}
              <AnimatePresence mode="wait">
                {answered && i === block.correct && (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="shrink-0 text-emerald-500 text-base"
                  >
                    ✓
                  </motion.span>
                )}
                {answered && i === selected && i !== block.correct && (
                  <motion.span
                    key="cross"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="shrink-0 text-red-400 text-base"
                  >
                    ✗
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation + retry */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col gap-3">
              {/* Result banner */}
              <div
                className={[
                  'text-sm font-semibold rounded-lg px-4 py-2.5',
                  isCorrect
                    ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                    : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400',
                ].join(' ')}
              >
                {isCorrect ? '🎉 إجابة صحيحة!' : '❌ إجابة خاطئة'}
              </div>

              {/* Explanation */}
              {block.explanation && (
                <p className="text-sm leading-7 text-foreground/75 px-1">
                  {renderKatex(block.explanation)}
                </p>
              )}

              {/* Retry */}
              <button
                onClick={handleRetry}
                className="self-start text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                حاول مجدداً
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
