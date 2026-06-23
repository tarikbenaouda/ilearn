import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface LessonStepProps {
  rightContent: React.ReactNode;
  leftContent: React.ReactNode;
  isActive: boolean;
  className?: string;
}

export function LessonStep({ rightContent, leftContent, isActive, className }: LessonStepProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35 }}
          className={cn(
            // flex-1 fills the space between header and footer, overflow-hidden prevents scroll
            'flex-1 flex flex-row min-h-0 overflow-hidden',
            className
          )}
        >
          {/* ── Right Side: Question + Visual ─────────────────── */}
          <div className="flex-1 flex flex-col justify-center items-center px-8 py-4 border-l border-border/40 bg-slate-50/60 dark:bg-slate-900/40 overflow-hidden">
            <div className="max-w-lg w-full flex flex-col gap-4">
              {rightContent}
            </div>
          </div>

          {/* ── Left Side: Choices / Input ──────────────────────── */}
          <div className="flex-1 flex flex-col justify-center items-center px-8 py-4 bg-background overflow-hidden">
            <div className="max-w-xs w-full flex flex-col gap-3">
              {leftContent}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
