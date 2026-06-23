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
            // flex-1 + min-h-0: fills the remaining height between header and bottom edge
            // Each panel controls its own scroll independently
            'flex-1 flex flex-row min-h-0',
            className
          )}
        >
          {/* ── Right Side: Question + Visual ──────────────────── */}
          <div className="flex-1 flex flex-col items-center border-l border-border/40 bg-slate-50/60 dark:bg-slate-900/40 overflow-y-auto">
            {/* pb-24 leaves room above the floating buttons */}
            <div className="max-w-lg w-full flex flex-col gap-4 px-8 py-6 pb-24">
              {rightContent}
            </div>
          </div>

          {/* ── Left Side: Choices / Input ───────────────────────── */}
          <div className="flex-1 flex flex-col items-center bg-background overflow-y-auto">
            {/* pb-24 leaves room above the floating buttons */}
            <div className="max-w-xs w-full flex flex-col gap-3 px-8 py-6 pb-24">
              {leftContent}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
