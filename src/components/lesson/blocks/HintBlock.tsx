import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HintBlockData } from '../lesson.types';
import { renderKatex } from '../utils/renderKatex';

interface Props {
  block: HintBlockData;
}

export function HintBlock({ block }: Props) {
  const [revealed, setRevealed] = useState(false);
  const label = block.label ?? 'تلميح';

  return (
    <div dir="rtl" className="my-4">
      <button
        onClick={() => setRevealed((v) => !v)}
        className="group flex items-center gap-2.5 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 transition-colors"
      >
        {/* Rotating indicator */}
        <motion.span
          animate={{ rotate: revealed ? 90 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="inline-block w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] leading-none"
          style={{ display: 'inline-flex' }}
        >
          ▸
        </motion.span>

        {/* Lightbulb icon + label */}
        <span className="flex items-center gap-1.5">
          <span aria-hidden>💡</span>
          {label}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {revealed && (
          <motion.div
            key="hint-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/25 text-sm leading-7 text-foreground/85">
              {renderKatex(block.content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
